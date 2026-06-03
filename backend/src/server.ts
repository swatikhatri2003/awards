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
import { hashPassword, verifyPassword, signAdminToken, verifyAdminToken } from "./adminAuth";
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

app.post("/api/uploads/nominee-photo", upload.single("photo"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ ok: false, error: "NO_FILE" });
  return res.json({
    ok: true,
    filename: file.filename,
  });
});

app.post("/api/uploads/event-photo", eventUpload.single("photo"), (req, res) => {
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

app.post("/api/uploads/admin-logo", adminLogoUpload.single("photo"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ ok: false, error: "NO_FILE" });
  return res.json({ ok: true, filename: file.filename });
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

app.get("/api/admin/events", async (req, res) => {
  const admin = await loadAdminFromRequest(req);
  if (!admin) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT event_id, title, description, image, admin_id, is_private, start_time, end_time
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
      `SELECT event_id, title, description, image, admin_id, is_private, start_time, end_time FROM events WHERE event_id = :id LIMIT 1`,
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

    if (!updates.length) {
      return res.status(400).json({ ok: false, error: "NO_CHANGES" });
    }

    await db.execute(`UPDATE events SET ${updates.join(", ")} WHERE event_id = :event_id`, params as any);
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT event_id, title, description, image, admin_id, is_private, start_time, end_time FROM events WHERE event_id = :id LIMIT 1`,
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

app.get("/api/events/:eventId", async (req, res) => {
  const eventId = Number(req.params.eventId);
  if (!Number.isFinite(eventId) || eventId <= 0) {
    return res.status(400).json({ ok: false, error: "INVALID_EVENT_ID" });
  }
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT event_id, title, description, image, is_private, start_time, end_time
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
      `SELECT event_id, title, description, image
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
      `SELECT category_id, name, winner_nominee_id, event_id
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
  eventId: z.coerce.number().int().positive(),
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
      `INSERT INTO nominee (photo, name, description, category_id, votes)
       VALUES (:photo, :name, :description, :category_id, 0)`,
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
      `SELECT category_id FROM nominee WHERE nominee_id = :nominee_id LIMIT 1`,
      { nominee_id: nomineeId },
    );
    const catid = Number(nomRows[0]?.category_id);
    if (Number.isFinite(catid) && catid > 0) {
      const [catEventRows] = await db.execute<RowDataPacket[]>(
        `SELECT c.event_id, e.start_time, e.end_time
         FROM category c
         LEFT JOIN events e ON e.event_id = c.event_id
         WHERE c.category_id = :catid
         LIMIT 1`,
        { catid },
      );
      const catEv = catEventRows[0];
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

    const [catEventRows] = await db.execute<RowDataPacket[]>(
      `SELECT c.event_id, e.start_time, e.end_time
       FROM category c
       LEFT JOIN events e ON e.event_id = c.event_id
       WHERE c.category_id = :catid
       LIMIT 1`,
      { catid },
    );
    const catEv = catEventRows[0];
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

ensureEventsIsPrivateColumn()
  .then(() => ensureEventsVotingWindowColumns())
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
