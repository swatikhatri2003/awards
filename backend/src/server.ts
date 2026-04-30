import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import { z } from "zod";
import { getDb } from "./db";
import { sendOtpEmail } from "./mailer";
import { sendWhatsappOtp } from "./whatsapp";

dotenv.config();

const app = express();
const db = getDb();

const PORT = Number(process.env.PORT || 4000);
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());

// Serve uploaded nominee images (and other future uploads)
// This assumes the server is started with CWD = backend/ (npm run dev/start).
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const uploadRoot = path.join(process.cwd(), "uploads");
const nomineeUploadDir = path.join(uploadRoot, "nominee");
fs.mkdirSync(nomineeUploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, nomineeUploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || "").slice(0, 20) || ".jpg";
      const safeExt = /^[.\w-]+$/.test(ext) ? ext : ".jpg";
      const name = `${crypto.randomUUID()}${safeExt}`;
      cb(null, name);
    },
  }),
  limits: {
    fileSize: 8 * 1024 * 1024, // 8MB
  },
  fileFilter: (_req, file, cb: multer.FileFilterCallback) => {
    const ok = /^image\//i.test(file.mimetype || "");
    if (!ok) return cb(new Error("ONLY_IMAGES_ALLOWED"));
    return cb(null, true);
  },
});

