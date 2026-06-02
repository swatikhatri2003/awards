"use client";

import React from "react";
import Link from "next/link";
import { withBasePath } from "../_lib/basePath";
import { resolveEventBannerUrl } from "../_lib/resolveImageUrl";
import type { HomePublicEvent } from "./landingUtils";
import { Reveal } from "./landingUtils";

export function PublicEventsList(props: { events: HomePublicEvent[]; apiOrigin: string }) {
  const { events, apiOrigin } = props;
  if (events.length === 0) return null;
  return (
    <ul className="hxEventRiver">
      {events.map((ev, i) => {
        const title = (ev.title || "").trim() || "Untitled event";
        const desc = (ev.description || "").trim();
        const imgSrc = resolveEventBannerUrl(apiOrigin, ev.image);
        const detailHref = withBasePath(`/events/${ev.event_id}`);
        return (
          <li key={ev.event_id} className="hxEventRiverItem">
            <Reveal className="hxEventWrap" delay={i * 70}>
              <Link href={detailHref} className="hxEventCard">
                <div className="hxEventVisual">
                  {imgSrc ? (
                    <img src={imgSrc} alt="" className="hxEventImg" />
                  ) : (
                    <div className="hxEventPh" aria-hidden>
                      {title.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="hxEventShine" aria-hidden />
                </div>
                <div className="hxEventCopy">
                  <h3 className="hxEventTitle">{title}</h3>
                  {desc ? <p className="hxEventDesc">{desc}</p> : null}
                  <span className="hxEventGo">View event</span>
                </div>
              </Link>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
