"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./led-kiosk.module.css";
import { setYlfCategory, setYlfGraph, setYlfPage, setYlfTimer } from "@/lib/firebase";
import { adminAuthHeader, readAdminToken } from "../_lib/adminAuthSession";
import { withBasePath } from "../_lib/basePath";

type ScreenKey = "HOME" | "CATEGORY" | "WINNER" | "QR";
type AdminScreenKey = ScreenKey | "ADMIN";

type EventInfo = {
  name: string;
  photoSrc: string;
};

type Category = {
  category_id: number;
  name: string;
  winner_nominee_id: number | null;
  event_id?: number | null;
};

type Nominee = {
  nominee_id: number;
  photo: string;
  name: string;
  description?: string | null;
  category_id: number;
  votes: number;
};

type TimerState = {
  durationSec: number;
  remainingSec: number;
  running: boolean;
  error?: string;
};

function nowMs() {
  return Date.now();
}

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

const PHOTO_BASE_URL =
  process.env.NEXT_PUBLIC_PHOTO_BASE_URL ||
  "https://mscsuper.blr1.digitaloceanspaces.com/vdimg";

function nomineePhotoUrl(_apiBase: string, photo?: string) {
  const p = (photo || "").trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p) || p.startsWith("data:")) return p;

  // Backend may return: "abc.jpg" | "nominee/abc.jpg" | "/uploads/nominee/abc.jpg"
  // Normalize to just the filename and prefix with the spaces base URL.
  const normalized = p.replace(/\\/g, "/");
  const last = normalized.split("/").filter(Boolean).pop() || "";
  const safeFile = encodeURIComponent(last);
  const base = PHOTO_BASE_URL.replace(/\/+$/, "");
  return `${base}/${safeFile}`;
}

function HomeEvent({ event }: { event: EventInfo }) {
  return (
    <section className={styles.homeStage} aria-label="Event">
      <h1 className={styles.homeTitle}>{event.name}</h1>
      <img className={styles.heroImg} src={event.photoSrc} alt={event.name} />
    </section>
  );
}

