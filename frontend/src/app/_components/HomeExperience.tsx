"use client";

import React from "react";
import Link from "next/link";
import { SiteNav } from "./SiteNav";
import { PublicEventsList } from "./PublicEventsList";
import { HOME_EVENTS_PREVIEW_LIMIT, Reveal, type HomePublicEvent } from "./landingUtils";

export type { HomePublicEvent };

export function HomeExperience(props: {
  events: HomePublicEvent[];
  eventsLoading: boolean;
  eventsError: string | null;
  apiOrigin: string;
}) {
  const { events, eventsLoading, eventsError, apiOrigin } = props;
  const previewEvents = events.slice(0, HOME_EVENTS_PREVIEW_LIMIT);
  const hasMoreEvents = events.length > HOME_EVENTS_PREVIEW_LIMIT;

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

        <div className="hxHero">
          <div className="hxHeroGlow" aria-hidden />
          <div className="hxHeroInner">
            <p className="hxKicker hxHeroIn">
              <span className="hxKickerDot" aria-hidden />
              Live voting · Events · Nominees
            </p>
            <h1 className="hxTitle hxHeroIn hxHeroIn--2">
              Award nights that feel{" "}
              <span className="hxTitleGrad">effortless</span> for organisers and voters.
            </h1>
            <p className="hxLead hxHeroIn hxHeroIn--3">
              One flow for categories, nominees, and verified ballots—public lists for open events, or private
              invite-only voting when you need control.
            </p>
            <div className="hxHeroActions hxHeroIn hxHeroIn--4">
              <Link className="hxPillBtn hxPillBtn--lg" href="/admin">
                Create an event
              </Link>
              <Link className="hxPillBtn hxPillBtn--lg hxPillBtn--soft" href="/events">
                Browse public events
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="hxMain">
        <section id="why" className="hxSection hxSection--why">
          <Reveal className="hxSectionIntro">
            <h2 className="hxH2">Built for real events</h2>
            <p className="hxSub">Less chasing, more clarity—before the curtain goes up.</p>
          </Reveal>
          <div className="hxWhyGrid">
            {[
              {
                n: "01",
                t: "Voters see the full picture",
                d: "Event, categories, and nominees in one place—register once, vote with confidence.",
              },
              {
                n: "02",
                t: "Organisers save time",
                d: "Configure awards and nominees once; OTP-backed registration cuts noise.",
              },
              {
                n: "03",
                t: "Public or private",
                d: "Open events show on the home preview and on the Vote page; private ballots stay invite-only.",
              },
            ].map((row, i) => (
              <Reveal key={row.n} className="hxWhyItem" delay={i * 90}>
                <span className="hxWhyNum">{row.n}</span>
                <h3 className="hxWhyTitle">{row.t}</h3>
                <p className="hxWhyDesc">{row.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="features" className="hxSection hxSection--features">
          <Reveal className="hxSectionIntro">
            <h2 className="hxH2">Everything in one stack</h2>
            <p className="hxSub">Smooth surfaces, no clutter—just what your programme needs.</p>
          </Reveal>
          <div className="hxFeatureRiver">
            {[
              { t: "Multiple events", d: "Separate branding and copy per occasion." },
              { t: "Award categories", d: "Nominees mapped cleanly to each award." },
              { t: "Nominee profiles", d: "Photos and bios voters actually read." },
              { t: "Verified voting", d: "Registration + OTP across channels." },
              { t: "Public voting", d: "Listed when the event is open to all." },
              { t: "Private voting", d: "Invite-only with approved mobile numbers." },
            ].map((f, i) => (
              <Reveal key={f.t} className="hxFeatureChip" delay={i * 55}>
                <h3 className="hxFeatureChipTitle">{f.t}</h3>
                <p className="hxFeatureChipDesc">{f.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="events" className="hxSection hxSection--events">
          <Reveal className="hxSectionIntro hxSectionIntroRow">
            <h2 className="hxH2">Public events</h2>
            <p className="hxSub">
              {hasMoreEvents
                ? `Showing ${HOME_EVENTS_PREVIEW_LIMIT} of ${events.length}. Open Vote for the full list.`
                : "Tap through to view event details. Live voting is available only on live events."}
            </p>
          </Reveal>

          {eventsLoading ? (
            <p className="hxMuted hxShimmer">Loading events…</p>
          ) : eventsError ? (
            <p className="hxError">{eventsError}</p>
          ) : events.length === 0 ? (
            <p className="hxMuted">
              No public events right now. Organisers can{" "}
              <Link href="/admin">open the dashboard</Link> to publish one. Private events never appear
              here.
            </p>
          ) : (
            <>
              <PublicEventsList events={previewEvents} apiOrigin={apiOrigin} />
              {hasMoreEvents ? (
                <div className="hxViewAllWrap">
                  <Link href="/events" className="hxViewAllBtn">
                    View all events
                  </Link>
                </div>
              ) : null}
            </>
          )}
        </section>
      </main>

      <footer className="hxFooter">
        <div className="hxFooterInner">
          <p className="hxFooterLead">
            Running a programme? <Link href="/admin">Admin dashboard</Link>
          </p>
          <p className="hxFooterNote">
            Private ballots use the link your organiser sends—they are not listed on this page.
          </p>
        </div>
      </footer>
    </div>
  );
}
