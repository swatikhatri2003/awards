import type { MetadataRoute } from "next";
import { withBasePath } from "./_lib/basePath";
import { absoluteSiteUrl } from "./_lib/site";

// Required for `output: 'export'` (static export).
export const dynamic = "force-static";

const DISALLOW_PATHS = ["/admin", "/actions", "/screen", "/otp", "/register", "/profile"] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: withBasePath("/"),
      disallow: DISALLOW_PATHS.map((path) => withBasePath(path)),
    },
    sitemap: absoluteSiteUrl("/sitemap.xml"),
  };
}
