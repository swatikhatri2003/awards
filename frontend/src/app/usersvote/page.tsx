"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Shell } from "../_components/Shell";
import {
  clearCurrentUser,
  pushUserVote,
  readCurrentUser,
  readUid,
  readUserVotes,
} from "../_lib/userSession";

const FALLBACK_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23111424'/%3E%3Ctext x='50%25' y='50%25' fill='%23aab3c5' font-size='14' text-anchor='middle' dominant-baseline='middle'%3ENo Photo%3C/text%3E%3C/svg%3E";
const ERROR_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23111424'/%3E%3Ctext x='50%25' y='50%25' fill='%23aab3c5' font-size='14' text-anchor='middle' dominant-baseline='middle'%3EImage error%3C/text%3E%3C/svg%3E";

type Category = {
  category_id: number;
  name: string;
};

type Nominee = {
  nominee_id: number;
  name: string;
  photo?: string;
  category_id: number;
  votes?: number;
};

const PHOTO_BASE_URL =
  process.env.NEXT_PUBLIC_PHOTO_BASE_URL ||
  "https://mscsuper.blr1.digitaloceanspaces.com/vdimg";

function nomineePhotoUrl(_apiBase: string, photo?: string) {
  const p = (photo || "").trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p) || p.startsWith("data:")) return p;
  const normalized = p.replace(/\\/g, "/");
  const last = normalized.split("/").filter(Boolean).pop() || "";
  const safeFile = encodeURIComponent(last);
  const base = PHOTO_BASE_URL.replace(/\/+$/, "");
  return `${base}/${safeFile}`;
}

function friendlyError(code: string) {
  switch (code) {
    case "ALREADY_VOTED":
      return "You have already voted in this category.";
    case "INVALID_INPUT":
      return "Invalid input.";
    case "NOMINEE_NOT_FOUND":
      return "Nominee not found.";
    case "NOMINEE_CATEGORY_MISMATCH":
      return "Nominee does not belong to this category.";
    default:
      return code || "Something went wrong.";
  }
}