app.post("/api/uploads/nominee-photo", upload.single("photo"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ ok: false, error: "NO_FILE" });
  return res.json({
    ok: true,
    filename: file.filename,
    path: `/uploads/nominee/${file.filename}`,
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

const eventIdQuerySchema = z.object({
  eventId: z.coerce.number().int().positive().optional(),
});

function eventCategoryWhere(eventId?: number, tableAlias?: string) {
  if (!eventId) return { whereSql: "", params: {} as any };
  const col = tableAlias ? `${tableAlias}.event_id` : "event_id";
  // Backward-compat: existing data had NULL event_id (single event).
  // Treat NULL as event 1 so old installs still work when eventId=1 is passed.
  if (eventId === 1) {
    return { whereSql: `WHERE (${col} = :event_id OR ${col} IS NULL)`, params: { event_id: eventId } as any };
  }
  return { whereSql: `WHERE ${col} = :event_id`, params: { event_id: eventId } as any };
}

function parseEventIdOrDefault1(req: express.Request) {
  const parsedQuery = eventIdQuerySchema.safeParse(req.query);
  if (!parsedQuery.success) return { ok: false as const };
  return { ok: true as const, eventId: parsedQuery.data.eventId ?? 1 };
}

app.get("/api/categories", async (req, res) => {
  const parsedQuery = eventIdQuerySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
  }
  const eventId = parsedQuery.data.eventId;
  try {
    const { whereSql, params } = eventCategoryWhere(eventId);
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT category_id, name, winner_nominee_id
       FROM category
       ${whereSql}
       ORDER BY category_id ASC`,
      params,
    );
    return res.json({ ok: true, categories: rows });
  } catch (e) {
    console.error("categories db error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.get("/api/nominees", async (req, res) => {
  const parsedQuery = eventIdQuerySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
  }
  const eventId = parsedQuery.data.eventId;
  try {
    if (!eventId) {
      const [rows] = await db.execute<RowDataPacket[]>(
        `SELECT nominee_id, photo, name, description, category_id, votes
         FROM nominee
         ORDER BY category_id ASC, nominee_id ASC`,
      );
      return res.json({ ok: true, nominees: rows });
    }

    const { whereSql, params } = eventCategoryWhere(eventId, "c");
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT n.nominee_id, n.photo, n.name, n.description, n.category_id, n.votes
       FROM nominee n
       INNER JOIN category c ON c.category_id = n.category_id
       ${whereSql}
       ORDER BY n.category_id ASC, n.nominee_id ASC`,
      params,
    );
    return res.json({ ok: true, nominees: rows });
  } catch (e) {
    console.error("all nominees db error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.get("/api/nominees/:nomineeId", async (req, res) => {
  const nomineeId = Number(req.params.nomineeId);
  if (!Number.isFinite(nomineeId) || nomineeId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_NOMINEE_ID" });
  }
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT nominee_id, photo, name, description, category_id, votes
       FROM nominee
       WHERE nominee_id = :nominee_id
       LIMIT 1`,
      { nominee_id: nomineeId },
    );
    const nominee = rows[0];
    if (!nominee) {
      return res.status(404).json({ ok: false, error: "NOMINEE_NOT_FOUND" });
    }
    return res.json({ ok: true, nominee });
  } catch (e) {
    console.error("nominee detail db error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

const adminCreateCategorySchema = z.object({
  name: z.string().trim().min(1).max(100),
  eventId: z.coerce.number().int().positive().optional(),
});

const adminUpdateCategorySchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  winner_nominee_id: z.coerce.number().int().positive().nullable().optional(),
});

async function ensureCategoryInEvent(categoryId: number, eventId: number) {
  const { whereSql, params } = eventCategoryWhere(eventId);
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT category_id, event_id
     FROM category
     ${whereSql ? `${whereSql} AND category_id = :category_id` : "WHERE category_id = :category_id"}
     LIMIT 1`,
    ({ ...params, category_id: categoryId } as any),
  );
  return rows[0] ?? null;
}

app.post("/api/admin/categories", async (req, res) => {
  const parsed = adminCreateCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }
  const eventId = parsed.data.eventId ?? 1;
  try {
    const [result] = await db.execute(
      `INSERT INTO category (name, winner_nominee_id, event_id)
       VALUES (:name, NULL, :event_id)`,
      { name: parsed.data.name, event_id: eventId },
    );
    // @ts-expect-error mysql2 result shape varies by config
    const id = Number(result?.insertId ?? 0);
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT category_id, name, winner_nominee_id
       FROM category
       WHERE category_id = :category_id
       LIMIT 1`,
      { category_id: id },
    );
    return res.json({ ok: true, category: rows[0] ?? null });
  } catch (e) {
    console.error("admin create category db error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.patch("/api/admin/categories/:categoryId", async (req, res) => {
  const categoryId = Number(req.params.categoryId);
  if (!Number.isFinite(categoryId) || categoryId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_CATEGORY_ID" });
  }
  const parsed = adminUpdateCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }
  const eventParsed = parseEventIdOrDefault1(req);
  if (!eventParsed.ok) return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
  const eventId = eventParsed.eventId;
  try {
    const found = await ensureCategoryInEvent(categoryId, eventId);
    if (!found) return res.status(404).json({ ok: false, error: "CATEGORY_NOT_FOUND" });

    const updates: string[] = [];
    const params: Record<string, unknown> = { category_id: categoryId };
    if (typeof parsed.data.name === "string") {
      updates.push("name = :name");
      params.name = parsed.data.name;
    }
    if (Object.prototype.hasOwnProperty.call(parsed.data, "winner_nominee_id")) {
      updates.push("winner_nominee_id = :winner_nominee_id");
      params.winner_nominee_id = parsed.data.winner_nominee_id ?? null;
    }
    if (!updates.length) {
      return res.status(400).json({ ok: false, error: "NO_CHANGES" });
    }

    await db.execute(`UPDATE category SET ${updates.join(", ")} WHERE category_id = :category_id`, params as any);
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT category_id, name, winner_nominee_id
       FROM category
       WHERE category_id = :category_id
       LIMIT 1`,
      { category_id: categoryId },
    );
    return res.json({ ok: true, category: rows[0] ?? null });
  } catch (e) {
    console.error("admin update category db error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

const adminCreateNomineeSchema = z.object({
  category_id: z.coerce.number().int().positive(),
  name: z.string().trim().min(1).max(100),
  description: z.string().trim().max(5000).optional(),
  photo: z.string().trim().max(150).optional(),
});

const adminUpdateNomineeSchema = z.object({
  category_id: z.coerce.number().int().positive().optional(),
  name: z.string().trim().min(1).max(100).optional(),
  description: z.string().trim().max(5000).nullable().optional(),
  photo: z.string().trim().max(150).optional(),
});

app.post("/api/admin/nominees", async (req, res) => {
  const parsed = adminCreateNomineeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }
  const eventParsed = parseEventIdOrDefault1(req);
  if (!eventParsed.ok) return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
  const eventId = eventParsed.eventId;
  try {
    const cat = await ensureCategoryInEvent(parsed.data.category_id, eventId);
    if (!cat) return res.status(404).json({ ok: false, error: "CATEGORY_NOT_FOUND" });

    const [result] = await db.execute(
      `INSERT INTO nominee (photo, name, description, category_id, votes)
       VALUES (:photo, :name, :description, :category_id, 0)`,
      {
        photo: parsed.data.photo ?? "",
        name: parsed.data.name,
        description: parsed.data.description ?? null,
        category_id: parsed.data.category_id,
      },
    );
    // @ts-expect-error mysql2 result shape varies by config
    const id = Number(result?.insertId ?? 0);
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT nominee_id, photo, name, description, category_id, votes
       FROM nominee
       WHERE nominee_id = :nominee_id
       LIMIT 1`,
      { nominee_id: id },
    );
    return res.json({ ok: true, nominee: rows[0] ?? null });
  } catch (e) {
    console.error("admin create nominee db error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.patch("/api/admin/nominees/:nomineeId", async (req, res) => {
  const nomineeId = Number(req.params.nomineeId);
  if (!Number.isFinite(nomineeId) || nomineeId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_NOMINEE_ID" });
  }
  const parsed = adminUpdateNomineeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }
  const eventParsed = parseEventIdOrDefault1(req);
  if (!eventParsed.ok) return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
  const eventId = eventParsed.eventId;
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT nominee_id, category_id
       FROM nominee
       WHERE nominee_id = :nominee_id
       LIMIT 1`,
      { nominee_id: nomineeId },
    );
    const existing = rows[0];
    if (!existing) return res.status(404).json({ ok: false, error: "NOMINEE_NOT_FOUND" });

    // Ensure (current or new) category belongs to the requested event
    const nextCategoryId = Number(parsed.data.category_id ?? existing.category_id);
    const cat = await ensureCategoryInEvent(nextCategoryId, eventId);
    if (!cat) return res.status(404).json({ ok: false, error: "CATEGORY_NOT_FOUND" });

    const updates: string[] = [];
    const params: Record<string, unknown> = { nominee_id: nomineeId };
    if (typeof parsed.data.name === "string") {
      updates.push("name = :name");
      params.name = parsed.data.name;
    }
    if (typeof parsed.data.photo === "string") {
      updates.push("photo = :photo");
      params.photo = parsed.data.photo;
    }
    if (Object.prototype.hasOwnProperty.call(parsed.data, "description")) {
      updates.push("description = :description");
      params.description = parsed.data.description ?? null;
    }
    if (typeof parsed.data.category_id === "number") {
      updates.push("category_id = :category_id");
      params.category_id = parsed.data.category_id;
    }
    if (!updates.length) {
      return res.status(400).json({ ok: false, error: "NO_CHANGES" });
    }

    await db.execute(`UPDATE nominee SET ${updates.join(", ")} WHERE nominee_id = :nominee_id`, params as any);
    const [outRows] = await db.execute<RowDataPacket[]>(
      `SELECT nominee_id, photo, name, description, category_id, votes
       FROM nominee
       WHERE nominee_id = :nominee_id
       LIMIT 1`,
      { nominee_id: nomineeId },
    );
    return res.json({ ok: true, nominee: outRows[0] ?? null });
  } catch (e) {
    console.error("admin update nominee db error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

// app.get("/api/categories/:categoryId/nominees", async (req, res) => {
//   const categoryId = Number(req.params.categoryId);
//   if (!Number.isFinite(categoryId) || categoryId <= 0) {
//     return res.status(400).json({ ok: false, error: "INVALID_CATEGORY_ID" });
//   }

//   try {
//     const [rows] = await db.execute<RowDataPacket[]>(
//       `SELECT nominee_id, photo, name, category_id, votes
//        FROM nominee
//        WHERE category_id = :category_id
//        ORDER BY nominee_id ASC`,
//       { category_id: categoryId },
//     );
//     return res.json({ ok: true, nominees: rows });
//   } catch (e) {
//     console.error("nominees db error", e);
//     return res.status(500).json({ ok: false, error: "DB_ERROR" });
//   }
// });

app.post("/api/nominees/:nomineeId/vote", async (req, res) => {
  const nomineeId = Number(req.params.nomineeId);
  if (!Number.isFinite(nomineeId) || nomineeId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_NOMINEE_ID" });
  }

  try {
    const [result] = await db.execute(
      `UPDATE nominee
       SET votes = COALESCE(votes, 0) + 1
       WHERE nominee_id = :nominee_id`,
      { nominee_id: nomineeId },
    );

    // @ts-expect-error mysql2 result shape varies by config
    const affected = Number(result?.affectedRows ?? 0);
    if (affected <= 0) return res.status(404).json({ ok: false, error: "NOMINEE_NOT_FOUND" });

    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT nominee_id, photo, name, category_id, votes
       FROM nominee
       WHERE nominee_id = :nominee_id
       LIMIT 1`,
      { nominee_id: nomineeId },
    );
    return res.json({ ok: true, nominee: rows[0] ?? null });
  } catch (e) {
    console.error("vote db error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  mobile: z
    .string()
    .trim()
    .transform((v) => v.replace(/[^\d]/g, ""))
    .refine((v) => v.length >= 8 && v.length <= 15),
  membership_number: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length ? v : undefined)),
  eventId: z.coerce.number().int().positive().optional(),
});

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

app.post("/api/auth/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }

  const { name, email, mobile, membership_number, eventId } = parsed.data;
  const effectiveEventId = eventId ?? 1;
  const otp = generateOtp();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const attemptsLeft = 5;

  try {
    // Allowlist gate: only mobile numbers present in `allowed_mobiles` may register.
    // Store digits-only in that table (matches the schema's normalized `mobile`).
    const [allowedRows] = await db.execute<RowDataPacket[]>(
      `SELECT id FROM allowed_mobiles WHERE mobile = :mobile LIMIT 1`,
      { mobile },
    );
    if (!allowedRows[0]) {
      return res.status(403).json({
        ok: false,
        error: "MOBILE_NOT_ALLOWED",
        message: "This mobile number is not authorized. Please contact admin.",
      });
    }

    const membershipNo = membership_number ? Number(membership_number) : null;
    if (membership_number && Number.isNaN(membershipNo)) {
      return res.status(400).json({ ok: false, error: "INVALID_MEMBERSHIP_NUMBER" });
    }

    await db.execute(
      `
      INSERT INTO users (name, email, phone, membership_no, otp, otp_expires_at, otp_attempts_left, event_id)
      VALUES (:name, :email, :phone, :membership_no, :otp, :otp_expires_at, :otp_attempts_left, :event_id)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        email = VALUES(email),
        phone = VALUES(phone),
        membership_no = VALUES(membership_no),
        otp = VALUES(otp),
        otp_expires_at = VALUES(otp_expires_at),
        otp_attempts_left = VALUES(otp_attempts_left),
        event_id = VALUES(event_id)
      `,
      {
        name,
        email: email.toLowerCase(),
        phone: mobile,
        membership_no: membershipNo,
        otp,
        otp_expires_at: otpExpiresAt,
        otp_attempts_left: attemptsLeft,
        event_id: effectiveEventId,
      },
    );
  } catch (e) {
    console.error("register db error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }

  let emailOk = false;
  try {
    await sendOtpEmail({ to: email, otp, name });
    emailOk = true;
  } catch (e) {
    console.warn("[Email] OTP not sent");
  }

  const whatsappOk = await sendWhatsappOtp({ mobile, username: name, otp });

  return res.json({
    ok: true,
    next: "VERIFY_OTP",
    otp_sent_to: {
      email: emailOk,
      whatsapp: whatsappOk,
      sms: false,
    },
  });
});

const verifySchema = z.object({
  email: z.string().email(),
  mobile: z
    .string()
    .trim()
    .transform((v) => v.replace(/[^\d]/g, ""))
    .refine((v) => v.length >= 8 && v.length <= 15),
  otp: z.string().regex(/^\d{6}$/),
});

app.post("/api/auth/verify", async (req, res) => {
  const parsed = verifySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }

  const { email, mobile, otp } = parsed.data;

  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id, name, email, phone, membership_no, otp AS db_otp, otp_expires_at, otp_attempts_left
       FROM users
       WHERE email = :email AND phone = :phone
       LIMIT 1`,
      { email: email.toLowerCase(), phone: mobile },
    );

    const user = rows[0];
    if (!user) return res.status(400).json({ ok: false, error: "NOT_FOUND" });

    if (!user.otp_expires_at || new Date(user.otp_expires_at).getTime() < Date.now()) {
      return res.status(400).json({ ok: false, error: "EXPIRED" });
    }

    const attemptsLeft = Number(user.otp_attempts_left ?? 0);
    if (attemptsLeft <= 0) {
      return res.status(400).json({ ok: false, error: "TOO_MANY_ATTEMPTS", attemptsLeft: 0 });
    }

    if (String(user.db_otp) !== otp) {
      const nextAttempts = attemptsLeft - 1;
      await db.execute(`UPDATE users SET otp_attempts_left = :n WHERE id = :id`, { n: nextAttempts, id: user.id });
      return res.status(400).json({ ok: false, error: "INVALID", attemptsLeft: nextAttempts });
    }

    await db.execute(
      `UPDATE users SET otp = NULL, otp_expires_at = NULL, otp_attempts_left = NULL, verified_at = NOW() WHERE id = :id`,
      { id: user.id },
    );

    return res.json({
      ok: true,
      registered: true,
      person: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.phone,
        membershipNumber: user.membership_no ?? undefined,
      },
    });
  } catch (e) {
    console.error("verify db error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

const castVoteSchema = z.object({
  uid: z.coerce.number().int().positive(),
  catid: z.coerce.number().int().positive(),
  nomid: z.coerce.number().int().positive(),
});

app.post("/api/votes", async (req, res) => {
  const parsed = castVoteSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }

  const { uid, catid, nomid } = parsed.data;

  try {
    // Sanity check: nominee belongs to the given category.
    const [nomRows] = await db.execute<RowDataPacket[]>(
      `SELECT nominee_id, name, category_id
       FROM nominee
       WHERE nominee_id = :nominee_id
       LIMIT 1`,
      { nominee_id: nomid },
    );
    const nominee = nomRows[0];
    if (!nominee) {
      return res.status(404).json({ ok: false, error: "NOMINEE_NOT_FOUND" });
    }
    if (Number(nominee.category_id) !== catid) {
      return res.status(400).json({ ok: false, error: "NOMINEE_CATEGORY_MISMATCH" });
    }

    // Has this user already voted in this category?
    const [existingRows] = await db.execute<RowDataPacket[]>(
      `SELECT id, nominee_id
       FROM votes
       WHERE user_id = :uid AND category_id = :catid
       LIMIT 1`,
      { uid, catid },
    );
    const existing = existingRows[0];
    if (existing) {
      return res.status(409).json({
        ok: false,
        error: "ALREADY_VOTED",
        message: "You have already voted in this category.",
        votedNomineeId: Number(existing.nominee_id),
      });
    }

    await db.execute(
      `INSERT INTO votes (user_id, category_id, nominee_id)
       VALUES (:uid, :catid, :nomid)`,
      { uid, catid, nomid },
    );

    const [updateResult] = await db.execute(
      `UPDATE nominee
       SET votes = COALESCE(votes, 0) + 1
       WHERE nominee_id = :nominee_id`,
      { nominee_id: nomid },
    );
    // @ts-expect-error mysql2 result shape varies by config
    const affected = Number(updateResult?.affectedRows ?? 0);
    if (affected <= 0) {
      return res.status(404).json({ ok: false, error: "NOMINEE_NOT_FOUND" });
    }

    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT nominee_id, photo, name, category_id, votes
       FROM nominee
       WHERE nominee_id = :nominee_id
       LIMIT 1`,
      { nominee_id: nomid },
    );

    return res.json({
      ok: true,
      message: "Vote recorded.",
      nominee: rows[0] ?? null,
    });
  } catch (e: unknown) {
    // If the DB has UNIQUE(user_id, category_id), a race can still hit a duplicate.
    const code = (e as { code?: string } | null)?.code;
    if (code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        ok: false,
        error: "ALREADY_VOTED",
        message: "You have already voted in this category.",
      });
    }
    console.error("cast vote db error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  console.log(`CORS origin: ${CORS_ORIGIN}`);
});
