"use client";

import React from "react";
import Link from "next/link";
import {
  ADMIN_SESSION_STORAGE_KEY,
  adminAuthHeader,
  isAdminSessionValid,
  readAdminMeta,
  readAdminToken,
} from "../_lib/adminAuthSession";
import { getPublicApiBase } from "../_lib/publicApiBase";

function initialsFor(label: string) {
  const parts = label.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return label.slice(0, 2).toUpperCase();
}

export function AdminAccountMenu(props: { compact?: boolean; onNavigate?: () => void }) {
  const [label, setLabel] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    if (!isAdminSessionValid()) {
      setLabel(null);
      return;
    }
    const meta = readAdminMeta();
    if (!meta) {
      setLabel(null);
      return;
    }
    const fallback = meta.name?.trim() || meta.email;
    setLabel(fallback);

    const token = readAdminToken();
    if (!token) return;
    try {
      const r = await fetch(`${getPublicApiBase()}/admin/me`, { headers: { ...adminAuthHeader(token) } });
      if (!r.ok) return;
      const data = (await r.json()) as { ok?: boolean; admin?: { name?: string; email?: string } };
      if (data?.ok && data.admin) {
        setLabel(data.admin.name?.trim() || data.admin.email || fallback);
      }
    } catch {
      /* keep fallback */
    }
  }, []);

  React.useEffect(() => {
    void refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === ADMIN_SESSION_STORAGE_KEY || e.key === null) void refresh();
    };
    const onFocus = () => void refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh]);

  if (!label) return null;

  return (
    <Link
      href="/admin?screen=profile"
      className={["accountBadge accountBadge--admin", props.compact ? "accountBadge--compact" : ""].filter(Boolean).join(" ")}
      title={`Admin signed in as ${label}`}
      aria-label={`Admin profile (${label})`}
      onClick={props.onNavigate}
    >
      <span className="accountBadgeAvatar" aria-hidden>
        {initialsFor(label)}
      </span>
      {props.compact ? null : <span className="accountBadgeName">{label}</span>}
    </Link>
  );
}
