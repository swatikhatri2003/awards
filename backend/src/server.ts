import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import * as XLSX from "xlsx";
import type { RowDataPacket } from "mysql2/promise";
import { z } from "zod";
import { getDb } from "./db";
import { hashPassword, verifyPassword, signAdminToken, verifyAdminToken } from "./adminAuth";
import { sendOtpEmail } from "./mailer";
import { sendWhatsappOtp } from "./whatsapp";
import { getPresignedUploadUrl, isPresignConfigured } from "./presignClient";
import { multerHandler } from "./multerHandler";

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
const eventUploadDir = path.join(uploadRoot, "event");
const adminUploadDir = path.join(uploadRoot, "admin");
fs.mkdirSync(nomineeUploadDir, { recursive: true });
fs.mkdirSync(eventUploadDir, { recursive: true });
fs.mkdirSync(adminUploadDir, { recursive: true });

/** Persist only the file name in MySQL (never full paths or `/uploads/...` segments). */
function storedUploadBasename(raw: string | null | undefined): string {
  if (raw == null) return "";
  const t = String(raw).trim();
  if (!t) return "";
  const normalized = t.replace(/\\/g, "/");
  return path.posix.basename(normalized);
}

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

const eventUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, eventUploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || "").slice(0, 20) || ".jpg";
      const safeExt = /^[.\w-]+$/.test(ext) ? ext : ".jpg";
      const name = `${crypto.randomUUID()}${safeExt}`;
      cb(null, name);
    },
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb: multer.FileFilterCallback) => {
    const ok = /^image\//i.test(file.mimetype || "");
    if (!ok) return cb(new Error("ONLY_IMAGES_ALLOWED"));
    return cb(null, true);
  },
});

app.post("/api/uploads/nominee-photo", multerHandler(upload.single("photo")), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ ok: false, error: "NO_FILE" });
  return res.json({
    ok: true,
    filename: file.filename,
  });
});

app.post("/api/uploads/event-photo", multerHandler(eventUpload.single("photo")), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ ok: false, error: "NO_FILE" });
  return res.json({
    ok: true,
    filename: file.filename,
  });
});

const adminLogoUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, adminUploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || "").slice(0, 20) || ".jpg";
      const safeExt = /^[.\w-]+$/.test(ext) ? ext : ".jpg";
      cb(null, `${crypto.randomUUID()}${safeExt}`);
    },
  }),
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (_req, file, cb: multer.FileFilterCallback) => {
    const ok = /^image\//i.test(file.mimetype || "");
    if (!ok) return cb(new Error("ONLY_IMAGES_ALLOWED"));
    return cb(null, true);
  },
});

const allowedMobilesUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb: multer.FileFilterCallback) => {
    const name = (file.originalname || "").toLowerCase();
    const ok =
      name.endsWith(".xlsx") ||
      name.endsWith(".xls") ||
      name.endsWith(".csv") ||
      /spreadsheet|excel|csv/i.test(file.mimetype || "");
    if (!ok) return cb(new Error("ONLY_SPREADSHEET_ALLOWED"));
    return cb(null, true);
  },
});

function normalizeMobileDigits(raw: string): string | null {
  const digits = String(raw).replace(/\D/g, "");
  if (!digits) return null;
  const mobile = digits.length > 10 ? digits.slice(-10) : digits;
  if (mobile.length < 10) return null;
  return mobile;
}

function extractMobilesFromRows(
  rows: (string | number | null | undefined)[][],
): { mobile: string; note?: string }[] {
  const out: { mobile: string; note?: string }[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row?.length) continue;
    const firstStr = String(row[0] ?? "").trim().toLowerCase();
    if (i === 0 && (firstStr === "mobile" || firstStr === "phone" || firstStr === "number")) continue;
    const mobile = normalizeMobileDigits(String(row[0] ?? ""));
    if (!mobile || seen.has(mobile)) continue;
    seen.add(mobile);
    const noteRaw = row[1];
    const note =
      noteRaw != null && String(noteRaw).trim() ? String(noteRaw).trim().slice(0, 255) : undefined;
    out.push(note ? { mobile, note } : { mobile });
  }
  return out;
}

function parseSpreadsheetMobiles(buffer: Buffer, originalName: string): { mobile: string; note?: string }[] {
  const lower = (originalName || "").toLowerCase();
  if (lower.endsWith(".csv")) {
    const text = buffer.toString("utf8");
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    const rows = lines.map((line) => line.split(/[,;\t]/).map((c) => c.trim()));
    return extractMobilesFromRows(rows);
  }
  const wb = XLSX.read(buffer, { type: "buffer" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  if (!sheet) return [];
  const rows = XLSX.utils.sheet_to_json<(string | number | null | undefined)[]>(sheet, { header: 1 });
  return extractMobilesFromRows(rows);
}

app.post("/api/uploads/admin-logo", multerHandler(adminLogoUpload.single("photo")), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ ok: false, error: "NO_FILE" });
  return res.json({ ok: true, filename: file.filename });
});

app.post("/api/uploads/presign-url", async (req, res) => {
  const filename = String(req.body?.filename || "").trim();
  const fltyp = String(req.body?.fltyp || "awards").trim() || "awards";
  if (!filename) return res.status(400).json({ ok: false, success: false, error: "NO_FILENAME" });
  if (!isPresignConfigured()) {
    return res.status(503).json({ ok: false, success: false, error: "PRESIGN_NOT_CONFIGURED" });
  }
  try {
    const data = await getPresignedUploadUrl(filename, fltyp);
    return res.json({ ok: true, success: true, data });
  } catch (e) {
    const message = e instanceof Error ? e.message : "PRESIGN_FAILED";
    console.error("presign-url error", e);
    return res.status(502).json({ ok: false, success: false, error: "PRESIGN_FAILED", message });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

function getBearerToken(req: express.Request): string | undefined {
  const h = req.headers.authorization || "";
  const m = /^Bearer\s+(.+)$/i.exec(h);
  return m?.[1]?.trim();
}

type AdminProfile = {
  adminId: number;
  email: string;
  name: string;
  organisation_name: string;
  mobile: string;
  logo: string | null;
  full_address: string;
};

async function loadAdminFromRequest(req: express.Request): Promise<AdminProfile | null> {
  const token = getBearerToken(req);
  const payload = verifyAdminToken(token);
  if (!payload) return null;
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT admin_id, email, name, organisation_name, mobile, logo, full_address
     FROM event_admin WHERE admin_id = :id LIMIT 1`,
    { id: payload.adminId },
  );
  const row = rows[0];
  if (!row) return null;
  if (String(row.email).toLowerCase() !== String(payload.email).toLowerCase()) return null;
  return {
    adminId: Number(row.admin_id),
    email: String(row.email),
    name: String(row.name ?? ""),
    organisation_name: String(row.organisation_name ?? ""),
    mobile: String(row.mobile ?? ""),
    logo: row.logo != null && String(row.logo).trim() ? String(row.logo) : null,
    full_address: String(row.full_address ?? ""),
  };
}

async function assertAdminOwnsEvent(adminId: number, eventId: number): Promise<boolean> {
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT event_id FROM events WHERE event_id = :eid AND admin_id = :aid LIMIT 1`,
    { eid: eventId, aid: adminId },
  );
  return !!rows[0];
}

function parseRequiredEventIdQuery(req: express.Request): { ok: true; eventId: number } | { ok: false } {
  const parsed = eventIdQuerySchema.safeParse(req.query);
  if (!parsed.success) return { ok: false };
  const id = parsed.data.eventId;
  if (!id) return { ok: false };
  return { ok: true, eventId: id };
}

async function deleteVotesForCategoryIds(categoryIds: number[]) {
  const ids = categoryIds.filter((id) => Number.isFinite(id) && id > 0);
  if (!ids.length) return;
  const placeholders = ids.map((_, i) => `:c${i}`).join(", ");
  const params: Record<string, number> = {};
  ids.forEach((id, i) => {
    params[`c${i}`] = id;
  });
  await db.execute(`DELETE FROM votes WHERE category_id IN (${placeholders})`, params as any);
  await db.execute(
    `DELETE uv FROM user_votes uv
     INNER JOIN nominee n ON n.nominee_id = uv.nominee_id
     WHERE n.category_id IN (${placeholders})`,
    params as any,
  );
}

/** Records user → nominee vote in user_votes (idempotent). */
async function recordUserVote(userId: number, nomineeId: number): Promise<void> {
  await db.execute(
    `INSERT IGNORE INTO user_votes (user_id, nominee_id) VALUES (:user_id, :nominee_id)`,
    { user_id: userId, nominee_id: nomineeId },
  );
}

/** Picks the nominee with the most votes in a category (ties → lowest nominee_id). */
async function pickTopVotedNomineeId(categoryId: number): Promise<number | null> {
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT nominee_id
     FROM nominee
     WHERE category_id = :category_id
     ORDER BY COALESCE(votes, 0) DESC, nominee_id ASC
     LIMIT 1`,
    { category_id: categoryId },
  );
  const id = rows[0] ? Number(rows[0].nominee_id) : NaN;
  return Number.isFinite(id) && id > 0 ? id : null;
}

/** Sets category.winner_nominee_id from current vote counts. */
async function applyCategoryWinnerFromVotes(categoryId: number): Promise<number | null> {
  const winnerId = await pickTopVotedNomineeId(categoryId);
  await db.execute(
    `UPDATE category SET winner_nominee_id = :winner_nominee_id WHERE category_id = :category_id`,
    { category_id: categoryId, winner_nominee_id: winnerId },
  );
  return winnerId;
}

/** Applies or clears winners for every category in an event after bulk declare/undeclare. */
async function syncEventCategoryWinners(eventId: number, declareResult: boolean): Promise<void> {
  const [catRows] = await db.execute<RowDataPacket[]>(
    `SELECT category_id FROM category WHERE event_id = :event_id`,
    { event_id: eventId },
  );
  for (const row of catRows) {
    const categoryId = Number(row.category_id);
    if (!Number.isFinite(categoryId) || categoryId <= 0) continue;
    if (declareResult) {
      await applyCategoryWinnerFromVotes(categoryId);
    } else {
      await db.execute(
        `UPDATE category SET winner_nominee_id = NULL WHERE category_id = :category_id`,
        { category_id: categoryId },
      );
    }
  }
}

async function cleanupEventRelatedData(eventId: number) {
  const [catRows] = await db.execute<RowDataPacket[]>(
    `SELECT category_id FROM category WHERE event_id = :event_id`,
    { event_id: eventId },
  );
  const categoryIds = catRows
    .map((r) => Number(r.category_id))
    .filter((id) => Number.isFinite(id) && id > 0);
  if (categoryIds.length) {
    await deleteVotesForCategoryIds(categoryIds);
    await db.execute(`DELETE FROM category WHERE event_id = :event_id`, { event_id: eventId });
  }
  try {
    await db.execute(`DELETE FROM allowed_mobiles WHERE event_id = :event_id`, { event_id: eventId });
  } catch {
    /* optional column on older databases */
  }
  await db.execute(`UPDATE users SET event_id = NULL WHERE event_id = :event_id`, { event_id: eventId });
}

async function ensureNomineeInEvent(nomineeId: number, eventId: number) {
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT nominee_id, category_id FROM nominee WHERE nominee_id = :nominee_id LIMIT 1`,
    { nominee_id: nomineeId },
  );
  const existing = rows[0];
  if (!existing) return null;
  const cat = await ensureCategoryInEvent(Number(existing.category_id), eventId);
  return cat ? existing : null;
}

const adminSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

const adminForgotSchema = z.object({
  email: z.string().email(),
});

const adminResetSchema = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^\d{6}$/),
  newPassword: z.string().min(8).max(72),
});

const adminRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
  name: z.string().trim().min(1, "Name is required.").max(75),
  organisation_name: z.string().trim().min(1, "Organisation name is required.").max(100),
  mobile: z
    .string()
    .trim()
    .regex(/^\d{10,12}$/, "Mobile must be 10–12 digits (numbers only)."),
  logo: z.string().trim().max(50).optional().nullable(),
  full_address: z.string().trim().min(1, "Address is required.").max(300),
});

const adminVerifyRegistrationSchema = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^\d{6}$/),
});

const adminProfilePatchSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required.").max(75),
    organisation_name: z.string().trim().min(1, "Organisation name is required.").max(100),
    mobile: z
      .string()
      .trim()
      .regex(/^\d{10,12}$/, "Mobile must be 10–12 digits (numbers only)."),
    logo: z.string().trim().max(50).optional().nullable(),
    full_address: z.string().trim().min(1, "Address is required.").max(300),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, { message: "No fields to update." });

function adminRegistrationOtp(): { otp: string; expires: Date } {
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expires = new Date(Date.now() + 10 * 60 * 1000);
  return { otp, expires };
}

const adminEventFieldsSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(500).optional(),
  image: z.string().trim().max(150).optional(),
  /** Default off (0): public registration; 1 = invite-only (`allowed_mobiles`). */
  is_private: z.union([z.boolean(), z.number().int().min(0).max(1)]).optional(),
  /** ISO datetime strings; both empty = no voting window restriction. */
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  /** 1 = declare results for all categories in this event. */
  declare_result: z.coerce.number().int().min(0).max(1).optional(),
  /** 1 = event is live (public detail, voting, home listing). */
  is_live: z.coerce.number().int().min(0).max(1).optional(),
});

function refineEventVotingWindow(
  data: { start_time?: string; end_time?: string },
  ctx: z.RefinementCtx,
) {
  const s = (data.start_time ?? "").trim();
  const e = (data.end_time ?? "").trim();
  const hasS = s.length > 0;
  const hasE = e.length > 0;
  if (hasS !== hasE) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Provide both voting start and end times, or leave both empty.",
      path: ["start_time"],
    });
    return;
  }
  if (!hasS || !hasE) return;
  const ds = new Date(s);
  const de = new Date(e);
  if (Number.isNaN(ds.getTime()) || Number.isNaN(de.getTime())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid voting window datetime.",
      path: ["start_time"],
    });
  } else if (ds.getTime() >= de.getTime()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Voting end must be after start.",
      path: ["end_time"],
    });
  }
}

const adminCreateEventSchema = adminEventFieldsSchema.superRefine(refineEventVotingWindow);

const adminUpdateEventSchema = adminEventFieldsSchema
  .partial()
  .extend({
    /** Allow explicit null / empty to clear text or banner in PATCH. */
    image: z.union([z.string().trim().max(150), z.literal(""), z.null()]).optional(),
    description: z.union([z.string().trim().max(500), z.literal(""), z.null()]).optional(),
  })
  .superRefine(refineEventVotingWindow);

