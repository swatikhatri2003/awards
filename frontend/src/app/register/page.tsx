"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Field, Shell } from "../_components/Shell";
import { writePendingRegistration } from "../_lib/authSession";

function normalizeMobile(v: string) {
  return v.replace(/[^\d]/g, "");
}

function friendlyError(code: string) {
  switch (code) {
    case "INVALID_INPUT":
      return "Please check your details and try again.";
    default:
      return code;
  }
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    mobile: "",
    membership_number: "",
  });

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  async function submitRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload: Record<string, string> = {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: normalizeMobile(form.mobile.trim()),
      };
      const membership = form.membership_number.trim();
      if (membership) payload.membership_number = membership;

      const res = await fetch(`${apiBase}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(friendlyError(data?.error || "REGISTER_FAILED"));

      writePendingRegistration({
        name: payload.name,
        email: payload.email,
        mobile: payload.mobile,
        membership_number: membership || undefined,
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
      title="Register"
      subtitle="Enter your details. We’ll send an OTP to your email, WhatsApp, and SMS for verification."
    >
      <form onSubmit={submitRegister} className="form">
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
        <Field
          label="YLF Membership Number"
          value={form.membership_number}
          onChange={(v) => setForm((s) => ({ ...s, membership_number: v }))}
          placeholder="Optional"
          maxLength={20}
        />

        {error ? <div className="error">Error: {error}</div> : null}

        <button className="btn p-2 rounded-lg" disabled={loading}>
          {loading ? "Sending OTP..." : "Register & Send OTP"}
        </button>
      </form>
    </Shell>
  );
}

