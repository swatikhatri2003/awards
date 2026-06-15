"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SiteNav } from "../../_components/SiteNav";
import { getPublicApiBase, getUploadsOrigin } from "../../_lib/publicApiBase";
import { resolveEventBannerUrl, resolveNomineePhotoUrl } from "../../_lib/resolveImageUrl";

type EventDetail = {
  event_id: number;
  title: string | null;
  description: string | null;
  image: string | null;
  is_private?: number | boolean | null;
  is_live?: number | boolean | null;
  declare_result?: number | boolean | null;
  start_time?: string | null;
  end_time?: string | null;
};

type CategoryRow = {
  category_id: number;
  name: string;
  winner_nominee_id: number | null;
  show_nominee?: number | boolean | null;
  declare_result?: number | boolean | null;
};

type NomineeRow = {
  nominee_id: number;
  name: string;
  photo?: string;
  description?: string | null;
  category_id: number;
  votes?: number;
};

const NOMINEE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3C/svg%3E";

function isLikelyFilePath(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  return /[A-Za-z]:\\/.test(t) || (/[\\/]/.test(t) && /workspace|Users|\.tsx|\.jsx|nextjs/i.test(t));
}

function formatWhen(iso: string | null | undefined): string {
  if (iso == null || String(iso).trim() === "") return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function votingStatus(ev: EventDetail): "open" | "upcoming" | "ended" | "always" {
  const s = ev.start_time;
  const e = ev.end_time;
  if (s == null || e == null || !String(s).trim() || !String(e).trim()) return "always";
  const startMs = new Date(String(s)).getTime();
  const endMs = new Date(String(e)).getTime();
  if (Number.isNaN(startMs) || Number.isNaN(endMs)) return "always";
  const now = Date.now();
  if (now < startMs) return "upcoming";
  if (now > endMs) return "ended";
  return "open";
}

function isLive(ev: EventDetail | null): boolean {
  return ev?.is_live === true || ev?.is_live === 1;
}

function eventDeclaresAll(ev: EventDetail | null): boolean {
  return ev?.declare_result === true || ev?.declare_result === 1;
}

function categoryDeclaresResult(c: CategoryRow, ev: EventDetail | null): boolean {
  return eventDeclaresAll(ev) || c.declare_result === true || c.declare_result === 1;
}

function categoryHasWinner(c: CategoryRow, ev: EventDetail | null): boolean {
  if (!categoryDeclaresResult(c, ev)) return false;
  const wid = c.winner_nominee_id;
  return wid != null && Number(wid) > 0;
}

function EventDetailContent() {
  const params = useParams();
  const apiBase = getPublicApiBase();
  const apiOrigin = getUploadsOrigin();

  const eventId = React.useMemo(() => {
    const raw = params?.eventId;
    const s = Array.isArray(raw) ? raw[0] : raw;
    const n = Number(s);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
  }, [params]);

  const [event, setEvent] = React.useState<EventDetail | null>(null);
  const [categories, setCategories] = React.useState<CategoryRow[]>([]);
  const [nominees, setNominees] = React.useState<NomineeRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [liveDataLoading, setLiveDataLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [liveDataError, setLiveDataError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!eventId) {
      setLoading(false);
      setError("Invalid event link.");
      setEvent(null);
      return;
    }
    let cancelled = false;
    void (async () => {
      setLoading(true);
      setError(null);
      try {
        const r = await fetch(`${apiBase}/events/${eventId}`);
        const data = await r.json().catch(() => null);
        if (cancelled) return;
        if (!r.ok || !data?.ok || !data?.event) {
          setError("This event could not be found.");
          setEvent(null);
          return;
        }
        setEvent(data.event as EventDetail);
      } catch {
        if (!cancelled) {
          setError("Could not load event details. Check your connection.");
          setEvent(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBase, eventId]);

  React.useEffect(() => {
    if (!eventId || !event) {
      setCategories([]);
      setNominees([]);
      setLiveDataError(null);
      return;
    }
    let cancelled = false;
    void (async () => {
      setLiveDataLoading(true);
      setLiveDataError(null);
      try {
        const [catsRes, nomsRes] = await Promise.all([
          fetch(`${apiBase}/categories?eventId=${eventId}`),
          fetch(`${apiBase}/nominees?eventId=${eventId}`),
        ]);
        const catsData = await catsRes.json().catch(() => null);
        const nomsData = await nomsRes.json().catch(() => null);
        if (cancelled) return;
        if (!catsRes.ok) throw new Error(catsData?.error || "CATEGORIES_FAILED");
        if (!nomsRes.ok) throw new Error(nomsData?.error || "NOMINEES_FAILED");
        setCategories(Array.isArray(catsData?.categories) ? catsData.categories : []);
        setNominees(Array.isArray(nomsData?.nominees) ? nomsData.nominees : []);
      } catch (e) {
        if (!cancelled) {
          setLiveDataError(e instanceof Error ? e.message : "EVENT_DATA_FAILED");
          setCategories([]);
          setNominees([]);
        }
      } finally {
        if (!cancelled) setLiveDataLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBase, event, eventId]);

  const title = (event?.title || "").trim() || "Untitled event";
  const rawDesc = (event?.description || "").trim();
  const desc = rawDesc && !isLikelyFilePath(rawDesc) ? rawDesc : "";
  const imgSrc = event ? resolveEventBannerUrl(apiOrigin, event.image) : "";
  const isPrivate = event?.is_private === true || event?.is_private === 1;
  const live = isLive(event);
  const status = event ? votingStatus(event) : "always";
  const startLabel = formatWhen(event?.start_time);
  const endLabel = formatWhen(event?.end_time);
  const hasWindow = Boolean(startLabel && endLabel);
  const registerHref = `/register?eventId=${eventId}`;
  const voteHref = "/usersvote";

  const nomineesByCategory = React.useMemo(() => {
    const map = new Map<number, NomineeRow[]>();
    for (const n of nominees) {
      const cid = Number(n.category_id);
      if (!Number.isFinite(cid)) continue;
      const list = map.get(cid) || [];
      list.push(n);
      map.set(cid, list);
    }
    return map;
  }, [nominees]);

  const winnerCategories = React.useMemo(
    () => categories.filter((c) => categoryHasWinner(c, event)),
    [categories, event],
  );

  return (
    <div className="homeRoot">
      <div className="hxMesh" aria-hidden />
      <div className="hxFloatOrbs" aria-hidden>
        <span className="hxOrb hxOrb--a" />
        <span className="hxOrb hxOrb--b" />
        <span className="hxOrb hxOrb--c" />
      </div>

      <header className="hxTop">
        <SiteNav />
        <div className="hxEventsPageHero">
          <nav className="hxEventDetailBack" aria-label="Breadcrumb">
            <Link href="/">← Home</Link>
            <span className="hxEventDetailBackSep" aria-hidden>·</span>
            {!isPrivate ? (
              <>
                <Link href="/events">All events</Link>
                <span className="hxEventDetailBackSep" aria-hidden>·</span>
              </>
            ) : null}
            <span>{title}</span>
          </nav>
        </div>
      </header>

      <main className="hxMain">
        <section className="hxSection hxEventDetailSection" aria-labelledby="event-detail-heading">
          {loading ? (
            <p className="hxMuted hxShimmer">Loading event…</p>
          ) : error || !event ? (
            <div className="hxEventDetailEmpty">
              <p className="hxError">{error || "Event not found."}</p>
              <Link href="/events" className="hxPillBtn">
                Browse events
              </Link>
            </div>
          ) : (
            <article className="hxEventDetail">
              <div className="hxEventDetailHero">
                <div className="hxEventDetailVisual">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt=""
                      className="hxEventDetailImg"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const ph = e.currentTarget.nextElementSibling;
                        if (ph instanceof HTMLElement) ph.hidden = false;
                      }}
                    />
                  ) : null}
                  <div className="hxEventDetailPh" aria-hidden hidden={Boolean(imgSrc)}>
                    {title.slice(0, 2).toUpperCase()}
                  </div>
                </div>

                <div className="hxEventDetailBody">
                  <div className="hxEventDetailBadges">
                    {live ? (
                      <span className="hxEventDetailBadge hxEventDetailBadge--live">Live</span>
                    ) : (
                      <span className="hxEventDetailBadge hxEventDetailBadge--offline">Not live</span>
                    )}
                    {isPrivate ? (
                      <span className="hxEventDetailBadge hxEventDetailBadge--private">Private</span>
                    ) : (
                      <span className="hxEventDetailBadge hxEventDetailBadge--public">Public</span>
                    )}
                    {live && hasWindow ? (
                      <span className={`hxEventDetailBadge hxEventDetailBadge--${status}`}>
                        {status === "open"
                          ? "Voting open"
                          : status === "upcoming"
                            ? "Voting soon"
                            : "Voting ended"}
                      </span>
                    ) : null}
                  </div>

                  <h1 id="event-detail-heading" className="hxEventDetailTitle">
                    {title}
                  </h1>

                  {desc ? <p className="hxEventDetailDesc">{desc}</p> : null}

                  {hasWindow ? (
                    <dl className="hxEventDetailMeta">
                      <div>
                        <dt>Voting starts</dt>
                        <dd>{startLabel}</dd>
                      </div>
                      <div>
                        <dt>Voting ends</dt>
                        <dd>{endLabel}</dd>
                      </div>
                    </dl>
                  ) : live ? (
                    <p className="hxEventDetailNote">Voting is open whenever you are registered for this event.</p>
                  ) : null}

                  {!live ? (
                    <p className="hxEventDetailNote">
                      Not live yet — browse nominees below. Voting opens when the organiser goes live.
                    </p>
                  ) : null}

                  {isPrivate && !live ? (
                    <p className="hxEventDetailNote">
                      Invite-only — use the registration link from your organiser to join.
                    </p>
                  ) : null}

                  {isPrivate && live ? (
                    <p className="hxEventDetailNote">
                      Invite-only — use your organiser&apos;s link to register and vote.
                    </p>
                  ) : null}

                  <div className="hxEventDetailActions">
                    {live ? (
                      <>
                        <Link href={registerHref} className="hxPillBtn hxPillBtn--lg">
                          Register
                        </Link>
                        <Link href={voteHref} className="hxPillBtn hxPillBtn--lg">
                          Vote now
                        </Link>
                      </>
                    ) : (
                      <Link href={registerHref} className="hxPillBtn hxPillBtn--lg">
                        Register
                      </Link>
                    )}
                    {!isPrivate ? (
                      <Link href="/events" className="hxPillBtn hxPillBtn--soft">
                        More events
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="hxEventDetailDivider" aria-hidden />

              <div className="hxEventDetailContent">
                {liveDataLoading ? (
                  <p className="hxMuted hxShimmer">Loading categories and nominees…</p>
                ) : liveDataError ? (
                  <p className="hxError">Could not load event data: {liveDataError}</p>
                ) : (
                  <>
                    {winnerCategories.length > 0 ? (
                      <section className="hxEventLiveBlock" aria-labelledby="event-winners-heading">
                        <h2 id="event-winners-heading" className="hxEventLiveHeading">
                          Declared winners
                        </h2>
                        <div className="hxEventWinnersGrid">
                          {winnerCategories.map((c) => {
                            const wid = Number(c.winner_nominee_id);
                            const winner = (nomineesByCategory.get(c.category_id) || []).find(
                              (n) => Number(n.nominee_id) === wid,
                            );
                            const thumb = winner?.photo ? resolveNomineePhotoUrl(apiOrigin, winner.photo) : "";
                            return (
                              <article key={c.category_id} className="hxEventWinnerCard">
                                <div className="hxEventWinnerCat">{c.name}</div>
                                <div className="hxEventWinnerBody">
                                  <img
                                    src={thumb || NOMINEE_FALLBACK}
                                    alt=""
                                    className="hxEventWinnerPhoto"
                                    onError={(e) => {
                                      e.currentTarget.src = NOMINEE_FALLBACK;
                                    }}
                                  />
                                  <div className="hxEventWinnerName">{winner?.name?.trim() || "Winner"}</div>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      </section>
                    ) : null}

                    <section className="hxEventLiveBlock" aria-labelledby="event-categories-heading">
                      <h2 id="event-categories-heading" className="hxEventLiveHeading">
                        Categories & nominees
                      </h2>
                      {categories.length === 0 ? (
                        <p className="hxMuted">No categories yet.</p>
                      ) : (
                        <div className="hxEventCatList">
                          {categories.map((c) => {
                            const noms = nomineesByCategory.get(c.category_id) || [];
                            return (
                              <article key={c.category_id} className="hxEventCatBlock">
                                <header className="hxEventCatHead">
                                  <h3 className="hxEventCatTitle">{c.name}</h3>
                                  <span className="hxEventCatMeta">
                                    {noms.length} {noms.length === 1 ? "nominee" : "nominees"}
                                  </span>
                                </header>
                                {noms.length === 0 ? (
                                  <p className="hxMuted hxEventCatEmpty">No nominees to show yet.</p>
                                ) : (
                                  <ul className="hxEventNomineeGrid">
                                    {noms.map((n) => {
                                      const thumb = n.photo ? resolveNomineePhotoUrl(apiOrigin, n.photo) : "";
                                      return (
                                        <li key={n.nominee_id} className="hxEventNomineeCard">
                                          <img
                                            src={thumb || NOMINEE_FALLBACK}
                                            alt=""
                                            className="hxEventNomineePhoto"
                                            onError={(e) => {
                                              e.currentTarget.src = NOMINEE_FALLBACK;
                                            }}
                                          />
                                          <div className="hxEventNomineeBody">
                                            <div className="hxEventNomineeName">{n.name}</div>
                                            {typeof n.votes === "number" ? (
                                              <div className="hxEventNomineeVotes">{n.votes} votes</div>
                                            ) : null}
                                          </div>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </article>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  </>
                )}
              </div>
            </article>
          )}
        </section>
      </main>

      <footer className="hxFooter">
        <div className="hxFooterInner">
          <p className="hxFooterLead">
            <Link href="/">← Back to home</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function EventDetailClient() {
  return (
    <Suspense
      fallback={
        <div className="homeRoot" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p className="hxMuted">Loading…</p>
        </div>
      }
    >
      <EventDetailContent />
    </Suspense>
  );
}
