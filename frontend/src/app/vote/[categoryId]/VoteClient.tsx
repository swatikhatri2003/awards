"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Shell } from "../../_components/Shell";
import { setYlfNomineeVotes, subscribeYlf, type YlfNominee, type YlfState } from "@/lib/firebase";
import { readCurrentUser } from "../../_lib/userSession";

const FALLBACK_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23111424'/%3E%3Ctext x='50%25' y='50%25' fill='%23aab3c5' font-size='14' text-anchor='middle' dominant-baseline='middle'%3ENo Photo%3C/text%3E%3C/svg%3E";
const ERROR_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23111424'/%3E%3Ctext x='50%25' y='50%25' fill='%23aab3c5' font-size='14' text-anchor='middle' dominant-baseline='middle'%3EImage error%3C/text%3E%3C/svg%3E";

const VOTED_STORAGE_KEY = "ylf_voted_categories";

function nomineePhotoUrl(apiBase: string, photo?: string) {
  const p = (photo || "").trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p) || p.startsWith("data:")) return p;
  // `apiBase` includes `/api` now; uploads are served from the server root.
  const base = apiBase.replace(/\/+$/, "").replace(/\/api$/, "");
  const normalized = p.replace(/\\/g, "/");
  const last = normalized.split("/").filter(Boolean).pop() || "";
  const safeFile = encodeURIComponent(last);
  return `${base}/uploads/nominee/${safeFile}`;
}

function normalizeNominees(
  nominees: NonNullable<YlfState["category"]>["nominees"],
): YlfNominee[] {
  if (!nominees) return [];
  if (Array.isArray(nominees)) return nominees.filter(Boolean);
  return Object.values(nominees).filter(Boolean);
}

function friendlyError(code: string) {
  switch (code) {
    case "INVALID_CATEGORY_ID":
      return "Invalid category.";
    case "INVALID_NOMINEE_ID":
      return "Invalid nominee.";
    case "NOMINEE_NOT_FOUND":
      return "Nominee not found.";
    default:
      return code || "REQUEST_FAILED";
  }
}

