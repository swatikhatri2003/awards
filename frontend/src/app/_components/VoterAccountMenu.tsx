"use client";

import React from "react";
import Link from "next/link";
import {
  ACCOUNT_SESSION_CHANGE,
  accountSessionStorageKeys,
  initialsForAccount,
  resolveHeaderAccount,
} from "../_lib/accountSession";

export function VoterAccountMenu(props: { compact?: boolean; onNavigate?: () => void }) {
  const [label, setLabel] = React.useState<string | null>(null);

  React.useEffect(() => {
    const refresh = () => {
      const account = resolveHeaderAccount();
      setLabel(account?.role === "voter" ? account.name : null);
    };
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || accountSessionStorageKeys().includes(e.key)) refresh();
    };
    const onFocus = () => refresh();
    const onSessionChange = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    window.addEventListener(ACCOUNT_SESSION_CHANGE, onSessionChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener(ACCOUNT_SESSION_CHANGE, onSessionChange);
    };
  }, []);

  if (!label) return null;

  return (
    <Link
      href="/profile"
      className={["accountBadge", props.compact ? "accountBadge--compact" : ""].filter(Boolean).join(" ")}
      title={`Signed in as ${label}`}
      aria-label={`My profile (${label})`}
      onClick={props.onNavigate}
    >
      <span className="accountBadgeAvatar" aria-hidden>
        {initialsForAccount(label)}
      </span>
      {props.compact ? null : <span className="accountBadgeName">{label}</span>}
    </Link>
  );
}