function coerceEventDate(v: unknown): Date | null {
  if (v == null) return null;
  if (v instanceof Date) return Number.isNaN(v.getTime()) ? null : v;
  const d = new Date(String(v));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Both `start_time` and `end_time` must be set on the row to enforce a window; otherwise voting is always allowed. */
function isWithinEventVotingWindow(start: unknown, end: unknown, now: Date): boolean {
  const sd = coerceEventDate(start);
  const ed = coerceEventDate(end);
  if (!sd || !ed) return true;
  return now.getTime() >= sd.getTime() && now.getTime() <= ed.getTime();
}

app.post("/api/admin/auth/register", async (req, res) => {
  const parsed = adminRegisterSchema.safeParse(req.body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message || "Please check all registration fields.";
    return res.status(400).json({
      ok: false,
      error: "INVALID_INPUT",
      message: msg,
    });
  }
  const email = parsed.data.email.trim().toLowerCase();
  const password = parsed.data.password;
  const name = parsed.data.name.trim();
  const organisation_name = parsed.data.organisation_name.trim();
  const mobile = parsed.data.mobile.trim();
  const full_address = parsed.data.full_address.trim();
  const logoRaw = parsed.data.logo;
  const logo =
    typeof logoRaw === "string" && logoRaw.trim() ? storedUploadBasename(logoRaw) || null : null;
  const { otp, expires } = adminRegistrationOtp();
  const pwHash = hashPassword(password);
  const profileParams = {
    name,
    organisation_name,
    mobile,
    logo,
    full_address,
  };
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT admin_id, email_verified FROM event_admin WHERE email = :email LIMIT 1`,
      { email },
    );
    const existing = rows[0];
    if (existing) {
      const verified =
        existing.email_verified === 1 ||
        existing.email_verified === true ||
        existing.email_verified === "1";
      if (verified) {
        return res.status(409).json({
          ok: false,
          error: "EMAIL_EXISTS",
          message: "An account with this email already exists. Sign in instead.",
        });
      }
      await db.execute(
        `UPDATE event_admin SET password = :pw, otp = :otp, otp_expires_at = :exp, email_verified = 0,
         name = :name, organisation_name = :organisation_name, mobile = :mobile, logo = :logo, full_address = :full_address
         WHERE email = :email`,
        { pw: pwHash, otp, exp: expires, email, ...profileParams },
      );
    } else {
      await db.execute(
        `INSERT INTO event_admin (email, password, otp, otp_expires_at, email_verified, name, organisation_name, mobile, logo, full_address)
         VALUES (:email, :pw, :otp, :exp, 0, :name, :organisation_name, :mobile, :logo, :full_address)`,
        { email, pw: pwHash, otp, exp: expires, ...profileParams },
      );
    }
    try {
      await sendOtpEmail({ to: email, otp });
    } catch (err) {
      console.warn("[Email] Admin registration OTP not sent", err);
    }
    return res.json({
      ok: true,
      message: "OTP sent to your email. Enter it to complete registration.",
    });
  } catch (e: unknown) {
    const err = e as { code?: string };
    if (err?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        ok: false,
        error: "EMAIL_EXISTS",
        message: "An account with this email already exists. Sign in instead.",
      });
    }
    console.error("admin register error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.post("/api/admin/auth/verify-registration", async (req, res) => {
  const parsed = adminVerifyRegistrationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "INVALID_INPUT",
      message: "Valid email and 6-digit OTP are required.",
    });
  }
  const email = parsed.data.email.trim().toLowerCase();
  const { otp } = parsed.data;
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT admin_id, otp AS db_otp, otp_expires_at, email_verified
       FROM event_admin WHERE email = :email LIMIT 1`,
      { email },
    );
    const row = rows[0];
    if (!row) {
      return res.status(400).json({
        ok: false,
        error: "NOT_FOUND",
        message: "No registration found for this email. Register first.",
      });
    }
    const verified =
      row.email_verified === 1 || row.email_verified === true || row.email_verified === "1";
    if (verified) {
      return res.status(400).json({
        ok: false,
        error: "ALREADY_VERIFIED",
        message: "This email is already verified. Sign in instead.",
      });
    }
    if (!row.otp_expires_at || new Date(row.otp_expires_at).getTime() < Date.now()) {
      return res.status(400).json({
        ok: false,
        error: "EXPIRED",
        message: "OTP expired. Request a new OTP from the register screen.",
      });
    }
    if (String(row.db_otp) !== otp) {
      return res.status(400).json({ ok: false, error: "INVALID_OTP", message: "Invalid OTP." });
    }
    await db.execute(
      `UPDATE event_admin SET email_verified = 1, otp = NULL, otp_expires_at = NULL WHERE email = :email`,
      { email },
    );
    const adminId = Number(row.admin_id);
    const token = signAdminToken({ adminId, email });
    const [profileRows] = await db.execute<RowDataPacket[]>(
      `SELECT admin_id, email, name, organisation_name, mobile, logo, full_address
       FROM event_admin WHERE admin_id = :id LIMIT 1`,
      { id: adminId },
    );
    const profile = profileRows[0];
    return res.json({
      ok: true,
      token,
      admin: {
        adminId,
        email,
        name: String(profile?.name ?? ""),
        organisation_name: String(profile?.organisation_name ?? ""),
        mobile: String(profile?.mobile ?? ""),
        logo: profile?.logo != null && String(profile.logo).trim() ? String(profile.logo) : null,
        full_address: String(profile?.full_address ?? ""),
      },
    });
  } catch (e) {
    console.error("admin verify-registration error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.post("/api/admin/auth/sign-in", async (req, res) => {
  const parsed = adminSignInSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT", message: "Email and password (8+ chars) are required." });
  }
  const email = parsed.data.email.trim().toLowerCase();
  const password = parsed.data.password;
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT admin_id, email, password, email_verified FROM event_admin WHERE email = :email LIMIT 1`,
      { email },
    );
    const existing = rows[0];
    if (!existing) {
      return res.status(401).json({
        ok: false,
        error: "NOT_FOUND",
        message: "No account found for this email. Register first.",
      });
    }
    const verified =
      existing.email_verified === 1 ||
      existing.email_verified === true ||
      existing.email_verified === "1" ||
      existing.email_verified == null;
    if (!verified) {
      return res.status(403).json({
        ok: false,
        error: "EMAIL_NOT_VERIFIED",
        message: "Email not verified yet. Complete registration with the OTP we sent.",
      });
    }
    if (!verifyPassword(password, String(existing.password ?? ""))) {
      return res.status(401).json({
        ok: false,
        error: "INVALID_PASSWORD",
        message: "Incorrect password for this email.",
      });
    }
    const adminId = Number(existing.admin_id);
    const token = signAdminToken({ adminId, email });
    const [profileRows] = await db.execute<RowDataPacket[]>(
      `SELECT admin_id, email, name, organisation_name, mobile, logo, full_address
       FROM event_admin WHERE admin_id = :id LIMIT 1`,
      { id: adminId },
    );
    const profile = profileRows[0];
    return res.json({
      ok: true,
      token,
      admin: {
        adminId,
        email,
        name: String(profile?.name ?? ""),
        organisation_name: String(profile?.organisation_name ?? ""),
        mobile: String(profile?.mobile ?? ""),
        logo: profile?.logo != null && String(profile.logo).trim() ? String(profile.logo) : null,
        full_address: String(profile?.full_address ?? ""),
      },
    });
  } catch (e) {
    console.error("admin sign-in error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.post("/api/admin/auth/forgot-password", async (req, res) => {
  const parsed = adminForgotSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT", message: "Valid email is required." });
  }
  const email = parsed.data.email.trim().toLowerCase();
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT admin_id, email FROM event_admin WHERE email = :email LIMIT 1`,
      { email },
    );
    if (!rows[0]) {
      return res.json({
        ok: true,
        message: "If an account exists for this email, an OTP has been sent.",
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    await db.execute(
      `UPDATE event_admin SET otp = :otp, otp_expires_at = :exp WHERE email = :email`,
      { otp, exp: expires, email },
    );
    try {
      await sendOtpEmail({ to: email, otp });
    } catch (err) {
      console.warn("[Email] Admin reset OTP not sent", err);
    }
    return res.json({
      ok: true,
      message: "If an account exists for this email, an OTP has been sent.",
    });
  } catch (e) {
    console.error("admin forgot-password error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.post("/api/admin/auth/reset-password", async (req, res) => {
  const parsed = adminResetSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "INVALID_INPUT",
      message: "Email, 6-digit OTP, and new password (8+ chars) are required.",
    });
  }
  const email = parsed.data.email.trim().toLowerCase();
  const { otp, newPassword } = parsed.data;
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT admin_id, otp AS db_otp, otp_expires_at FROM event_admin WHERE email = :email LIMIT 1`,
      { email },
    );
    const row = rows[0];
    if (!row) {
      return res.status(400).json({ ok: false, error: "NOT_FOUND", message: "No account found for this email." });
    }
    if (!row.otp_expires_at || new Date(row.otp_expires_at).getTime() < Date.now()) {
      return res.status(400).json({ ok: false, error: "EXPIRED", message: "OTP expired. Request a new one." });
    }
    if (String(row.db_otp) !== otp) {
      return res.status(400).json({ ok: false, error: "INVALID_OTP", message: "Invalid OTP." });
    }
    const pwHash = hashPassword(newPassword);
    await db.execute(
      `UPDATE event_admin SET password = :pw, otp = NULL, otp_expires_at = NULL WHERE email = :email`,
      { pw: pwHash, email },
    );
    const adminId = Number(row.admin_id);
    const token = signAdminToken({ adminId, email });
    const [profileRows] = await db.execute<RowDataPacket[]>(
      `SELECT admin_id, email, name, organisation_name, mobile, logo, full_address
       FROM event_admin WHERE admin_id = :id LIMIT 1`,
      { id: adminId },
    );
    const profile = profileRows[0];
    return res.json({
      ok: true,
      token,
      admin: {
        adminId,
        email,
        name: String(profile?.name ?? ""),
        organisation_name: String(profile?.organisation_name ?? ""),
        mobile: String(profile?.mobile ?? ""),
        logo: profile?.logo != null && String(profile.logo).trim() ? String(profile.logo) : null,
        full_address: String(profile?.full_address ?? ""),
      },
    });
  } catch (e) {
    console.error("admin reset-password error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.get("/api/admin/me", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  return res.json({ ok: true, admin });
});

app.patch("/api/admin/me", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  const parsed = adminProfilePatchSchema.safeParse(req.body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message || "Invalid input.";
    return res.status(400).json({ ok: false, error: "INVALID_INPUT", message: msg });
  }
  const patch = parsed.data;
  try {
    const logoStored =
      patch.logo === undefined
        ? undefined
        : patch.logo && String(patch.logo).trim()
          ? storedUploadBasename(String(patch.logo)) || null
          : null;
    await db.execute(
      `UPDATE event_admin SET
         name = COALESCE(:name, name),
         organisation_name = COALESCE(:organisation_name, organisation_name),
         mobile = COALESCE(:mobile, mobile),
         logo = CASE WHEN :logo_set = 1 THEN :logo ELSE logo END,
         full_address = COALESCE(:full_address, full_address)
       WHERE admin_id = :id`,
      {
        id: admin.adminId,
        name: patch.name ?? null,
        organisation_name: patch.organisation_name ?? null,
        mobile: patch.mobile ?? null,
        logo: logoStored ?? null,
        logo_set: patch.logo !== undefined ? 1 : 0,
        full_address: patch.full_address ?? null,
      },
    );
    const updated = await loadAdminFromRequest(req);
    if (!updated) return res.status(500).json({ ok: false, error: "DB_ERROR" });
    return res.json({ ok: true, admin: updated });
  } catch (e) {
    console.error("admin profile patch error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.get("/api/admin/events", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT event_id, title, description, image, admin_id, is_private, start_time, end_time,
              COALESCE(declare_result, 0) AS declare_result,
              COALESCE(is_live, 0) AS is_live
       FROM events
       WHERE admin_id = :aid
       ORDER BY event_id DESC`,
      { aid: admin.adminId },
    );
    return res.json({ ok: true, events: rows });
  } catch (e) {
    console.error("admin list events error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.post("/api/admin/events", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  const parsed = adminCreateEventSchema.safeParse(req.body);
  if (!parsed.success) {
    const msg =
      parsed.error.issues[0]?.message ||
      "Title is required (max 200 chars).";
    return res.status(400).json({
      ok: false,
      error: "INVALID_INPUT",
      message: msg,
    });
  }
  try {
    const ip = parsed.data.is_private;
    const isPrivate =
      ip === true || ip === 1 ? 1 : 0;
    const startTrim = (parsed.data.start_time ?? "").trim();
    const endTrim = (parsed.data.end_time ?? "").trim();
    const startSql = startTrim ? new Date(startTrim) : null;
    const endSql = endTrim ? new Date(endTrim) : null;

    const imageRaw = parsed.data.image;
    const imageStored =
      typeof imageRaw === "string" && imageRaw.trim()
        ? storedUploadBasename(imageRaw) || null
        : null;

    const [result] = await db.execute(
      `INSERT INTO events (title, description, image, admin_id, is_private, start_time, end_time)
       VALUES (:title, :description, :image, :admin_id, :is_private, :start_time, :end_time)`,
      {
        title: parsed.data.title,
        description: parsed.data.description ?? null,
        image: imageStored,
        admin_id: admin.adminId,
        is_private: isPrivate,
        start_time: startSql,
        end_time: endSql,
      },
    );
    // @ts-expect-error mysql2
    const eventId = Number(result?.insertId ?? 0);
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT event_id, title, description, image, admin_id, is_private, start_time, end_time,
              COALESCE(declare_result, 0) AS declare_result,
              COALESCE(is_live, 0) AS is_live
       FROM events WHERE event_id = :id LIMIT 1`,
      { id: eventId },
    );
    return res.json({ ok: true, event: rows[0] ?? null });
  } catch (e) {
    console.error("admin create event error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.patch("/api/admin/events/:eventId", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  const eventId = Number(req.params.eventId);
  if (!Number.isFinite(eventId) || eventId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
  }
  const parsed = adminUpdateEventSchema.safeParse(req.body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message || "Invalid input.";
    return res.status(400).json({ ok: false, error: "INVALID_INPUT", message: msg });
  }
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }

    const d = parsed.data;
    const updates: string[] = [];
    const params: Record<string, unknown> = { event_id: eventId };

    if (typeof d.title === "string") {
      updates.push("title = :title");
      params.title = d.title;
    }
    if (Object.prototype.hasOwnProperty.call(req.body, "description")) {
      const desc = d.description;
      updates.push("description = :description");
      params.description =
        desc == null ? null : typeof desc === "string" && desc.trim() ? desc.trim() : null;
    }
    if (Object.prototype.hasOwnProperty.call(req.body, "image")) {
      const raw = d.image;
      const imageStored =
        raw == null || (typeof raw === "string" && !raw.trim())
          ? null
          : storedUploadBasename(String(raw)) || null;
      updates.push("image = :image");
      params.image = imageStored;
    }
    if (d.is_private !== undefined) {
      const ip = d.is_private;
      updates.push("is_private = :is_private");
      params.is_private = ip === true || ip === 1 ? 1 : 0;
    }
    if (
      Object.prototype.hasOwnProperty.call(req.body, "start_time") ||
      Object.prototype.hasOwnProperty.call(req.body, "end_time")
    ) {
      const startTrim = (d.start_time ?? "").trim();
      const endTrim = (d.end_time ?? "").trim();
      updates.push("start_time = :start_time", "end_time = :end_time");
      params.start_time = startTrim ? new Date(startTrim) : null;
      params.end_time = endTrim ? new Date(endTrim) : null;
    }
    if (d.declare_result !== undefined) {
      updates.push("declare_result = :declare_result");
      params.declare_result = d.declare_result ? 1 : 0;
    }
    if (d.is_live !== undefined) {
      updates.push("is_live = :is_live");
      params.is_live = d.is_live ? 1 : 0;
    }

    if (!updates.length) {
      return res.status(400).json({ ok: false, error: "NO_CHANGES" });
    }

    await db.execute(`UPDATE events SET ${updates.join(", ")} WHERE event_id = :event_id`, params as any);
    if (d.declare_result !== undefined) {
      await db.execute(
        `UPDATE category SET declare_result = :declare_result WHERE event_id = :event_id`,
        { declare_result: d.declare_result ? 1 : 0, event_id: eventId },
      );
      await syncEventCategoryWinners(eventId, Boolean(d.declare_result));
    }
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT event_id, title, description, image, admin_id, is_private, start_time, end_time,
              COALESCE(declare_result, 0) AS declare_result,
              COALESCE(is_live, 0) AS is_live
       FROM events WHERE event_id = :id LIMIT 1`,
      { id: eventId },
    );
    return res.json({ ok: true, event: rows[0] ?? null });
  } catch (e) {
    console.error("admin update event error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.delete("/api/admin/events/:eventId", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  const eventId = Number(req.params.eventId);
  if (!Number.isFinite(eventId) || eventId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
  }
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }
    await cleanupEventRelatedData(eventId);
    await db.execute(`DELETE FROM events WHERE event_id = :event_id AND admin_id = :admin_id`, {
      event_id: eventId,
      admin_id: admin.adminId,
    });
    return res.json({ ok: true, deleted: true, event_id: eventId });
  } catch (e) {
    console.error("admin delete event error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

const adminAllowedMobileSchema = z.object({
  mobile: z.string().trim().min(1).max(20),
  note: z.string().trim().max(255).optional().nullable(),
});

const adminUpdateAllowedMobileSchema = z.object({
  mobile: z.string().trim().min(1).max(20).optional(),
  note: z.string().trim().max(255).optional().nullable(),
});

const adminBulkAllowedMobilesSchema = z.object({
  entries: z
    .array(
      z.object({
        mobile: z.string().trim().min(1).max(20),
        note: z.string().trim().max(255).optional().nullable(),
      }),
    )
    .min(1)
    .max(5000),
});

async function ensureAllowedMobileInEvent(
  allowedId: number,
  eventId: number,
): Promise<RowDataPacket | null> {
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT id, mobile, note, created_at, event_id
     FROM allowed_mobiles
     WHERE id = :id AND event_id = :event_id
     LIMIT 1`,
    { id: allowedId, event_id: eventId },
  );
  return rows[0] ?? null;
}

async function insertAllowedMobilesForEvent(
  eventId: number,
  entries: { mobile: string; note?: string | null }[],
): Promise<{ inserted: number; skipped: number; invalid: number }> {
  let inserted = 0;
  let skipped = 0;
  let invalid = 0;
  const seen = new Set<string>();
  for (const entry of entries) {
    const mobile = normalizeMobileDigits(entry.mobile);
    if (!mobile) {
      invalid += 1;
      continue;
    }
    if (seen.has(mobile)) {
      skipped += 1;
      continue;
    }
    seen.add(mobile);
    const note =
      entry.note == null || !String(entry.note).trim()
        ? null
        : String(entry.note).trim().slice(0, 255);
    try {
      const [result] = await db.execute(
        `INSERT INTO allowed_mobiles (mobile, note, event_id) VALUES (:mobile, :note, :event_id)`,
        { mobile, note, event_id: eventId },
      );
      // @ts-expect-error mysql2
      const id = Number(result?.insertId ?? 0);
      if (id > 0) inserted += 1;
      else skipped += 1;
    } catch (e: unknown) {
      const code = (e as { code?: string } | null)?.code;
      if (code === "ER_DUP_ENTRY") skipped += 1;
      else throw e;
    }
  }
  return { inserted, skipped, invalid };
}

app.get("/api/admin/events/:eventId/allowed-mobiles", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  const eventId = Number(req.params.eventId);
  if (!Number.isFinite(eventId) || eventId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
  }
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id, mobile, note, created_at, event_id
       FROM allowed_mobiles
       WHERE event_id = :event_id
       ORDER BY id DESC`,
      { event_id: eventId },
    );
    return res.json({ ok: true, allowed_mobiles: rows });
  } catch (e) {
    console.error("admin list allowed mobiles error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.post("/api/admin/events/:eventId/allowed-mobiles", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  const eventId = Number(req.params.eventId);
  if (!Number.isFinite(eventId) || eventId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
  }
  const parsed = adminAllowedMobileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT", message: "Valid mobile is required." });
  }
  const mobile = normalizeMobileDigits(parsed.data.mobile);
  if (!mobile) {
    return res.status(400).json({
      ok: false,
      error: "INVALID_MOBILE",
      message: "Enter a valid 10-digit mobile number.",
    });
  }
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }
    const note =
      parsed.data.note == null || !String(parsed.data.note).trim()
        ? null
        : String(parsed.data.note).trim().slice(0, 255);
    const [result] = await db.execute(
      `INSERT INTO allowed_mobiles (mobile, note, event_id) VALUES (:mobile, :note, :event_id)`,
      { mobile, note, event_id: eventId },
    );
    // @ts-expect-error mysql2
    const id = Number(result?.insertId ?? 0);
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id, mobile, note, created_at, event_id FROM allowed_mobiles WHERE id = :id LIMIT 1`,
      { id },
    );
    return res.json({ ok: true, allowed_mobile: rows[0] ?? null });
  } catch (e: unknown) {
    const code = (e as { code?: string } | null)?.code;
    if (code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        ok: false,
        error: "MOBILE_ALREADY_ALLOWED",
        message: "This mobile is already on the allowlist for this event.",
      });
    }
    console.error("admin create allowed mobile error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.post("/api/admin/events/:eventId/allowed-mobiles/bulk", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  const eventId = Number(req.params.eventId);
  if (!Number.isFinite(eventId) || eventId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
  }
  const parsed = adminBulkAllowedMobilesSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "INVALID_INPUT",
      message: "Provide at least one mobile in entries.",
    });
  }
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }
    const summary = await insertAllowedMobilesForEvent(eventId, parsed.data.entries);
    return res.json({ ok: true, ...summary });
  } catch (e) {
    console.error("admin bulk allowed mobiles error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.post(
  "/api/admin/events/:eventId/allowed-mobiles/upload",
  multerHandler(allowedMobilesUpload.single("file")),
  async (req, res) => {
    const admin = await loadAdminFromRequest(req);
    if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
    const eventId = Number(req.params.eventId);
    if (!Number.isFinite(eventId) || eventId <= 0) {
      return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
    }
    const file = req.file;
    if (!file?.buffer?.length) {
      return res.status(400).json({
        ok: false,
        error: "FILE_REQUIRED",
        message: "Upload an Excel (.xlsx/.xls) or CSV file.",
      });
    }
    try {
      if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
        return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
      }
      const entries = parseSpreadsheetMobiles(file.buffer, file.originalname || "");
      if (!entries.length) {
        return res.status(400).json({
          ok: false,
          error: "NO_VALID_MOBILES",
          message: "No valid mobile numbers found. Put mobiles in the first column (optional note in second).",
        });
      }
      const summary = await insertAllowedMobilesForEvent(eventId, entries);
      return res.json({ ok: true, parsed: entries.length, ...summary });
    } catch (e) {
      console.error("admin upload allowed mobiles error", e);
      return res.status(500).json({ ok: false, error: "DB_ERROR" });
    }
  },
);

app.patch("/api/admin/events/:eventId/allowed-mobiles/:allowedId", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  const eventId = Number(req.params.eventId);
  const allowedId = Number(req.params.allowedId);
  if (!Number.isFinite(eventId) || eventId <= 0 || !Number.isFinite(allowedId) || allowedId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_ID" });
  }
  const parsed = adminUpdateAllowedMobileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }
    const existing = await ensureAllowedMobileInEvent(allowedId, eventId);
    if (!existing) {
      return res.status(404).json({ ok: false, error: "ALLOWED_MOBILE_NOT_FOUND" });
    }
    const updates: string[] = [];
    const params: Record<string, unknown> = { id: allowedId, event_id: eventId };
    if (typeof parsed.data.mobile === "string") {
      const mobile = normalizeMobileDigits(parsed.data.mobile);
      if (!mobile) {
        return res.status(400).json({
          ok: false,
          error: "INVALID_MOBILE",
          message: "Enter a valid 10-digit mobile number.",
        });
      }
      updates.push("mobile = :mobile");
      params.mobile = mobile;
    }
    if (Object.prototype.hasOwnProperty.call(parsed.data, "note")) {
      const note = parsed.data.note;
      updates.push("note = :note");
      params.note =
        note == null || !String(note).trim() ? null : String(note).trim().slice(0, 255);
    }
    if (!updates.length) {
      return res.status(400).json({ ok: false, error: "NO_CHANGES" });
    }
    await db.execute(
      `UPDATE allowed_mobiles SET ${updates.join(", ")} WHERE id = :id AND event_id = :event_id`,
      params as any,
    );
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id, mobile, note, created_at, event_id FROM allowed_mobiles WHERE id = :id LIMIT 1`,
      { id: allowedId },
    );
    return res.json({ ok: true, allowed_mobile: rows[0] ?? null });
  } catch (e: unknown) {
    const code = (e as { code?: string } | null)?.code;
    if (code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        ok: false,
        error: "MOBILE_ALREADY_ALLOWED",
        message: "This mobile is already on the allowlist for this event.",
      });
    }
    console.error("admin update allowed mobile error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.delete("/api/admin/events/:eventId/allowed-mobiles/:allowedId", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  const eventId = Number(req.params.eventId);
  const allowedId = Number(req.params.allowedId);
  if (!Number.isFinite(eventId) || eventId <= 0 || !Number.isFinite(allowedId) || allowedId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_ID" });
  }
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }
    const existing = await ensureAllowedMobileInEvent(allowedId, eventId);
    if (!existing) {
      return res.status(404).json({ ok: false, error: "ALLOWED_MOBILE_NOT_FOUND" });
    }
    await db.execute(`DELETE FROM allowed_mobiles WHERE id = :id AND event_id = :event_id`, {
      id: allowedId,
      event_id: eventId,
    });
    return res.json({ ok: true, deleted: true, id: allowedId });
  } catch (e) {
    console.error("admin delete allowed mobile error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.get("/api/events/:eventId", async (req, res) => {
  const eventId = Number(req.params.eventId);
  if (!Number.isFinite(eventId) || eventId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
  }
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT event_id, title, description, image, is_private, start_time, end_time,
              COALESCE(declare_result, 0) AS declare_result,
              COALESCE(is_live, 0) AS is_live
       FROM events
       WHERE event_id = :id
       LIMIT 1`,
      { id: eventId },
    );
    const ev = rows[0];
    if (!ev) return res.status(404).json({ ok: false, error: "EVENT_NOT_FOUND" });
    return res.json({ ok: true, event: ev });
  } catch (e) {
    console.error("public event fetch error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

/** Open directory: events that allow open registration (not private / invite-only). */
app.get("/api/public/events", async (_req, res) => {
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT event_id, title, description, image, COALESCE(is_live, 0) AS is_live
       FROM events
       WHERE IFNULL(is_private, 0) = 0
       ORDER BY event_id DESC`,
    );
    return res.json({ ok: true, events: rows });
  } catch (e) {
    console.error("public events list error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

const eventIdQuerySchema = z.object({
  eventId: z.coerce.number().int().positive().optional(),
});

function eventCategoryWhere(eventId?: number, tableAlias?: string) {
  if (!eventId) return { whereSql: "", params: {} as any };
  const col = tableAlias ? `${tableAlias}.event_id` : "event_id";
  return { whereSql: `WHERE ${col} = :event_id`, params: { event_id: eventId } as any };
}

async function eventIsLive(eventId: number): Promise<boolean> {
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT COALESCE(is_live, 0) AS is_live FROM events WHERE event_id = :event_id LIMIT 1`,
    { event_id: eventId },
  );
  return Number(rows[0]?.is_live) === 1;
}

app.get("/api/categories", async (req, res) => {
  const parsedQuery = eventIdQuerySchema.safeParse(req.query);
  if (!parsedQuery.success || parsedQuery.data.eventId === undefined) {
    return res.status(400).json({
      ok: false,
      error: "INVALID_EVENT_ID",
      message: "Query parameter eventId is required.",
    });
  }
  const eventId = parsedQuery.data.eventId;
  try {
    const { whereSql, params } = eventCategoryWhere(eventId);
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT category_id, name, winner_nominee_id, event_id,
              COALESCE(show_nominee, 0) AS show_nominee,
              COALESCE(declare_result, 0) AS declare_result
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
  if (!parsedQuery.success || parsedQuery.data.eventId === undefined) {
    return res.status(400).json({
      ok: false,
      error: "INVALID_EVENT_ID",
      message: "Query parameter eventId is required.",
    });
  }
  const eventId = parsedQuery.data.eventId;
  try {
    const admin = await loadAdminFromRequest(req);
    const adminView =
      !!admin && (await assertAdminOwnsEvent(admin.adminId, eventId));
    const { whereSql, params } = eventCategoryWhere(eventId, "c");
    const approvalSql = adminView ? "" : " AND COALESCE(n.is_approved, 0) = 1";
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT n.nominee_id, n.photo, n.name, n.description, n.category_id, n.votes,
              COALESCE(n.is_approved, 0) AS is_approved
       FROM nominee n
       INNER JOIN category c ON c.category_id = n.category_id
       ${whereSql}${approvalSql}
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
      `SELECT nominee_id, photo, name, description, category_id, votes,
              COALESCE(is_approved, 0) AS is_approved
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
  eventId: z.coerce.number().int().positive(),
});

const adminUpdateCategorySchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  winner_nominee_id: z.coerce.number().int().positive().nullable().optional(),
  show_nominee: z.coerce.number().int().min(0).max(1).optional(),
  declare_result: z.coerce.number().int().min(0).max(1).optional(),
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
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED", message: "Sign in required." });
  const parsed = adminCreateCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT", message: "Name and eventId are required." });
  }
  const eventId = parsed.data.eventId;
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }
    const [result] = await db.execute(
      `INSERT INTO category (name, winner_nominee_id, event_id)
       VALUES (:name, NULL, :event_id)`,
      { name: parsed.data.name, event_id: eventId },
    );
    // @ts-expect-error mysql2 result shape varies by config
    const id = Number(result?.insertId ?? 0);
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT category_id, name, winner_nominee_id,
              COALESCE(show_nominee, 0) AS show_nominee,
              COALESCE(declare_result, 0) AS declare_result
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
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED", message: "Sign in required." });
  const categoryId = Number(req.params.categoryId);
  if (!Number.isFinite(categoryId) || categoryId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_CATEGORY_ID" });
  }
  const parsed = adminUpdateCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }
  const eventParsed = parseRequiredEventIdQuery(req);
  if (!eventParsed.ok) {
    return res.status(400).json({
      ok: false,
      error: "INVALID_EVENT_ID",
      message: "Query parameter eventId is required for admin updates.",
    });
  }
  const eventId = eventParsed.eventId;
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }
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
    if (parsed.data.show_nominee !== undefined) {
      updates.push("show_nominee = :show_nominee");
      params.show_nominee = parsed.data.show_nominee ? 1 : 0;
    }
    if (parsed.data.declare_result !== undefined) {
      updates.push("declare_result = :declare_result");
      params.declare_result = parsed.data.declare_result ? 1 : 0;
    }
    if (!updates.length) {
      return res.status(400).json({ ok: false, error: "NO_CHANGES" });
    }

    await db.execute(`UPDATE category SET ${updates.join(", ")} WHERE category_id = :category_id`, params as any);
    if (parsed.data.declare_result !== undefined) {
      if (parsed.data.declare_result) {
        await applyCategoryWinnerFromVotes(categoryId);
      } else {
        await db.execute(
          `UPDATE category SET winner_nominee_id = NULL WHERE category_id = :category_id`,
          { category_id: categoryId },
        );
        await db.execute(`UPDATE events SET declare_result = 0 WHERE event_id = :event_id`, { event_id: eventId });
      }
    }
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT category_id, name, winner_nominee_id,
              COALESCE(show_nominee, 0) AS show_nominee,
              COALESCE(declare_result, 0) AS declare_result
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

