"use client";

import React from "react";
import Link from "next/link";
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
import { getPublicApiBase, getUploadsOrigin } from "../_lib/publicApiBase";
import { resolveNomineePhotoUrl } from "../_lib/resolveImageUrl";

const FALLBACK_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' fill='%2364748b' font-size='14' text-anchor='middle' dominant-baseline='middle'%3ENo Photo%3C/text%3E%3C/svg%3E";
const ERROR_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' fill='%2364748b' font-size='14' text-anchor='middle' dominant-baseline='middle'%3EImage error%3C/text%3E%3C/svg%3E";

type Category = {
  category_id: number;
  name: string;
  event_id?: number | null;
};

type Nominee = {
  nominee_id: number;
  name: string;
  photo?: string;
  description?: string | null;
  category_id: number;
  votes?: number;
};

function parseDescription(raw?: string | null): {
  tagline: string;
  bullets: string[];
} {
  const text = (raw || "").replace(/\r\n?/g, "\n").trim();
  if (!text) return { tagline: "", bullets: [] };

  // If author used `*`, `-`, or `•` markers, treat them as bullets.
  if (/^[\*\-•]\s+/m.test(text)) {
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    const tagLines: string[] = [];
    const bullets: string[] = [];
    for (const line of lines) {
      const m = line.match(/^[\*\-•]\s*(.+)$/);
      if (m) bullets.push(m[1].trim());
      else if (bullets.length === 0) tagLines.push(line);
      else bullets.push(line);
    }
    return { tagline: tagLines.join(" "), bullets };
  }

  // No markers: treat blank-line separated paragraphs as items.
  // First paragraph = tagline, rest = bullets.
  const paragraphs = text
    .split(/\n\s*\n+/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
  if (paragraphs.length <= 1) return { tagline: paragraphs[0] || "", bullets: [] };
  return { tagline: paragraphs[0], bullets: paragraphs.slice(1) };
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
    case "VOTING_WINDOW_CLOSED":
      return "Voting is only open during the scheduled window for this event.";
    default:
      return code || "Something went wrong.";
  }
}

type EventMeta = {
  start_time?: string | null;
  end_time?: string | null;
};

function clientVotingWindowOpen(ev: EventMeta | null): boolean {
  if (!ev) return true;
  const s = ev.start_time;
  const e = ev.end_time;
  if (s == null || e == null) return true;
  const sTrim = String(s).trim();
  const eTrim = String(e).trim();
  if (!sTrim || !eTrim) return true;
  const startMs = new Date(sTrim).getTime();
  const endMs = new Date(eTrim).getTime();
  if (Number.isNaN(startMs) || Number.isNaN(endMs)) return true;
  const now = Date.now();
  return now >= startMs && now <= endMs;
}

