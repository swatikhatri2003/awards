"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Shell } from "../_components/Shell";

type TabKey = "HOME" | "CATEGORY" | "WINNER";

type EventInfo = {
  name: string;
  photoSrc: string;
};

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

const FALLBACK_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23111424'/%3E%3Ctext x='50%25' y='50%25' fill='%23aab3c5' font-size='14' text-anchor='middle' dominant-baseline='middle'%3ENo Photo%3C/text%3E%3C/svg%3E";
const ERROR_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23111424'/%3E%3Ctext x='50%25' y='50%25' fill='%23aab3c5' font-size='14' text-anchor='middle' dominant-baseline='middle'%3EImage error%3C/text%3E%3C/svg%3E";

function nomineePhotoUrl(apiBase: string, photo?: string) {
  const p = (photo || "").trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p) || p.startsWith("data:")) return p;
  const base = apiBase.replace(/\/+$/, "");

  // Backend may return:
  // - "abc.jpg"
  // - "nominee/abc.jpg"
  // - "/uploads/nominee/abc.jpg"
  // Normalize to just the filename, then prefix with /uploads/nominee/
  const normalized = p.replace(/\\/g, "/");
  const last = normalized.split("/").filter(Boolean).pop() || "";
  const safeFile = encodeURIComponent(last);
  return `${base}/uploads/nominee/${safeFile}`;
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

function HomeEvent({ event }: { event: EventInfo }) {
  return (
    <section className="panel" aria-label="Event">
      <div className="panelHeader">
        <div className="panelTitle">{event.name}</div>
        <div className="panelMeta">Event</div>
      </div>
      <div style={{ width: "100%" }}>
        <img
          src={event.photoSrc}
          alt={event.name}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 12,
            display: "block",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
      </div>
    </section>
  );
}