app.delete("/api/admin/categories/:categoryId", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED", message: "Sign in required." });
  const categoryId = Number(req.params.categoryId);
  if (!Number.isFinite(categoryId) || categoryId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_CATEGORY_ID" });
  }
  const eventParsed = parseRequiredEventIdQuery(req);
  if (!eventParsed.ok) {
    return res.status(400).json({
      ok: false,
      error: "INVALID_EVENT_ID",
      message: "Query parameter eventId is required.",
    });
  }
  const eventId = eventParsed.eventId;
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }
    const found = await ensureCategoryInEvent(categoryId, eventId);
    if (!found) return res.status(404).json({ ok: false, error: "CATEGORY_NOT_FOUND" });

    await deleteVotesForCategoryIds([categoryId]);
    await db.execute(`DELETE FROM category WHERE category_id = :category_id`, { category_id: categoryId });
    return res.json({ ok: true, deleted: true, category_id: categoryId });
  } catch (e) {
    console.error("admin delete category db error", e);
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
  is_approved: z.coerce.number().int().min(0).max(1).optional(),
});

app.post("/api/admin/nominees", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED", message: "Sign in required." });
  const parsed = adminCreateNomineeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }
  const eventParsed = parseRequiredEventIdQuery(req);
  if (!eventParsed.ok) {
    return res.status(400).json({
      ok: false,
      error: "INVALID_EVENT_ID",
      message: "Query parameter eventId is required.",
    });
  }
  const eventId = eventParsed.eventId;
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }
    const cat = await ensureCategoryInEvent(parsed.data.category_id, eventId);
    if (!cat) return res.status(404).json({ ok: false, error: "CATEGORY_NOT_FOUND" });

    const [result] = await db.execute(
      `INSERT INTO nominee (photo, name, description, category_id, votes, is_approved)
       VALUES (:photo, :name, :description, :category_id, 0, 0)`,
      {
        photo: storedUploadBasename(parsed.data.photo ?? ""),
        name: parsed.data.name,
        description: parsed.data.description ?? null,
        category_id: parsed.data.category_id,
      },
    );
    // @ts-expect-error mysql2 result shape varies by config
    const id = Number(result?.insertId ?? 0);
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT nominee_id, photo, name, description, category_id, votes,
              COALESCE(is_approved, 0) AS is_approved
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
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED", message: "Sign in required." });
  const nomineeId = Number(req.params.nomineeId);
  if (!Number.isFinite(nomineeId) || nomineeId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_NOMINEE_ID" });
  }
  const parsed = adminUpdateNomineeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }
  const eventParsed = parseRequiredEventIdQuery(req);
  if (!eventParsed.ok) {
    return res.status(400).json({
      ok: false,
      error: "INVALID_EVENT_ID",
      message: "Query parameter eventId is required.",
    });
  }
  const eventId = eventParsed.eventId;
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }
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
      params.photo = storedUploadBasename(parsed.data.photo);
    }
    if (Object.prototype.hasOwnProperty.call(parsed.data, "description")) {
      updates.push("description = :description");
      params.description = parsed.data.description ?? null;
    }
    if (typeof parsed.data.category_id === "number") {
      updates.push("category_id = :category_id");
      params.category_id = parsed.data.category_id;
    }
    if (parsed.data.is_approved !== undefined) {
      updates.push("is_approved = :is_approved");
      params.is_approved = parsed.data.is_approved ? 1 : 0;
    }
    if (!updates.length) {
      return res.status(400).json({ ok: false, error: "NO_CHANGES" });
    }

    await db.execute(`UPDATE nominee SET ${updates.join(", ")} WHERE nominee_id = :nominee_id`, params as any);
    const [outRows] = await db.execute<RowDataPacket[]>(
      `SELECT nominee_id, photo, name, description, category_id, votes,
              COALESCE(is_approved, 0) AS is_approved
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

app.delete("/api/admin/nominees/:nomineeId", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED", message: "Sign in required." });
  const nomineeId = Number(req.params.nomineeId);
  if (!Number.isFinite(nomineeId) || nomineeId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_NOMINEE_ID" });
  }
  const eventParsed = parseRequiredEventIdQuery(req);
  if (!eventParsed.ok) {
    return res.status(400).json({
      ok: false,
      error: "INVALID_EVENT_ID",
      message: "Query parameter eventId is required.",
    });
  }
  const eventId = eventParsed.eventId;
  try {
    if (!(await assertAdminOwnsEvent(admin.adminId, eventId))) {
      return res.status(403).json({ ok: false, error: "FORBIDDEN_EVENT", message: "You do not manage this event." });
    }
    const found = await ensureNomineeInEvent(nomineeId, eventId);
    if (!found) return res.status(404).json({ ok: false, error: "NOMINEE_NOT_FOUND" });

    await db.execute(`UPDATE category SET winner_nominee_id = NULL WHERE winner_nominee_id = :nominee_id`, {
      nominee_id: nomineeId,
    });
    await db.execute(`DELETE FROM votes WHERE nominee_id = :nominee_id`, { nominee_id: nomineeId });
    await db.execute(`DELETE FROM user_votes WHERE nominee_id = :nominee_id`, { nominee_id: nomineeId });
    await db.execute(`DELETE FROM nominee WHERE nominee_id = :nominee_id`, { nominee_id: nomineeId });
    return res.json({ ok: true, deleted: true, nominee_id: nomineeId });
  } catch (e) {
    console.error("admin delete nominee db error", e);
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
    const [nomRows] = await db.execute<RowDataPacket[]>(
      `SELECT category_id, COALESCE(is_approved, 0) AS is_approved
       FROM nominee WHERE nominee_id = :nominee_id LIMIT 1`,
      { nominee_id: nomineeId },
    );
    const nomRow = nomRows[0];
    if (!nomRow) return res.status(404).json({ ok: false, error: "NOMINEE_NOT_FOUND" });
    if (Number(nomRow.is_approved) !== 1) {
      return res.status(403).json({
        ok: false,
        error: "NOMINEE_NOT_APPROVED",
        message: "This nominee is not approved for voting yet.",
      });
    }
    const catid = Number(nomRow.category_id);
    if (Number.isFinite(catid) && catid > 0) {
      const [catEventRows] = await db.execute<RowDataPacket[]>(
        `SELECT c.event_id, e.start_time, e.end_time, COALESCE(e.is_live, 0) AS is_live
         FROM category c
         LEFT JOIN events e ON e.event_id = c.event_id
         WHERE c.category_id = :catid
         LIMIT 1`,
        { catid },
      );
      const catEv = catEventRows[0];
      if (catEv && catEv.event_id != null && Number(catEv.is_live) !== 1) {
        return res.status(403).json({
          ok: false,
          error: "EVENT_NOT_LIVE",
          message: "This event is not live yet.",
        });
      }
      if (
        catEv &&
        catEv.event_id != null &&
        !isWithinEventVotingWindow(catEv.start_time, catEv.end_time, new Date())
      ) {
        return res.status(403).json({
          ok: false,
          error: "VOTING_WINDOW_CLOSED",
          message: "Voting is only open during the scheduled window for this event.",
        });
      }
    }

    const [result] = await db.execute(
      `UPDATE nominee
       SET votes = COALESCE(votes, 0) + 1
       WHERE nominee_id = :nominee_id`,
      { nominee_id: nomineeId },
    );

    const voterBody = req.body as { voter?: { userId?: number } } | null;
    const voterUserId = Number(voterBody?.voter?.userId);
    if (Number.isFinite(voterUserId) && voterUserId > 0) {
      await recordUserVote(voterUserId, nomineeId);
    }

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
    // Private events (`is_private` = 1): mobile must appear in `allowed_mobiles` for this `event_id`.
    // Public events (`is_private` != 1 or NULL): anyone may register (no allowlist).
    const [eventRows] = await db.execute<RowDataPacket[]>(
      `SELECT is_private FROM events WHERE event_id = :eid LIMIT 1`,
      { eid: effectiveEventId },
    );
    const eventRow = eventRows[0];
    if (!eventRow) {
      return res.status(404).json({
        ok: false,
        error: "EVENT_NOT_FOUND",
        message: "This event does not exist.",
      });
    }

    const privRaw = eventRow.is_private;
    const isPrivate =
      privRaw === true ||
      privRaw === 1 ||
      Number(privRaw) === 1 ||
      String(privRaw) === "1";

    if (isPrivate) {
      const mobileDigits = String(mobile).replace(/\D/g, "");
      const mobileLast10 =
        mobileDigits.length > 10 ? mobileDigits.slice(-10) : mobileDigits;

      const [allowedRows] = await db.execute<RowDataPacket[]>(
        `SELECT id FROM allowed_mobiles
         WHERE event_id = :event_id
           AND (
             mobile = :mobile
             OR mobile = :mobile_last10
             OR RIGHT(mobile, 10) = :mobile_last10
           )
         LIMIT 1`,
        {
          event_id: effectiveEventId,
          mobile: mobileDigits,
          mobile_last10: mobileLast10,
        },
      );
      if (!allowedRows[0]) {
        return res.status(403).json({
          ok: false,
          error: "MOBILE_NOT_ALLOWED",
          message: "This mobile number is not authorized. Please contact admin.",
        });
      }
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

const userProfileQuerySchema = z.object({
  uid: z.coerce.number().int().positive(),
});

const userProfilePatchSchema = z.object({
  uid: z.coerce.number().int().positive(),
  name: z.string().trim().min(1).max(100),
  mobile: z
    .string()
    .trim()
    .transform((v) => v.replace(/[^\d]/g, ""))
    .refine((v) => v.length >= 8 && v.length <= 15),
  membershipNumber: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length ? v : undefined)),
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

function mapUserProfileRow(user: RowDataPacket) {
  return {
    id: Number(user.id),
    name: String(user.name ?? ""),
    email: String(user.email ?? ""),
    mobile: String(user.phone ?? ""),
    membershipNumber: user.membership_no != null ? String(user.membership_no) : undefined,
    eventId: user.event_id != null ? Number(user.event_id) : undefined,
  };
}

app.get("/api/users/profile", async (req, res) => {
  const parsed = userProfileQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id, name, email, phone, membership_no, event_id, verified_at
       FROM users WHERE id = :id LIMIT 1`,
      { id: parsed.data.uid },
    );
    const user = rows[0];
    if (!user || !user.verified_at) {
      return res.status(404).json({ ok: false, error: "NOT_FOUND" });
    }
    return res.json({ ok: true, profile: mapUserProfileRow(user) });
  } catch (e) {
    console.error("user profile get error", e);
    return res.status(500).json({ ok: false, error: "DB_ERROR" });
  }
});

