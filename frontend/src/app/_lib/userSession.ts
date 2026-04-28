export type CurrentUser = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  membershipNumber?: string;
};

const KEY = "ylf_awards_current_user_v1";

export function readCurrentUser(): CurrentUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as CurrentUser;
    if (!data?.email || !data?.mobile) return null;
    return data;
  } catch {
    return null;
  }
}

export function writeCurrentUser(user: CurrentUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

