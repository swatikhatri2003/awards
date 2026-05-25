"use client";

import React from "react";
import { HomeExperience } from "./_components/HomeExperience";
import type { HomePublicEvent } from "./_components/landingUtils";

function normalizeApiBase(raw: string) {
  const root = raw.replace(/\/+$/, "");
  return /\/api$/i.test(root) ? root : `${root}/api`;
}

export default function HomePage() {
  const rawApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://3.0.81.7/api";
  const apiBase = normalizeApiBase(rawApiBase);
  const apiOrigin = apiBase.replace(/\/api$/i, "");

  const [events, setEvents] = React.useState<HomePublicEvent[]>([]);
  const [eventsLoading, setEventsLoading] = React.useState(true);
  const [eventsError, setEventsError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      setEventsLoading(true);
      setEventsError(null);
      try {
        const r = await fetch(`${apiBase}/public/events`);
        const data = await r.json().catch(() => null);
        if (cancelled) return;
        if (!r.ok || !data?.ok) {
          setEventsError("Could not load events. Please try again later.");
          setEvents([]);
          return;
        }
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch {
        if (!cancelled) {
          setEventsError("Could not load events. Check your connection.");
          setEvents([]);
        }
      } finally {
        if (!cancelled) setEventsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBase]);

  return (
    <HomeExperience
      events={events}
      eventsLoading={eventsLoading}
      eventsError={eventsError}
      apiOrigin={apiOrigin}
    />
  );
}