app.patch("/api/users/profile", async (req, res) => {
  const parsed = userProfilePatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "INVALID_INPUT" });
  }
  const { uid, name, mobile, membershipNumber } = parsed.data;
  const membershipNo = membershipNumber ? Number(membershipNumber) : null;
  if (membershipNumber && Number.isNaN(membershipNo)) {
    return res.status(400).json({ ok: false, error: "INVALID_MEMBERSHIP_NUMBER" });
  }
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id, verified_at FROM users WHERE id = :id LIMIT 1`,
      { id: uid },
    );
    const user = rows[0];
    if (!user || !user.verified_at) {
      return res.status(404).json({ ok: false, error: "NOT_FOUND" });
    }
    await db.execute(
      `UPDATE users SET name = :name, phone = :phone, membership_no = :membership_no WHERE id = :id`,
      { id: uid, name, phone: mobile, membership_no: membershipNo },
    );
    const [updatedRows] = await db.execute<RowDataPacket[]>(
      `SELECT id, name, email, phone, membership_no, event_id, verified_at
       FROM users WHERE id = :id LIMIT 1`,
      { id: uid },
    );
    const updated = updatedRows[0];
    if (!updated) return res.status(500).json({ ok: false, error: "DB_ERROR" });
    return res.json({ ok: true, profile: mapUserProfileRow(updated) });
  } catch (e) {
    console.error("user profile patch error", e);
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

    const [catEventRows] = await db.execute<RowDataPacket[]>(
      `SELECT c.event_id, e.start_time, e.end_time, COALESCE(e.is_live, 0) AS is_live
       FROM category c
       LEFT JOIN events e ON e.event_id = c.event_id
       WHERE c.category_id = :catid
       LIMIT 1`,
      { catid },
    );
    const catEv = catEventRows[0];
    if (catEv && catEv.event_id != null && Number(catEv.is_live) !== 1) {
      return res.status(403).json({
        ok: false,
        error: "EVENT_NOT_LIVE",
        message: "This event is not live yet.",
      });
    }
    if (
      catEv &&
      catEv.event_id != null &&
      !isWithinEventVotingWindow(catEv.start_time, catEv.end_time, new Date())
    ) {
      return res.status(403).json({
        ok: false,
        error: "VOTING_WINDOW_CLOSED",
        message: "Voting is only open during the scheduled window for this event.",
      });
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
    await recordUserVote(uid, nomid);

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

/** Adds `events.is_private` when missing (older DBs); matches `/api/public/events` and registration checks. */
async function ensureEventsIsPrivateColumn(): Promise<void> {
  try {
    await db.execute(
      `ALTER TABLE events ADD COLUMN is_private tinyint(1) NOT NULL DEFAULT 0`,
    );
  } catch (e: unknown) {
    const err = e as { errno?: number; code?: string; message?: string };
    if (err.errno === 1060 || err.code === "ER_DUP_FIELDNAME") return;
    if (/duplicate column name/i.test(String(err.message ?? ""))) return;
    throw e;
  }
}

/** Adds nominee approval flag when missing. */
async function ensureNomineeIsApprovedColumn(): Promise<void> {
  try {
    await db.execute(
      `ALTER TABLE nominee ADD COLUMN is_approved TINYINT(1) NOT NULL DEFAULT 0`,
    );
  } catch (e: unknown) {
    const err = e as { errno?: number; code?: string; message?: string };
    if (err.errno === 1060 || err.code === "ER_DUP_FIELDNAME") return;
    if (/duplicate column name/i.test(String(err.message ?? ""))) return;
    throw e;
  }
}

/** Adds category show_nominee flag when missing. */
async function ensureCategoryShowNomineeColumn(): Promise<void> {
  try {
    await db.execute(
      `ALTER TABLE category ADD COLUMN show_nominee TINYINT(1) NOT NULL DEFAULT 0`,
    );
  } catch (e: unknown) {
    const err = e as { errno?: number; code?: string; message?: string };
    if (err.errno === 1060 || err.code === "ER_DUP_FIELDNAME") return;
    if (/duplicate column name/i.test(String(err.message ?? ""))) return;
    throw e;
  }
}

/** Adds result declaration flags when missing. */
async function ensureDeclareResultColumns(): Promise<void> {
  for (const sql of [
    `ALTER TABLE events ADD COLUMN declare_result TINYINT(1) NOT NULL DEFAULT 0`,
    `ALTER TABLE category ADD COLUMN declare_result TINYINT(1) NOT NULL DEFAULT 0`,
  ]) {
    try {
      await db.execute(sql);
    } catch (e: unknown) {
      const err = e as { errno?: number; code?: string; message?: string };
      if (err.errno === 1060 || err.code === "ER_DUP_FIELDNAME") continue;
      if (/duplicate column name/i.test(String(err.message ?? ""))) continue;
      throw e;
    }
  }
}

/** Adds event is_live flag when missing. */
async function ensureEventIsLiveColumn(): Promise<void> {
  try {
    await db.execute(`ALTER TABLE events ADD COLUMN is_live TINYINT(1) NOT NULL DEFAULT 0`);
  } catch (e: unknown) {
    const err = e as { errno?: number; code?: string; message?: string };
    if (err.errno === 1060 || err.code === "ER_DUP_FIELDNAME") return;
    if (/duplicate column name/i.test(String(err.message ?? ""))) return;
    throw e;
  }
}

/** Adds voting window columns when missing. */
async function ensureEventsVotingWindowColumns(): Promise<void> {
  for (const sql of [
    `ALTER TABLE events ADD COLUMN start_time DATETIME DEFAULT NULL`,
    `ALTER TABLE events ADD COLUMN end_time DATETIME DEFAULT NULL`,
  ]) {
    try {
      await db.execute(sql);
    } catch (e: unknown) {
      const err = e as { errno?: number; code?: string; message?: string };
      if (err.errno === 1060 || err.code === "ER_DUP_FIELDNAME") continue;
      if (/duplicate column name/i.test(String(err.message ?? ""))) continue;
      throw e;
    }
  }
}

/** Ensures allowed_mobiles table exists (private event invite list). */
async function ensureAllowedMobilesTable(): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS allowed_mobiles (
      id INT NOT NULL AUTO_INCREMENT,
      mobile VARCHAR(15) NOT NULL,
      note VARCHAR(255) DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      event_id INT NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY uq_allowed_mobiles_event_mobile (event_id, mobile),
      KEY idx_allowed_mobiles_event_id (event_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
  `);
  try {
    await db.execute(`ALTER TABLE allowed_mobiles ADD COLUMN event_id INT NOT NULL DEFAULT 1`);
  } catch (e: unknown) {
    const err = e as { errno?: number; code?: string; message?: string };
    if (err.errno === 1060 || err.code === "ER_DUP_FIELDNAME") {
      /* already exists */
    } else if (!/duplicate column name/i.test(String(err.message ?? ""))) {
      throw e;
    }
  }
  try {
    await db.execute(`ALTER TABLE allowed_mobiles DROP INDEX uq_allowed_mobiles_mobile`);
  } catch {
    /* legacy index may be absent */
  }
  try {
    await db.execute(
      `ALTER TABLE allowed_mobiles ADD UNIQUE KEY uq_allowed_mobiles_event_mobile (event_id, mobile)`,
    );
  } catch (e: unknown) {
    const err = e as { errno?: number; code?: string; message?: string };
    if (err.errno === 1061 || err.code === "ER_DUP_KEYNAME") return;
    if (/duplicate key name/i.test(String(err.message ?? ""))) return;
    throw e;
  }
}

