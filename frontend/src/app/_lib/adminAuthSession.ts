/** Admin stays signed in for 7 days unless they log out (matches backend JWT TTL). */
export const ADMIN_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const SESSION_KEY = "awards_event_admin_session_v2";
const LEGACY_TOKEN_KEY = "awards_event_admin_token_v1";
const LEGACY_META_KEY = "awards_event_admin_meta_v1";

export type AdminMeta = {
  adminId: number;
  email: string;
};

type StoredAdminSession = {
  token: string;
  meta: AdminMeta;
  /** Unix ms — session valid until this instant */
  expiresAt: number;
};

function decodeAdminTokenPayload(token: string): { exp?: number; adminId?: number; email?: string } | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  try {
    const b64 = parts[0].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    return JSON.parse(atob(padded)) as { exp?: number; adminId?: number; email?: string };
  } catch {
    return null;
  }
}

function sessionExpiresAt(token: string): number {
  const payload = decodeAdminTokenPayload(token);
  if (typeof payload?.exp === "number" && payload.exp > Date.now()) {
    return payload.exp;
  }
  return Date.now() + ADMIN_SESSION_TTL_MS;
}

function migrateLegacySessionStorage(): void {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(SESSION_KEY)) return;
    const token = window.sessionStorage.getItem(LEGACY_TOKEN_KEY);
    const metaRaw = window.sessionStorage.getItem(LEGACY_META_KEY);
    if (!token || !metaRaw) return;
    const meta = JSON.parse(metaRaw) as AdminMeta;
    if (!meta?.adminId || !meta?.email) return;
    const record: StoredAdminSession = {
      token,
      meta,
      expiresAt: sessionExpiresAt(token),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(record));
    window.sessionStorage.removeItem(LEGACY_TOKEN_KEY);
    window.sessionStorage.removeItem(LEGACY_META_KEY);
  } catch {
    /* ignore */
  }
}

function readStoredSession(): StoredAdminSession | null {
  if (typeof window === "undefined") return null;
  migrateLegacySessionStorage();
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredAdminSession;
    if (!data?.token || !data?.meta?.adminId || !data?.meta?.email) {
      clearAdminSession();
      return null;
    }
    const exp = typeof data.expiresAt === "number" ? data.expiresAt : sessionExpiresAt(data.token);
    if (exp < Date.now()) {
      clearAdminSession();
      return null;
    }
    const payload = decodeAdminTokenPayload(data.token);
    if (payload?.exp != null && payload.exp < Date.now()) {
      clearAdminSession();
      return null;
    }
    return { ...data, expiresAt: exp };
  } catch {
    clearAdminSession();
    return null;
  }
}

/** True when a non-expired admin session exists in local storage. */
export function isAdminSessionValid(): boolean {
  return readStoredSession() != null;
}

export function readAdminToken(): string | null {
  return readStoredSession()?.token ?? null;
}

export function readAdminMeta(): AdminMeta | null {
  return readStoredSession()?.meta ?? null;
}

export function readAdminSessionExpiresAt(): number | null {
  return readStoredSession()?.expiresAt ?? null;
}

export function writeAdminSession(token: string, meta: AdminMeta) {
  if (typeof window === "undefined") return;
  migrateLegacySessionStorage();
  const record: StoredAdminSession = {
    token,
    meta,
    expiresAt: sessionExpiresAt(token),
  };
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(record));
    window.sessionStorage.removeItem(LEGACY_TOKEN_KEY);
    window.sessionStorage.removeItem(LEGACY_META_KEY);
  } catch {
    /* quota / private mode */
  }
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(LEGACY_TOKEN_KEY);
    window.sessionStorage.removeItem(LEGACY_META_KEY);
  } catch {
    /* ignore */
  }
}

export function adminAuthHeader(token: string | null): HeadersInit {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
