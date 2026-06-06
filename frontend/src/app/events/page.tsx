"use client";

import React from "react";
import Link from "next/link";
import { SiteNav } from "../_components/SiteNav";
import { PublicEventsList } from "../_components/PublicEventsList";
import type { HomePublicEvent } from "../_components/landingUtils";
import { withBasePath } from "../_lib/basePath";
import { getPublicApiBase, getUploadsOrigin } from "../_lib/publicApiBase";

export default function PublicEventsPage() {
  const apiBase = getPublicApiBase();
  const apiOrigin = getUploadsOrigin();

  const [events, setEvents] = React.useState<HomePublicEvent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      setLoading(true);
      setError(null);
      try {
        const r = await fetch(`${apiBase}/public/events`);
        const data = await r.json().catch(() => null);
        if (cancelled) return;
        if (!r.ok || !data?.ok) {
          setError("Could not load events. Please try again later.");
          setEvents([]);
          return;
        }
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch {
        if (!cancelled) {
          setError("Could not load events. Check your connection.");
          setEvents([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBase]);

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
          <div className="hxEventsPageHeroRow">
            <h1 className="hxH2 hxEventsPageTitle">All public events</h1>
            <p className="hxSub hxEventsPageLead">
              Every open event is listed here. Choose one to register, then vote.
            </p>
          </div>
        </div>
      </header>

      <main className="hxMain">
        <section className="hxSection hxSection--events" aria-labelledby="events-all-heading">
          <h2 id="events-all-heading" className="visuallyHidden">
            Event list
          </h2>
          {loading ? (
            <p className="hxMuted hxShimmer">Loading events…</p>
          ) : error ? (
            <p className="hxError">{error}</p>
          ) : events.length === 0 ? (
            <p className="hxMuted">
              No live public events right now. Organisers can{" "}
              <Link href={withBasePath("/admin")}>open the dashboard</Link> and go live from Actions.
            </p>
          ) : (
            <PublicEventsList events={events} apiOrigin={apiOrigin} />
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
