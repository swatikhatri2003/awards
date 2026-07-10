"use client";

import React from "react";
import { HomeExperience } from "./HomeExperience";
import { useToast } from "./ToastProvider";
import type { HomePublicEvent } from "./landingUtils";
import { getPublicApiBase, getUploadsOrigin } from "../_lib/publicApiBase";

export function HomePageClient() {
  const apiBase = getPublicApiBase();
  const apiOrigin = getUploadsOrigin();
  const { toastError } = useToast();
  const toastErrorRef = React.useRef(toastError);
  toastErrorRef.current = toastError;

  const [events, setEvents] = React.useState<HomePublicEvent[]>([]);
  const [eventsLoading, setEventsLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      setEventsLoading(true);
      try {
        const r = await fetch(`${apiBase}/public/events`);
        const data = await r.json().catch(() => null);
        if (cancelled) return;
        if (!r.ok || !data?.ok) {
          toastErrorRef.current("Could not load events. Please try again later.");
          setEvents([]);
          return;
        }
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch {
        if (!cancelled) {
          toastErrorRef.current("Could not load events. Check your connection.");
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
      apiOrigin={apiOrigin}
    />
  );
}
