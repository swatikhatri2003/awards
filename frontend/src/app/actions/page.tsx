"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./led-kiosk.module.css";
import { setYlfCategory, setYlfGraph, setYlfPage, setYlfTimer, setYlfWinners, type YlfWinnerEntry } from "@/lib/firebase";
import { adminAuthHeader, readAdminToken } from "../_lib/adminAuthSession";
import { withBasePath } from "../_lib/basePath";
import { resolveEventBannerUrl, resolveNomineePhotoUrl } from "../_lib/resolveImageUrl";
import { getPublicApiBase, getUploadsOrigin } from "../_lib/publicApiBase";

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
  show_nominee?: number | boolean | null;
  declare_result?: number | boolean | null;
};

function categoryShowsNominees(c: Category | undefined): boolean {
  if (!c) return false;
  return c.show_nominee === true || c.show_nominee === 1;
}

function categoryDeclaresResult(c: Category | undefined, eventDeclaresAll: boolean): boolean {
  if (eventDeclaresAll) return true;
  if (!c) return false;
  return c.declare_result === true || c.declare_result === 1;
}

function categoryHasVisibleWinner(c: Category, eventDeclaresAll: boolean): boolean {
  if (!categoryDeclaresResult(c, eventDeclaresAll)) return false;
  const wid = c.winner_nominee_id;
  return wid != null && Number(wid) > 0;
}

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
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-size='14' text-anchor='middle' dominant-baseline='middle'%3ENo Photo%3C/text%3E%3C/svg%3E";
const ERROR_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-size='14' text-anchor='middle' dominant-baseline='middle'%3EImage error%3C/text%3E%3C/svg%3E";

function IconPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function IconPencil(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconEye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden {...props}>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
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
  const [eventDeclareResult, setEventDeclareResult] = React.useState(false);
  const [eventIsLive, setEventIsLive] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    void fetch(`${apiBase}/events/${eventId}`)
      .then((r) => r.json())
      .then((d: { ok?: boolean; event?: { title?: string; image?: string | null; declare_result?: number | boolean | null; is_live?: number | boolean | null } }) => {
        if (cancelled || !d?.event) return;
        const ev = d.event;
        const rawImg = (ev.image || "").trim();
        const resolved = rawImg ? resolveEventBannerUrl(apiOrigin, rawImg) : "";
        const img = resolved || "/ylf-member-awards-banner.png";
        setHomeEvent({
          name: (ev.title && String(ev.title).trim()) || "Event",
          photoSrc: img,
        });
        setEventDeclareResult(ev.declare_result === true || ev.declare_result === 1);
        setEventIsLive(ev.is_live === true || ev.is_live === 1);
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
    setAdminCategoryEditId(null);
    setAddCategoryOpen(false);
    setNomineeModalCategoryId(null);
    setViewNomineesCategoryId(null);
    setNomineeInlineEdit(null);
    setInlinePhotoBlobUrl(null);
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

  const visibleWinnerCategories = React.useMemo(
    () => categories.filter((c) => categoryHasVisibleWinner(c, eventDeclareResult)),
    [categories, eventDeclareResult],
  );

  const buildWinnerEntries = React.useCallback(
    (cats: Category[], eventDeclaresAll = eventDeclareResult): YlfWinnerEntry[] => {
      return cats
        .filter((c) => categoryHasVisibleWinner(c, eventDeclaresAll))
        .map((c) => {
          const wid = Number(c.winner_nominee_id);
          const nominee = (nomineesByCategory[c.category_id] || []).find(
            (n) => Number(n.nominee_id) === wid,
          );
          return {
            categoryId: c.category_id,
            categoryName: c.name,
            nominee: {
              id: wid,
              name: nominee?.name ?? "",
              photo: nominee?.photo ?? "",
            },
          };
        });
    },
    [eventDeclareResult, nomineesByCategory],
  );

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
    void setYlfTimer(eventId, {
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
      void setYlfTimer(eventId, {
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
      void setYlfTimer(eventId, {
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
  const selectedShowNominees = categoryShowsNominees(selectedCategory);

  const nomineesForFirebase = React.useCallback((nominees: Nominee[]) => {
    return nominees.map((n) => ({
      id: n.nominee_id,
      name: n.name,
      photo: n.photo ?? "",
      votes: Number(n.votes ?? 0),
    }));
  }, []);

  const pushCategoryToScreen = React.useCallback(
    (c: Category, nominees: Nominee[]) => {
      void setYlfCategory(eventId, {
        id: c.category_id,
        name: c.name,
        showNominee: categoryShowsNominees(c),
        nominees: nomineesForFirebase(nominees),
      });
    },
    [eventId, nomineesForFirebase],
  );

  const [showNomineeSaving, setShowNomineeSaving] = React.useState(false);
  const [declareResultSaving, setDeclareResultSaving] = React.useState(false);
  const [isLiveSaving, setIsLiveSaving] = React.useState(false);

  async function toggleEventIsLive(next: boolean) {
    setIsLiveSaving(true);
    setCategoriesError(null);
    try {
      const res = await fetch(`${apiBase}/admin/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify({ is_live: next ? 1 : 0 }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "UPDATE_EVENT_FAILED");
      setEventIsLive(next);
    } catch (e) {
      setCategoriesError(e instanceof Error ? e.message : "UPDATE_EVENT_FAILED");
    } finally {
      setIsLiveSaving(false);
    }
  }

  const pushWinnersToScreen = React.useCallback(
    (cats: Category[]) => {
      void setYlfWinners(eventId, buildWinnerEntries(cats));
    },
    [buildWinnerEntries, eventId],
  );

  async function toggleEventDeclareResult(next: boolean) {
    setDeclareResultSaving(true);
    setCategoriesError(null);
    try {
      const res = await fetch(`${apiBase}/admin/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify({ declare_result: next ? 1 : 0 }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "UPDATE_EVENT_FAILED");
      setEventDeclareResult(next);
      if (screen === "WINNER") {
        void setYlfWinners(eventId, buildWinnerEntries(categories, next));
      }
    } catch (e) {
      setCategoriesError(e instanceof Error ? e.message : "UPDATE_EVENT_FAILED");
    } finally {
      setDeclareResultSaving(false);
    }
  }

  async function toggleCategoryDeclareResult(c: Category, next: boolean) {
    setDeclareResultSaving(true);
    setCategoriesError(null);
    try {
      const res = await fetch(
        `${apiBase}/admin/categories/${c.category_id}?eventId=${eventId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
          body: JSON.stringify({ declare_result: next ? 1 : 0 }),
        },
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "UPDATE_CATEGORY_FAILED");

      const patch = (list: Category[]) =>
        list.map((cat) =>
          cat.category_id === c.category_id ? { ...cat, declare_result: next ? 1 : 0 } : cat,
        );

      const nextCategories = patch(categories);
      setCategories(nextCategories);
      setAdminCategories((prev) => patch(prev));

      if (screen === "WINNER") {
        pushWinnersToScreen(nextCategories);
      }
    } catch (e) {
      setCategoriesError(e instanceof Error ? e.message : "UPDATE_CATEGORY_FAILED");
    } finally {
      setDeclareResultSaving(false);
    }
  }

  async function toggleCategoryShowNominee(c: Category, next: boolean) {
    setShowNomineeSaving(true);
    setCategoriesError(null);
    try {
      const res = await fetch(
        `${apiBase}/admin/categories/${c.category_id}?eventId=${eventId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
          body: JSON.stringify({ show_nominee: next ? 1 : 0 }),
        },
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "UPDATE_CATEGORY_FAILED");

      const patch = (list: Category[]) =>
        list.map((cat) =>
          cat.category_id === c.category_id ? { ...cat, show_nominee: next ? 1 : 0 } : cat,
        );

      setCategories((prev) => patch(prev));
      setAdminCategories((prev) => patch(prev));

      if (selectedCategoryId === c.category_id) {
        const nominees = nomineesByCategory[c.category_id] || [];
        pushCategoryToScreen({ ...c, show_nominee: next ? 1 : 0 }, nominees);
      }
    } catch (e) {
      setCategoriesError(e instanceof Error ? e.message : "UPDATE_CATEGORY_FAILED");
    } finally {
      setShowNomineeSaving(false);
    }
  }

  const showCategoryDetail = screen === "CATEGORY" && !!selectedCategoryId;

  const goToScreen = React.useCallback((next: ScreenKey) => {
    setScreen(next);
    if (next === "HOME") {
      void setYlfPage(eventId, "home");
    } else if (next === "QR") {
      void setYlfPage(eventId, "qr");
    } else if (next === "WINNER") {
      pushWinnersToScreen(categories);
    }
  }, [categories, eventId, pushWinnersToScreen]);

  const [adminCategories, setAdminCategories] = React.useState<Category[]>([]);
  const [adminLoading, setAdminLoading] = React.useState(false);
  const [adminError, setAdminError] = React.useState<string | null>(null);
  const [adminNominees, setAdminNominees] = React.useState<Nominee[]>([]);
  const [adminCategoryNameDraft, setAdminCategoryNameDraft] = React.useState("");
  const [adminNewCategoryName, setAdminNewCategoryName] = React.useState("");
  const [adminNomineeForm, setAdminNomineeForm] = React.useState<{
    name: string;
    photo: string;
    description: string;
  }>({ name: "", photo: "", description: "" });
  /** Inline edit category row (name only; winner is unchanged) */
  const [adminCategoryEditId, setAdminCategoryEditId] = React.useState<number | null>(null);
  const [addCategoryOpen, setAddCategoryOpen] = React.useState(false);
  /** Add-nominee modal target category */
  const [nomineeModalCategoryId, setNomineeModalCategoryId] = React.useState<number | null>(null);
  /** Nominee list dropdown per category */
  const [viewNomineesCategoryId, setViewNomineesCategoryId] = React.useState<number | null>(null);
  /** Edit one nominee inline inside dropdown cards */
  const [nomineeInlineEdit, setNomineeInlineEdit] = React.useState<{
    nominee_id: number;
    name: string;
    photo: string;
    description: string;
  } | null>(null);
  const [inlinePhotoBlobUrl, setInlinePhotoBlobUrl] = React.useState<string | null>(null);

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

  const adminCategoryBeingEdited = React.useMemo(
    () =>
      adminCategoryEditId ? adminCategories.find((c) => c.category_id === adminCategoryEditId) : undefined,
    [adminCategoryEditId, adminCategories],
  );

  const nomineesForCategory = React.useCallback(
    (categoryId: number) =>
      adminNominees
        .filter((n) => Number(n?.category_id) === categoryId)
        .slice()
        .sort((a, b) => Number(a.nominee_id) - Number(b.nominee_id)),
    [adminNominees],
  );

  React.useEffect(() => {
    if (!adminCategoryBeingEdited) return;
    setAdminCategoryNameDraft(adminCategoryBeingEdited.name || "");
  }, [adminCategoryBeingEdited]);

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
      setAddCategoryOpen(false);
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "CREATE_CATEGORY_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  async function adminUpdateCategory() {
    if (!adminCategoryEditId) return;
    const name = adminCategoryNameDraft.trim();
    if (!name) return;
    const keepWinner = adminCategoryBeingEdited?.winner_nominee_id;
    const winnerVal: number | null =
      keepWinner != null && Number.isFinite(Number(keepWinner)) && Number(keepWinner) > 0
        ? Number(keepWinner)
        : null;
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch(
        `${apiBase}/admin/categories/${adminCategoryEditId}?eventId=${eventId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
          body: JSON.stringify({ name, winner_nominee_id: winnerVal }),
        },
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "UPDATE_CATEGORY_FAILED");
      setAdminCategoryEditId(null);
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "UPDATE_CATEGORY_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  function closeNomineeModal() {
    revokeNomineePhotoBlob();
    setNomineeModalCategoryId(null);
    setAdminNomineeForm({ name: "", photo: "", description: "" });
  }

  async function adminSaveNominee() {
    if (!nomineeModalCategoryId) return;
    const name = adminNomineeForm.name.trim();
    if (!name) return;
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch(`${apiBase}/admin/nominees?eventId=${eventId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify({
          name,
          photo: adminNomineeForm.photo.trim(),
          description: adminNomineeForm.description.trim() || undefined,
          category_id: nomineeModalCategoryId,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "SAVE_NOMINEE_FAILED");
      closeNomineeModal();
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "SAVE_NOMINEE_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  async function saveNomineeInline() {
    if (!nomineeInlineEdit) return;
    const name = nomineeInlineEdit.name.trim();
    if (!name) return;
    const cat = adminNominees.find((n) => n.nominee_id === nomineeInlineEdit.nominee_id);
    const category_id = cat ? Number(cat.category_id) : null;
    if (category_id == null || !Number.isFinite(category_id)) {
      setAdminError("SAVE_NOMINEE_FAILED");
      return;
    }
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch(
        `${apiBase}/admin/nominees/${nomineeInlineEdit.nominee_id}?eventId=${eventId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
          body: JSON.stringify({
            name,
            photo: nomineeInlineEdit.photo.trim(),
            description: nomineeInlineEdit.description.trim() || null,
            category_id,
          }),
        },
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "SAVE_NOMINEE_FAILED");
      if (inlinePhotoBlobUrl) URL.revokeObjectURL(inlinePhotoBlobUrl);
      setInlinePhotoBlobUrl(null);
      setNomineeInlineEdit(null);
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "SAVE_NOMINEE_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  const [adminPhotoUploading, setAdminPhotoUploading] = React.useState(false);
  /** Local object URL for immediate preview while uploading; revoked when replaced or cleared */
  const [nomineePhotoBlobUrl, setNomineePhotoBlobUrl] = React.useState<string | null>(null);

  const revokeNomineePhotoBlob = React.useCallback(() => {
    setNomineePhotoBlobUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  React.useEffect(() => {
    return () => {
      setNomineePhotoBlobUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, []);

  async function adminUploadNomineePhoto(file: File, mode: "modal" | "inline" = "modal") {
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
      if (mode === "modal") {
        revokeNomineePhotoBlob();
        setAdminNomineeForm((p) => ({ ...p, photo: filename }));
      } else {
        setNomineeInlineEdit((p) => (p ? { ...p, photo: filename } : null));
      }
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
      pushCategoryToScreen(c, nominees);
    },
    [pushCategoryToScreen, fetchAllNominees, nomineesByCategory],
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

                <div className={styles.categoryPickGrid} role="list">
                  {categories.map((c) => (
                    <button
                      key={c.category_id}
                      type="button"
                      role="listitem"
                      className={selectedCategoryId === c.category_id ? "listItem listItemActive" : "listItem"}
                      onClick={() => {
                        void selectCategory(c);
                      }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
                    >
                      <div className="listTitle" style={{ whiteSpace: "normal" }}>
                        {c.name}
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
                  <div className={styles.categoryHeading}>{selectedCategory?.name || "Category"}</div>
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
                    {selectedCategory ? (
                      <>
                        <label
                          className={styles.adminApproveSwitch}
                          title={selectedShowNominees ? "Nominees visible on screen" : "Nominees hidden on screen"}
                        >
                          <input
                            type="checkbox"
                            role="switch"
                            checked={selectedShowNominees}
                            disabled={showNomineeSaving}
                            onChange={(e) => void toggleCategoryShowNominee(selectedCategory, e.target.checked)}
                            aria-label={
                              selectedShowNominees ? "Hide nominees on screen" : "Show nominees on screen"
                            }
                          />
                          <span className={styles.adminApproveTrack} aria-hidden />
                          <span>Show nominee</span>
                        </label>
                        <label
                          className={styles.adminApproveSwitch}
                          title={
                            categoryDeclaresResult(selectedCategory, eventDeclareResult)
                              ? "Result declared"
                              : "Result not declared"
                          }
                        >
                          <input
                            type="checkbox"
                            role="switch"
                            checked={selectedCategory.declare_result === true || selectedCategory.declare_result === 1}
                            disabled={declareResultSaving || eventDeclareResult}
                            onChange={(e) => void toggleCategoryDeclareResult(selectedCategory, e.target.checked)}
                            aria-label={
                              selectedCategory.declare_result === true || selectedCategory.declare_result === 1
                                ? "Undeclare category result"
                                : "Declare category result"
                            }
                          />
                          <span className={styles.adminApproveTrack} aria-hidden />
                          <span>Declare result</span>
                        </label>
                      </>
                    ) : null}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <button
                        type="button"
                        className={styles.timerBtn}
                        onClick={() => {
                          if (!selectedCategory) return;
                          console.log(
                            `[UI] Graph button -> category id=${selectedCategory.category_id}, nominees=${selectedNominees.length}`,
                          );
                          void setYlfGraph(eventId, {
                            id: selectedCategory.category_id,
                            name: selectedCategory.name,
                            showNominee: selectedShowNominees,
                            nominees: nomineesForFirebase(selectedNominees),
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
                            void setYlfCategory(eventId, {
                              id: selectedCategory.category_id,
                              name: selectedCategory.name,
                              showNominee: selectedShowNominees,
                              nominees: nomineesForFirebase(selectedNominees),
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
                      const thumb = resolveNomineePhotoUrl(apiOrigin, n.photo);
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
                            justifyContent: "flex-start",
                            gap: 12,
                          }}
                        >
                          {thumb ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              className={styles.nomineeThumb}
                              src={thumb}
                              alt=""
                              width={44}
                              height={44}
                            />
                          ) : null}
                          <div className="listTitle" style={{ whiteSpace: "normal", flex: 1 }}>
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
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div className={styles.sectionTitle}>Winners</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <label
                  className={styles.adminApproveSwitch}
                  title={eventDeclareResult ? "All category results declared" : "Declare all category results"}
                >
                  <input
                    type="checkbox"
                    role="switch"
                    checked={eventDeclareResult}
                    disabled={declareResultSaving}
                    onChange={(e) => void toggleEventDeclareResult(e.target.checked)}
                    aria-label={eventDeclareResult ? "Undeclare all results" : "Declare all results"}
                  />
                  <span className={styles.adminApproveTrack} aria-hidden />
                  <span>Declare all results</span>
                </label>
                <div className="panelMeta">
                  {categoriesLoading
                    ? "Loading..."
                    : categoriesError
                      ? "Failed"
                      : `${visibleWinnerCategories.length} declared`}
                </div>
              </div>
            </div>

            {categoriesError ? <div className="error" style={{ marginTop: 12 }}>Error: {categoriesError}</div> : null}

            {!categoriesLoading && !categoriesError && visibleWinnerCategories.length === 0 ? (
              <div className="hint" style={{ marginTop: 16 }}>
                No declared results yet — set a winner in Admin and turn on Declare result (category) or Declare all results (event).
              </div>
            ) : null}

            <div className={styles.winnerCelebrateGrid}>
              {visibleWinnerCategories.map((c) => {
                  const nominees = nomineesByCategory[c.category_id] || [];
                  const nomineesLoading = nomineesLoadingByCategory[c.category_id] || false;
                  const nomineesError = nomineesErrorByCategory[c.category_id] || null;
                  const wid = Number(c.winner_nominee_id);
                  const winnerNominee = Array.isArray(nominees)
                    ? nominees.find((n) => Number(n.nominee_id) === wid)
                    : undefined;
                  const thumb = winnerNominee?.photo
                    ? resolveNomineePhotoUrl(apiOrigin, winnerNominee.photo)
                    : "";

                  return (
                    <article key={c.category_id} className={styles.winnerCard}>
                      <div className={styles.winnerCardCategory}>{c.name}</div>
                      <div className={styles.winnerCardPhotoWrap}>
                        {nomineesError ? (
                          <div className={styles.winnerCardPlaceholder}>Could not load</div>
                        ) : nomineesLoading && !winnerNominee ? (
                          <div className={styles.winnerCardPlaceholder}>Loading…</div>
                        ) : thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img className={styles.winnerCardPhoto} src={thumb} alt="" />
                        ) : (
                          <div className={styles.winnerCardPlaceholder}>No photo</div>
                        )}
                      </div>
                      <div className={styles.winnerCardWinnerName}>
                        {winnerNominee?.name?.trim()
                          ? winnerNominee.name
                          : nomineesLoading && !nomineesError
                            ? "…"
                            : "Winner not found"}
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
        ) : null}

        {screen === "ADMIN" ? (
          <section aria-label="Admin actions" style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
              <div className={styles.sectionTitle}>Admin</div>
              <div className="panelMeta">
                {homeEvent.name}
                {adminLoading ? " • Working..." : ""}
              </div>
            </div>

            <div style={{ marginTop: 12 }} className="panel">
              <div className="panelHeader" style={{ marginBottom: 10 }}>
                <div className="panelTitle" style={{ fontSize: 14 }}>
                  Event status
                </div>
                <div className="panelMeta">{eventIsLive ? "Live on site" : "Not live"}</div>
              </div>
              <label
                className={styles.adminApproveSwitch}
                title={eventIsLive ? "Event is live" : "Make event live"}
              >
                <input
                  type="checkbox"
                  role="switch"
                  checked={eventIsLive}
                  disabled={isLiveSaving}
                  onChange={(e) => void toggleEventIsLive(e.target.checked)}
                  aria-label={eventIsLive ? "Take event offline" : "Go live"}
                />
                <span className={styles.adminApproveTrack} aria-hidden />
                <span>Go live</span>
              </label>
              <p className="hint" style={{ marginTop: 10, marginBottom: 0 }}>
                When live, voting opens on the event page. Categories and nominees are always visible on the detail page.
              </p>
            </div>

            <div style={{ marginTop: 12 }} className="panel">
              <div className="panelHeader" style={{ marginBottom: 10 }}>
                <div className="panelTitle" style={{ fontSize: 14 }}>
                  Register link
                </div>
                <div className="panelMeta">Link includes your event</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                <a className="linkBtn" href={withBasePath(`/register?eventId=${eventId}`)} target="_blank" rel="noopener noreferrer">
                  Open registration page
                </a>
                <a className="linkBtn" href={withBasePath(`/screen?eventId=${eventId}`)} target="_blank" rel="noopener noreferrer">
                  Open LED
                </a>
                <a className="linkBtn" href={withBasePath(`/admin?eventId=${eventId}`)}>
                  Manage event
                </a>
              </div>
            </div>

            {adminError ? (
              <div className="error" style={{ marginTop: 12 }}>
                Error: {adminError}
              </div>
            ) : null}

            <div className={styles.adminCategoriesBlock}>
              <div className={styles.adminCatToolbar}>
                <div className={styles.sectionTitle} style={{ marginBottom: 0 }}>
                  Categories
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="panelMeta">{adminCategories.length} total</span>
                  <button
                    type="button"
                    className={styles.adminIconBtn}
                    onClick={() => setAddCategoryOpen((o) => !o)}
                    aria-expanded={addCategoryOpen}
                    aria-label={addCategoryOpen ? "Close add category" : "Add category"}
                    title="Add category"
                  >
                    <IconPlus />
                  </button>
                </div>
              </div>

              {addCategoryOpen ? (
                <div className={styles.adminAddCategoryBar}>
                  <input
                    className={`input ${styles.inputGrow}`}
                    value={adminNewCategoryName}
                    placeholder="New category name"
                    onChange={(e) => setAdminNewCategoryName(e.target.value)}
                    disabled={adminLoading}
                    aria-label="New category name"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") void adminCreateCategory();
                    }}
                  />
                  <button
                    type="button"
                    className={`${styles.adminIconBtn} ${styles.adminIconBtnPrimary}`}
                    onClick={adminCreateCategory}
                    disabled={adminLoading || !adminNewCategoryName.trim()}
                    aria-label="Create category"
                    title="Save category"
                  >
                    <IconCheck />
                  </button>
                </div>
              ) : null}

              <div className={styles.adminCategoryList}>
                {adminCategories.map((c) => {
                  const noms = nomineesForCategory(c.category_id);
                  const nCount = noms.length;
                  /* View opens nominee cards; allow when there is at least one to view/edit */
                  const showView = nCount >= 1;
                  const editingCat = adminCategoryEditId === c.category_id;
                  const viewOpen = viewNomineesCategoryId === c.category_id;

                  return (
                    <div key={c.category_id} className={styles.adminCategoryRow}>
                      {editingCat ? (
                        <div className={styles.adminCategoryEditBar}>
                          <input
                            className="input"
                            value={adminCategoryNameDraft}
                            onChange={(e) => setAdminCategoryNameDraft(e.target.value)}
                            placeholder="Category name"
                            disabled={adminLoading}
                            aria-label="Category name"
                          />
                          <button
                            type="button"
                            className={`${styles.adminIconBtn} ${styles.adminIconBtnPrimary}`}
                            onClick={adminUpdateCategory}
                            disabled={adminLoading}
                            aria-label="Save category"
                            title="Save"
                          >
                            <IconCheck />
                          </button>
                          <button
                            type="button"
                            className={styles.adminIconBtn}
                            onClick={() => setAdminCategoryEditId(null)}
                            disabled={adminLoading}
                            aria-label="Cancel"
                            title="Cancel"
                          >
                            <IconX />
                          </button>
                        </div>
                      ) : (
                        <div className={styles.adminCategoryRowMain}>
                          <div className={styles.adminCategoryTitleWrap}>
                            <span className="listTitle" style={{ whiteSpace: "normal" }}>
                              {c.name}
                            </span>
                            {c.winner_nominee_id ? (
                              <span className="badge" style={{ marginLeft: 8 }}>
                                Winner set
                              </span>
                            ) : null}
                          </div>
                          <div className={styles.adminRowIconGroup}>
                            <button
                              type="button"
                              className={styles.adminIconBtn}
                              onClick={() => {
                                if (adminCategoryEditId === c.category_id) {
                                  setAdminCategoryEditId(null);
                                } else {
                                  setAdminCategoryEditId(c.category_id);
                                  setViewNomineesCategoryId(null);
                                  setNomineeInlineEdit(null);
                                }
                              }}
                              aria-label="Edit category"
                              title="Edit category"
                            >
                              <IconPencil />
                            </button>
                            <button
                              type="button"
                              className={styles.adminIconBtn}
                              onClick={() => {
                                revokeNomineePhotoBlob();
                                setAdminNomineeForm({ name: "", photo: "", description: "" });
                                setNomineeModalCategoryId(c.category_id);
                                setViewNomineesCategoryId(null);
                              }}
                              aria-label="Add nominee"
                              title="Add nominee"
                            >
                              <IconPlus />
                            </button>
                            {showView ? (
                              <button
                                type="button"
                                className={`${styles.adminIconBtn} ${viewOpen ? styles.adminIconBtnActive : ""}`}
                                onClick={() => {
                                  setViewNomineesCategoryId((id) => (id === c.category_id ? null : c.category_id));
                                  setNomineeInlineEdit(null);
                                  if (inlinePhotoBlobUrl) {
                                    URL.revokeObjectURL(inlinePhotoBlobUrl);
                                    setInlinePhotoBlobUrl(null);
                                  }
                                }}
                                aria-expanded={viewOpen}
                                aria-label="View nominees"
                                title="View nominees"
                              >
                                <IconEye />
                              </button>
                            ) : null}
                          </div>
                        </div>
                      )}

                      {viewOpen ? (
                        <div className={styles.adminNomineeDropdown} role="region" aria-label={`Nominees in ${c.name}`}>
                          {noms.map((n) => {
                            const thumb = resolveNomineePhotoUrl(apiOrigin, n.photo);
                            const editing =
                              nomineeInlineEdit && nomineeInlineEdit.nominee_id === n.nominee_id;
                            return (
                              <div key={n.nominee_id} className={styles.adminNomineeCard}>
                                {editing && nomineeInlineEdit ? (
                                  <div className={styles.adminNomineeCardEdit}>
                                    <input
                                      className="input"
                                      value={nomineeInlineEdit.name}
                                      onChange={(e) =>
                                        setNomineeInlineEdit((p) =>
                                          p ? { ...p, name: e.target.value } : null,
                                        )
                                      }
                                      placeholder="Name"
                                      disabled={adminLoading}
                                    />
                                    <textarea
                                      className="input"
                                      value={nomineeInlineEdit.description}
                                      onChange={(e) =>
                                        setNomineeInlineEdit((p) =>
                                          p ? { ...p, description: e.target.value } : null,
                                        )
                                      }
                                      placeholder="Description"
                                      style={{ minHeight: 72, resize: "vertical" }}
                                      disabled={adminLoading}
                                    />
                                    <input
                                      className="input"
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const f = e.currentTarget.files?.[0];
                                        if (!f) return;
                                        setInlinePhotoBlobUrl((prev) => {
                                          if (prev) URL.revokeObjectURL(prev);
                                          return URL.createObjectURL(f);
                                        });
                                        void adminUploadNomineePhoto(f, "inline");
                                      }}
                                      disabled={adminLoading || adminPhotoUploading}
                                    />
                                    {(() => {
                                      const serverSrc = nomineeInlineEdit.photo.trim()
                                        ? resolveNomineePhotoUrl(apiOrigin, nomineeInlineEdit.photo)
                                        : "";
                                      const previewSrc = inlinePhotoBlobUrl || serverSrc;
                                      return previewSrc ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img className={styles.adminNomineeCardPhoto} src={previewSrc} alt="" />
                                      ) : null;
                                    })()}
                                    <div className={styles.adminNomineeCardActions}>
                                      <button
                                        type="button"
                                        className={`${styles.adminIconBtn} ${styles.adminIconBtnPrimary}`}
                                        onClick={saveNomineeInline}
                                        disabled={adminLoading}
                                        aria-label="Save nominee"
                                      >
                                        <IconCheck />
                                      </button>
                                      <button
                                        type="button"
                                        className={styles.adminIconBtn}
                                        onClick={() => {
                                          setNomineeInlineEdit(null);
                                          if (inlinePhotoBlobUrl) {
                                            URL.revokeObjectURL(inlinePhotoBlobUrl);
                                            setInlinePhotoBlobUrl(null);
                                          }
                                        }}
                                        disabled={adminLoading}
                                        aria-label="Cancel"
                                      >
                                        <IconX />
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className={styles.adminNomineeCardRead}>
                                    <div className={styles.adminNomineeCardLeft}>
                                      {thumb ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img className={styles.adminNomineeCardPhoto} src={thumb} alt="" />
                                      ) : (
                                        <div className={styles.adminNomineeCardPhotoPlaceholder} aria-hidden />
                                      )}
                                      <div className={styles.adminNomineeCardText}>
                                        <div className="listTitle" style={{ whiteSpace: "normal" }}>
                                          {n.name}
                                        </div>
                                        {n.description ? (
                                          <p className={styles.adminNomineeDesc}>{n.description}</p>
                                        ) : (
                                          <p className="hint" style={{ margin: 0 }}>
                                            No description
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      className={styles.adminIconBtn}
                                      onClick={() => {
                                        setNomineeInlineEdit({
                                          nominee_id: n.nominee_id,
                                          name: n.name || "",
                                          photo: n.photo || "",
                                          description: n.description || "",
                                        });
                                        setInlinePhotoBlobUrl((prev) => {
                                          if (prev) URL.revokeObjectURL(prev);
                                          return null;
                                        });
                                      }}
                                      aria-label={`Edit ${n.name}`}
                                      title="Edit nominee"
                                    >
                                      <IconPencil />
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {nomineeModalCategoryId !== null ? (
              <div
                className={styles.adminModalBackdrop}
                role="presentation"
                onClick={closeNomineeModal}
                onKeyDown={(e) => e.key === "Escape" && closeNomineeModal()}
              >
                <div
                  className={styles.adminModal}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="admin-add-nominee-title"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.adminModalHead}>
                    <h2 id="admin-add-nominee-title" className={styles.adminModalTitle}>
                      Add nominee
                    </h2>
                    <button
                      type="button"
                      className={styles.adminIconBtn}
                      onClick={closeNomineeModal}
                      aria-label="Close"
                    >
                      <IconX />
                    </button>
                  </div>
                  <div className="field" style={{ marginBottom: 12 }}>
                    <div className="label">Name</div>
                    <input
                      className="input"
                      value={adminNomineeForm.name}
                      onChange={(e) => setAdminNomineeForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Nominee name"
                      disabled={adminLoading}
                    />
                  </div>
                  <div className="field" style={{ marginBottom: 12 }}>
                    <div className="label">Photo</div>
                    <input
                      className="input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.currentTarget.files?.[0];
                        if (!f) return;
                        setNomineePhotoBlobUrl((prev) => {
                          if (prev) URL.revokeObjectURL(prev);
                          return URL.createObjectURL(f);
                        });
                        void adminUploadNomineePhoto(f, "modal");
                      }}
                      disabled={adminLoading || adminPhotoUploading}
                    />
                    {adminPhotoUploading ? (
                      <div style={{ marginTop: 8 }}>
                        <span className="hint" style={{ margin: 0 }}>
                          Uploading…
                        </span>
                      </div>
                    ) : null}
                    {(() => {
                      const serverSrc = adminNomineeForm.photo.trim()
                        ? resolveNomineePhotoUrl(apiOrigin, adminNomineeForm.photo)
                        : "";
                      const previewSrc = nomineePhotoBlobUrl || serverSrc;
                      return previewSrc ? (
                        <div style={{ marginTop: 10 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img className={styles.previewPhoto} src={previewSrc} alt="" />
                        </div>
                      ) : null;
                    })()}
                  </div>
                  <div className="field" style={{ marginBottom: 12 }}>
                    <div className="label">Description (optional)</div>
                    <textarea
                      className="input"
                      value={adminNomineeForm.description}
                      onChange={(e) => setAdminNomineeForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Short description"
                      style={{ minHeight: 88, resize: "vertical" }}
                      disabled={adminLoading}
                    />
                  </div>
                  <div className={styles.adminModalFooter}>
                    <button type="button" className="btn btnGhost" onClick={closeNomineeModal} disabled={adminLoading}>
                      Cancel
                    </button>
                    <button type="button" className="btn" onClick={adminSaveNominee} disabled={adminLoading}>
                      Add nominee
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
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

function ActionsGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const apiBase = getPublicApiBase();
  const apiOrigin = getUploadsOrigin();

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
      router.replace(`/admin?${q.toString()}`);
      setGateState("fail");
      return;
    }
    if (!eventIdRaw) {
      router.replace("/admin");
      setGateState("fail");
      return;
    }
    const eid = Number(eventIdRaw);
    if (!Number.isFinite(eid) || eid <= 0) {
      router.replace("/admin");
      setGateState("fail");
      return;
    }

    void (async () => {
      const r = await fetch(`${apiBase}/admin/events`, { headers: { ...adminAuthHeader(token) } });
      const d = await r.json().catch(() => null);
      if (!r.ok) {
        router.replace("/admin");
        setGateState("fail");
        return;
      }
      const list = Array.isArray(d?.events) ? d.events : [];
      const ok = list.some((ev: { event_id?: number }) => Number(ev?.event_id) === eid);
      if (!ok) {
        router.replace("/admin");
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

