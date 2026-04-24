"use client";

import React from "react";

export default function Home() {
  return (
    <main className="container">
      <section className="card">
        <div className="brand">
          <div className="brandMark" aria-hidden="true" />
          <div>
            <div className="brandTitle">YLF Member Awards</div>
            <div className="brandSubtitle">Nominations & Recognition</div>
          </div>
        </div>

        <h1 className="headline">Register to submit your nomination</h1>
        <p className="subhead">
          Please enter your details. We’ll send an OTP to your email, WhatsApp, and SMS for verification.
        </p>

        <RegisterFlow />
      </section>
    </main>
  );
}

type Step = "REGISTER" | "VERIFY" | "DONE";

function RegisterFlow() {
  const [step, setStep] = React.useState<Step>("REGISTER");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    mobile: "",
    membership_number: "",
  });

  const [otp, setOtp] = React.useState("");

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  async function submitRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload: Record<string, string> = {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
      };
      const membership = form.membership_number.trim();
      if (membership) payload.membership_number = membership;

      const res = await fetch(`${apiBase}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "REGISTER_FAILED");
      }
      setStep("VERIFY");
    } catch (err) {
      setError(err instanceof Error ? err.message : "REGISTER_FAILED");
    } finally {
      setLoading(false);
    }
  }

  async function submitVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          mobile: form.mobile.trim(),
          otp: otp.trim(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "OTP_VERIFY_FAILED");
      }
      setStep("DONE");
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP_VERIFY_FAILED");
    } finally {
      setLoading(false);
    }
  }

  if (step === "DONE") {
    return (
      <div className="dashWrap">
        <div className="success">
          <div className="successIcon" aria-hidden="true">
            ✓
          </div>
          <div>
            <div className="successTitle">Registration verified</div>
            <div className="successBody">You can now proceed with nomination submission.</div>
          </div>
        </div>

        <Dashboard apiBase={apiBase} />
      </div>
    );
  }

  return (
    <div>
      {step === "REGISTER" ? (
        <form onSubmit={submitRegister} className="form">
          <Field
            label="Full Name"
            required
            value={form.name}
            onChange={(v) => setForm((s) => ({ ...s, name: v }))}
            placeholder="Enter your name"
          />
          <Field
            label="Email"
            required
            type="email"
            value={form.email}
            onChange={(v) => setForm((s) => ({ ...s, email: v }))}
            placeholder="name@example.com"
          />
          <Field
            label="Mobile"
            required
            value={form.mobile}
            onChange={(v) => setForm((s) => ({ ...s, mobile: v }))}
            placeholder="10-digit mobile number"
          />
          <Field
            label="YLF Membership Number"
            value={form.membership_number}
            onChange={(v) => setForm((s) => ({ ...s, membership_number: v }))}
            placeholder="Optional"
          />

          {error ? <div className="error">Error: {error}</div> : null}

          <button className="btn" disabled={loading}>
            {loading ? "Sending OTP..." : "Register & Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={submitVerify} className="form">
          <div className="hint">
            OTP sent to <b>{form.email}</b> and <b>{form.mobile}</b>.
          </div>
          <Field
            label="Enter OTP"
            required
            value={otp}
            onChange={setOtp}
            placeholder="6-digit OTP"
          />

          {error ? <div className="error">Error: {error}</div> : null}

          <div className="row">
            <button className="btnSecondary" type="button" disabled={loading} onClick={() => setStep("REGISTER")}>
              Back
            </button>
            <button className="btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

type TabKey = "HOME" | "CATEGORY" | "WINNER";

type Category = {
  category_id: number;
  name: string;
  winner_nominee_id: number | null;
};

type Nominee = {
  nominee_id: number;
  photo: string;
  name: string;
  category_id: number;
  votes: number;
};

type TimerState = {
  durationSec: number;
  remainingSec: number;
  running: boolean;
  error?: string;
};

function formatTime(totalSec: number) {
  const s = Math.max(0, Math.floor(totalSec));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function Dashboard({ apiBase }: { apiBase: string }) {
  const [tab, setTab] = React.useState<TabKey>("CATEGORY");

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = React.useState(false);
  const [categoriesError, setCategoriesError] = React.useState<string | null>(null);

  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(null);
  const [nominees, setNominees] = React.useState<Nominee[]>([]);
  const [nomineesLoading, setNomineesLoading] = React.useState(false);
  const [nomineesError, setNomineesError] = React.useState<string | null>(null);

  const [timerInputSec, setTimerInputSec] = React.useState<Record<number, string>>({});
  const [timers, setTimers] = React.useState<Record<number, TimerState>>({});

  React.useEffect(() => {
    if (tab !== "CATEGORY") return;
    setCategoriesLoading(true);
    setCategoriesError(null);
    fetch(`${apiBase}/categories`)
      .then(async (r) => {
        const data = await r.json().catch(() => null);
        if (!r.ok) throw new Error(data?.error || "CATEGORIES_FAILED");
        return data as { ok: boolean; categories: Category[] };
      })
      .then((data) => {
        setCategories(Array.isArray(data.categories) ? data.categories : []);
        if (data.categories?.length) setSelectedCategoryId((cur) => cur ?? data.categories[0].category_id);
      })
      .catch((e) => setCategoriesError(e instanceof Error ? e.message : "CATEGORIES_FAILED"))
      .finally(() => setCategoriesLoading(false));
  }, [apiBase, tab]);

  React.useEffect(() => {
    if (tab !== "CATEGORY") return;
    if (!selectedCategoryId) return;
    setNomineesLoading(true);
    setNomineesError(null);
    fetch(`${apiBase}/categories/${selectedCategoryId}/nominees`)
      .then(async (r) => {
        const data = await r.json().catch(() => null);
        if (!r.ok) throw new Error(data?.error || "NOMINEES_FAILED");
        return data as { ok: boolean; nominees: Nominee[] };
      })
      .then((data) => setNominees(Array.isArray(data.nominees) ? data.nominees : []))
      .catch((e) => setNomineesError(e instanceof Error ? e.message : "NOMINEES_FAILED"))
      .finally(() => setNomineesLoading(false));
  }, [apiBase, tab, selectedCategoryId]);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setTimers((prev) => {
        let changed = false;
        const next: Record<number, TimerState> = { ...prev };
        for (const k of Object.keys(next)) {
          const key = Number(k);
          const t = next[key];
          if (!t?.running) continue;
          const remaining = Math.max(0, t.remainingSec - 1);
          if (remaining !== t.remainingSec) {
            changed = true;
            next[key] = { ...t, remainingSec: remaining, running: remaining > 0 };
          }
        }
        return changed ? next : prev;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  function setTimer(categoryId: number) {
    const raw = (timerInputSec[categoryId] || "").trim();
    const sec = Number(raw);
    if (!raw || !Number.isFinite(sec) || sec <= 0) {
      setTimers((p) => ({
        ...p,
        [categoryId]: { durationSec: 0, remainingSec: 0, running: false, error: "Enter seconds > 0" },
      }));
      return;
    }
    setTimers((p) => ({
      ...p,
      [categoryId]: { durationSec: Math.floor(sec), remainingSec: Math.floor(sec), running: false },
    }));
  }

  function toggleTimer(categoryId: number) {
    setTimers((p) => {
      const current = p[categoryId];
      if (!current || current.durationSec <= 0) {
        return {
          ...p,
          [categoryId]: { durationSec: 0, remainingSec: 0, running: false, error: "Set timer first" },
        };
      }
      if (current.remainingSec <= 0) {
        return { ...p, [categoryId]: { ...current, remainingSec: current.durationSec, running: true, error: undefined } };
      }
      return { ...p, [categoryId]: { ...current, running: !current.running, error: undefined } };
    });
  }

  function stopTimer(categoryId: number) {
    setTimers((p) => {
      const current = p[categoryId];
      if (!current) return p;
      return { ...p, [categoryId]: { ...current, running: false } };
    });
  }

  return (
    <div className="dash">
      <div className="tabs" role="tablist" aria-label="Main tabs">
        <button className={tab === "HOME" ? "tab tabActive" : "tab"} onClick={() => setTab("HOME")} role="tab">
          Home
        </button>
        <button className={tab === "CATEGORY" ? "tab tabActive" : "tab"} onClick={() => setTab("CATEGORY")} role="tab">
          Category
        </button>
        <button className={tab === "WINNER" ? "tab tabActive" : "tab"} onClick={() => setTab("WINNER")} role="tab">
          Winner
        </button>
      </div>

      {tab === "HOME" ? <EmptyState title="Home" /> : null}
      {tab === "WINNER" ? <EmptyState title="Winner" /> : null}

      {tab === "CATEGORY" ? (
        <div className="grid2">
          <section className="panel">
            <div className="panelHeader">
              <div className="panelTitle">Categories</div>
              <div className="panelMeta">{categoriesLoading ? "Loading..." : `${categories.length} found`}</div>
            </div>

            {categoriesError ? <div className="error">Error: {categoriesError}</div> : null}

            <div className="list" role="list">
              {categories.map((c) => {
                const t = timers[c.category_id];
                const isSelected = selectedCategoryId === c.category_id;
                return (
                  <button
                    key={c.category_id}
                    className={isSelected ? "listItem listItemActive" : "listItem"}
                    onClick={() => setSelectedCategoryId(c.category_id)}
                    type="button"
                  >
                    <div className="listTop">
                      <div className="listTitle">
                        <span className="badge">#{c.category_id}</span> {c.name}
                      </div>
                      <div className="timerChip">{formatTime(t?.remainingSec ?? 0)}</div>
                    </div>

                    <div className="timerRow" onClick={(e) => e.stopPropagation()}>
                      <input
                        className="timerInput"
                        inputMode="numeric"
                        placeholder="Seconds"
                        value={timerInputSec[c.category_id] ?? ""}
                        onChange={(e) =>
                          setTimerInputSec((p) => ({
                            ...p,
                            [c.category_id]: e.target.value.replace(/[^\d]/g, ""),
                          }))
                        }
                        aria-label={`Timer seconds for category ${c.category_id}`}
                      />
                      <button className="btnSmall" type="button" onClick={() => setTimer(c.category_id)}>
                        Set
                      </button>
                      <button className="btnSmall" type="button" onClick={() => toggleTimer(c.category_id)}>
                        {t?.running ? "Pause" : "Start"}
                      </button>
                      <button className="btnSmallGhost" type="button" onClick={() => stopTimer(c.category_id)}>
                        Stop
                      </button>
                    </div>

                    {t?.error ? <div className="miniError">{t.error}</div> : null}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="panel">
            <div className="panelHeader">
              <div className="panelTitle">Nominees</div>
              <div className="panelMeta">
                {selectedCategoryId ? `Category #${selectedCategoryId}` : "Select a category"}
              </div>
            </div>

            {nomineesError ? <div className="error">Error: {nomineesError}</div> : null}

            {nomineesLoading ? <div className="hint">Loading nominees...</div> : null}

            {!nomineesLoading && !nomineesError && nominees.length === 0 ? (
              <div className="hint">No nominees found for this category.</div>
            ) : null}

            <div className="nomineeGrid">
              {nominees.map((n) => (
                <div key={n.nominee_id} className="nomineeCard">
                  <div className="nomineePhotoWrap">
                    <img
                      className="nomineePhoto"
                      src={n.photo ? n.photo : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23111424'/%3E%3Ctext x='50%25' y='50%25' fill='%23aab3c5' font-size='14' text-anchor='middle' dominant-baseline='middle'%3ENo Photo%3C/text%3E%3C/svg%3E"}
                      alt={n.name}
                      loading="lazy"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23111424'/%3E%3Ctext x='50%25' y='50%25' fill='%23aab3c5' font-size='14' text-anchor='middle' dominant-baseline='middle'%3EImage error%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="nomineeName">{n.name}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function EmptyState({ title }: { title: string }) {
  return (
    <div className="panel">
      <div className="panelHeader">
        <div className="panelTitle">{title}</div>
        <div className="panelMeta">Coming soon</div>
      </div>
      <div className="hint">This tab is currently empty.</div>
    </div>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  const id = React.useId();
  return (
    <label className="field" htmlFor={id}>
      <div className="label">
        {props.label} {props.required ? <span className="req">*</span> : null}
      </div>
      <input
        id={id}
        className="input"
        value={props.value}
        type={props.type || "text"}
        placeholder={props.placeholder}
        required={props.required}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </label>
  );
}
