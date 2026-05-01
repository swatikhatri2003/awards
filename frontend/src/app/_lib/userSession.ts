export type CurrentUser = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  membershipNumber?: string;
  /** Event the voter registered for (from /register?eventId=). */
  eventId?: number;
};

const KEY = "ylf_awards_current_user_v1";
const UID_KEY = "ylf_awards_uid_v1";

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
  if (typeof user.id === "number" && Number.isFinite(user.id)) {
    window.localStorage.setItem(UID_KEY, String(user.id));
  }
}

export function readUid(): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(UID_KEY);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function clearCurrentUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.localStorage.removeItem(UID_KEY);
}

export type UserVote = {
  categoryId: number;
  categoryName: string;
  nomineeId: number;
  nomineeName: string;
  at: number;
};

const VOTES_KEY = "ylf_awards_user_votes_v1";

export function readUserVotes(): UserVote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(VOTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as UserVote[]) : [];
  } catch {
    return [];
  }
}

export function writeUserVotes(votes: UserVote[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
}

export function pushUserVote(vote: UserVote) {
  const all = readUserVotes();
  const filtered = all.filter((v) => v.categoryId !== vote.categoryId);
  filtered.push(vote);
  writeUserVotes(filtered);
}

export function clearUserVotes() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(VOTES_KEY);
}