function readVotedMap(): Record<string, number> {
  try {
    if (typeof window === "undefined") return {};
    const raw = window.localStorage.getItem(VOTED_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function writeVotedMap(map: Record<string, number>) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(VOTED_STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

function HomeStage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/ylf-member-awards-banner.png"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}

function CategoryVoteStage({
  apiBase,
  category,
  timer,
  onExit,
}: {
  apiBase: string;
  category: NonNullable<YlfState["category"]>;
  timer?: YlfState["timer"];
  onExit: () => void;
}) {
  const nominees = React.useMemo(() => normalizeNominees(category.nominees), [category.nominees]);

  const [selectedNomineeId, setSelectedNomineeId] = React.useState<number | null>(null);
  const [voting, setVoting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [votedNomineeId, setVotedNomineeId] = React.useState<number | null>(null);
  const [tick, setTick] = React.useState(0);

  function formatMMSS(msLeft: number) {
    const totalSec = Math.max(0, Math.ceil(msLeft / 1000));
    const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const ss = String(totalSec % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  React.useEffect(() => {
    if (!timer?.running) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 250);
    return () => window.clearInterval(id);
  }, [timer?.running]);

  React.useEffect(() => {
    setSelectedNomineeId(null);
    setError(null);
    setSuccess(null);
    const map = readVotedMap();
    const prev = map[String(category.id)];
    setVotedNomineeId(typeof prev === "number" ? prev : null);
  }, [category.id]);

  const timerMatches = timer && Number(timer.categoryId) === Number(category.id);
  const msLeft = timerMatches && timer?.running ? Math.max(0, Number(timer.endsAtMs) - Date.now()) : 0;
  const votingWindowOpen = !!(timerMatches && timer?.running && msLeft > 0);
  const showTimer = !!(timerMatches && timer?.running && msLeft > 0);
  const timerAlert = showTimer && msLeft <= 5000;
  const blink = timerAlert && tick % 2 === 0;
  const votingClosedReason =
    !timerMatches ? "Waiting for admin to start the timer..." : !timer?.running ? "Voting not started yet." : "Voting closed.";

  async function submitVote() {
    if (!selectedNomineeId || votedNomineeId !== null || !votingWindowOpen) return;
    setVoting(true);
    setError(null);
    setSuccess(null);
    try {
      const currentUser = readCurrentUser();
      const res = await fetch(`${apiBase}/nominees/${selectedNomineeId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voter: currentUser
            ? {
                userId: currentUser.id,
                email: currentUser.email,
                mobile: currentUser.mobile,
                membershipNumber: currentUser.membershipNumber,
              }
            : null,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(friendlyError(data?.error || "VOTE_FAILED"));

      const nextVotes = Number(data?.nominee?.votes);
      if (Number.isFinite(nextVotes)) {
        // Update live screen data source immediately (graph reads from RTDB "ylf").
        await setYlfNomineeVotes({ nomineeId: selectedNomineeId, votes: nextVotes });
      }

      const map = readVotedMap();
      map[String(category.id)] = selectedNomineeId;
      writeVotedMap(map);
      setVotedNomineeId(selectedNomineeId);
      setSuccess("Thank you! Your vote has been recorded.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "VOTE_FAILED");
    } finally {
      setVoting(false);
    }
  }

  const alreadyVoted = votedNomineeId !== null;
  const votedNominee = alreadyVoted
    ? nominees.find((n) => Number(n.id) === votedNomineeId) ?? null
    : null;

  return (
    <Shell
      title={` ${category.name}`}
      subtitle={
        alreadyVoted
          ? "You have already voted in this category."
          : votingWindowOpen
            ? "Select one nominee and submit your vote."
            : votingClosedReason
      }
      wide
      right={
        <button className="linkBtn" type="button" onClick={onExit}>
          Exit / change account
        </button>
      }
    >
      {showTimer ? (
        <div
          aria-live="polite"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "6px 0 14px",
          }}
        >
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 14,
              border: `1px solid ${timerAlert ? "rgba(255,80,80,0.85)" : "rgba(214,180,106,0.35)"}`,
              background: timerAlert
                ? blink
                  ? "rgba(55,0,0,0.55)"
                  : "rgba(20,0,0,0.45)"
                : "rgba(0,0,0,0.28)",
              boxShadow: timerAlert
                ? "0 14px 40px rgba(255,60,60,0.16), 0 14px 40px rgba(0,0,0,0.45)"
                : "0 14px 40px rgba(0,0,0,0.45)",
              backdropFilter: "blur(10px)",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              transition: "background 220ms ease, border-color 220ms ease",
              width: "100%",
              maxWidth: 520,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Arial, sans-serif",
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: timerAlert ? "rgba(255,220,220,0.88)" : "rgba(255,255,255,0.65)",
                lineHeight: 1,
              }}
            >
              Timer
            </span>
            <span
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
                fontSize: 22,
                fontWeight: 900,
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
                color: "#fff",
                minWidth: "6ch",
                textAlign: "center",
              }}
            >
              {formatMMSS(msLeft)}
            </span>
          </div>
        </div>
      ) : null}

      {error ? <div className="error">Error: {friendlyError(error)}</div> : null}
      {success ? <div className="hint">{success}</div> : null}

      {alreadyVoted ? (
        <section className="panel" aria-label="Vote receipt">
          <div className="panelHeader">
            <div className="panelTitle">Vote Recorded</div>
            <div className="panelMeta">{category.name}</div>
          </div>
          <div style={{ marginTop: 12 }} className="hint">
            {votedNominee
              ? `You voted for "${votedNominee.name}" in this category.`
              : "Your vote in this category is locked. Please wait for the next category."}
          </div>
        </section>
      ) : (
        <section aria-label="Nominee voting">
          {nominees.length === 0 ? <div className="hint">No nominees in this category yet.</div> : null}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            {nominees.map((n) => {
              const src = nomineePhotoUrl(apiBase, n.photo) || FALLBACK_PHOTO;
              const selected = selectedNomineeId === Number(n.id);
              return (
                <label
                  key={n.id}
                  className={
                    selected
                      ? "listItem listItemActive selectableCard selectableCardSelected"
                      : "listItem selectableCard"
                  }
                  style={{
                    cursor: voting ? "default" : "pointer",
                    opacity: votingWindowOpen ? 1 : 0.75,
                    padding: 12,
                    borderRadius: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <input
                    type="radio"
                    name="nominee"
                    checked={selected}
                    disabled={voting || !votingWindowOpen}
                    onChange={() => setSelectedNomineeId(Number(n.id))}
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

          <div className="row" style={{ marginTop: 14 }}>
            <button
              className="btn"
              type="button"
              disabled={voting || !selectedNomineeId || !votingWindowOpen}
              onClick={submitVote}
            >
              {voting ? "Submitting vote..." : "Vote"}
            </button>
          </div>
        </section>
      )}
    </Shell>
  );
}

export default function VoteClient() {
  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://3.0.81.7/api";

  const [state, setState] = React.useState<YlfState | null>(null);
  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    console.log("[VOTE] subscribing to ylf...");
    const unsubscribe = subscribeYlf((next) => {
      setState(next);
      setConnected(true);
    });
    return () => {
      console.log("[VOTE] unsubscribing from ylf");
      unsubscribe();
    };
  }, []);

  const page = state?.page ?? "home";

  if (!connected) {
    return (
      <Shell title="Vote" subtitle="Connecting to the live event...">
        <div className="hint">Please wait...</div>
      </Shell>
    );
  }

  if ((page === "category" || page === "graph") && state?.category) {
    return (
      <CategoryVoteStage
        apiBase={apiBase}
        category={state.category}
        timer={state.timer}
        onExit={() => router.push("/register")}
      />
    );
  }

  return <HomeStage />;
}
