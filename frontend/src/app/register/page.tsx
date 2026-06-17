"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, Shell } from "../_components/Shell";
import { writePendingRegistration } from "../_lib/authSession";
import { getPublicApiBase } from "../_lib/publicApiBase";

function normalizeMobile(v: string) {
  return v.replace(/[^\d]/g, "");
}

function friendlyError(code: string) {
  switch (code) {
    case "INVALID_INPUT":
      return "Please check your details and try again.";
    case "MOBILE_NOT_ALLOWED":
      return "This mobile number is not authorized. Please contact admin.";
    case "EVENT_NOT_FOUND":
      return "This event link is invalid or the event no longer exists.";
    default:
      return code;
  }
}

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);
  const toastTimerRef = React.useRef<number | null>(null);

  const showToast = React.useCallback((msg: string, durationMs = 5000) => {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), durationMs);
  }, []);

  React.useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    mobile: "",
  });

  const apiBase = getPublicApiBase();
  const eventId = React.useMemo(() => {
    const raw = searchParams?.get("eventId") || "";
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
  }, [searchParams]);

  const [eventTitle, setEventTitle] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const r = await fetch(`${apiBase}/events/${eventId}`);
        const data = await r.json().catch(() => null);
        if (cancelled) return;
        if (r.ok && data?.ok && data?.event?.title) {
          setEventTitle(String(data.event.title).trim() || null);
        } else {
          setEventTitle(null);
        }
      } catch {
        if (!cancelled) setEventTitle(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBase, eventId]);

  const pageTitle = eventTitle ? `Register for ${eventTitle}` : "Register";

  async function submitRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload: Record<string, string> = {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: normalizeMobile(form.mobile.trim()),
        eventId: String(eventId),
      };

      const res = await fetch(`${apiBase}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const code = data?.error || "REGISTER_FAILED";
        const message = friendlyError(code);
        if (code === "MOBILE_NOT_ALLOWED") {
          showToast(message);
        }
        throw new Error(message);
      }

      writePendingRegistration({
        name: payload.name,
        email: payload.email,
        mobile: payload.mobile,
        eventId,
      });
      router.push("/otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "REGISTER_FAILED");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Shell
      bare
      title={pageTitle}
      subtitle="Enter your details. We’ll send an OTP to your email, WhatsApp, and SMS for verification."
      right={
        <Link href={`/events/${eventId}`} className="linkBtn">
          Event details
        </Link>
      }
    >
      {toast ? (
        <div
          role="alert"
          aria-live="assertive"
          onClick={() => setToast(null)}
          style={{
            position: "fixed",
            top: "max(16px, env(safe-area-inset-top, 0px))",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            padding: "12px 18px",
            borderRadius: 12,
            background: "#fee2e2",
            color: "#7f1d1d",
            border: "1px solid #fecaca",
            boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
            fontWeight: 600,
            fontSize: 14,
            maxWidth: "min(92vw, 480px)",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          {toast}
        </div>
      ) : null}

      <form onSubmit={submitRegister} className="form formMotion">
        <Field
          label="Full Name"
          required
          value={form.name}
          onChange={(v) => setForm((s) => ({ ...s, name: v }))}
          placeholder="Enter your name"
          maxLength={70}
        />
        <Field
          label="Email"
          required
          type="email"
          value={form.email}
          onChange={(v) => setForm((s) => ({ ...s, email: v }))}
          placeholder="name@example.com"
          maxLength={70}
        />
        <Field
          label="Mobile"
          required
          value={form.mobile}
          onChange={(v) => setForm((s) => ({ ...s, mobile: v }))}
          placeholder="10-digit mobile number"
          inputMode="tel"
          maxLength={10}
        />

        {error ? <div className="error">Error: {error}</div> : null}

        <button type="submit" className="btn btnLg" disabled={loading}>
          {loading ? "Sending OTP..." : "Register & Send OTP"}
        </button>
      </form>
    </Shell>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <Shell bare title="Register" subtitle="Loading…">
          <p className="hint" style={{ marginTop: 8 }}>
            Loading registration…
          </p>
        </Shell>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}