export default function UsersVotePage() {
  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

  const [user, setUser] = React.useState<ReturnType<typeof readCurrentUser>>(null);
  const [uid, setUid] = React.useState<number | null>(null);

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [activeIdx, setActiveIdx] = React.useState(0);

  const [allNominees, setAllNominees] = React.useState<Nominee[]>([]);
  const [loadingInit, setLoadingInit] = React.useState(true);

  const [selectedNomineeId, setSelectedNomineeId] = React.useState<number | null>(null);
  const [voting, setVoting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [voted, setVoted] = React.useState(false);
  const [votedNomineeId, setVotedNomineeId] = React.useState<number | null>(null);
  const [done, setDone] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const u = readCurrentUser();
    setUser(u);
    setUid(readUid());
    if (!u) {
      router.replace("/register");
      return;
    }

    void (async () => {
      try {
        const [catRes, nomRes] = await Promise.all([
          fetch(`${apiBase}/categories`),
          fetch(`${apiBase}/nominees`),
        ]);
        const catData = await catRes.json().catch(() => null);
        const nomData = await nomRes.json().catch(() => null);

        const rawCats = catData?.categories;
        if (!catRes.ok || !Array.isArray(rawCats) || rawCats.length === 0) {
          throw new Error("No voting categories are available right now.");
        }
        const sorted = [...rawCats].sort(
          (a: Category, b: Category) => Number(a.category_id) - Number(b.category_id),
        );
        setCategories(sorted);

        const rawNoms = nomData?.nominees;
        setAllNominees(Array.isArray(rawNoms) ? (rawNoms as Nominee[]) : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data.");
      } finally {
        setLoadingInit(false);
      }
    })();
  }, [apiBase, router]);

  const activeCategory = categories[activeIdx] ?? null;

  const nominees = React.useMemo(() => {
    if (!activeCategory) return [];
    return allNominees.filter(
      (n) => Number(n.category_id) === Number(activeCategory.category_id),
    );
  }, [allNominees, activeCategory]);

  React.useEffect(() => {
    setError(null);
    if (!activeCategory) {
      setSelectedNomineeId(null);
      setVoted(false);
      setVotedNomineeId(null);
      return;
    }
    const prior = readUserVotes().find(
      (v) => v.categoryId === activeCategory.category_id,
    );
    if (prior) {
      setSelectedNomineeId(prior.nomineeId);
      setVotedNomineeId(prior.nomineeId);
      setVoted(true);
    } else {
      setSelectedNomineeId(null);
      setVoted(false);
      setVotedNomineeId(null);
    }
  }, [activeCategory?.category_id]);

  async function submitVote() {
    if (!activeCategory || !selectedNomineeId || !user) return;
    const userId = uid ?? user.id;
    if (!userId) {
      setError("Missing user id. Please login again.");
      return;
    }

    setVoting(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/votes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: userId,
          catid: activeCategory.category_id,
          nomid: selectedNomineeId,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.status === 409 && data?.error === "ALREADY_VOTED") {
        const lockedNominee = Number(data?.votedNomineeId) || selectedNomineeId;
        const nomineeMatch = nominees.find((n) => Number(n.nominee_id) === lockedNominee);
        setVoted(true);
        setVotedNomineeId(lockedNominee);
        pushUserVote({
          categoryId: activeCategory.category_id,
          categoryName: activeCategory.name,
          nomineeId: lockedNominee,
          nomineeName: nomineeMatch?.name ?? "",
          at: Date.now(),
        });
        return;
      }
      if (!res.ok) {
        throw new Error(friendlyError(data?.error || "VOTE_FAILED"));
      }

      const nomineeMatch = nominees.find((n) => Number(n.nominee_id) === selectedNomineeId);
      setVoted(true);
      setVotedNomineeId(selectedNomineeId);
      pushUserVote({
        categoryId: activeCategory.category_id,
        categoryName: activeCategory.name,
        nomineeId: selectedNomineeId,
        nomineeName: nomineeMatch?.name ?? "",
        at: Date.now(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Vote failed.");
    } finally {
      setVoting(false);
    }
  }

  function nextCategory() {
    if (activeIdx + 1 >= categories.length) {
      setDone(true);
      return;
    }
    setActiveIdx((i) => i + 1);
  }

  function prevCategory() {
    if (done) {
      setDone(false);
      return;
    }
    if (activeIdx <= 0) return;
    setActiveIdx((i) => i - 1);
  }

  function logout() {
    clearCurrentUser();
    router.replace("/register");
  }

  const total = categories.length;
  const progressLabel = total > 0 ? `Category ${activeIdx + 1} of ${total}` : "";
  const isLast = activeIdx + 1 === total;
  const votedNominee = votedNomineeId
    ? nominees.find((n) => Number(n.nominee_id) === votedNomineeId) ?? null
    : null;

  const headerTitle = done
    ? "All Done"
    : activeCategory
      ? activeCategory.name
      : loadingInit
        ? "Loading..."
        : "No categories";

  const backDisabled = activeIdx === 0 && !done;
  const nextDisabled = done || !voted;
  const voteDisabled =
    done ||
    voting ||
    voted ||
    !selectedNomineeId ||
    !activeCategory ||
    nominees.length === 0;

  const bottomBarStyle: React.CSSProperties = {
    position: "fixed",
    left: "calc(12px + env(safe-area-inset-left, 0px))",
    right: "calc(12px + env(safe-area-inset-right, 0px))",
    bottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    zIndex: 1000,
    pointerEvents: "none",
  };
  const sharedBtnStyle: React.CSSProperties = {
    minWidth: 0,
    height: 44,
    padding: "0 8px",
    fontSize: 14,
    fontWeight: 700,
    borderRadius: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    pointerEvents: "auto",
    whiteSpace: "nowrap",
  };
  const sideBtnStyle: React.CSSProperties = {
    ...sharedBtnStyle,
    flex: "0 0 22%",
    fontSize: 13,
    padding: "0 6px",
    backgroundColor: "#1f2a44",
    backgroundImage: "none",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.22)",
  };
  const sideBtnDisabledStyle: React.CSSProperties = {
    backgroundColor: "#0f1626",
    backgroundImage: "none",
    color: "rgba(255,255,255,0.45)",
    border: "1px solid rgba(255,255,255,0.10)",
  };
  const voteBtnStyle: React.CSSProperties = {
    ...sharedBtnStyle,
    flex: 1,
  };

  const bottomBar = (
    <div style={bottomBarStyle}>
      <button
        type="button"
        disabled={backDisabled}
        onClick={prevCategory}
        style={{
          ...sideBtnStyle,
          ...(backDisabled ? sideBtnDisabledStyle : null),
          opacity: 1,
          cursor: backDisabled ? "not-allowed" : "pointer",
        }}
      >
        ‹ Back
      </button>

      <button
        className="btn"
        type="button"
        disabled={voteDisabled}
        onClick={submitVote}
        style={{
          ...voteBtnStyle,
          opacity: voteDisabled ? 0.85 : 1,
          cursor: voteDisabled ? "not-allowed" : "pointer",
        }}
      >
        {voted ? "Voted" : voting ? "Voting..." : "Vote"}
      </button>

      <button
        type="button"
        disabled={nextDisabled}
        onClick={nextCategory}
        style={{
          ...sideBtnStyle,
          ...(nextDisabled ? sideBtnDisabledStyle : null),
          opacity: 1,
          cursor: nextDisabled ? "not-allowed" : "pointer",
        }}
      >
        {isLast ? "Finish ›" : "Next ›"}
      </button>
    </div>
  );

  return (
    <>
    <Shell
      wide
      bare
      showLogos
      right={
        user ? (
          <button className="linkBtn" type="button" onClick={logout}>
            Logout
          </button>
        ) : null
      }
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          margin: "0 0 18px",
        }}
      >
        {headerTitle}
      </h1>

      {error ? <div className="error">Error: {error}</div> : null}

      {done ? (
        <section
          className="panel"
          aria-label="Voting complete"
          style={{ marginBottom: "calc(96px + env(safe-area-inset-bottom, 0px))" }}
        >
          <div className="panelHeader">
            <div className="panelTitle">All Done</div>
            <div className="panelMeta">UID: {uid ?? user?.id}</div>
          </div>
          <div className="hint" style={{ marginTop: 12 }}>
            Thank you for voting in all categories.
          </div>
        </section>
      ) : !activeCategory ? (
        <div className="hint">{loadingInit ? "Please wait..." : "No categories yet."}</div>
      ) : (
        <section
          aria-label="Category voting"
          style={{ paddingBottom: "calc(96px + env(safe-area-inset-bottom, 0px))" }}
        >
          {nominees.length === 0 ? (
            <div className="hint">No nominees in this category yet.</div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {nominees.map((n) => {
                const src = nomineePhotoUrl(apiBase, n.photo) || FALLBACK_PHOTO;
                const isSelected = selectedNomineeId === Number(n.nominee_id);
                const isVotedFor = voted && Number(n.nominee_id) === votedNomineeId;
                return (
                  <label
                    key={n.nominee_id}
                    className={
                      isSelected || isVotedFor
                        ? "listItem listItemActive selectableCard selectableCardSelected"
                        : "listItem selectableCard"
                    }
                    style={{
                      cursor: voted || voting ? "default" : "pointer",
                      opacity: voted && !isVotedFor ? 0.55 : 1,
                      padding: "10px 14px",
                      borderRadius: 14,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 14,
                      position: "relative",
                    }}
                  >
                    <input
                      type="radio"
                      name={`nominee-${activeCategory.category_id}`}
                      checked={isSelected}
                      disabled={voting || voted}
                      onChange={() => setSelectedNomineeId(Number(n.nominee_id))}
                      style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
                    />

                    <div
                      style={{
                        width: 56,
                        height: 56,
                        flex: "0 0 auto",
                        borderRadius: "50%",
                        overflow: "hidden",
                        background: "#111424",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <img
                        src={src}
                        alt={n.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = ERROR_PHOTO;
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        lineHeight: 1.25,
                        flex: 1,
                        minWidth: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        wordBreak: "break-word",
                      }}
                    >
                      {n.name}
                    </div>

                    {isVotedFor ? (
                      <span
                        aria-hidden="true"
                        style={{
                          flex: "0 0 auto",
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#0b1020",
                          background: "linear-gradient(135deg, #fcd34d, #f59e0b)",
                          padding: "4px 10px",
                          borderRadius: 999,
                          letterSpacing: "0.02em",
                        }}
                      >
                        ✓
                      </span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          )}

          {voted && votedNominee ? (
            <div className="hint" style={{ marginTop: 12 }}>
              Vote recorded for &quot;{votedNominee.name}&quot;.
            </div>
          ) : null}
        </section>
      )}

    </Shell>
    {mounted ? createPortal(bottomBar, document.body) : null}
    </>
  );
}
