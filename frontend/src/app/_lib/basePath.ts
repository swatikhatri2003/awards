/**
 * Prefix for in-app links when the app is hosted under a subpath in production (see `next.config.ts` `basePath`).
 * Set `NEXT_PUBLIC_BASE_PATH` to match (e.g. `/awards_f`). In local dev, leave unset.
 */
export function withBasePath(href: string): string {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
  if (!base) return href.startsWith("/") ? href : `/${href}`;
  const path = href.startsWith("/") ? href : `/${href}`;
  return `${base}${path}`;
}