function LedDashboard({
  apiBase,
  apiOrigin,
  eventId,
  token,
}: {
  apiBase: string;
  apiOrigin: string;
  eventId: number;
  token: string;
}) {
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  const [screen, setScreen] = React.useState<AdminScreenKey>("HOME");

  const [homeEvent, setHomeEvent] = React.useState<EventInfo>({
    name: "Event",
    photoSrc: "/ylf-member-awards-banner.png",
  });

  React.useEffect(() => {
    let cancelled = false;
    void fetch(`${apiBase}/events/${eventId}`)
      .then((r) => r.json())
      .then((d: { ok?: boolean; event?: { title?: string; image?: string | null } }) => {
        if (cancelled || !d?.event) return;
        const ev = d.event;
        const rawImg = (ev.image || "").trim();
        const img = rawImg
          ? /^https?:\/\//i.test(rawImg)
            ? rawImg
            : `${apiOrigin}${rawImg.startsWith("/") ? rawImg : `/${rawImg}`}`
          : "/ylf-member-awards-banner.png";
        setHomeEvent({
          name: (ev.title && String(ev.title).trim()) || "Event",
          photoSrc: img,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [apiBase, apiOrigin, eventId]);

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = React.useState(false);
  const [categoriesError, setCategoriesError] = React.useState<string | null>(null);

  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(null);
  const [nomineesByCategory, setNomineesByCategory] = React.useState<Record<number, Nominee[]>>({});
  const [nomineesLoadingByCategory, setNomineesLoadingByCategory] = React.useState<Record<number, boolean>>({});
  const [nomineesErrorByCategory, setNomineesErrorByCategory] = React.useState<Record<number, string | null>>({});

  const [timerInputSec, setTimerInputSec] = React.useState<Record<number, string>>({});
  const [timers, setTimers] = React.useState<Record<number, TimerState>>({});

  const [graphActiveCategoryId, setGraphActiveCategoryId] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (screen !== "CATEGORY" && screen !== "WINNER") return;
    const ac = new AbortController();
    setCategoriesLoading(true);
    setCategoriesError(null);
    fetch(`${apiBase}/categories?eventId=${eventId}`, { signal: ac.signal })
      .then(async (r) => {
        const data = await r.json().catch(() => null);
        if (!r.ok) throw new Error(data?.error || "CATEGORIES_FAILED");
        return data as { ok: boolean; categories: Category[] };
      })
      .then((data) => {
        const raw = Array.isArray(data.categories) ? data.categories : [];
        const hasEventCol = raw.some(
          (c) => c?.event_id != null && Number.isFinite(Number(c.event_id)),
        );
        const next = hasEventCol ? raw.filter((c) => Number(c?.event_id) === eventId) : raw;
        setCategories(next);
        setSelectedCategoryId((cur) => cur);
      })
      .catch((e) => {
        if ((e as { name?: string })?.name === "AbortError") return;
        setCategoriesError(e instanceof Error ? e.message : "CATEGORIES_FAILED");
      })
      .finally(() => setCategoriesLoading(false));
    return () => ac.abort();
  }, [apiBase, screen, eventId]);

  const allNomineesLoadedRef = React.useRef(false);
  const allNomineesInflightRef = React.useRef<Promise<Nominee[]> | null>(null);

  React.useEffect(() => {
    allNomineesLoadedRef.current = false;
    allNomineesInflightRef.current = null;
    setCategories([]);
    setCategoriesError(null);
    setNomineesByCategory({});
    setNomineesLoadingByCategory({});
    setNomineesErrorByCategory({});
    setSelectedCategoryId(null);
    setAdminSelectedCategoryId(null);
    setAdminCategories([]);
    setAdminNominees([]);
  }, [eventId]);

  const fetchAllNominees = React.useCallback(async (): Promise<Nominee[]> => {
    if (allNomineesInflightRef.current) return allNomineesInflightRef.current;
    const p = (async () => {
      const r = await fetch(`${apiBase}/nominees?eventId=${eventId}`);
      const data = await r.json().catch(() => null);
      if (!r.ok) throw new Error((data && (data as any).error) || "NOMINEES_FAILED");
      const list = Array.isArray((data as { nominees?: Nominee[] }).nominees)
        ? ((data as any).nominees as Nominee[])
        : [];
      return list;
    })();
    allNomineesInflightRef.current = p;
    try {
      return await p;
    } finally {
      allNomineesInflightRef.current = null;
    }
  }, [apiBase, eventId]);

  const loadNominees = React.useCallback(
    async (categoryId: number) => {
      if (!categoryId) return;
      if (Array.isArray(nomineesByCategory[categoryId])) return;
      if (allNomineesLoadedRef.current) {
        setNomineesByCategory((p) => (Array.isArray(p[categoryId]) ? p : { ...p, [categoryId]: [] }));
        return;
      }

      setNomineesLoadingByCategory((p) => ({ ...p, [categoryId]: true }));
      setNomineesErrorByCategory((p) => ({ ...p, [categoryId]: null }));
      try {
        const list = await fetchAllNominees();
        const grouped: Record<number, Nominee[]> = {};
        for (const n of list) {
          const cid = Number(n?.category_id);
          if (!Number.isFinite(cid)) continue;
          (grouped[cid] ||= []).push(n);
        }
        allNomineesLoadedRef.current = true;
        setNomineesByCategory((prev) => {
          const next: Record<number, Nominee[]> = { ...prev };
          for (const k of Object.keys(grouped)) {
            next[Number(k)] = grouped[Number(k)];
          }
          if (!Array.isArray(next[categoryId])) next[categoryId] = [];
          return next;
        });
      } catch (e) {
        setNomineesErrorByCategory((p) => ({
          ...p,
          [categoryId]: e instanceof Error ? e.message : "NOMINEES_FAILED",
        }));
      } finally {
        setNomineesLoadingByCategory((p) => ({ ...p, [categoryId]: false }));
      }
    },
    [fetchAllNominees, nomineesByCategory],
  );

  React.useEffect(() => {
    if (screen !== "CATEGORY") return;
    if (!selectedCategoryId) return;
    void loadNominees(selectedCategoryId);
  }, [screen, selectedCategoryId, loadNominees]);

  React.useEffect(() => {
    if (screen !== "WINNER") return;
    for (const c of categories) {
      if (!c.winner_nominee_id) continue;
      void loadNominees(c.category_id);
    }
  }, [screen, categories, loadNominees]);

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
    const duration = Math.floor(sec);
    setTimers((p) => ({
      ...p,
      [categoryId]: { durationSec: duration, remainingSec: duration, running: false },
    }));
    void setYlfTimer({
      categoryId,
      running: false,
      durationSec: duration,
      endsAtMs: 0,
    });
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
      const nextRunning = current.remainingSec <= 0 ? true : !current.running;
      const nextRemaining = current.remainingSec <= 0 ? current.durationSec : current.remainingSec;
      const endsAtMs = nextRunning ? nowMs() + nextRemaining * 1000 : 0;
      void setYlfTimer({
        categoryId,
        running: nextRunning,
        durationSec: current.durationSec,
        endsAtMs,
      });
      return { ...p, [categoryId]: { ...current, remainingSec: nextRemaining, running: nextRunning, error: undefined } };
    });
  }

  function stopTimer(categoryId: number) {
    setTimers((p) => {
      const current = p[categoryId];
      if (!current) return p;
      void setYlfTimer({
        categoryId,
        running: false,
        durationSec: current.durationSec,
        endsAtMs: 0,
      });
      return { ...p, [categoryId]: { ...current, running: false } };
    });
  }

  const selectedCategory =
    selectedCategoryId && categories.length ? categories.find((c) => c.category_id === selectedCategoryId) : undefined;
  const selectedNominees = selectedCategoryId ? nomineesByCategory[selectedCategoryId] || [] : [];
  const selectedNomineesLoading = selectedCategoryId ? nomineesLoadingByCategory[selectedCategoryId] || false : false;
  const selectedNomineesError = selectedCategoryId ? nomineesErrorByCategory[selectedCategoryId] || null : null;
  const selectedTimer = selectedCategoryId ? timers[selectedCategoryId] : undefined;

  const showCategoryDetail = screen === "CATEGORY" && !!selectedCategoryId;

  const goToScreen = React.useCallback((next: ScreenKey) => {
    setScreen(next);
    if (next === "HOME") {
      //console.log(`[UI] Screen button -> HOME; pushing ylf/page="home"`);
      void setYlfPage("home");
    } else if (next === "QR") {
      void setYlfPage("qr");
    } else if (next === "WINNER") {
      //console.log(`[UI] Screen button -> WINNER; pushing ylf/page="winner"`);
      void setYlfPage("winner");
    } else {
     // console.log(`[UI] Screen button -> CATEGORY (no Firebase write yet — waits for a specific category click)`);
    }
  }, []);

  const [adminCategories, setAdminCategories] = React.useState<Category[]>([]);
  const [adminLoading, setAdminLoading] = React.useState(false);
  const [adminError, setAdminError] = React.useState<string | null>(null);
  const [adminSelectedCategoryId, setAdminSelectedCategoryId] = React.useState<number | null>(null);
  const [adminNominees, setAdminNominees] = React.useState<Nominee[]>([]);
  const [adminCategoryNameDraft, setAdminCategoryNameDraft] = React.useState("");
  const [adminWinnerNomineeIdDraft, setAdminWinnerNomineeIdDraft] = React.useState("");
  const [adminNewCategoryName, setAdminNewCategoryName] = React.useState("");
  const [adminNomineeForm, setAdminNomineeForm] = React.useState<{
    nominee_id?: number;
    name: string;
    photo: string;
    description: string;
  }>({ name: "", photo: "", description: "" });

  const loadAdminData = React.useCallback(async () => {
    setAdminLoading(true);
    setAdminError(null);
    try {
      const [catsRes, nomsRes] = await Promise.all([
        fetch(`${apiBase}/categories?eventId=${eventId}`),
        fetch(`${apiBase}/nominees?eventId=${eventId}`),
      ]);
      const catsData = await catsRes.json().catch(() => null);
      const nomsData = await nomsRes.json().catch(() => null);
      if (!catsRes.ok) throw new Error(catsData?.error || "CATEGORIES_FAILED");
      if (!nomsRes.ok) throw new Error(nomsData?.error || "NOMINEES_FAILED");

      const rawCats = Array.isArray(catsData?.categories) ? (catsData.categories as Category[]) : [];
      const hasEventCol = rawCats.some(
        (c) => c?.event_id != null && Number.isFinite(Number(c.event_id)),
      );
      const nextCats = hasEventCol ? rawCats.filter((c) => Number(c?.event_id) === eventId) : rawCats;
      const nextNoms = Array.isArray(nomsData?.nominees) ? (nomsData.nominees as Nominee[]) : [];
      setAdminCategories(nextCats);
      setAdminNominees(nextNoms);
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "ADMIN_LOAD_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }, [eventId, apiBase]);

  React.useEffect(() => {
    if (screen !== "ADMIN") return;
    void loadAdminData();
  }, [screen, loadAdminData]);

  const adminSelectedCategory = React.useMemo(
    () => (adminSelectedCategoryId ? adminCategories.find((c) => c.category_id === adminSelectedCategoryId) : undefined),
    [adminSelectedCategoryId, adminCategories],
  );

  const adminNomineesForSelected = React.useMemo(() => {
    if (!adminSelectedCategoryId) return [];
    return adminNominees
      .filter((n) => Number(n?.category_id) === adminSelectedCategoryId)
      .slice()
      .sort((a, b) => Number(a.nominee_id) - Number(b.nominee_id));
  }, [adminNominees, adminSelectedCategoryId]);

  React.useEffect(() => {
    if (!adminSelectedCategory) return;
    setAdminCategoryNameDraft(adminSelectedCategory.name || "");
    setAdminWinnerNomineeIdDraft(adminSelectedCategory.winner_nominee_id ? String(adminSelectedCategory.winner_nominee_id) : "");
  }, [adminSelectedCategory]);

  async function adminCreateCategory() {
    const name = adminNewCategoryName.trim();
    if (!name) return;
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch(`${apiBase}/admin/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify({ name, eventId }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "CREATE_CATEGORY_FAILED");
      setAdminNewCategoryName("");
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "CREATE_CATEGORY_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  async function adminUpdateCategory() {
    if (!adminSelectedCategoryId) return;
    const name = adminCategoryNameDraft.trim();
    const rawWinner = adminWinnerNomineeIdDraft.trim();
    const winnerVal: number | null = rawWinner ? Number(rawWinner) : null;
    if (rawWinner) {
      const n = Number(rawWinner);
      if (!Number.isFinite(n) || n <= 0) {
        setAdminError("INVALID_WINNER_ID");
        return;
      }
    }
    if (rawWinner && winnerVal === null) {
      setAdminError("INVALID_WINNER_ID");
      return;
    }
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch(
        `${apiBase}/admin/categories/${adminSelectedCategoryId}?eventId=${eventId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
          body: JSON.stringify({ name, winner_nominee_id: winnerVal }),
        },
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "UPDATE_CATEGORY_FAILED");
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "UPDATE_CATEGORY_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  async function adminSaveNominee() {
    if (!adminSelectedCategoryId) return;
    const name = adminNomineeForm.name.trim();
    if (!name) return;
    setAdminLoading(true);
    setAdminError(null);
    try {
      const isEdit = !!adminNomineeForm.nominee_id;
      const url = isEdit
        ? `${apiBase}/admin/nominees/${adminNomineeForm.nominee_id}?eventId=${eventId}`
        : `${apiBase}/admin/nominees?eventId=${eventId}`;
      const method = isEdit ? "PATCH" : "POST";
      const body = isEdit
        ? {
            name,
            photo: adminNomineeForm.photo.trim(),
            description: adminNomineeForm.description.trim() || null,
            category_id: adminSelectedCategoryId,
          }
        : {
            name,
            photo: adminNomineeForm.photo.trim(),
            description: adminNomineeForm.description.trim() || undefined,
            category_id: adminSelectedCategoryId,
          };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "SAVE_NOMINEE_FAILED");
      setAdminNomineeForm({ name: "", photo: "", description: "" });
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "SAVE_NOMINEE_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  const [adminPhotoUploading, setAdminPhotoUploading] = React.useState(false);

  async function adminUploadNomineePhoto(file: File) {
    setAdminPhotoUploading(true);
    setAdminError(null);
    try {
      const fd = new FormData();
      fd.append("photo", file);
      const res = await fetch(`${apiBase}/uploads/nominee-photo`, { method: "POST", body: fd });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "PHOTO_UPLOAD_FAILED");
      const filename = String(data?.filename || "");
      if (!filename) throw new Error("PHOTO_UPLOAD_FAILED");
      setAdminNomineeForm((p) => ({ ...p, photo: filename }));
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "PHOTO_UPLOAD_FAILED");
    } finally {
      setAdminPhotoUploading(false);
    }
  }

  const selectCategory = React.useCallback(
    async (c: Category) => {
      setSelectedCategoryId(c.category_id);
      console.log(`[UI] Category selected -> id=${c.category_id}, name="${c.name}"; fetching nominees...`);

      let nominees: Nominee[] = nomineesByCategory[c.category_id] ?? [];
      if (!Array.isArray(nomineesByCategory[c.category_id])) {
        try {
          setNomineesLoadingByCategory((p) => ({ ...p, [c.category_id]: true }));
          const all = await fetchAllNominees();
          const grouped: Record<number, Nominee[]> = {};
          for (const n of all) {
            const cid = Number(n?.category_id);
            if (!Number.isFinite(cid)) continue;
            (grouped[cid] ||= []).push(n);
          }
          allNomineesLoadedRef.current = true;
          nominees = grouped[c.category_id] ?? [];
          setNomineesByCategory((prev) => {
            const next: Record<number, Nominee[]> = { ...prev };
            for (const k of Object.keys(grouped)) {
              next[Number(k)] = grouped[Number(k)];
            }
            if (!Array.isArray(next[c.category_id])) next[c.category_id] = [];
            return next;
          });
          setNomineesErrorByCategory((p) => ({ ...p, [c.category_id]: null }));
        } catch (e) {
          const msg = e instanceof Error ? e.message : "NOMINEES_FAILED";
          console.error(`[UI] Failed to fetch nominees for category ${c.category_id}:`, msg);
          setNomineesErrorByCategory((p) => ({ ...p, [c.category_id]: msg }));
          nominees = [];
        } finally {
          setNomineesLoadingByCategory((p) => ({ ...p, [c.category_id]: false }));
        }
      }

      setGraphActiveCategoryId(null);
      void setYlfCategory({
        id: c.category_id,
        name: c.name,
        nominees: nominees.map((n) => ({
          id: n.nominee_id,
          name: n.name,
          photo: n.photo ?? "",
          votes: Number(n.votes ?? 0),
        })),
      });
    },
    [fetchAllNominees, nomineesByCategory],
  );

  return (
    <div className={styles.root}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.diagonals} aria-hidden="true">
        <div className={styles.diagonal1} />
        <div className={styles.diagonal2} />
        <div className={styles.diagonal3} />
      </div>

      <div className={styles.stage}>
        <div className={styles.stageScroll}>
        {screen === "HOME" ? <HomeEvent event={homeEvent} /> : null}

        {screen === "CATEGORY" ? (
          <section aria-label="Categories" style={{ width: "100%" }}>
            {!showCategoryDetail ? (
              <>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                  <div className={styles.sectionTitle}>Categories</div>
                  <div className="panelMeta">
                    {categoriesLoading ? "Loading..." : categoriesError ? "Failed" : `${categories.length} categories`}
                  </div>
                </div>

                {categoriesError ? <div className="error" style={{ marginTop: 12 }}>Error: {categoriesError}</div> : null}

                <div className="list" role="list" style={{ maxHeight: "unset", overflow: "visible", marginTop: 14 }}>
                  {categories.map((c) => (
                    <button
                      key={c.category_id}
                      type="button"
                      className={selectedCategoryId === c.category_id ? "listItem listItemActive" : "listItem"}
                      onClick={() => {
                        void selectCategory(c);
                      }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
                    >
                      <div className="listTitle" style={{ whiteSpace: "normal" }}>
                        <span className="badge">#{c.category_id}</span> {c.name}
                      </div>
                      <div className="badge" aria-hidden="true">
                        Open
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ fontSize: "clamp(22px, 3vw, 44px)", fontWeight: 950, letterSpacing: "-0.6px" }}>
                    {selectedCategory?.name || "Category"}
                  </div>
                </div>

                <div style={{ marginTop: 14 }}>
                  <button
                    type="button"
                    className={styles.backBtn}
                    onClick={() => setSelectedCategoryId(null)}
                    title="Back to categories"
                    aria-label="Back to categories"
                  >
                    Back
                  </button>

                  {(selectedTimer?.running || (selectedTimer?.remainingSec ?? 0) > 0) && !selectedTimer?.error ? (
                    <div className={styles.timerHud} aria-live="polite">
                      {formatTime(selectedTimer?.remainingSec ?? 0)}
                    </div>
                  ) : null}

                  <div className={styles.timerCard} aria-label="Timer controls">
                    <div className={styles.timerTitle}>Timer</div>

                    <div className={styles.timerControls}>
                      <input
                        className={styles.timerInput}
                        inputMode="numeric"
                        placeholder="Sec"
                        value={selectedCategoryId ? timerInputSec[selectedCategoryId] ?? "" : ""}
                        onChange={(e) => {
                          if (!selectedCategoryId) return;
                          setTimerInputSec((p) => ({
                            ...p,
                            [selectedCategoryId]: e.target.value.replace(/[^\d]/g, ""),
                          }));
                        }}
                        aria-label="Timer seconds"
                      />
                      <button
                        className={styles.timerBtn}
                        type="button"
                        onClick={() => selectedCategoryId && setTimer(selectedCategoryId)}
                      >
                        Set
                      </button>
                      <button
                        className={styles.timerBtn}
                        type="button"
                        onClick={() => selectedCategoryId && toggleTimer(selectedCategoryId)}
                      >
                        {selectedTimer?.running ? "Pause" : "Start"}
                      </button>
                      <button
                        className={styles.timerBtnGhost}
                        type="button"
                        onClick={() => selectedCategoryId && stopTimer(selectedCategoryId)}
                      >
                        Stop
                      </button>
                    </div>

                    {selectedTimer?.error ? <div className={styles.timerError}>{selectedTimer.error}</div> : null}
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <div className="panelHeader" style={{ marginBottom: 10 }}>
                    <div className="panelTitle" style={{ fontSize: 14 }}>
                      Nominees
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <button
                        type="button"
                        className={styles.timerBtn}
                        onClick={() => {
                          if (!selectedCategory) return;
                          console.log(
                            `[UI] Graph button -> category id=${selectedCategory.category_id}, nominees=${selectedNominees.length}`,
                          );
                          void setYlfGraph({
                            id: selectedCategory.category_id,
                            name: selectedCategory.name,
                            nominees: selectedNominees.map((n) => ({
                              id: n.nominee_id,
                              name: n.name,
                              photo: n.photo ?? "",
                              votes: Number(n.votes ?? 0),
                            })),
                          });
                          setGraphActiveCategoryId(selectedCategory.category_id);
                        }}
                        disabled={
                          !selectedCategory ||
                          selectedNomineesLoading ||
                          graphActiveCategoryId === selectedCategory?.category_id
                        }
                        title={
                          graphActiveCategoryId === selectedCategory?.category_id
                            ? "Graph is live on screen"
                            : "Show vote graph on screen"
                        }
                      >
                        Graph
                      </button>
                      {selectedCategory && graphActiveCategoryId === selectedCategory.category_id ? (
                        <button
                          type="button"
                          className={styles.timerBtn}
                          onClick={() => {
                            if (!selectedCategory) return;
                            console.log(
                              `[UI] Graph close -> reverting to category id=${selectedCategory.category_id}`,
                            );
                            void setYlfCategory({
                              id: selectedCategory.category_id,
                              name: selectedCategory.name,
                              nominees: selectedNominees.map((n) => ({
                                id: n.nominee_id,
                                name: n.name,
                                photo: n.photo ?? "",
                                votes: Number(n.votes ?? 0),
                              })),
                            });
                            setGraphActiveCategoryId(null);
                          }}
                          aria-label="Close graph and show category"
                          title="Close graph (back to category)"
                          style={{
                            width: 32,
                            minWidth: 32,
                            padding: 0,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 900,
                            fontSize: 16,
                            lineHeight: 1,
                          }}
                        >
                          ×
                        </button>
                      ) : null}
                    </div>
                    <div className="panelMeta">
                      {selectedNomineesLoading
                        ? "Loading..."
                        : selectedNomineesError
                          ? "Failed"
                          : `${selectedNominees.length} nominees`}
                    </div>
                  </div>

                  {selectedNomineesError ? <div className="error">Error: {selectedNomineesError}</div> : null}
                  {selectedNomineesLoading ? <div className="hint">Loading nominees...</div> : null}
                  {!selectedNomineesLoading && !selectedNomineesError && selectedNominees.length === 0 ? (
                    <div className="hint">No nominees found for this category.</div>
                  ) : null}

                  <div className="nomineeGrid">
                    {selectedNominees.map((n) => {
                      return (
                        <div
                          key={n.nominee_id}
                          className="listItem"
                          style={{
                            cursor: "default",
                            padding: "12px 14px",
                            borderRadius: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12,
                          }}
                        >
                          <div className="listTitle" style={{ whiteSpace: "normal" }}>
                            {n.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </section>
        ) : null}

        {screen === "WINNER" ? (
          <section aria-label="Winners" style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
              <div className={styles.sectionTitle}>Winners</div>
              <div className="panelMeta">
                {categoriesLoading ? "Loading..." : categoriesError ? "Failed" : `${categories.length} categories`}
              </div>
            </div>

            {categoriesError ? <div className="error" style={{ marginTop: 12 }}>Error: {categoriesError}</div> : null}

            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "minmax(260px, 420px) 1fr",
                gap: 14,
                alignItems: "start",
              }}
            >
              <div className="panel" style={{ minHeight: 240 }}>
                <div className="panelHeader" style={{ marginBottom: 10 }}>
                  <div className="panelTitle" style={{ fontSize: 14 }}>
                    Categories
                  </div>
                  <div className="panelMeta">
                    {categoriesLoading ? "Loading..." : categoriesError ? "Failed" : `${categories.length} categories`}
                  </div>
                </div>

                <div className="list" role="list" style={{ maxHeight: "unset", overflow: "visible" }}>
                  {categories.map((c) => {
                    const nominees = nomineesByCategory[c.category_id] || [];
                    const nomineesLoading = nomineesLoadingByCategory[c.category_id] || false;
                    const nomineesError = nomineesErrorByCategory[c.category_id] || null;
                    const totalVotes = Array.isArray(nominees)
                      ? nominees.reduce((sum, n) => sum + Number(n?.votes ?? 0), 0)
                      : 0;

                    return (
                      <button
                        key={c.category_id}
                        type="button"
                        className={selectedCategoryId === c.category_id ? "listItem listItemActive" : "listItem"}
                        onClick={() => {
                          setSelectedCategoryId(c.category_id);
                          void loadNominees(c.category_id);
                        }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}
                        title={c.name}
                      >
                        <div className="listTitle" style={{ whiteSpace: "normal" }}>
                          <span className="badge">#{c.category_id}</span> {c.name}
                        </div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                          {nomineesError ? <span className="badge">Err</span> : null}
                          {nomineesLoading ? (
                            <span className="badge">...</span>
                          ) : (
                            <span className="badge" title="Total votes in this category">
                              {Array.isArray(nomineesByCategory[c.category_id]) ? `${totalVotes} votes` : "Open"}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="panel" style={{ minHeight: 240 }}>
                <div className="panelHeader" style={{ marginBottom: 10 }}>
                  <div className="panelTitle" style={{ fontSize: 14 }}>
                    {selectedCategory ? selectedCategory.name : "Select a category"}
                  </div>
                  <div className="panelMeta">
                    {selectedCategoryId
                      ? selectedNomineesLoading
                        ? "Loading..."
                        : selectedNomineesError
                          ? "Failed"
                          : `${selectedNominees.length} nominees`
                      : ""}
                  </div>
                </div>

                {!selectedCategoryId ? (
                  <div className="hint">Click a category to see nominee votes.</div>
                ) : selectedNomineesError ? (
                  <div className="error">Error: {selectedNomineesError}</div>
                ) : selectedNomineesLoading ? (
                  <div className="hint">Loading nominees...</div>
                ) : selectedNominees.length === 0 ? (
                  <div className="hint">No nominees found for this category.</div>
                ) : (
                  <div className="nomineeGrid">
                    {[...selectedNominees]
                      .sort((a, b) => {
                        const dv = Number(b?.votes ?? 0) - Number(a?.votes ?? 0);
                        if (dv !== 0) return dv;
                        return String(a?.name ?? "").localeCompare(String(b?.name ?? ""), undefined, {
                          sensitivity: "base",
                        });
                      })
                      .map((n, idx) => {
                        const votes = Number(n?.votes ?? 0);
                        const isTop = idx === 0;
                        return (
                          <div
                            key={n.nominee_id}
                            className="listItem"
                            style={{
                              cursor: "default",
                              padding: "12px 14px",
                              borderRadius: 12,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 12,
                              outline: isTop ? "2px solid rgba(255, 228, 26, 0.85)" : "none",
                            }}
                          >
                            <div className="listTitle" style={{ whiteSpace: "normal" }}>
                              <span className="badge" style={{ marginRight: 8 }}>
                                #{idx + 1}
                              </span>
                              {n.name}
                            </div>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                              {isTop ? <span className="badge">TOP</span> : null}
                              <span className="badge" title="Total votes">
                                {votes}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : null}

        {screen === "ADMIN" ? (
          <section aria-label="Admin actions" style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
              <div className={styles.sectionTitle}>Admin</div>
              <div className="panelMeta">
                Event #{eventId} {adminLoading ? "• Working..." : ""}
              </div>
            </div>

            <div style={{ marginTop: 12 }} className="panel">
              <div className="panelHeader" style={{ marginBottom: 10 }}>
                <div className="panelTitle" style={{ fontSize: 14 }}>
                  Register link
                </div>
                <div className="panelMeta">Passes eventId</div>
              </div>
              <a className="linkBtn" href={withBasePath(`/register?eventId=${eventId}`)}>
                Open registration for Event #{eventId}
              </a>
            </div>

            {adminError ? (
              <div className="error" style={{ marginTop: 12 }}>
                Error: {adminError}
              </div>
            ) : null}

            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "minmax(260px, 420px) 1fr",
                gap: 14,
                alignItems: "start",
              }}
            >
              <div className="panel" style={{ minHeight: 240 }}>
                <div className="panelHeader" style={{ marginBottom: 10 }}>
                  <div className="panelTitle" style={{ fontSize: 14 }}>
                    Categories
                  </div>
                  <div className="panelMeta">{adminCategories.length} total</div>
                </div>

                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <input
                    className="input"
                    value={adminNewCategoryName}
                    placeholder="New category name"
                    onChange={(e) => setAdminNewCategoryName(e.target.value)}
                    disabled={adminLoading}
                  />
                  <button className="btn" type="button" onClick={adminCreateCategory} disabled={adminLoading}>
                    Add
                  </button>
                </div>

                <div className="list" role="list" style={{ maxHeight: "unset", overflow: "visible" }}>
                  {adminCategories.map((c) => (
                    <button
                      key={c.category_id}
                      type="button"
                      className={
                        adminSelectedCategoryId === c.category_id ? "listItem listItemActive" : "listItem"
                      }
                      onClick={() => setAdminSelectedCategoryId(c.category_id)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}
                      title={c.name}
                    >
                      <div className="listTitle" style={{ whiteSpace: "normal" }}>
                        <span className="badge">#{c.category_id}</span> {c.name}
                      </div>
                      {c.winner_nominee_id ? <span className="badge">Winner</span> : <span className="badge">—</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="panel" style={{ minHeight: 240 }}>
                <div className="panelHeader" style={{ marginBottom: 10 }}>
                  <div className="panelTitle" style={{ fontSize: 14 }}>
                    {adminSelectedCategory ? `Edit: ${adminSelectedCategory.name}` : "Select a category"}
                  </div>
                  <div className="panelMeta">
                    {adminSelectedCategoryId ? `${adminNomineesForSelected.length} nominees` : ""}
                  </div>
                </div>

                {!adminSelectedCategory ? (
                  <div className="hint">Pick a category to edit and manage nominees.</div>
                ) : (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 120px", gap: 10 }}>
                      <input
                        className="input"
                        value={adminCategoryNameDraft}
                        onChange={(e) => setAdminCategoryNameDraft(e.target.value)}
                        placeholder="Category name"
                        disabled={adminLoading}
                      />
                      <input
                        className="input"
                        value={adminWinnerNomineeIdDraft}
                        onChange={(e) => setAdminWinnerNomineeIdDraft(e.target.value.replace(/[^\d]/g, ""))}
                        placeholder="Winner ID"
                        inputMode="numeric"
                        disabled={adminLoading}
                      />
                      <button className="btn" type="button" onClick={adminUpdateCategory} disabled={adminLoading}>
                        Save
                      </button>
                    </div>

                    <div style={{ marginTop: 14 }}>
                      <div className="panelHeader" style={{ marginBottom: 10 }}>
                        <div className="panelTitle" style={{ fontSize: 14 }}>
                          Nominees
                        </div>
                        <div className="panelMeta">Add / update</div>
                      </div>

                      <input
                        className="input"
                        value={adminNomineeForm.name}
                        onChange={(e) => setAdminNomineeForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Nominee name"
                        disabled={adminLoading}
                      />
                      <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "center", flexWrap: "wrap" }}>
                        <input
                          className="input"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const f = e.currentTarget.files?.[0];
                            if (f) void adminUploadNomineePhoto(f);
                            e.currentTarget.value = "";
                          }}
                          disabled={adminLoading || adminPhotoUploading}
                        />
                        {adminPhotoUploading ? (
                          <span className="hint" style={{ margin: 0 }}>
                            Uploading...
                          </span>
                        ) : null}
                      </div>
                      <textarea
                        className="input"
                        value={adminNomineeForm.description}
                        onChange={(e) => setAdminNomineeForm((p) => ({ ...p, description: e.target.value }))}
                        placeholder="Description (optional)"
                        style={{ marginTop: 10, minHeight: 96, resize: "vertical" }}
                        disabled={adminLoading}
                      />
                      <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "center" }}>
                        <button className="btn" type="button" onClick={adminSaveNominee} disabled={adminLoading}>
                          {adminNomineeForm.nominee_id ? "Update nominee" : "Add nominee"}
                        </button>
                        {adminNomineeForm.nominee_id ? (
                          <button
                            className="btn btnGhost"
                            type="button"
                            onClick={() => setAdminNomineeForm({ name: "", photo: "", description: "" })}
                            disabled={adminLoading}
                          >
                            Cancel edit
                          </button>
                        ) : null}
                      </div>

                      <div className="nomineeGrid" style={{ marginTop: 12 }}>
                        {adminNomineesForSelected.map((n) => (
                          <button
                            key={n.nominee_id}
                            type="button"
                            className="listItem"
                            onClick={() =>
                              setAdminNomineeForm({
                                nominee_id: n.nominee_id,
                                name: n.name || "",
                                photo: n.photo || "",
                                description: n.description || "",
                              })
                            }
                            style={{
                              textAlign: "left",
                              padding: "12px 14px",
                              borderRadius: 12,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 12,
                            }}
                            title="Click to edit"
                          >
                            <div className="listTitle" style={{ whiteSpace: "normal" }}>
                              <span className="badge">#{n.nominee_id}</span> {n.name}
                            </div>
                            <span className="badge">{Number(n.votes ?? 0)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        ) : null}
        </div>
      </div>

      <nav className={styles.dock} aria-label="Screen controls">
        <button
          type="button"
          className={`${styles.squareBtn} ${screen === "HOME" ? styles.squareBtnActive : styles.squareBtnMuted}`}
          onClick={() => {
            goToScreen("HOME");
          }}
          aria-label="Home"
          title="Home"
        >
          H
        </button>
        <button
          type="button"
          className={`${styles.squareBtn} ${screen === "CATEGORY" ? styles.squareBtnActive : styles.squareBtnMuted}`}
          onClick={() => {
            goToScreen("CATEGORY");
            setSelectedCategoryId(null);
          }}
          aria-label="Categories"
          title="Categories"
        >
          C
        </button>
        <button
          type="button"
          className={`${styles.squareBtn} ${screen === "WINNER" ? styles.squareBtnActive : styles.squareBtnMuted}`}
          onClick={() => {
            goToScreen("WINNER");
          }}
          aria-label="Winners"
          title="Winners"
        >
          W
        </button>
        <button
          type="button"
          className={`${styles.squareBtn} ${screen === "QR" ? styles.squareBtnActive : styles.squareBtnMuted}`}
          onClick={() => {
            goToScreen("QR");
          }}
          aria-label="QR"
          title="QR"
        >
          QR
        </button>
        <button
          type="button"
          className={`${styles.squareBtn} ${screen === "ADMIN" ? styles.squareBtnActive : styles.squareBtnMuted}`}
          onClick={() => setScreen("ADMIN")}
          aria-label="Admin"
          title="Admin"
        >
          A
        </button>
      </nav>
    </div>
  );
}

function normalizeApiBase(raw: string) {
  const root = raw.replace(/\/+$/, "");
  return /\/api$/i.test(root) ? root : `${root}/api`;
}

function ActionsGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://3.0.81.7/api";
  const apiBase = normalizeApiBase(rawApiBase);
  const apiOrigin = apiBase.replace(/\/api$/i, "");

  const eventIdRaw = searchParams.get("eventId");
  const [gateState, setGateState] = React.useState<"checking" | "ok" | "fail">("checking");
  const [sessionToken, setSessionToken] = React.useState<string | null>(null);
  const [resolvedEventId, setResolvedEventId] = React.useState<number | null>(null);

  React.useEffect(() => {
    const token = readAdminToken();
    if (!token) {
      const q = new URLSearchParams();
      q.set("next", "/actions");
      if (eventIdRaw) q.set("eventId", eventIdRaw);
      router.replace(withBasePath(`/admin?${q.toString()}`));
      setGateState("fail");
      return;
    }
    if (!eventIdRaw) {
      router.replace(withBasePath("/admin"));
      setGateState("fail");
      return;
    }
    const eid = Number(eventIdRaw);
    if (!Number.isFinite(eid) || eid <= 0) {
      router.replace(withBasePath("/admin"));
      setGateState("fail");
      return;
    }

    void (async () => {
      const r = await fetch(`${apiBase}/admin/events`, { headers: { ...adminAuthHeader(token) } });
      const d = await r.json().catch(() => null);
      if (!r.ok) {
        router.replace(withBasePath("/admin"));
        setGateState("fail");
        return;
      }
      const list = Array.isArray(d?.events) ? d.events : [];
      const ok = list.some((ev: { event_id?: number }) => Number(ev?.event_id) === eid);
      if (!ok) {
        router.replace(withBasePath("/admin"));
        setGateState("fail");
        return;
      }
      setSessionToken(token);
      setResolvedEventId(eid);
      setGateState("ok");
    })();
  }, [router, apiBase, eventIdRaw]);

  if (gateState !== "ok" || !sessionToken || resolvedEventId === null) {
    return (
      <main className="container">
        <p className="hint" style={{ padding: 24 }}>
          {gateState === "checking" ? "Loading…" : "Redirecting…"}
        </p>
      </main>
    );
  }

  return (
    <LedDashboard apiBase={apiBase} apiOrigin={apiOrigin} eventId={resolvedEventId} token={sessionToken} />
  );
}

export default function ActionsPage() {
  return (
    <Suspense fallback={<main className="container"><p className="hint">Loading…</p></main>}>
      <ActionsGate />
    </Suspense>
  );
}

