"use client";

import React from "react";
import Box from "@mui/material/Box";
import { PublicEventCard } from "./PublicEventCard";
import { resolveEventBannerUrl } from "../_lib/resolveImageUrl";
import type { HomePublicEvent } from "./landingUtils";
import { Reveal } from "./landingUtils";

export function PublicEventsList(props: { events: HomePublicEvent[]; apiOrigin: string }) {
  const { events, apiOrigin } = props;
  if (events.length === 0) return null;

  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "22px",
        alignItems: "stretch",
      }}
    >
      {events.map((ev, i) => {
        const title = (ev.title || "").trim() || "Untitled event";
        const desc = (ev.description || "").trim();
        const imgSrc = resolveEventBannerUrl(apiOrigin, ev.image);
        const detailHref = `/events/${ev.event_id}`;
        const live = ev.is_live === true || ev.is_live === 1;

        return (
          <Box component="li" key={ev.event_id} sx={{ listStyle: "none", minWidth: 0, display: "flex" }}>
            <Reveal className="hxEventWrap" delay={i * 70}>
              <PublicEventCard
                title={title}
                description={desc}
                imageSrc={imgSrc}
                detailHref={detailHref}
                live={live}
              />
            </Reveal>
          </Box>
        );
      })}
    </Box>
  );
}
