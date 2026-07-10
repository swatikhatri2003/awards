import type { MetadataRoute } from "next";
import { getSiteUrl } from "./_lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/events`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/usersvote`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];
}
