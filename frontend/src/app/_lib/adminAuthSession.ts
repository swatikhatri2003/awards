const KEY = "awards_event_admin_token_v1";
const META_KEY = "awards_event_admin_meta_v1";

export type AdminMeta = {
  adminId: number;
  email: string;
};

export function readAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function readAdminMeta(): AdminMeta | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(META_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as AdminMeta;
    if (!d?.adminId || !d?.email) return null;
    return d;
  } catch {
    return null;
  }
}

export function writeAdminSession(token: string, meta: AdminMeta) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(KEY, token);
  window.sessionStorage.setItem(META_KEY, JSON.stringify(meta));
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(KEY);
  window.sessionStorage.removeItem(META_KEY);
}

export function adminAuthHeader(token: string | null): HeadersInit {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
