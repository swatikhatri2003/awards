export type PresignedUploadData = {
  presignedUrl: string;
  filename: string;
};

function presignApiBase(): string {
  return (process.env.PRESIGN_API_BASE || "https://superscore.in/api/v1").replace(/\/+$/, "");
}

function presignAuthHeader(): string | null {
  const cid = process.env.PRESIGN_CID?.trim();
  const aid = process.env.PRESIGN_AID?.trim();
  const token = process.env.PRESIGN_TOKEN?.trim();
  if (!cid || !aid || !token) return null;
  return JSON.stringify([{ cid: Number(cid), aid: Number(aid), token }]);
}

export function isPresignConfigured(): boolean {
  return presignAuthHeader() != null;
}

/** Request a DigitalOcean/S3 presigned PUT URL from the superscore upload service. */
export async function getPresignedUploadUrl(
  filename: string,
  fltyp = "awards",
): Promise<PresignedUploadData> {
  const auth = presignAuthHeader();
  if (!auth) {
    throw new Error("PRESIGN_NOT_CONFIGURED");
  }

  const safeName = String(filename || "").trim();
  if (!safeName) {
    throw new Error("NO_FILENAME");
  }

  const formData = new FormData();
  formData.append("filename", safeName);
  formData.append("fltyp", fltyp);

  const res = await fetch(`${presignApiBase()}/spa/get-presigned-url`, {
    method: "POST",
    headers: { authorization: auth },
    body: formData,
  });

  const payload = (await res.json().catch(() => null)) as
    | { success?: boolean; data?: PresignedUploadData; message?: string }
    | null;

  if (!res.ok || !payload?.success || !payload.data?.presignedUrl || !payload.data?.filename) {
    const detail = payload?.message || `HTTP ${res.status}`;
    throw new Error(`PRESIGN_FAILED:${detail}`);
  }

  return payload.data;
}
