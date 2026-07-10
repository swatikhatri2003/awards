"use client";

import React from "react";
import { PublicEventCard } from "./PublicEventCard";
import { resolveEventBannerUrl } from "../_lib/resolveImageUrl";
import { Reveal, sanitizeEventDescription, type HomePublicEvent } from "./landingUtils";

export function PublicEventsList(props: {
  events: HomePublicEvent[];
  apiOrigin: string;
  preview?: boolean;
}) {
  const { events, apiOrigin, preview } = props;
  if (events.length === 0) return null;

  const gridClass = ["hxEventRiver", preview ? "hxEventRiver--preview" : ""].filter(Boolean).join(" ");

  return (
    <ul className={gridClass}>
      {events.map((ev, i) => {
        const title = (ev.title || "").trim() || "Untitled event";
        const desc = sanitizeEventDescription(ev.description);
        const imgSrc = resolveEventBannerUrl(apiOrigin, ev.image);
        const detailHref = `/events/${ev.event_id}`;
        const live = ev.is_live === true || ev.is_live === 1;

        return (
          <li key={ev.event_id} className="hxEventRiverItem">
            <Reveal className="hxEventWrap" delay={i * 70}>
              <PublicEventCard
                title={title}
                description={desc}
                imageSrc={imgSrc}
                detailHref={detailHref}
                live={live}
              />
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
