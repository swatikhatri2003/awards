import { withBasePath } from "./basePath";

/** Production host when env is unset (shared server, many apps). */
const DEFAULT_PROD_ORIGIN = "https://texyatra.com";

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

/**
 * Site origin only — no subpath (e.g. https://texyatra.com).
 * Optional override: NEXT_PUBLIC_SITE_ORIGIN=https://texyatra.com
 * Legacy alias: NEXT_PUBLIC_SITE_URL (origin is extracted if a full URL is passed).
 */
export function getSiteOrigin(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_ORIGIN?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (raw) {
    try {
      return new URL(raw).origin;
    } catch {
      return stripTrailingSlash(raw);
    }
  }

  if (process.env.NODE_ENV === "production") {
    return DEFAULT_PROD_ORIGIN;
  }

  return "http://localhost:3000";
}

/** Full public URL for a route (includes /awards_f in production). */
export function absoluteSiteUrl(href: string = "/"): string {
  return `${getSiteOrigin()}${withBasePath(href)}`;
}

/** App home URL without trailing slash — for JSON-LD and sharing. */
export function getSiteUrl(): string {
  return stripTrailingSlash(absoluteSiteUrl("/"));
}

/** Shared site metadata for SEO, Open Graph, and JSON-LD. */
export const siteConfig = {
  name: "Awards",
  title: "Awards — Live event voting, nominees & secure ballots",
  description:
    "Run award ceremonies with verified OTP voting. Create events, add categories and nominees, and open public or private ballots—all in one platform.",
  tagline: "Live voting · Events · Nominees",
  keywords: [
    "award voting",
    "event voting platform",
    "nominee voting",
    "live awards",
    "OTP verified voting",
    "private event ballots",
    "public voting events",
    "award ceremony software",
  ],
  locale: "en_IN",
} as const;
