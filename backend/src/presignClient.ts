import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type PresignedUploadData = {
  presignedUrl: string;
  filename: string;
  path: string;
  fullPath: string;
  expiresIn: number;
};

const CONTENT_TYPE_BY_EXT: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".bmp": "image/bmp",
  ".ico": "image/x-icon",
};

function spacesPublicBase(): string {
  return (process.env.DO_SPACES_PUBLIC_URL || "https://mscsuper.blr1.digitaloceanspaces.com").replace(
    /\/+$/,
    "",
  );
}

function presignExpiresIn(): number {
  const n = Number(process.env.DO_SPACES_PRESIGN_EXPIRES || 3600);
  return Number.isFinite(n) && n > 0 ? n : 3600;
}

function folderForFileType(fileType: string): string {
  switch (fileType) {
    case "bnrimg":
      return "banner";
    case "splogo":
      return "sponsor";
    case "teamlogo":
      return "teams";
    case "playerimg":
    case "profileimg":
      return "playersphoto";
    case "receipt":
      return "receipt";
    case "centerlogo":
    case "sstamp":
    case "usstamp":
    case "titleimg":
    case "bg":
      return "file";
    case "alogo":
      return "auction";
    case "playercard":
      return "playercard";
    case "aforposter":
      return "aforpost";
    case "awards":
      return "vdimg";
    default:
      return "file";
  }
}

function extensionAndContentType(filename?: string): { ext: string; contentType: string } {
  const safeName = String(filename || "").trim();
  const lastDot = safeName.lastIndexOf(".");
  if (lastDot > 0 && lastDot < safeName.length - 1) {
    const ext = safeName.slice(lastDot).toLowerCase();
    return { ext, contentType: CONTENT_TYPE_BY_EXT[ext] || "image/jpeg" };
  }
  return { ext: ".jpg", contentType: "image/jpeg" };
}

function s3Client(): S3Client {
  const accessKeyId = process.env.DIGITAL_OCEAN_ACCESS_KEY_ID?.trim() || "";
  const secretAccessKey = process.env.DIGITAL_OCEAN_SECRET_ACCESS_KEY?.trim() || "";
  const region = process.env.DO_SPACES_REGION?.trim() || "blr1";
  const endpoint = process.env.DO_SPACES_ENDPOINT?.trim() || `https://${region}.digitaloceanspaces.com`;

  return new S3Client({
    endpoint,
    region,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: false,
  });
}

export function isPresignConfigured(): boolean {
  return Boolean(
    process.env.DIGITAL_OCEAN_ACCESS_KEY_ID?.trim() && process.env.DIGITAL_OCEAN_SECRET_ACCESS_KEY?.trim(),
  );
}

/** Generate a DigitalOcean Spaces presigned PUT URL for direct client upload. */
export async function getPresignedUploadUrl(
  filename: string,
  fltyp = "awards",
): Promise<PresignedUploadData> {
  if (!isPresignConfigured()) {
    throw new Error("PRESIGN_NOT_CONFIGURED");
  }

  const providedFilename = String(filename || "").trim();
  if (!providedFilename) {
    throw new Error("NO_FILENAME");
  }

  const fileType = String(fltyp || "awards").trim() || "awards";
  const folder = folderForFileType(fileType);
  const { ext, contentType } = extensionAndContentType(providedFilename);
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const generatedFilename = `${uniqueSuffix}${ext}`;
  const s3Key = `${folder}/${generatedFilename}`;
  const bucket = process.env.DO_SPACES_BUCKET?.trim() || "mscsuper";
  const expiresIn = presignExpiresIn();
  const publicBase = spacesPublicBase();

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: s3Key,
    ContentType: contentType,
    ACL: "public-read",
  });

  const presignedUrl = await getSignedUrl(s3Client(), command, { expiresIn });

  return {
    presignedUrl,
    filename: generatedFilename,
    path: `${publicBase}/${folder}/`,
    fullPath: `${publicBase}/${s3Key}`,
    expiresIn,
  };
}
