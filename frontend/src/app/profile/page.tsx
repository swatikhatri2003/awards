"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Field, Shell } from "../_components/Shell";
import { VoterAccountMenu } from "../_components/VoterAccountMenu";
import {
  clearCurrentUser,
  readCurrentUser,
  readUid,
  writeCurrentUser,
  type CurrentUser,
} from "../_lib/userSession";
import { useToast } from "../_components/ToastProvider";
import { getPublicApiBase } from "../_lib/publicApiBase";

function normalizeMobile(v: string) {
  return v.replace(/[^\d]/g, "");
}

function ProfileContent() {
  const router = useRouter();
  const apiBase = getPublicApiBase();
  const { toastError, toastSuccess } = useToast();

  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [user, setUser] = React.useState<CurrentUser | null>(null);
  const [form, setForm] = React.useState({
    name: "",
    mobile: "",
    membershipNumber: "",
  });

  React.useEffect(() => {
    const current = readCurrentUser();
    if (!current?.id) {
      router.replace("/register");
      return;
    }
    let cancelled = false;
    void (async () => {
      setLoading(true);
      try {
        const r = await fetch(`${apiBase}/users/profile?uid=${current.id}`);
        const data = await r.json().catch(() => null);
        if (!r.ok) throw new Error(data?.error || "PROFILE_LOAD_FAILED");
        const profile = data?.profile as CurrentUser;
        if (cancelled) return;
        const merged: CurrentUser = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          mobile: profile.mobile,
          membershipNumber: profile.membershipNumber,
          eventId: profile.eventId ?? current.eventId,
        };
        setUser(merged);
        writeCurrentUser(merged);
        setForm({
          name: merged.name,
          mobile: merged.mobile,
          membershipNumber: merged.membershipNumber ?? "",
        });
      } catch (e) {
        if (!cancelled) {
          setUser(current);
          setForm({
            name: current.name,
            mobile: current.mobile,
            membershipNumber: current.membershipNumber ?? "",
          });
          toastError(e instanceof Error ? e.message : "PROFILE_LOAD_FAILED");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBase, router]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const name = form.name.trim();
    const mobile = normalizeMobile(form.mobile);
    if (!name || mobile.length < 8) {
      toastError("Name and a valid mobile number are required.");
      return;
    }
    setSaving(true);
    try {
      const r = await fetch(`${apiBase}/users/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.id,
          name,
          mobile,
          membershipNumber: form.membershipNumber.trim() || undefined,
        }),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error(data?.error || "PROFILE_SAVE_FAILED");
      const profile = data?.profile as CurrentUser;
      const updated: CurrentUser = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        mobile: profile.mobile,
        membershipNumber: profile.membershipNumber,
        eventId: profile.eventId ?? user.eventId,
      };
      setUser(updated);
      writeCurrentUser(updated);
      toastSuccess("Profile saved.");
    } catch (e) {
      toastError(e instanceof Error ? e.message : "PROFILE_SAVE_FAILED");
    } finally {
      setSaving(false);
    }
  }

  function logout() {
    clearCurrentUser();
    router.push("/register");
  }

  if (loading && !user) {
    return (
      <Shell title="My profile" subtitle="Loading…">
        <p className="hint">Please wait…</p>
      </Shell>
    );
  }

  if (!user) return null;

  return (
    <Shell
      title="My profile"
      subtitle="View and update your voting account details."
      right={
        <div className="shellHeaderActionGroup">
          <VoterAccountMenu />
          <button className="linkBtn" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      }
    >
      <div className="profileSummary" style={{ marginBottom: 20 }}>
        <div className="profileSummaryLabel">Signed in as</div>
        <div className="profileSummaryValue">{user.name}</div>
        <div className="profileSummaryMeta">{user.email}</div>
      </div>

      <form onSubmit={(e) => void saveProfile(e)}>
        <Field
          label="Full name"
          value={form.name}
          onChange={(v) => setForm((p) => ({ ...p, name: v }))}
          placeholder="Your name"
          maxLength={100}
          required
        />
        <div className="field" style={{ marginBottom: 12 }}>
          <div className="label">Email</div>
          <input className="input" value={user.email} disabled readOnly aria-readonly />
          <p className="hint" style={{ marginTop: 6 }}>
            Email cannot be changed here. Re-register with OTP if you need a new email.
          </p>
        </div>
        <Field
          label="Mobile"
          value={form.mobile}
          onChange={(v) => setForm((p) => ({ ...p, mobile: v.replace(/[^\d\s]/g, "").slice(0, 15) }))}
          placeholder="Mobile number"
          inputMode="numeric"
          required
        />
        <Field
          label="Membership number (optional)"
          value={form.membershipNumber}
          onChange={(v) => setForm((p) => ({ ...p, membershipNumber: v.replace(/[^\d]/g, "").slice(0, 12) }))}
          placeholder="If applicable"
          inputMode="numeric"
        />

        <div className="row" style={{ marginTop: 16 }}>
          <button type="submit" className="btn" disabled={saving || loading}>
            {saving ? "Saving…" : "Save changes"}
          </button>
          {user.eventId ? (
            <Link href={`/usersvote?eventId=${user.eventId}`} className="btnSecondary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              Back to voting
            </Link>
          ) : (
            <Link href="/events" className="btnSecondary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              Browse events
            </Link>
          )}
        </div>
      </form>
    </Shell>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <Shell title="My profile" subtitle="Loading…">
          <p className="hint">Please wait…</p>
        </Shell>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
