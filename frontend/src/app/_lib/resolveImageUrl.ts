const DEFAULT_NOMINEE_CDN =
  process.env.NEXT_PUBLIC_PHOTO_BASE_URL ||
  "https://mscsuper.blr1.digitaloceanspaces.com/vdimg";

/** New API uploads use a version-4 UUID + extension (see backend multer). */
function isApiUuidFilename(basename: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.[^.]+$/i.test(basename);
}

function extractBasename(p: string): string {
  const normalized = p.replace(/\\/g, "/");
  return normalized.split("/").filter(Boolean).pop() || "";
}

export function resolveNomineePhotoUrl(apiOrigin: string, photo?: string | null): string {
  const p = (photo || "").trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p) || p.startsWith("data:")) return p;
  const last = extractBasename(p);
  if (!last) return "";
  const safe = encodeURIComponent(last);
  const base = apiOrigin.replace(/\/+$/, "");
  if (isApiUuidFilename(last)) {
    return `${base}/uploads/nominee/${safe}`;
  }
  const cdn = DEFAULT_NOMINEE_CDN.replace(/\/+$/, "");
  return `${cdn}/${safe}`;
}

/** Event banner: served under `/uploads/event/` on the API host, or any absolute http(s) URL. */
export function resolveEventBannerUrl(apiOrigin: string, image?: string | null): string {
  const p = (image || "").trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p) || p.startsWith("data:")) return p;
  const last = extractBasename(p);
  if (!last) return "";
  const base = apiOrigin.replace(/\/+$/, "");
  return `${base}/uploads/event/${encodeURIComponent(last)}`;
}
