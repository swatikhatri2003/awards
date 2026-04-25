"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Field, Shell } from "../_components/Shell";
import { clearPendingRegistration, readPendingRegistration } from "../_lib/authSession";

function normalizeMobile(v: string) {
  return v.replace(/[^\d]/g, "");
}

function friendlyError(code: string) {
  switch (code) {
    case "NOT_FOUND":
      return "User not found. Please register again to receive a fresh OTP.";
    case "EXPIRED":
      return "OTP expired. Please go back and request a new OTP.";
    case "INVALID":
      return "Invalid OTP. Please try again.";
    case "TOO_MANY_ATTEMPTS":
      return "Too many attempts. Please request a new OTP.";
    case "INVALID_INPUT":
      return "Please check your details and try again.";
    default:
      return code;
  }
}

export default function OtpPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [otp, setOtp] = React.useState("");
  const [pending, setPending] = React.useState<ReturnType<typeof readPendingRegistration>>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  React.useEffect(() => {
    const p = readPendingRegistration();
    setPending(p);
    if (!p) router.replace("/register");
  }, [router]);

  async function submitVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!pending) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: pending.email.trim(),
          mobile: normalizeMobile(pending.mobile.trim()),
          otp: otp.trim(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(friendlyError(data?.error || "OTP_VERIFY_FAILED"));

      clearPendingRegistration();

      const catRes = await fetch(`${apiBase}/categories`);
      const catData = await catRes.json().catch(() => null);
      const rawList = catData?.categories;
      if (!catRes.ok || !Array.isArray(rawList) || rawList.length === 0) {
        throw new Error("No voting categories are available right now. Please try again later.");
      }
      const sorted = [...rawList].sort(
        (a: { category_id: number }, b: { category_id: number }) =>
          Number(a.category_id) - Number(b.category_id),
      );
      const firstId = Number(sorted[0]?.category_id);
      if (!Number.isFinite(firstId) || firstId <= 0) {
        throw new Error("No voting categories are available right now. Please try again later.");
      }
      router.push(`/vote/${firstId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP_VERIFY_FAILED");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Shell
      title="Verify OTP"
      subtitle={
        pending
          ? `OTP sent to ${pending.email} and ${pending.mobile}.`
          : "Loading your details..."
      }
      right={
        <button className="linkBtn" type="button" onClick={() => router.push("/register")}>
          Edit details
        </button>
      }
    >
      <form onSubmit={submitVerify} className="form">
        <Field
          label="Enter OTP"
          required
          value={otp}
          onChange={setOtp}
          placeholder="6-digit OTP"
          inputMode="numeric"
        />

        {error ? <div className="error">Error: {error}</div> : null}

        <div className="row">
          <button className="btnSecondary" type="button" disabled={loading} onClick={() => router.push("/register")}>
            Back
          </button>
          <button className="btn" disabled={loading || !pending}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </form>
    </Shell>
  );
}

