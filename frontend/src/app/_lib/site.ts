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

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
