"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Shell } from "../../_components/Shell";
import { subscribeYlf, type YlfNominee, type YlfState } from "@/lib/firebase";

const FALLBACK_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23111424'/%3E%3Ctext x='50%25' y='50%25' fill='%23aab3c5' font-size='14' text-anchor='middle' dominant-baseline='middle'%3ENo Photo%3C/text%3E%3C/svg%3E";
const ERROR_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23111424'/%3E%3Ctext x='50%25' y='50%25' fill='%23aab3c5' font-size='14' text-anchor='middle' dominant-baseline='middle'%3EImage error%3C/text%3E%3C/svg%3E";

const VOTED_STORAGE_KEY = "ylf_voted_categories";

function nomineePhotoUrl(apiBase: string, photo?: string) {
  const p = (photo || "").trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p) || p.startsWith("data:")) return p;
  const base = apiBase.replace(/\/+$/, "");
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
  onExit,
}: {
  apiBase: string;
  category: NonNullable<YlfState["category"]>;
  onExit: () => void;
}) {
  const nominees = React.useMemo(() => normalizeNominees(category.nominees), [category.nominees]);

  const [selectedNomineeId, setSelectedNomineeId] = React.useState<number | null>(null);
  const [voting, setVoting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [votedNomineeId, setVotedNomineeId] = React.useState<number | null>(null);

  React.useEffect(() => {
    setSelectedNomineeId(null);
    setError(null);
    setSuccess(null);
    const map = readVotedMap();
    const prev = map[String(category.id)];
    setVotedNomineeId(typeof prev === "number" ? prev : null);
  }, [category.id]);

  async function submitVote() {
    if (!selectedNomineeId || votedNomineeId !== null) return;
    setVoting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${apiBase}/nominees/${selectedNomineeId}/vote`, { method: "POST" });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(friendlyError(data?.error || "VOTE_FAILED"));

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
      title={`Vote: ${category.name}`}
      subtitle={
        alreadyVoted
          ? "You have already voted in this category."
          : "Select one nominee and submit your vote. You can vote only once."
      }
      wide
      right={
        <button className="linkBtn" type="button" onClick={onExit}>
          Exit / change account
        </button>
      }
    >
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
        <section className="panel" aria-label="Nominee voting">
          <div className="panelHeader">
            <div className="panelTitle">Nominees</div>
            <div className="panelMeta">{nominees.length} nominees</div>
          </div>

          {nominees.length === 0 ? (
            <div className="hint">No nominees in this category yet.</div>
          ) : null}

          <div className="nomineeGrid">
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
                  style={{ cursor: voting ? "default" : "pointer" }}
                >
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <div className="listTitle" style={{ whiteSpace: "normal", overflow: "visible" }}>
                      <input
                        type="radio"
                        name="nominee"
                        checked={selected}
                        disabled={voting}
                        onChange={() => setSelectedNomineeId(Number(n.id))}
                        style={{ marginRight: 10 }}
                      />
                      {n.name}
                    </div>
                  </div>

                  <div style={{ marginTop: 10 }} className="nomineePhotoWrap">
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
                </label>
              );
            })}
          </div>

          <div className="row" style={{ marginTop: 12 }}>
            <button
              className="btn"
              type="button"
              disabled={voting || !selectedNomineeId}
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

export default function VoteCategoryPage() {
  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

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

  if (page === "category" && state?.category) {
    return (
      <CategoryVoteStage
        apiBase={apiBase}
        category={state.category}
        onExit={() => router.push("/register")}
      />
    );
  }

  return <HomeStage />;
}
