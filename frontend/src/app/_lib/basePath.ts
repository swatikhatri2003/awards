/**
 * Must stay in sync with `basePath` / `trailingSlash` in `next.config.ts`.
 * Use `withBasePath` for plain `<a href>`, `window.open`, and copy-to-clipboard URLs.
 * For Next.js `<Link>` and `router.push("/path")`, pass paths without the base — Next adds it from config.
 */
const DEFAULT_PROD_BASE_PATH = "/awards_f";

function envBasePath(): string {
  return (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
}

/** Resolved app base path (e.g. "" in dev, "/awards_f" in production). */
export function getBasePath(): string {
  const fromEnv = envBasePath();
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV === "production") {
    return DEFAULT_PROD_BASE_PATH;
  }

  if (typeof window !== "undefined") {
    const { pathname } = window.location;
    if (pathname === DEFAULT_PROD_BASE_PATH || pathname.startsWith(`${DEFAULT_PROD_BASE_PATH}/`)) {
      return DEFAULT_PROD_BASE_PATH;
    }
  }

  return "";
}

function useTrailingSlash(): boolean {
  return process.env.NODE_ENV === "production";
}

function applyTrailingSlash(pathname: string): string {
  if (!useTrailingSlash()) return pathname;
  if (pathname.endsWith("/")) return pathname;
  return `${pathname}/`;
}

export function withBasePath(href: string): string {
  const base = getBasePath();

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const beforeHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;

  const queryIndex = beforeHash.indexOf("?");
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex) : "";
  const pathOnly = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;

  const normalizedPath = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  const withPrefix = base ? `${base}${normalizedPath}` : normalizedPath;
  const withSlash = applyTrailingSlash(withPrefix);

  return `${withSlash}${query}${hash}`;
}

/** Absolute URL for sharing (register link, QR, etc.). */
export function fullAppUrl(href: string): string {
  if (typeof window === "undefined") return withBasePath(href);
  return `${window.location.origin}${withBasePath(href)}`;
}
