export type PendingRegistration = {
  name: string;
  email: string;
  mobile: string;
  membership_number?: string;
};

const KEY = "ylf_awards_pending_registration_v1";

export function readPendingRegistration(): PendingRegistration | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as PendingRegistration;
    if (!data?.email || !data?.mobile) return null;
    return data;
  } catch {
    return null;
  }
}

export function writePendingRegistration(data: PendingRegistration) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(KEY, JSON.stringify(data));
}

export function clearPendingRegistration() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(KEY);
}