function Dashboard({ apiBase }: { apiBase: string }) {
  const [tab, setTab] = React.useState<TabKey>("CATEGORY");
  const event: EventInfo = React.useMemo(
    () => ({
      name: "YLF Member Awards",
      photoSrc: "/ylf-member-awards-banner.png",
    }),
    [],
  );

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = React.useState(false);
  const [categoriesError, setCategoriesError] = React.useState<string | null>(null);

  const [expandedCategoryId, setExpandedCategoryId] = React.useState<number | null>(null);
  const [nomineesByCategory, setNomineesByCategory] = React.useState<Record<number, Nominee[]>>({});
  const [nomineesLoadingByCategory, setNomineesLoadingByCategory] = React.useState<Record<number, boolean>>({});
  const [nomineesErrorByCategory, setNomineesErrorByCategory] = React.useState<Record<number, string | null>>({});

  const [timerInputSec, setTimerInputSec] = React.useState<Record<number, string>>({});
  const [timers, setTimers] = React.useState<Record<number, TimerState>>({});

  React.useEffect(() => {
    if (tab !== "CATEGORY" && tab !== "WINNER") return;
    setCategoriesLoading(true);
    setCategoriesError(null);
    fetch(`${apiBase}/categories`)
      .then(async (r) => {
        const data = await r.json().catch(() => null);
        if (!r.ok) throw new Error(data?.error || "CATEGORIES_FAILED");
        return data as { ok: boolean; categories: Category[] };
      })
      .then((data) => {
        const next = Array.isArray(data.categories) ? data.categories : [];
        setCategories(next);
        setExpandedCategoryId((cur) => cur ?? (next[0]?.category_id ?? null));
      })
      .catch((e) => setCategoriesError(e instanceof Error ? e.message : "CATEGORIES_FAILED"))
      .finally(() => setCategoriesLoading(false));
  }, [apiBase, tab]);

  const loadNominees = React.useCallback(
    async (categoryId: number) => {
      if (!categoryId) return;
      if (Array.isArray(nomineesByCategory[categoryId])) return;
      setNomineesLoadingByCategory((p) => ({ ...p, [categoryId]: true }));
      setNomineesErrorByCategory((p) => ({ ...p, [categoryId]: null }));
      try {
        const r = await fetch(`${apiBase}/categories/${categoryId}/nominees`);
        const data = await r.json().catch(() => null);
        if (!r.ok) throw new Error(data?.error || "NOMINEES_FAILED");
        const list = Array.isArray((data as { nominees?: Nominee[] }).nominees) ? (data as any).nominees : [];
        setNomineesByCategory((p) => ({ ...p, [categoryId]: list }));
      } catch (e) {
        setNomineesErrorByCategory((p) => ({
          ...p,
          [categoryId]: e instanceof Error ? e.message : "NOMINEES_FAILED",
        }));
      } finally {
        setNomineesLoadingByCategory((p) => ({ ...p, [categoryId]: false }));
      }
    },
    [apiBase, nomineesByCategory],
  );

  React.useEffect(() => {
    if (tab !== "CATEGORY") return;
    if (!expandedCategoryId) return;
    void loadNominees(expandedCategoryId);
  }, [tab, expandedCategoryId, loadNominees]);

  React.useEffect(() => {
    if (tab !== "WINNER") return;
    for (const c of categories) {
      if (!c.winner_nominee_id) continue;
      void loadNominees(c.category_id);
    }
  }, [tab, categories, loadNominees]);

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

      {tab === "HOME" ? <HomeEvent event={event} /> : null}
      {tab === "WINNER" ? (
        <section className="panel" aria-label="Winners by category">
          <div className="panelHeader">
            <div className="panelTitle">Winners</div>
            <div className="panelMeta">
              {categoriesLoading ? "Loading..." : categoriesError ? "Failed" : `${categories.length} categories`}
            </div>
          </div>

          <div className="hint" style={{ marginBottom: 10 }}>
            Each category shows its winner (based on the winner nominee id stored in the category table).
          </div>

          {categoriesError ? <div className="error">Error: {categoriesError}</div> : null}

          <div className="nomineeGrid">
            {categories.map((c) => {
              const nominees = nomineesByCategory[c.category_id] || [];
              const nomineesLoading = nomineesLoadingByCategory[c.category_id] || false;
              const nomineesError = nomineesErrorByCategory[c.category_id] || null;
              const winnerId = c.winner_nominee_id ?? null;
              const winner = winnerId ? nominees.find((n) => n.nominee_id === winnerId) : undefined;

              const src =
                winner && (nomineePhotoUrl(apiBase, winner.photo) || FALLBACK_PHOTO)
                  ? nomineePhotoUrl(apiBase, winner.photo) || FALLBACK_PHOTO
                  : FALLBACK_PHOTO;

              return (
                <div key={c.category_id} className="nomineeCard" style={{ padding: 12 }}>
                  <div className="listTitle" style={{ whiteSpace: "normal", marginBottom: 8 }}>
                    <span className="badge">#{c.category_id}</span> {c.name}
                  </div>

                  {!winnerId ? <div className="hint">Winner not set for this category.</div> : null}
                  {winnerId && nomineesLoading ? <div className="hint">Loading winner...</div> : null}
                  {winnerId && nomineesError ? <div className="error">Error: {nomineesError}</div> : null}

                  {winnerId && !nomineesLoading && !nomineesError ? (
                    winner ? (
                      <>
                        <div className="nomineePhotoWrap" style={{ marginBottom: 10 }}>
                          <img
                            className="nomineePhoto"
                            src={src}
                            alt={winner.name}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = ERROR_PHOTO;
                            }}
                          />
                        </div>
                        <div className="nomineeName">{winner.name}</div>
                      </>
                    ) : (
                      <div className="hint">Winner nominee not found in this category.</div>
                    )
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {tab === "CATEGORY" ? (
        <section className="panel" aria-label="Award categories and nominees">
          <div className="panelHeader">
            <div className="panelTitle">Award Categories</div>
            <div className="panelMeta">{categoriesLoading ? "Loading..." : `${categories.length} categories`}</div>
          </div>

          <div className="hint" style={{ marginBottom: 10 }}>
            Select an award category to see nominees. Timer controls are per-category (useful during live award show rounds).
          </div>

          {categoriesError ? <div className="error">Error: {categoriesError}</div> : null}

          <div className="list" role="list" style={{ maxHeight: "unset", overflow: "visible" }}>
            {categories.map((c) => {
              const t = timers[c.category_id];
              const isOpen = expandedCategoryId === c.category_id;
              const nominees = nomineesByCategory[c.category_id] || [];
              const nomineesLoading = nomineesLoadingByCategory[c.category_id] || false;
              const nomineesError = nomineesErrorByCategory[c.category_id] || null;

              return (
                <div
                  key={c.category_id}
                  className={isOpen ? "listItem listItemActive" : "listItem"}
                  aria-expanded={isOpen}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setExpandedCategoryId((cur) => (cur === c.category_id ? null : c.category_id));
                    void loadNominees(c.category_id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpandedCategoryId((cur) => (cur === c.category_id ? null : c.category_id));
                      void loadNominees(c.category_id);
                    }
                  }}
                >
                  <div className="listTop">
                    <div className="listTitle" style={{ whiteSpace: "normal" }}>
                      <span className="badge">#{c.category_id}</span> {c.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="timerChip">{formatTime(t?.remainingSec ?? 0)}</div>
                      <div className="badge" aria-hidden="true">
                        {isOpen ? "Hide" : "View"}
                      </div>
                    </div>
                  </div>

                  {!isOpen ? <div className="listSubtle">Tap to view nominees and run the timer.</div> : null}

                  {isOpen ? (
                    <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 10 }}>
                      <div className="timerRow">
                        <input
                          className="timerInput"
                          inputMode="numeric"
                          placeholder="Timer (seconds)"
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

                      <div style={{ marginTop: 12 }}>
                        <div className="panelHeader" style={{ marginBottom: 8 }}>
                          <div className="panelTitle" style={{ fontSize: 14 }}>
                            Nominees
                          </div>
                          <div className="panelMeta">
                            {nomineesLoading ? "Loading..." : nomineesError ? "Failed" : `${nominees.length} nominees`}
                          </div>
                        </div>

                        {nomineesError ? <div className="error">Error: {nomineesError}</div> : null}
                        {nomineesLoading ? <div className="hint">Loading nominees...</div> : null}
                        {!nomineesLoading && !nomineesError && nominees.length === 0 ? (
                          <div className="hint">No nominees found for this category.</div>
                        ) : null}

                        <div className="nomineeGrid">
                          {nominees.map((n) => {
                            const src = nomineePhotoUrl(apiBase, n.photo) || FALLBACK_PHOTO;
                            return (
                              <div key={n.nominee_id} className="nomineeCard">
                                <div className="nomineePhotoWrap">
                                  <img
                                    className="nomineePhoto"
                                    src={src}
                                    alt={n.name}
                                    loading="lazy"
                                    onError={(e) => {
                                      e.currentTarget.src = ERROR_PHOTO;
                                    }}
                                  />
                                </div>
                                <div className="nomineeName">{n.name}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default function ActionsPage() {
  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  return (
    <Shell
      title="Awards Show Dashboard"
      subtitle="Live award categories with nominees. Open a category to view nominees, and use the timer for each round."
      wide
      right={
        <button className="linkBtn" type="button" onClick={() => router.push("/register")}>
          Register again
        </button>
      }
    >
      <div className="dashWrap">
       

        <Dashboard apiBase={apiBase} />
      </div>
    </Shell>
  );
}

