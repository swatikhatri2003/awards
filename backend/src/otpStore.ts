type OtpEntry = {
  otp: string;
  expiresAt: number;
  attemptsLeft: number;
  payload: {
    name: string;
    email: string;
    mobile: string;
    membershipNumber?: string;
  };
};

const store = new Map<string, OtpEntry>();

function makeKey(email: string, mobile: string) {
  return `${email.toLowerCase()}::${mobile}`;
}

export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function putOtp(params: {
  email: string;
  mobile: string;
  otp: string;
  ttlMs: number;
  attempts: number;
  payload: OtpEntry["payload"];
}) {
  const key = makeKey(params.email, params.mobile);
  store.set(key, {
    otp: params.otp,
    expiresAt: Date.now() + params.ttlMs,
    attemptsLeft: params.attempts,
    payload: params.payload,
  });
}

export function verifyOtp(params: { email: string; mobile: string; otp: string }) {
  const key = makeKey(params.email, params.mobile);
  const entry = store.get(key);
  if (!entry) return { ok: false as const, reason: "NOT_FOUND" as const };
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return { ok: false as const, reason: "EXPIRED" as const };
  }
  if (entry.attemptsLeft <= 0) {
    store.delete(key);
    return { ok: false as const, reason: "TOO_MANY_ATTEMPTS" as const };
  }
  if (entry.otp !== params.otp) {
    entry.attemptsLeft -= 1;
    store.set(key, entry);
    return { ok: false as const, reason: "INVALID" as const, attemptsLeft: entry.attemptsLeft };
  }
  store.delete(key);
  return { ok: true as const, payload: entry.payload };
}

