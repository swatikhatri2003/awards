"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SiteNav } from "../../_components/SiteNav";
import { withBasePath } from "../../_lib/basePath";
import { getPublicApiBase, getUploadsOrigin } from "../../_lib/publicApiBase";
import { resolveEventBannerUrl } from "../../_lib/resolveImageUrl";

type EventDetail = {
  event_id: number;
  title: string | null;
  description: string | null;
  image: string | null;
  is_private?: number | boolean | null;
  start_time?: string | null;
  end_time?: string | null;
};

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
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

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

  const title = (event?.title || "").trim() || "Untitled event";
  const desc = (event?.description || "").trim();
  const imgSrc = event ? resolveEventBannerUrl(apiOrigin, event.image) : "";
  const isPrivate = event?.is_private === true || event?.is_private === 1;
  const status = event ? votingStatus(event) : "always";
  const startLabel = formatWhen(event?.start_time);
  const endLabel = formatWhen(event?.end_time);
  const hasWindow = Boolean(startLabel && endLabel);
  const registerHref = withBasePath(`/register?eventId=${eventId}`);

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
          <p className="hxEventDetailBack">
            <Link href={withBasePath("/")}>← Home</Link>
            <span aria-hidden> · </span>
            <Link href={withBasePath("/events")}>All events</Link>
          </p>
        </div>
      </header>

      <main className="hxMain">
        <section className="hxSection hxEventDetailSection" aria-labelledby="event-detail-heading">
          {loading ? (
            <p className="hxMuted hxShimmer">Loading event…</p>
          ) : error || !event ? (
            <div className="hxEventDetailEmpty">
              <p className="hxError">{error || "Event not found."}</p>
              <Link href={withBasePath("/events")} className="hxPillBtn">
                Browse events
              </Link>
            </div>
          ) : (
            <article className="hxEventDetail">
              <div className="hxEventDetailVisual">
                {imgSrc ? (
                  <img src={imgSrc} alt="" className="hxEventDetailImg" />
                ) : (
                  <div className="hxEventDetailPh" aria-hidden>
                    {title.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="hxEventDetailBody">
                <div className="hxEventDetailBadges">
                  {isPrivate ? (
                    <span className="hxEventDetailBadge hxEventDetailBadge--private">Private</span>
                  ) : (
                    <span className="hxEventDetailBadge hxEventDetailBadge--public">Public</span>
                  )}
                  {hasWindow ? (
                    <span
                      className={`hxEventDetailBadge hxEventDetailBadge--${status}`}
                    >
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
                ) : (
                  <p className="hxEventDetailNote">Voting is open whenever you are registered for this event.</p>
                )}

                {isPrivate ? (
                  <p className="hxEventDetailNote">
                    This is an invite-only event. Use the registration link from your organiser to join.
                  </p>
                ) : null}

                <div className="hxEventDetailActions">
                  {!isPrivate ? (
                    <Link href={registerHref} className="hxPillBtn hxPillBtn--lg">
                      Register & vote
                    </Link>
                  ) : null}
                  <Link href={withBasePath("/events")} className="hxPillBtn hxPillBtn--soft">
                    More events
                  </Link>
                </div>
              </div>
            </article>
          )}
        </section>
      </main>

      <footer className="hxFooter">
        <div className="hxFooterInner">
          <p className="hxFooterLead">
            <Link href={withBasePath("/")}>← Back to home</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function EventDetailPage() {
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
