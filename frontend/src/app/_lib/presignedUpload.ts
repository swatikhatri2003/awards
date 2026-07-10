import { adminAuthHeader } from "./adminAuthSession";

type PresignApiResponse = {
  ok?: boolean;
  success?: boolean;
  data?: {
    presignedUrl?: string;
    filename?: string;
  };
  error?: string;
  message?: string;
};

/** Upload an image via presigned URL (fltyp=awards), same flow as react_act_user. */
export async function uploadAwardsPhoto(
  file: File,
  apiBase: string,
  authToken?: string | null,
): Promise<string> {
  if (!/^image\//i.test(file.type || "")) {
    throw new Error("ONLY_IMAGES_ALLOWED");
  }

  const presignRes = await fetch(`${apiBase.replace(/\/+$/, "")}/uploads/presign-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? adminAuthHeader(authToken) : {}),
    },
    body: JSON.stringify({
      filename: file.name || `photo_${Date.now()}.jpg`,
      fltyp: "awards",
    }),
  });

  const presignData = (await presignRes.json().catch(() => null)) as PresignApiResponse | null;
  const presignedUrl = presignData?.data?.presignedUrl;
  const filename = presignData?.data?.filename;

  if (!presignRes.ok || !presignedUrl || !filename) {
    throw new Error(presignData?.error || presignData?.message || "PRESIGN_FAILED");
  }

  const imageBytes = await file.arrayBuffer();

  const uploadRes = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "image/jpeg",
      "x-amz-acl": "public-read",
    },
    body: imageBytes,
  });

  if (!uploadRes.ok) {
    const errText = await uploadRes.text().catch(() => "");
    throw new Error(errText ? `S3_UPLOAD_FAILED:${errText}` : "S3_UPLOAD_FAILED");
  }

  return filename;
}
