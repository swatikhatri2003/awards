import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "node:path";
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

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/categories", async (_req, res) => {
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT category_id, name, winner_nominee_id
       FROM category
       ORDER BY category_id ASC`,
    );
    return res.json({ ok: true, categories: rows });
  } catch (e) {
    console.error("categories db error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.get("/api/nominees", async (_req, res) => {
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT nominee_id, photo, name, description, category_id, votes
       FROM nominee
       ORDER BY category_id ASC, nominee_id ASC`,
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
});

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

app.post("/api/auth/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }

  const { name, email, mobile, membership_number } = parsed.data;
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
      INSERT INTO users (name, email, phone, membership_no, otp, otp_expires_at, otp_attempts_left)
      VALUES (:name, :email, :phone, :membership_no, :otp, :otp_expires_at, :otp_attempts_left)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        email = VALUES(email),
        phone = VALUES(phone),
        membership_no = VALUES(membership_no),
        otp = VALUES(otp),
        otp_expires_at = VALUES(otp_expires_at),
        otp_attempts_left = VALUES(otp_attempts_left)
      `,
      {
        name,
        email: email.toLowerCase(),
        phone: mobile,
        membership_no: membershipNo,
        otp,
        otp_expires_at: otpExpiresAt,
        otp_attempts_left: attemptsLeft,
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
