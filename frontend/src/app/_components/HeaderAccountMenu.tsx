"use client";

import React from "react";
import Link from "next/link";
import {
  ACCOUNT_SESSION_CHANGE,
  accountSessionStorageKeys,
  initialsForAccount,
  resolveHeaderAccount,
  type HeaderAccount,
} from "../_lib/accountSession";
import { adminAuthHeader, readAdminToken } from "../_lib/adminAuthSession";
import { getPublicApiBase } from "../_lib/publicApiBase";

export function HeaderAccountMenu(props: { compact?: boolean; onNavigate?: () => void }) {
  const [account, setAccount] = React.useState<HeaderAccount>(null);

  const refresh = React.useCallback(async () => {
    const resolved = resolveHeaderAccount();
    if (!resolved) {
      setAccount(null);
      return;
    }

    if (resolved.role === "admin") {
      setAccount(resolved);
      const token = readAdminToken();
      if (!token) return;
      try {
        const r = await fetch(`${getPublicApiBase()}/admin/me`, {
          headers: { ...adminAuthHeader(token) },
        });
        if (!r.ok) return;
        const data = (await r.json()) as { ok?: boolean; admin?: { name?: string; email?: string } };
        if (data?.ok && data.admin) {
          const name = data.admin.name?.trim() || data.admin.email || resolved.name;
          setAccount({ role: "admin", name, href: resolved.href });
        }
      } catch {
        /* keep resolved */
      }
      return;
    }

    setAccount(resolved);
  }, []);

  React.useEffect(() => {
    void refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || accountSessionStorageKeys().includes(e.key)) void refresh();
    };
    const onFocus = () => void refresh();
    const onSessionChange = () => void refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    window.addEventListener(ACCOUNT_SESSION_CHANGE, onSessionChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener(ACCOUNT_SESSION_CHANGE, onSessionChange);
    };
  }, [refresh]);

  if (!account) return null;

  return (
    <Link
      href={account.href}
      className={[
        "accountBadge",
        account.role === "admin" ? "accountBadge--admin" : "",
        props.compact ? "accountBadge--compact" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      title={`Signed in as ${account.name}`}
      aria-label={`My profile (${account.name})`}
      onClick={props.onNavigate}
    >
      <span className="accountBadgeAvatar" aria-hidden>
        {initialsForAccount(account.name)}
      </span>
      {props.compact ? null : <span className="accountBadgeName">{account.name}</span>}
    </Link>
  );
}
