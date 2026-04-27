import https from "node:https";

type AiSensyPayload = {
  apiKey: string;
  campaignName: string;
  destination: string;
  userName: string;
  templateParams: string[];
  source?: string;
  media?: Record<string, never>;
  buttons?: unknown[];
  carouselCards?: unknown[];
  location?: Record<string, never>;
  attributes?: Record<string, never>;
  paramsFallbackValue?: Record<string, string>;
};

function normalizeDigitsOnly(v: string) {
  return v.replace(/[^\d]/g, "");
}

function formatMobileForWhatsapp(rawMobile: string) {
  const digits = normalizeDigitsOnly(rawMobile);
  const cc = normalizeDigitsOnly(process.env.DEFAULT_COUNTRY_CODE || "91");

  // Common case (India): 10-digit local number => prepend country code
  if (digits.length === 10) return `${cc}${digits}`;

  // If already includes country code (e.g. 91xxxxxxxxxx), keep as-is
  return digits;
}

function postJson(url: string, body: unknown): Promise<{ statusCode: number; bodyText: string }> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const u = new URL(url);

    const req = https.request(
      {
        method: "POST",
        protocol: u.protocol,
        hostname: u.hostname,
        path: `${u.pathname}${u.search}`,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(String(c))));
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode ?? 0,
            bodyText: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

export async function sendWhatsappOtp(params: { mobile: string; username: string; otp: string }) {
  const apiKey = process.env.AISENSY_API_KEY || "";
  const campaignName = process.env.AISENSY_CAMPAIGN_NAME || "";
  const url = process.env.AISENSY_URL || "https://backend.aisensy.com/campaign/t1/api/v2";

  if (!apiKey || !campaignName) {
    console.error("[AiSensy] Missing AISENSY_API_KEY or AISENSY_CAMPAIGN_NAME");
    return false;
  }

  const destination = formatMobileForWhatsapp(params.mobile);
  const otp = String(params.otp);

  const payload: AiSensyPayload = {
    apiKey,
    campaignName,
    destination,
    userName: params.username,
    templateParams: [otp],
    source: process.env.AISENSY_SOURCE || "new-landing-page form",
    media: {},
    buttons: [
      {
        type: "button",
        sub_type: "url",
        index: 0,
        parameters: [{ type: "text", text: otp }],
      },
    ],
    carouselCards: [],
    location: {},
    attributes: {},
    paramsFallbackValue: { FirstName: "user" },
  };

  try {
    const resp = await postJson(url, payload);
    const ok = resp.statusCode >= 200 && resp.statusCode < 300;
    if (!ok) {
      console.error("[AiSensy] OTP failed", {
        statusCode: resp.statusCode,
        destination,
        bodyText: resp.bodyText?.slice(0, 2000),
      });
      return false;
    }
    return true;
  } catch (e) {
    console.error("[AiSensy] Exception sending OTP", e);
    return false;
  }
}

