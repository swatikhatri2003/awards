"use client";

import React from "react";
import Link from "next/link";
import { SiteNav } from "../_components/SiteNav";
import { Breadcrumb } from "../_components/Breadcrumb";
import { PublicEventsList } from "../_components/PublicEventsList";
import { useToast } from "../_components/ToastProvider";
import type { HomePublicEvent } from "../_components/landingUtils";
import { getPublicApiBase, getUploadsOrigin } from "../_lib/publicApiBase";

export default function PublicEventsPage() {
  const apiBase = getPublicApiBase();
  const apiOrigin = getUploadsOrigin();
  const { toastError } = useToast();

  const [events, setEvents] = React.useState<HomePublicEvent[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      setLoading(true);
      try {
        const r = await fetch(`${apiBase}/public/events`);
        const data = await r.json().catch(() => null);
        if (cancelled) return;
        if (!r.ok || !data?.ok) {
          toastError("Could not load events. Please try again later.");
          setEvents([]);
          return;
        }
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch {
        if (!cancelled) {
          toastError("Could not load events. Check your connection.");
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
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "All events" }]} />
          <div className="hxEventsPageHeroRow" style={{ marginTop: 12 }}>
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
          ) : events.length === 0 ? (
            <p className="hxMuted">
              No public events right now. Organisers can{" "}
              <Link href="/admin">open the dashboard</Link> to publish one.
            </p>
          ) : (
            <PublicEventsList events={events} apiOrigin={apiOrigin} />
          )}
        </section>
      </main>
    </div>
  );
}
