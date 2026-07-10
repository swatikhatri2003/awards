import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "./_lib/site";

// Required for `output: 'export'` (static export).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: absoluteSiteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteSiteUrl("/events"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteSiteUrl("/usersvote"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];
}
