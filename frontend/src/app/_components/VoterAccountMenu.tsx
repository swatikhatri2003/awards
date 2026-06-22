"use client";

import React from "react";
import Link from "next/link";
import { readCurrentUser, type CurrentUser } from "../_lib/userSession";

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function VoterAccountMenu(props: { compact?: boolean; onNavigate?: () => void }) {
  const [user, setUser] = React.useState<CurrentUser | null>(null);

  React.useEffect(() => {
    const refresh = () => setUser(readCurrentUser());
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "ylf_awards_current_user_v1" || e.key === null) refresh();
    };
    const onFocus = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  if (!user) return null;

  return (
    <Link
      href="/profile"
      className={["accountBadge", props.compact ? "accountBadge--compact" : ""].filter(Boolean).join(" ")}
      title={`Signed in as ${user.name}`}
      aria-label={`My profile (${user.name})`}
      onClick={props.onNavigate}
    >
      <span className="accountBadgeAvatar" aria-hidden>
        {initialsFor(user.name)}
      </span>
      {props.compact ? null : <span className="accountBadgeName">{user.name}</span>}
    </Link>
  );
}
