/** Default backend when NEXT_PUBLIC_API_BASE_URL is unset. */
export const DEFAULT_PUBLIC_API_BASE = "http://3.0.81.7/api";

/**
 * Public API base URL (path ending in `/api`).
 * NEXT_PUBLIC_* is inlined at build time — a mistaken localhost value breaks production.
 * In the browser, if env points to loopback but the page is served from a real host, we use same-origin `/api`.
 */
export function normalizeApiBase(raw: string) {
  const root = raw.replace(/\/+$/, "");
  return /\/api$/i.test(root) ? root : `${root}/api`;
}

function envPointsToLoopback(base: string): boolean {
  return /:\/\/localhost\b/i.test(base) || /:\/\/127\.0\.0\.1\b/.test(base);
}

export function getPublicApiBase(): string {
  const envRaw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  const fromEnv = envRaw ? normalizeApiBase(envRaw) : null;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const onLoopback = host === "localhost" || host === "127.0.0.1";
    const envIsLoopback = fromEnv != null && envPointsToLoopback(fromEnv);
    if (fromEnv && !(envIsLoopback && !onLoopback)) {
      return fromEnv;
    }
    return `${window.location.origin}/api`;
  }

  if (fromEnv) return fromEnv;
  return normalizeApiBase(DEFAULT_PUBLIC_API_BASE);
}

/** Origin for `/uploads/...` (same host as API when using default backend). */
export function getUploadsOrigin(): string {
  return getPublicApiBase().replace(/\/api$/i, "");
}
