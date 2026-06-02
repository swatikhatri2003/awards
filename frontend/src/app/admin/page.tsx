"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { withBasePath } from "../_lib/basePath";
import {
  adminAuthHeader,
  clearAdminSession,
  readAdminToken,
  writeAdminSession,
} from "../_lib/adminAuthSession";
import { getPublicApiBase, getUploadsOrigin } from "../_lib/publicApiBase";

type ApiEvent = {
  event_id: number;
  title: string | null;
  description: string | null;
  image: string | null;
  admin_id: number;
  is_private?: number | boolean | null;
  start_time?: string | null;
  end_time?: string | null;
};

function toDatetimeLocalValue(iso: string | null | undefined): string {
  if (iso == null || iso === "") return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* ─── Styles ──────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #e8f0fe;
    --surface: #ffffff;
    --surface2: #f8fafc;
    --surface3: #f1f5f9;
    --border: rgba(15, 23, 42, 0.1);
    --border-hover: rgba(15, 23, 42, 0.18);
    --accent: #2563eb;
    --accent-glow: rgba(37, 99, 235, 0.15);
    --accent-dim: rgba(37, 99, 235, 0.12);
    --text: #0f172a;
    --text-muted: #64748b;
    --text-faint: #94a3b8;
    --success: #059669;
    --success-dim: rgba(5, 150, 105, 0.12);
    --danger: #dc2626;
    --danger-dim: rgba(220, 38, 38, 0.1);
    --warning: #d97706;
    --font: 'DM Sans', sans-serif;
    --mono: 'DM Mono', monospace;
    --radius: 10px;
    --radius-lg: 16px;
    --radius-xl: 20px;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font); }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg);
    color-scheme: light;
  }

  /* ── Auth layout ── */
  .auth-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }

  .auth-card {
    width: 100%;
    max-width: 420px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
  }
  .auth-card::before {
    content: '';
    position: absolute;
    top: -60px; left: -60px;
    width: 200px; height: 200px;
    background: var(--accent-glow);
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
  }

  .auth-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2rem;
  }
  .auth-logo-icon {
    width: 36px; height: 36px;
    background: var(--accent);
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
  }
  .auth-logo-icon svg { width: 18px; height: 18px; fill: #fff; }
  .auth-logo-text { font-size: 15px; font-weight: 600; color: var(--text); }

  .auth-title { font-size: 22px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
  .auth-subtitle { font-size: 14px; color: var(--text-muted); margin-bottom: 1.75rem; line-height: 1.5; }

  /* ── Fields ── */
  .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
  .label { font-size: 13px; font-weight: 500; color: var(--text-muted); letter-spacing: 0.02em; }

  .input {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    font-family: var(--font);
    font-size: 14px;
    padding: 10px 14px;
    transition: border-color 0.15s, background 0.15s;
    outline: none;
    width: 100%;
  }
  .input:hover { border-color: var(--border-hover); }
  .input:focus { border-color: var(--accent); background: #ffffff; box-shadow: 0 0 0 3px var(--accent-dim); }
  .input::placeholder { color: var(--text-faint); }
  textarea.input { resize: vertical; min-height: 72px; }
  input[type="file"].input { padding: 8px 14px; cursor: pointer; }
  input[type="datetime-local"].input { color-scheme: light; }

  /* ── Buttons ── */
  .btn {
    background: var(--accent);
    border: none;
    border-radius: var(--radius);
    color: #fff;
    cursor: pointer;
    font-family: var(--font);
    font-size: 14px;
    font-weight: 500;
    padding: 10px 18px;
    transition: opacity 0.15s, transform 0.1s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  .btn:hover { opacity: 0.88; }
  .btn:active { transform: scale(0.97); }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  .btn-full { width: 100%; justify-content: center; padding: 12px 18px; font-size: 15px; }

  .btn-ghost {
    background: transparent;
    border: 1px solid var(--border-hover);
    color: var(--text-muted);
  }
  .btn-ghost:hover { border-color: var(--border-hover); background: var(--surface2); color: var(--text); }

  .btn-danger { background: var(--danger-dim); border: 1px solid rgba(240,82,82,0.25); color: var(--danger); }
  .btn-danger:hover { background: var(--danger); color: #fff; }

  .link-btn {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    font-family: var(--font);
    font-size: 13px;
    padding: 0;
    text-decoration: none;
  }
  .link-btn:hover { text-decoration: underline; }

  /* ── Error / Alert ── */
  .error-box {
    background: var(--danger-dim);
    border: 1px solid rgba(240,82,82,0.25);
    border-radius: var(--radius);
    color: var(--danger);
    font-size: 13px;
    padding: 10px 14px;
    margin-bottom: 1rem;
  }
  .info-box {
    background: var(--success-dim);
    border: 1px solid rgba(5, 150, 105, 0.25);
    border-radius: var(--radius);
    color: var(--success);
    font-size: 13px;
    padding: 10px 14px;
    margin-bottom: 1rem;
  }

  /* ── Dashboard ── */
  .dashboard {
    max-width: 860px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
    width: 100%;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--border);
  }
  .topbar-brand {
    display: flex; align-items: center; gap: 10px;
  }
  .topbar-icon {
    width: 32px; height: 32px;
    background: var(--accent);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .topbar-icon svg { width: 16px; height: 16px; fill: #fff; }
  .topbar-title { font-size: 16px; font-weight: 600; }

  /* ── Section head ── */
  .section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .section-title {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  /* ── Panel ── */
  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .panel-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .panel-title-pill {
    font-size: 11px;
    font-weight: 500;
    background: var(--accent-dim);
    color: var(--accent);
    padding: 2px 8px;
    border-radius: 20px;
    letter-spacing: 0.03em;
  }

  .grid2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  @media (max-width: 540px) { .grid2 { grid-template-columns: 1fr; } }

  .row-mix {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: start;
  }

  .actions-row {
    display: flex;
    gap: 8px;
    margin-top: 1.25rem;
    flex-wrap: wrap;
  }

  /* ── Toggle ── */
  .toggle-field {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: border-color 0.15s;
  }
  .toggle-field:hover { border-color: var(--border-hover); }
  .toggle-label { font-size: 13px; color: var(--text-muted); flex: 1; line-height: 1.4; }

  .switch {
    appearance: none;
    width: 36px; height: 20px;
    background: #e2e8f0;
    border: 1px solid var(--border-hover);
    border-radius: 20px;
    cursor: pointer;
    position: relative;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .switch::after {
    content: '';
    position: absolute;
    top: 2px; left: 2px;
    width: 14px; height: 14px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 50%;
    transition: transform 0.2s, background 0.2s;
  }
  .switch:checked { background: var(--accent); border-color: var(--accent); }
  .switch:checked::after { transform: translateX(16px); background: #fff; border-color: transparent; }

  /* ── Fieldset ── */
  .fieldset {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .fieldset-legend {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 0 6px;
  }
  .fieldset-hint { font-size: 12px; color: var(--text-faint); margin-bottom: 12px; }

  /* ── Banner preview ── */
  .banner-preview {
    margin-top: 10px;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--border);
    position: relative;
  }
  .banner-preview img { width: 100%; height: 140px; object-fit: cover; display: block; }
  .banner-badge {
    position: absolute;
    bottom: 8px; right: 8px;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    backdrop-filter: blur(8px);
  }
  .badge-ok { background: var(--success-dim); color: var(--success); border: 1px solid rgba(34,211,160,0.25); }
  .badge-busy { background: rgba(245,166,35,0.15); color: var(--warning); border: 1px solid rgba(245,166,35,0.25); }
  .badge-preview { background: rgba(15, 23, 42, 0.06); color: var(--text-muted); border: 1px solid var(--border); }

  /* ── Event list ── */
  .event-list { display: flex; flex-direction: column; gap: 10px; }

  .event-card {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.25rem 1.5rem;
    transition: border-color 0.15s;
    min-width: 0;
    overflow: hidden;
  }
  .event-card:hover { border-color: var(--border-hover); }

  .event-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 6px; min-width: 0; }
  .event-title { font-size: 15px; font-weight: 600; color: var(--text); min-width: 0; overflow-wrap: anywhere; }
  .event-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 2px 9px;
    border-radius: 20px;
    flex-shrink: 0;
  }
  .badge-private { background: rgba(240,82,82,0.12); color: var(--danger); border: 1px solid rgba(240,82,82,0.2); }
  .badge-public { background: var(--success-dim); color: var(--success); border: 1px solid rgba(34,211,160,0.2); }

  .event-desc {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.55;
    margin-bottom: 1rem;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    word-break: break-word;
    max-width: 100%;
    min-width: 0;
  }

  .event-actions { display: flex; gap: 8px; flex-wrap: wrap; }

  .hint { font-size: 14px; color: var(--text-faint); text-align: center; padding: 2.5rem 1rem; }

  /* ── Divider ── */
  .divider { height: 1px; background: var(--border); margin: 1.75rem 0; }

  /* ── Forgot/Reset row ── */
  .auth-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.25rem;
    gap: 8px;
    font-size: 13px;
    color: var(--text-muted);
  }
`;

/* ─── Logo icon ──────────────────────────────────────────────────── */
function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

/* ─── AdminContent ───────────────────────────────────────────────── */
function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const apiBase = getPublicApiBase();
  const apiOrigin = getUploadsOrigin();

  const nextAfterLogin = searchParams.get("next") || "";
  const presetEventId = searchParams.get("eventId") || "";

  const [view, setView] = React.useState<
    "boot" | "auth" | "forgot" | "reset" | "register" | "register-verify" | "dashboard"
  >(() => (readAdminToken() ? "boot" : "auth"));
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [info, setInfo] = React.useState<string | null>(null);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const [events, setEvents] = React.useState<ApiEvent[]>([]);
  const [createTitle, setCreateTitle] = React.useState("");
  const [createDescription, setCreateDescription] = React.useState("");
  const [createImageName, setCreateImageName] = React.useState("");
  const [eventBannerPreviewUrl, setEventBannerPreviewUrl] = React.useState<string | null>(null);
  const [createIsPrivate, setCreateIsPrivate] = React.useState(false);
  const [createStartLocal, setCreateStartLocal] = React.useState("");
  const [createEndLocal, setCreateEndLocal] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [editingEventId, setEditingEventId] = React.useState<number | null>(null);
  const createPanelRef = React.useRef<HTMLDivElement>(null);

  const loadEvents = React.useCallback(async () => {
    const token = readAdminToken();
    if (!token) return;
    const r = await fetch(`${apiBase}/admin/events`, { headers: { ...adminAuthHeader(token) } });
    const data = await r.json().catch(() => null);
    if (!r.ok) { if (r.status === 401) clearAdminSession(); return; }
    setEvents(Array.isArray(data?.events) ? data.events : []);
  }, [apiBase]);

  React.useEffect(() => {
    const token = readAdminToken();
    if (!token) { setView("auth"); return; }
    void (async () => {
      const r = await fetch(`${apiBase}/admin/me`, { headers: { ...adminAuthHeader(token) } });
      if (r.ok) { setView("dashboard"); await loadEvents(); }
      else { clearAdminSession(); setView("auth"); }
    })();
  }, [apiBase, loadEvents]);

  const revokeEventBannerPreview = React.useCallback(() => {
    setEventBannerPreviewUrl(prev => { if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev); return null; });
  }, []);

  React.useEffect(() => {
    return () => { setEventBannerPreviewUrl(prev => { if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev); return null; }); };
  }, []);

  function redirectAfterLogin() {
    if (nextAfterLogin === "/actions" && presetEventId) { router.push(withBasePath(`/actions?eventId=${encodeURIComponent(presetEventId)}`)); return; }
    if (nextAfterLogin.startsWith("/")) router.push(withBasePath(nextAfterLogin));
  }

  function validateEmail(value: string): string | null {
    const v = value.trim().toLowerCase();
    if (!v) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address.";
    return null;
  }

  function validatePassword(value: string): string | null {
    if (!value) return "Password is required.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (value.length > 72) return "Password must be at most 72 characters.";
    return null;
  }

  function openRegister() {
    setError(null);
    setConfirmPassword("");
    setOtp("");
    setView("register");
  }

  async function submitRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const emailErr = validateEmail(email);
    if (emailErr) { setError(emailErr); setLoading(false); return; }
    const pwErr = validatePassword(password);
    if (pwErr) { setError(pwErr); setLoading(false); return; }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const r = await fetch(`${apiBase}/admin/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error(data?.message || data?.error || "REGISTER_FAILED");
      setOtp("");
      setView("register-verify");
    } catch (err) {
      setError(err instanceof Error ? err.message : "REGISTER_FAILED");
    } finally {
      setLoading(false);
    }
  }

  async function submitRegisterVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const emailErr = validateEmail(email);
    if (emailErr) { setError(emailErr); setLoading(false); return; }
    const code = otp.trim();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit OTP from your email.");
      setLoading(false);
      return;
    }
    try {
      const r = await fetch(`${apiBase}/admin/auth/verify-registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), otp: code }),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error(data?.message || data?.error || "VERIFY_FAILED");
      writeAdminSession(data.token, data.admin);
      setPassword("");
      setConfirmPassword("");
      setOtp("");
      setView("dashboard");
      await loadEvents();
      redirectAfterLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "VERIFY_FAILED");
    } finally {
      setLoading(false);
    }
  }

  async function resendRegisterOtp() {
    setLoading(true);
    setError(null);
    setInfo(null);
    const emailErr = validateEmail(email);
    const pwErr = validatePassword(password);
    if (emailErr || pwErr) {
      setError(emailErr || pwErr || "Enter email and password on the register screen first.");
      setLoading(false);
      return;
    }
    try {
      const r = await fetch(`${apiBase}/admin/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error(data?.message || data?.error || "RESEND_FAILED");
      setInfo("A new OTP has been sent to your email.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "RESEND_FAILED");
    } finally {
      setLoading(false);
    }
  }

  async function submitSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const emailErr = validateEmail(email);
    if (emailErr) { setError(emailErr); setLoading(false); return; }
    const pwErr = validatePassword(password);
    if (pwErr) { setError(pwErr); setLoading(false); return; }
    try {
      const r = await fetch(`${apiBase}/admin/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) {
        if (data?.error === "EMAIL_NOT_VERIFIED") {
          setView("register-verify");
        }
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
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const r = await fetch(`${apiBase}/admin/auth/forgot-password`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim() }) });
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error(data?.message || data?.error || "FORGOT_FAILED");
      setView("reset");
    } catch (err) { setError(err instanceof Error ? err.message : "FORGOT_FAILED"); }
    finally { setLoading(false); }
  }

  async function submitReset(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const r = await fetch(`${apiBase}/admin/auth/reset-password`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), otp: otp.trim(), newPassword }) });
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error(data?.message || data?.error || "RESET_FAILED");
      writeAdminSession(data.token, data.admin);
      setOtp(""); setNewPassword(""); setView("dashboard"); await loadEvents(); redirectAfterLogin();
    } catch (err) { setError(err instanceof Error ? err.message : "RESET_FAILED"); }
    finally { setLoading(false); }
  }

  function beginEditEvent(ev: ApiEvent) {
    setEditingEventId(ev.event_id);
    setCreateTitle((ev.title || "").trim());
    setCreateDescription((ev.description || "").trim());
    const img = (ev.image || "").trim();
    setCreateImageName(img);
    setEventBannerPreviewUrl(prev => { if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev); return img ? `${apiOrigin}/uploads/event/${encodeURIComponent(img)}` : null; });
    setCreateIsPrivate(ev.is_private === true || ev.is_private === 1);
    setCreateStartLocal(toDatetimeLocalValue(ev.start_time));
    setCreateEndLocal(toDatetimeLocalValue(ev.end_time));
    setError(null);
    if (typeof window !== "undefined") {
      createPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function cancelEditEvent() {
    setEditingEventId(null); setCreateTitle(""); setCreateDescription(""); setCreateImageName("");
    revokeEventBannerPreview(); setCreateIsPrivate(false); setCreateStartLocal(""); setCreateEndLocal(""); setError(null);
  }

  async function uploadEventPhoto(file: File) {
    const token = readAdminToken(); if (!token) return;
    setUploading(true); setError(null);
    try {
      const fd = new FormData(); fd.append("photo", file);
      const r = await fetch(`${apiOrigin}/api/uploads/event-photo`, { method: "POST", body: fd, headers: { ...adminAuthHeader(token) } });
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error(data?.error || "UPLOAD_FAILED");
      const name = String(data?.filename || "").trim();
      if (!name) throw new Error("UPLOAD_FAILED");
      setEventBannerPreviewUrl(prev => { if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev); return `${apiOrigin}/uploads/event/${encodeURIComponent(name)}`; });
      setCreateImageName(name);
    } catch (err) { setError(err instanceof Error ? err.message : "UPLOAD_FAILED"); }
    finally { setUploading(false); }
  }

  async function submitCreateEvent(e: React.FormEvent) {
    e.preventDefault();
    const token = readAdminToken(); if (!token) return;
    if ((createStartLocal && !createEndLocal) || (!createStartLocal && createEndLocal)) { setError("Set both voting start and end, or leave both empty."); return; }
    setLoading(true); setError(null);
    try {
      const isEdit = editingEventId != null;
      const votingExtras = createStartLocal && createEndLocal
        ? { start_time: new Date(createStartLocal).toISOString(), end_time: new Date(createEndLocal).toISOString() }
        : isEdit ? { start_time: "", end_time: "" } : {};
      const body = isEdit
        ? { title: createTitle.trim(), description: createDescription.trim() || null, image: createImageName.trim() || null, is_private: createIsPrivate ? 1 : 0, ...votingExtras }
        : { title: createTitle.trim(), description: createDescription.trim() || undefined, image: createImageName.trim() || undefined, is_private: createIsPrivate ? 1 : 0, ...votingExtras };
      const r = await fetch(isEdit ? `${apiBase}/admin/events/${editingEventId}` : `${apiBase}/admin/events`, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify(body),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error(data?.message || data?.error || (isEdit ? "UPDATE_EVENT_FAILED" : "CREATE_EVENT_FAILED"));
      if (isEdit) { cancelEditEvent(); } else {
        setCreateTitle(""); setCreateDescription(""); revokeEventBannerPreview(); setCreateImageName(""); setCreateIsPrivate(false); setCreateStartLocal(""); setCreateEndLocal("");
      }
      await loadEvents();
    } catch (err) { setError(err instanceof Error ? err.message : "SAVE_EVENT_FAILED"); }
    finally { setLoading(false); }
  }

  function logout() { clearAdminSession(); setView("auth"); setEvents([]); }

  function fullRegisterUrl(eventId: number) {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${withBasePath(`/register?eventId=${eventId}`)}`;
  }

  /* ─── Dashboard view ─── */
  if (view === "dashboard") {
    const token = readAdminToken();
    const hasEvents = events.length > 0;

    const createPanel = (
      <div className="panel" ref={createPanelRef}>
        <div className="panel-title">
          {editingEventId != null ? "Edit event" : "New event"}
          {editingEventId != null && <span className="panel-title-pill">Editing</span>}
        </div>

        <form onSubmit={submitCreateEvent}>
          <div className="row-mix">
            <div className="field">
              <div className="label">Event title *</div>
              <input className="input" required value={createTitle} onChange={e => setCreateTitle(e.target.value)} maxLength={200} placeholder="Enter event name" />
            </div>
            <div className="field">
              <div className="label">Visibility</div>
              <label className="toggle-field">
                <input type="checkbox" className="switch" role="switch" checked={createIsPrivate} onChange={e => setCreateIsPrivate(e.target.checked)} aria-checked={createIsPrivate} />
                <span className="toggle-label">Private (invite-only)</span>
              </label>
            </div>
          </div>

          <div className="field">
            <div className="label">Description</div>
            <textarea className="input" value={createDescription} onChange={e => setCreateDescription(e.target.value)} maxLength={500} rows={2} placeholder="Optional short description" />
          </div>

          <div className="field">
            <div className="label">Banner image</div>
            <input className="input" type="file" accept="image/*" disabled={uploading || loading}
              onChange={e => {
                const f = e.currentTarget.files?.[0];
                if (f) {
                  setEventBannerPreviewUrl(prev => { if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev); return URL.createObjectURL(f); });
                  setCreateImageName(""); void uploadEventPhoto(f);
                }
                e.currentTarget.value = "";
              }}
            />
            {eventBannerPreviewUrl ? (
              <div className="banner-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={eventBannerPreviewUrl} alt="" />
                <span className={`banner-badge ${uploading ? "badge-busy" : createImageName ? "badge-ok" : "badge-preview"}`}>
                  {uploading ? "Uploading…" : createImageName ? "Banner ready" : "Preview"}
                </span>
              </div>
            ) : null}
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Voting window</legend>
            <p className="fieldset-hint">Set both to restrict when votes count, or leave empty for open voting.</p>
            <div className="grid2">
              <div className="field" style={{ margin: 0 }}>
                <div className="label">Start</div>
                <input className="input" type="datetime-local" value={createStartLocal} onChange={e => setCreateStartLocal(e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <div className="label">End</div>
                <input className="input" type="datetime-local" value={createEndLocal} onChange={e => setCreateEndLocal(e.target.value)} />
              </div>
            </div>
          </fieldset>

          <div className="actions-row">
            <button type="submit" className="btn" disabled={loading || uploading}>
              {loading ? "Saving…" : editingEventId != null ? "Save changes" : "Create event"}
            </button>
            {editingEventId != null && (
              <button type="button" className="btn btn-ghost" disabled={loading || uploading} onClick={cancelEditEvent}>Cancel</button>
            )}
          </div>
        </form>
      </div>
    );

    const eventsSection = (
      <>
        <div className="section-head">
          <span className="section-title">Your events</span>
          <span style={{ fontSize: 13, color: "var(--text-faint)" }}>{events.length} total</span>
        </div>

        {events.length === 0 ? (
          <p className="hint">No events yet — create one {hasEvents ? "below" : "above"}.</p>
        ) : (
          <div className="event-list">
            {events.map(ev => (
              <div key={ev.event_id} className="event-card">
                <div className="event-header">
                  <span className="event-title">{ev.title || "Untitled"}</span>
                  <span className={`event-badge ${ev.is_private === true || ev.is_private === 1 ? "badge-private" : "badge-public"}`}>
                    {ev.is_private === true || ev.is_private === 1 ? "Private" : "Public"}
                  </span>
                </div>
                {ev.description && <p className="event-desc">{ev.description}</p>}
                <div className="event-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => beginEditEvent(ev)}>Edit</button>
                  <a className="btn btn-ghost" href={withBasePath(`/awards_f/actions?eventId=${ev.event_id}`)} style={{ textDecoration: "none" }}>Manage Categories & Nominees</a>
                  <a className="btn btn-ghost" href={withBasePath(`/awards_f/screen?eventId=${ev.event_id}`)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>Open LED</a>
                  <button type="button" className="btn btn-ghost" onClick={() => void navigator.clipboard.writeText(fullRegisterUrl(ev.event_id))}>
                    Copy register link
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );

    return (
      <div className="page">
        <style>{css}</style>
        <div className="dashboard">
          <div className="topbar">
            <div className="topbar-brand">
              <div className="topbar-icon"><BoltIcon /></div>
              <span className="topbar-title">Event Admin</span>
            </div>
            <button type="button" className="btn btn-ghost" onClick={logout}>Log out</button>
          </div>

          {error && <div className="error-box">{error}</div>}

          {hasEvents ? (
            <>
              {eventsSection}
              {createPanel}
            </>
          ) : (
            <>
              {createPanel}
              {eventsSection}
            </>
          )}

          {!token && <p className="error-box" style={{ marginTop: 16 }}>Session missing — please log in again.</p>}
        </div>
      </div>
    );
  }

  /* ─── Forgot password ─── */
  if (view === "forgot") {
    return (
      <div className="page">
        <style>{css}</style>
        <div className="auth-wrap">
          <div className="auth-card">
            <div className="auth-logo">
              <div className="auth-logo-icon"><BoltIcon /></div>
              <span className="auth-logo-text">Event Admin</span>
            </div>
            <div className="auth-title">Forgot password</div>
            <div className="auth-subtitle">Enter your email and we'll send a 6-digit OTP.</div>
            {error && <div className="error-box">{error}</div>}
            <form onSubmit={submitForgot}>
              <div className="field">
                <div className="label">Email</div>
                <input className="input" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <button type="submit" className="btn btn-full" disabled={loading}>{loading ? "Sending…" : "Send OTP"}</button>
            </form>
            <div className="auth-footer">
              <button type="button" className="link-btn" onClick={() => setView("auth")}>← Back to sign in</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Register ─── */
  if (view === "register") {
    return (
      <div className="page">
        <style>{css}</style>
        <div className="auth-wrap">
          <div className="auth-card">
            <div className="auth-logo">
              <div className="auth-logo-icon"><BoltIcon /></div>
              <span className="auth-logo-text">Event Admin</span>
            </div>
            <div className="auth-title">Create account</div>
            <div className="auth-subtitle">Register with your email. We will send a one-time code to verify it.</div>
            {error && <div className="error-box">{error}</div>}
            <form onSubmit={submitRegister}>
              <div className="field">
                <div className="label">Email</div>
                <input
                  className="input"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="field">
                <div className="label">Password</div>
                <input
                  className="input"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  minLength={8}
                  maxLength={72}
                />
              </div>
              <div className="field">
                <div className="label">Confirm password</div>
                <input
                  className="input"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  minLength={8}
                  maxLength={72}
                />
              </div>
              <button type="submit" className="btn btn-full" disabled={loading}>
                {loading ? "Sending OTP…" : "Send OTP"}
              </button>
            </form>
            <div className="auth-footer" style={{ flexDirection: "column", gap: 10 }}>
              <button type="button" className="link-btn" onClick={() => { setError(null); setView("auth"); }}>
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Register OTP verify ─── */
  if (view === "register-verify") {
    return (
      <div className="page">
        <style>{css}</style>
        <div className="auth-wrap">
          <div className="auth-card">
            <div className="auth-logo">
              <div className="auth-logo-icon"><BoltIcon /></div>
              <span className="auth-logo-text">Event Admin</span>
            </div>
            <div className="auth-title">Verify your email</div>
            <div className="auth-subtitle">
              Enter the 6-digit OTP sent to <strong>{email.trim() || "your email"}</strong>.
            </div>
            {error && <div className="error-box">{error}</div>}
            {info && <div className="info-box">{info}</div>}
            <form onSubmit={submitRegisterVerify}>
              <div className="field">
                <div className="label">Email</div>
                <input
                  className="input"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="field">
                <div className="label">OTP</div>
                <input
                  className="input"
                  required
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="6-digit code"
                  inputMode="numeric"
                  maxLength={6}
                  pattern="\d{6}"
                />
              </div>
              <button type="submit" className="btn btn-full" disabled={loading}>
                {loading ? "Verifying…" : "Verify & continue"}
              </button>
            </form>
            <div className="auth-footer" style={{ flexDirection: "column", gap: 10 }}>
              <button type="button" className="link-btn" disabled={loading} onClick={() => void resendRegisterOtp()}>
                Resend OTP
              </button>
              <button type="button" className="link-btn" onClick={() => { setError(null); setView("register"); }}>
                ← Back to register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Reset password ─── */
  if (view === "reset") {
    return (
      <div className="page">
        <style>{css}</style>
        <div className="auth-wrap">
          <div className="auth-card">
            <div className="auth-logo">
              <div className="auth-logo-icon"><BoltIcon /></div>
              <span className="auth-logo-text">Event Admin</span>
            </div>
            <div className="auth-title">Reset password</div>
            <div className="auth-subtitle">Enter the OTP from your email and choose a new password.</div>
            {error && <div className="error-box">{error}</div>}
            <form onSubmit={submitReset}>
              <div className="field">
                <div className="label">Email</div>
                <input className="input" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <div className="label">OTP</div>
                <input className="input" required value={otp} onChange={e => setOtp(e.target.value)} placeholder="6-digit code" inputMode="numeric" maxLength={6} />
              </div>
              <div className="field">
                <div className="label">New password</div>
                <input className="input" type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="At least 8 characters" />
              </div>
              <button type="submit" className="btn btn-full" disabled={loading}>{loading ? "Saving…" : "Reset & sign in"}</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Boot (session check) ─── */
  if (view === "boot") {
    return (
      <div className="page">
        <style>{css}</style>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontFamily: "var(--font)", fontSize: 14 }}>
          Checking session…
        </div>
      </div>
    );
  }

  /* ─── Sign in ─── */
  return (
    <div className="page">
      <style>{css}</style>
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="auth-logo-icon"><BoltIcon /></div>
            <span className="auth-logo-text">Event Admin</span>
          </div>
          <div className="auth-title">Welcome back</div>
          <div className="auth-subtitle">Sign in to manage your events.</div>
          {error && <div className="error-box">{error}</div>}
          <form onSubmit={submitSignIn}>
            <div className="field">
              <div className="label">Email</div>
              <input className="input" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="field">
              <div className="label">Password</div>
              <input className="input" type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" minLength={8} maxLength={72} />
            </div>
            <button type="submit" className="btn btn-full" disabled={loading}>{loading ? "Please wait…" : "Sign in"}</button>
          </form>
          <div className="auth-footer" style={{ flexDirection: "column", gap: 10 }}>
            <button type="button" className="link-btn" onClick={() => { setError(null); setView("forgot"); }}>Forgot password?</button>
            <span style={{ color: "var(--text-muted)" }}>
              Don&apos;t have an account?{" "}
              <button type="button" className="link-btn" onClick={openRegister}>Register</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontFamily: "sans-serif", fontSize: 14 }}>Loading…</div>}>
      <AdminContent />
    </Suspense>
  );
}