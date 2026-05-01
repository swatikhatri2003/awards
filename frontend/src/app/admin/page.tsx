"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, Shell } from "../_components/Shell";
import { withBasePath } from "../_lib/basePath";
import {
  adminAuthHeader,
  clearAdminSession,
  readAdminToken,
  writeAdminSession,
} from "../_lib/adminAuthSession";

type ApiEvent = {
  event_id: number;
  title: string | null;
  description: string | null;
  image: string | null;
  admin_id: number;
};

function normalizeApiBase(raw: string) {
  const root = raw.replace(/\/+$/, "");
  return /\/api$/i.test(root) ? root : `${root}/api`;
}

function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://3.0.81.7/api";
  const apiBase = normalizeApiBase(rawApiBase);
  const apiOrigin = apiBase.replace(/\/api$/i, "");

  const nextAfterLogin = searchParams.get("next") || "";
  const presetEventId = searchParams.get("eventId") || "";

  const [view, setView] = React.useState<"auth" | "forgot" | "reset" | "dashboard">("auth");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const [events, setEvents] = React.useState<ApiEvent[]>([]);
  const [createTitle, setCreateTitle] = React.useState("");
  const [createDescription, setCreateDescription] = React.useState("");
  const [createImagePath, setCreateImagePath] = React.useState("");
  const [uploading, setUploading] = React.useState(false);

  const loadEvents = React.useCallback(async () => {
    const token = readAdminToken();
    if (!token) return;
    const r = await fetch(`${apiBase}/admin/events`, { headers: { ...adminAuthHeader(token) } });
    const data = await r.json().catch(() => null);
    if (!r.ok) {
      if (r.status === 401) clearAdminSession();
      return;
    }
    setEvents(Array.isArray(data?.events) ? data.events : []);
  }, [apiBase]);

  React.useEffect(() => {
    const token = readAdminToken();
    if (!token) return;
    void (async () => {
      const r = await fetch(`${apiBase}/admin/me`, { headers: { ...adminAuthHeader(token) } });
      if (r.ok) {
        setView("dashboard");
        await loadEvents();
      }
    })();
  }, [apiBase, loadEvents]);

  function redirectAfterLogin() {
    if (nextAfterLogin === "/actions" && presetEventId) {
      router.push(withBasePath(`/actions?eventId=${encodeURIComponent(presetEventId)}`));
      return;
    }
    if (nextAfterLogin.startsWith("/")) {
      router.push(withBasePath(nextAfterLogin));
    }
  }

  async function submitSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${apiBase}/admin/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) {
        throw new Error(data?.message || data?.error || "SIGN_IN_FAILED");
      }
      writeAdminSession(data.token, data.admin);
      setPassword("");
      setView("dashboard");
      await loadEvents();
      redirectAfterLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "SIGN_IN_FAILED");
    } finally {
      setLoading(false);
    }
  }

  async function submitForgot(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${apiBase}/admin/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error(data?.message || data?.error || "FORGOT_FAILED");
      setView("reset");
    } catch (err) {
      setError(err instanceof Error ? err.message : "FORGOT_FAILED");
    } finally {
      setLoading(false);
    }
  }

  async function submitReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${apiBase}/admin/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
          newPassword,
        }),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error(data?.message || data?.error || "RESET_FAILED");
      writeAdminSession(data.token, data.admin);
      setOtp("");
      setNewPassword("");
      setView("dashboard");
      await loadEvents();
      redirectAfterLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "RESET_FAILED");
    } finally {
      setLoading(false);
    }
  }

  async function uploadEventPhoto(file: File) {
    const token = readAdminToken();
    if (!token) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("photo", file);
      const r = await fetch(`${apiOrigin}/api/uploads/event-photo`, {
        method: "POST",
        body: fd,
        headers: { ...adminAuthHeader(token) },
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error(data?.error || "UPLOAD_FAILED");
      setCreateImagePath(String(data?.path || ""));
    } catch (err) {
      setError(err instanceof Error ? err.message : "UPLOAD_FAILED");
    } finally {
      setUploading(false);
    }
  }

  async function submitCreateEvent(e: React.FormEvent) {
    e.preventDefault();
    const token = readAdminToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${apiBase}/admin/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...adminAuthHeader(token),
        },
        body: JSON.stringify({
          title: createTitle.trim(),
          description: createDescription.trim() || undefined,
          image: createImagePath.trim() || undefined,
        }),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error(data?.message || data?.error || "CREATE_EVENT_FAILED");
      setCreateTitle("");
      setCreateDescription("");
      setCreateImagePath("");
      await loadEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : "CREATE_EVENT_FAILED");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    clearAdminSession();
    setView("auth");
    setEvents([]);
  }

  function fullRegisterUrl(eventId: number) {
    if (typeof window === "undefined") return "";
    const path = withBasePath(`/register?eventId=${eventId}`);
    return `${window.location.origin}${path}`;
  }

  if (view === "dashboard") {
    const token = readAdminToken();
    return (
      <Shell title="Event admin" subtitle="Your events and voter registration links." showLogos>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <button type="button" className="linkBtn" onClick={logout}>
            Log out
          </button>
        </div>

        {error ? <div className="error">Error: {error}</div> : null}

        <h2 className="headline" style={{ fontSize: "1.25rem", marginTop: 8 }}>
          Create event
        </h2>
        <form className="form" onSubmit={submitCreateEvent}>
          <Field label="Title" required value={createTitle} onChange={setCreateTitle} maxLength={200} />
          <label className="field">
            <div className="label">Description</div>
            <textarea
              className="input"
              value={createDescription}
              onChange={(e) => setCreateDescription(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="Optional"
            />
          </label>
          <label className="field">
            <div className="label">Banner image</div>
            <input
              className="input"
              type="file"
              accept="image/*"
              disabled={uploading || loading}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void uploadEventPhoto(f);
                e.currentTarget.value = "";
              }}
            />
            {createImagePath ? (
              <div className="hint" style={{ marginTop: 8 }}>
                Saved: {createImagePath}
              </div>
            ) : (
              <div className="hint" style={{ marginTop: 8 }}>
                Optional — upload before creating the event.
              </div>
            )}
          </label>
          <button type="submit" className="btn btnLg" disabled={loading || uploading}>
            {loading ? "Saving..." : "Create event"}
          </button>
        </form>

        <h2 className="headline" style={{ fontSize: "1.25rem", marginTop: 28 }}>
          Your events
        </h2>
        {events.length === 0 ? (
          <p className="hint">No events yet. Create one above.</p>
        ) : (
          <div className="list" style={{ marginTop: 12 }}>
            {events.map((ev) => (
              <div
                key={ev.event_id}
                className="listItem"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: 10,
                  padding: "14px 16px",
                }}
              >
                <div className="listTitle">
                  <span className="badge">#{ev.event_id}</span> {ev.title || "Untitled"}
                </div>
                {ev.description ? <div className="hint">{ev.description}</div> : null}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <a
                    className="btn"
                    href={withBasePath(`/actions?eventId=${ev.event_id}`)}
                    style={{ textDecoration: "none", display: "inline-block" }}
                  >
                    Open actions (LED)
                  </a>
                  <button
                    type="button"
                    className="btn btnGhost"
                    onClick={() => {
                      void navigator.clipboard.writeText(fullRegisterUrl(ev.event_id));
                    }}
                  >
                    Copy voter register link
                  </button>
                </div>
                <div className="hint" style={{ wordBreak: "break-all" }}>
                  {fullRegisterUrl(ev.event_id)}
                </div>
              </div>
            ))}
          </div>
        )}

        {!token ? (
          <p className="error" style={{ marginTop: 16 }}>
            Session missing. Please log in again.
          </p>
        ) : null}
      </Shell>
    );
  }

  if (view === "forgot") {
    return (
      <Shell title="Forgot password" subtitle="We’ll email a 6-digit OTP." showLogos>
        <form className="form" onSubmit={submitForgot}>
          <Field label="Email" required type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          {error ? <div className="error">Error: {error}</div> : null}
          <button type="submit" className="btn btnLg" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
          <button type="button" className="linkBtn" style={{ marginTop: 12 }} onClick={() => setView("auth")}>
            Back to sign in
          </button>
        </form>
      </Shell>
    );
  }

  if (view === "reset") {
    return (
      <Shell title="Reset password" subtitle="Enter the OTP from your email and a new password." showLogos>
        <form className="form" onSubmit={submitReset}>
          <Field label="Email" required type="email" value={email} onChange={setEmail} />
          <Field label="OTP" required value={otp} onChange={setOtp} placeholder="6-digit" inputMode="numeric" maxLength={6} />
          <Field
            label="New password"
            required
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="At least 8 characters"
          />
          {error ? <div className="error">Error: {error}</div> : null}
          <button type="submit" className="btn btnLg" disabled={loading}>
            {loading ? "Saving..." : "Reset & sign in"}
          </button>
        </form>
      </Shell>
    );
  }

  return (
    <Shell
      title="Admin sign in"
      subtitle="Use your email and password. New emails register automatically."
      showLogos
      right={
        <button type="button" className="linkBtn" onClick={() => setView("forgot")}>
          Forgot password?
        </button>
      }
    >
      <form className="form" onSubmit={submitSignIn}>
        <Field label="Email" required type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        <Field
          label="Password"
          required
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Min 8 characters"
        />
        {error ? <div className="error">Error: {error}</div> : null}
        <button type="submit" className="btn btnLg" disabled={loading}>
          {loading ? "Please wait..." : "Continue"}
        </button>
      </form>
    </Shell>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<main className="container"><p className="hint">Loading...</p></main>}>
      <AdminContent />
    </Suspense>
  );
}