export default function UsersVotePage() {
  const router = useRouter();
  const apiBase = getPublicApiBase();
  const apiOrigin = getUploadsOrigin();

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
  const [eventMeta, setEventMeta] = React.useState<EventMeta | null>(null);
  const [votingWindowOpen, setVotingWindowOpen] = React.useState(true);

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
        const u = readCurrentUser();
        const eventId = typeof u?.eventId === "number" && u.eventId > 0 ? u.eventId : 1;
        const [catRes, nomRes, evRes] = await Promise.all([
          fetch(`${apiBase}/categories?eventId=${eventId}`),
          fetch(`${apiBase}/nominees?eventId=${eventId}`),
          fetch(`${apiBase}/events/${eventId}`),
        ]);
        const evJson = await evRes.json().catch(() => null);
        const meta: EventMeta | null =
          evRes.ok && evJson?.event
            ? {
                start_time: evJson.event.start_time ?? null,
                end_time: evJson.event.end_time ?? null,
              }
            : null;
        setEventMeta(meta);
        setVotingWindowOpen(clientVotingWindowOpen(meta));
        const catData = await catRes.json().catch(() => null);
        const nomData = await nomRes.json().catch(() => null);

        const rawCats = catData?.categories;
        if (!catRes.ok || !Array.isArray(rawCats) || rawCats.length === 0) {
          throw new Error("No voting categories are available right now.");
        }
        const hasEvent = rawCats.some(
          (c: Category) => c.event_id != null && Number.isFinite(Number(c.event_id)),
        );
        const forEvent = hasEvent
          ? rawCats.filter((c: Category) => Number(c.event_id) === eventId)
          : rawCats;
        if (forEvent.length === 0) {
          throw new Error("No voting categories are available right now.");
        }
        const sorted = [...forEvent].sort(
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

  React.useEffect(() => {
    if (!eventMeta) return;
    const tick = () => setVotingWindowOpen(clientVotingWindowOpen(eventMeta));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [eventMeta]);

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
    if (!votingWindowOpen) {
      setError(friendlyError("VOTING_WINDOW_CLOSED"));
      return;
    }
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

  const eventId =
    typeof user?.eventId === "number" && user.eventId > 0 ? Math.floor(user.eventId) : null;

  const headerTitle = done
    ? "All Done"
    : activeCategory
      ? activeCategory.name
      : loadingInit
        ? "Loading..."
        : "No categories";

  const backDisabled = activeIdx === 0 && !done;
  /* Allow moving to the next category without voting (skip / browse first). */
  const nextDisabled = done;
  const voteDisabled =
    done ||
    voting ||
    voted ||
    !selectedNomineeId ||
    !activeCategory ||
    nominees.length === 0 ||
    !votingWindowOpen;

  const bottomBar = (
    <div className="voteBottomBar">
      <button
        type="button"
        className="voteBottomBtn voteBottomBtnSide"
        disabled={backDisabled}
        onClick={prevCategory}
      >
        ‹ Back
      </button>

      <button
        className="btn voteBottomBtn voteBottomBtnVote"
        type="button"
        disabled={voteDisabled}
        onClick={submitVote}
        style={{
          opacity: voteDisabled ? 0.85 : 1,
          cursor: voteDisabled ? "not-allowed" : "pointer",
        }}
      >
        {voted ? "Voted" : voting ? "Voting..." : "Vote"}
      </button>

      <button
        type="button"
        className="voteBottomBtn voteBottomBtnSide"
        disabled={nextDisabled}
        onClick={nextCategory}
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
      right={
        user ? (
          <div className="shellHeaderActionGroup">
            {eventId ? (
              <Link href={`/events/${eventId}`} className="linkBtn">
                Event details
              </Link>
            ) : null}
            <button className="linkBtn" type="button" onClick={logout}>
              Logout
            </button>
          </div>
        ) : null
      }
    >
      <h1 className="usersVoteTitle">{headerTitle}</h1>

      {eventId ? (
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <Link
            href={`/events/${eventId}`}
            className="btn btnSecondary"
            style={{ textDecoration: "none" }}
          >
            See event details
          </Link>
        </div>
      ) : null}

      {error ? <div className="error">Error: {error}</div> : null}

      {!loadingInit && !votingWindowOpen && eventMeta?.start_time && eventMeta?.end_time ? (
        <div className="voteClosedHint">
          Voting is closed right now. It opens only between the scheduled start and end times for this event.
        </div>
      ) : null}

      {done ? (
        <section
          className="panel usersVoteSectionPad"
          aria-label="Voting complete"
        >
          <div className="panelHeader">
            <div className="panelTitle">All Done</div>
          </div>
          <div className="hint" style={{ marginTop: 12 }}>
            You’ve gone through every category. You can use Back to return and vote where you haven’t yet.
          </div>
        </section>
      ) : !activeCategory ? (
        <div className="hint">{loadingInit ? "Please wait..." : "No categories yet."}</div>
      ) : (
        <section
          className="usersVoteSectionPad"
          aria-label="Category voting"
        >
          {nominees.length === 0 ? (
            <div className="hint">No nominees in this category yet.</div>
          ) : (
            <div className="usersVoteNomineeList">
              {nominees.map((n) => {
                const src = resolveNomineePhotoUrl(apiOrigin, n.photo) || FALLBACK_PHOTO;
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
                      flexDirection: "column",
                      alignItems: "stretch",
                      gap: 8,
                      position: "relative",
                    }}
                  >
                    <input
                      type="radio"
                      name={`nominee-${activeCategory.category_id}`}
                      checked={isSelected}
                      disabled={voting || voted}
                      onChange={() => setSelectedNomineeId(Number(n.nominee_id))}
                      className="visuallyHidden"
                    />

                    <div className="usersVoteNomineeRow">
                      <div className="usersVoteNomineePhoto">
                        <img
                          src={src}
                          alt={n.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = ERROR_PHOTO;
                          }}
                        />
                      </div>

                      <div className="usersVoteNomineeName">{n.name}</div>

                      {isVotedFor ? (
                        <span aria-hidden="true" className="usersVoteVotedBadge">
                          ✓
                        </span>
                      ) : null}
                    </div>

                    {(() => {
                      const desc = parseDescription(n.description);
                      if (!desc.tagline && desc.bullets.length === 0) return null;
                      return (
                        <div style={{ width: "100%" }}>
                          {desc.tagline ? (
                            <div
                              className="usersVoteNomineeDescTag"
                              style={{ marginBottom: desc.bullets.length > 0 ? 4 : 0 }}
                            >
                              {desc.tagline}
                            </div>
                          ) : null}
                          {desc.bullets.length > 0 ? (
                            <ul className="usersVoteNomineeDescList">
                              {desc.bullets.map((b, i) => (
                                <li key={i} style={{ marginBottom: 1 }}>
                                  {b}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      );
                    })()}
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
