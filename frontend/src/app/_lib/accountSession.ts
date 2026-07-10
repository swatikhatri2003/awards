import {
  ADMIN_SESSION_STORAGE_KEY,
  clearAdminSession,
  isAdminSessionValid,
  readAdminMeta,
  readAdminToken,
  writeAdminSession,
  type AdminMeta,
} from "./adminAuthSession";
import { clearCurrentUser, readCurrentUser, writeCurrentUser, type CurrentUser } from "./userSession";

export type ActiveAccountRole = "voter" | "admin";

const ACTIVE_ROLE_KEY = "ylf_awards_active_role_v1";
export const ACCOUNT_SESSION_CHANGE = "awards:account-session-change";

export function dispatchAccountSessionChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(ACCOUNT_SESSION_CHANGE));
}

export function readActiveAccountRole(): ActiveAccountRole | null {
  if (typeof window === "undefined") return null;
  const role = window.localStorage.getItem(ACTIVE_ROLE_KEY);
  return role === "voter" || role === "admin" ? role : null;
}

function setActiveAccountRole(role: ActiveAccountRole) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACTIVE_ROLE_KEY, role);
}

function clearActiveAccountRole() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACTIVE_ROLE_KEY);
}

/** Voter sign-in: only one active account in the browser. */
export function signInAsVoter(user: CurrentUser) {
  clearAdminSession();
  writeCurrentUser(user);
  setActiveAccountRole("voter");
  dispatchAccountSessionChange();
}

/** Admin sign-in: only one active account in the browser. */
export function signInAsAdmin(token: string, meta: AdminMeta) {
  clearCurrentUser();
  writeAdminSession(token, meta);
  setActiveAccountRole("admin");
  dispatchAccountSessionChange();
}

export function signOutVoter() {
  clearCurrentUser();
  if (readActiveAccountRole() === "voter") clearActiveAccountRole();
  dispatchAccountSessionChange();
}

export function signOutAdmin() {
  clearAdminSession();
  if (readActiveAccountRole() === "admin") clearActiveAccountRole();
  dispatchAccountSessionChange();
}

export type HeaderAccount =
  | { role: "voter"; name: string; href: string }
  | { role: "admin"; name: string; href: string }
  | null;

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function initialsForAccount(name: string) {
  return initialsFor(name);
}

export function resolveHeaderAccount(): HeaderAccount {
  const voter = readCurrentUser();
  const adminValid = isAdminSessionValid();
  const adminMeta = readAdminMeta();
  let activeRole = readActiveAccountRole();

  if (!activeRole) {
    if (voter && adminValid) setActiveAccountRole("admin");
    else if (voter) setActiveAccountRole("voter");
    else if (adminValid) setActiveAccountRole("admin");
    activeRole = readActiveAccountRole();
  }

  if (activeRole === "admin" && adminValid && adminMeta) {
    const name = adminMeta.name?.trim() || adminMeta.email;
    return { role: "admin", name, href: "/admin?screen=profile" };
  }

  if (activeRole === "voter" && voter) {
    return { role: "voter", name: voter.name, href: "/profile" };
  }

  if (adminValid && adminMeta) {
    const name = adminMeta.name?.trim() || adminMeta.email;
    return { role: "admin", name, href: "/admin?screen=profile" };
  }

  if (voter) {
    return { role: "voter", name: voter.name, href: "/profile" };
  }

  return null;
}

export function accountSessionStorageKeys(): string[] {
  return ["ylf_awards_current_user_v1", ADMIN_SESSION_STORAGE_KEY, ACTIVE_ROLE_KEY];
}
