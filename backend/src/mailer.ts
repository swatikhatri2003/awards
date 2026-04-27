import nodemailer from "nodemailer";

function requiredEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");

  // Gmail app-password SMTP
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  return transporter;
}

export async function sendOtpEmail(params: { to: string; otp: string; name?: string }) {
  const fromName = process.env.MAIL_FROM_NAME || "Awards";
  const fromEmail = process.env.MAIL_FROM_EMAIL || process.env.SMTP_USER || "";
  if (!fromEmail) throw new Error("Missing env: MAIL_FROM_EMAIL (or SMTP_USER)");

  const safeName = (params.name || "").trim();
  const greeting = safeName ? `Hi ${safeName},` : "Hi,";

  const subject = "Your OTP for Awards";
  const text = `${greeting}\n\nYour OTP is: ${params.otp}\n\nThis OTP is valid for 5 minutes.\n`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5">
      <p>${greeting}</p>
      <p>Your OTP is:</p>
      <p style="font-size: 24px; letter-spacing: 2px; font-weight: 700; margin: 12px 0">${params.otp}</p>
      <p style="color: #555">This OTP is valid for 5 minutes.</p>
    </div>
  `.trim();

  const t = getTransporter();
  await t.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to: params.to,
    subject,
    text,
    html,
  });
}

