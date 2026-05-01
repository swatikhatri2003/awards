import crypto from "node:crypto";

const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_KEYLEN = 32;
const PBKDF2_DIGEST = "sha256";

export function hashPassword(plain: string): string {
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(plain, salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST);
  const combined = Buffer.concat([salt, hash]);
  return `1$${combined.toString("base64")}`;
}

export function verifyPassword(plain: string, stored: string): boolean {
  if (!stored || !stored.startsWith("1$")) return false;
  let buf: Buffer;
  try {
    buf = Buffer.from(stored.slice(2), "base64");
  } catch {
    return false;
  }
  if (buf.length < 16 + PBKDF2_KEYLEN) return false;
  const salt = buf.subarray(0, 16);
  const expected = buf.subarray(16, 16 + PBKDF2_KEYLEN);
  const actual = crypto.pbkdf2Sync(plain, salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST);
  if (expected.length !== actual.length) return false;
  return crypto.timingSafeEqual(expected, actual);
}

function adminSecret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-admin-session-secret-change-me";
}

export type AdminTokenPayload = {
  adminId: number;
  email: string;
  exp: number;
};

export function signAdminToken(payload: Omit<AdminTokenPayload, "exp">, ttlMs = 7 * 24 * 60 * 60 * 1000): string {
  const exp = Date.now() + ttlMs;
  const body: AdminTokenPayload = { ...payload, exp };
  const payloadB64 = Buffer.from(JSON.stringify(body), "utf8").toString("base64url");
  const sig = crypto.createHmac("sha256", adminSecret()).update(payloadB64).digest("base64url");
  return `${payloadB64}.${sig}`;
}

export function verifyAdminToken(token: string | undefined): AdminTokenPayload | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;
  const expected = crypto.createHmac("sha256", adminSecret()).update(payloadB64).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const json = Buffer.from(payloadB64, "base64url").toString("utf8");
    const data = JSON.parse(json) as AdminTokenPayload;
    if (!data?.adminId || !data?.email || !data?.exp) return null;
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}
