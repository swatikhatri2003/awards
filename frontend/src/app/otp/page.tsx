"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Field, Shell } from "../_components/Shell";
import { useToast } from "../_components/ToastProvider";
import { clearPendingRegistration, readPendingRegistration } from "../_lib/authSession";
import { getPublicApiBase } from "../_lib/publicApiBase";
import { signInAsVoter } from "../_lib/accountSession";

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
  const { toastError } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [pending, setPending] = React.useState<ReturnType<typeof readPendingRegistration>>(null);

  const apiBase = getPublicApiBase();

  React.useEffect(() => {
    const p = readPendingRegistration();
    setPending(p);
    if (!p) router.replace("/register");
  }, [router]);

  async function submitVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!pending) return;
    setLoading(true);
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

      const regEventId = pending.eventId;
      clearPendingRegistration();
      if (data?.person?.email && data?.person?.mobile) {
        signInAsVoter({
          ...data.person,
          ...(typeof regEventId === "number" && regEventId > 0 ? { eventId: regEventId } : {}),
        });
      }

      router.push("/usersvote");
    } catch (err) {
      toastError(err instanceof Error ? err.message : "OTP_VERIFY_FAILED");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Shell
      bare
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
      <form onSubmit={submitVerify} className="form formMotion">
        <Field
          label="Enter OTP"
          required
          value={otp}
          onChange={setOtp}
          placeholder="6-digit OTP"
          inputMode="numeric"
        />

        <button className="btn btnLg" disabled={loading || !pending}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

     
    </Shell>
  );
}

