"use client";

import React from "react";
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

function nomineePhotoUrl(apiBase: string, photo?: string) {
  const p = (photo || "").trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p) || p.startsWith("data:")) return p;
  const base = apiBase.replace(/\/+$/, "").replace(/\/api$/, "");
  const normalized = p.replace(/\\/g, "/");
  const last = normalized.split("/").filter(Boolean).pop() || "";
  const safeFile = encodeURIComponent(last);
  return `${base}/uploads/nominee/${safeFile}`;
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

  return (
    <Shell
      wide
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
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 14,
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
                      padding: 12,
                      borderRadius: 16,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
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

                    <div className="nomineePhotoWrap" style={{ marginTop: 0 }}>
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

                    <div
                      style={{
                        fontWeight: 850,
                        fontSize: 16,
                        textAlign: "center",
                        lineHeight: 1.2,
                        padding: "0 6px 2px",
                      }}
                    >
                      {n.name}
                    </div>
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

          <div className="row" style={{ marginTop: 14 }}>
            <button
              className="btn btnLg"
              type="button"
              disabled={voting || voted || !selectedNomineeId || nominees.length === 0}
              onClick={submitVote}
            >
              {voted ? "Voted" : voting ? "Submitting vote..." : "Vote"}
            </button>
          </div>
        </section>
      )}

      <div
        style={{
          position: "fixed",
          left: "calc(16px + env(safe-area-inset-left, 0px))",
          right: "calc(16px + env(safe-area-inset-right, 0px))",
          bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        {(() => {
          const backDisabled = activeIdx === 0 && !done;
          const nextDisabled = done || !voted;
          const sharedStyle: React.CSSProperties = {
            width: "20vw",
            minWidth: 96,
            maxWidth: 200,
            height: 40,
            padding: "0 14px",
            fontSize: 14,
            fontWeight: 700,
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            pointerEvents: "auto",
          };
          return (
            <>
              <button
                className="btnSecondary"
                type="button"
                disabled={backDisabled}
                onClick={prevCategory}
                style={{
                  ...sharedStyle,
                  opacity: backDisabled ? 0.4 : 1,
                  cursor: backDisabled ? "not-allowed" : "pointer",
                }}
              >
                ‹ Back
              </button>

              <button
                className="btn"
                type="button"
                disabled={nextDisabled}
                onClick={nextCategory}
                style={{
                  ...sharedStyle,
                  opacity: nextDisabled ? 0.4 : 1,
                  cursor: nextDisabled ? "not-allowed" : "pointer",
                }}
              >
                {isLast ? "Finish ›" : "Next ›"}
              </button>
            </>
          );
        })()}
      </div>
    </Shell>
  );
}