/** Creates user_votes table when missing and backfills from votes. */
async function ensureUserVotesTable(): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS user_votes (
      vote_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      nominee_id INT NOT NULL,
      PRIMARY KEY (vote_id),
      UNIQUE KEY uniq_user_nominee (user_id, nominee_id),
      KEY idx_user_votes_user_id (user_id),
      KEY idx_user_votes_nominee_id (nominee_id),
      CONSTRAINT fk_user_votes_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      CONSTRAINT fk_user_votes_nominee FOREIGN KEY (nominee_id) REFERENCES nominee (nominee_id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
  `);
  await db.execute(`
    INSERT IGNORE INTO user_votes (user_id, nominee_id)
    SELECT user_id, nominee_id FROM votes
  `);
}

ensureEventsIsPrivateColumn()
  .then(() => ensureEventsVotingWindowColumns())
  .then(() => ensureNomineeIsApprovedColumn())
  .then(() => ensureCategoryShowNomineeColumn())
  .then(() => ensureDeclareResultColumns())
  .then(() => ensureEventIsLiveColumn())
  .then(() => ensureAllowedMobilesTable())
  .then(() => ensureUserVotesTable())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
      console.log(`CORS origin: ${CORS_ORIGIN}`);
    });
  })
  .catch((e) => {
    console.error("ensureEventsSchema failed", e);
    process.exit(1);
  });
