import type { MetadataRoute } from "next";
import { getSiteUrl } from "./_lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/actions", "/screen", "/otp", "/register", "/profile"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
