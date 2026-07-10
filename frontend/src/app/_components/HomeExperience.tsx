"use client";

import React from "react";
import Link from "next/link";
import { SiteNav } from "./SiteNav";
import { PublicEventsList } from "./PublicEventsList";
import {
  IconCalendar,
  IconLayers,
  IconLive,
  IconLock,
  IconPhoto,
  IconShield,
  IconSpark,
  IconTrophy,
  IconUsers,
  IconVote,
} from "./HomeIcons";
import { HOME_EVENTS_PREVIEW_LIMIT, Reveal, type HomePublicEvent } from "./landingUtils";

export type { HomePublicEvent };

const HERO_STATS = [
  { value: "OTP", label: "Verified ballots" },
  { value: "Public", label: "& private events" },
  { value: "Live", label: "On-stage voting" },
] as const;

const WHY_ITEMS = [
  {
    icon: IconUsers,
    title: "Voters see the full picture",
    desc: "Event, categories, and nominees in one place—register once, vote with confidence.",
  },
  {
    icon: IconShield,
    title: "Organisers save time",
    desc: "Configure awards and nominees once; OTP-backed registration cuts noise and fraud.",
  },
  {
    icon: IconLock,
    title: "Public or private",
    desc: "Open events appear on the home page; private ballots stay invite-only.",
  },
] as const;

const STEPS = [
  {
    step: "1",
    title: "Set up your programme",
    desc: "Create the event, add award categories, and upload nominee profiles with photos.",
  },
  {
    step: "2",
    title: "Invite voters securely",
    desc: "Voters register with email and mobile; OTP verification keeps ballots trustworthy.",
  },
  {
    step: "3",
    title: "Open voting & go live",
    desc: "Launch public or private voting, then reveal winners on stage when you're ready.",
  },
] as const;

const FEATURES = [
  { icon: IconCalendar, title: "Multiple events", desc: "Separate branding and copy per occasion." },
  { icon: IconTrophy, title: "Award categories", desc: "Nominees mapped cleanly to each award." },
  { icon: IconPhoto, title: "Nominee profiles", desc: "Photos and bios voters actually read." },
  { icon: IconShield, title: "Verified voting", desc: "Registration plus OTP across channels." },
  { icon: IconVote, title: "Public voting", desc: "Listed when the event is open to all." },
  { icon: IconLive, title: "Live voting", desc: "Real-time ballots for on-stage ceremonies." },
] as const;

export function HomeExperience(props: {
  events: HomePublicEvent[];
  eventsLoading: boolean;
  apiOrigin: string;
}) {
  const { events, eventsLoading, apiOrigin } = props;
  const previewEvents = events.slice(0, HOME_EVENTS_PREVIEW_LIMIT);
  const hasMoreEvents = events.length > HOME_EVENTS_PREVIEW_LIMIT;

  return (
    <div className="homeRoot">
      <div className="hxMesh" aria-hidden="true" />
      <div className="hxFloatOrbs" aria-hidden="true">
        <span className="hxOrb hxOrb--a" />
        <span className="hxOrb hxOrb--b" />
        <span className="hxOrb hxOrb--c" />
      </div>

      <header className="hxTop">
        <SiteNav />

        <div className="hxHero">
          <div className="hxHeroGlow" aria-hidden="true" />
          <div className="hxHeroGrid">
            <div className="hxHeroInner">
              <p className="hxKicker hxHeroIn">
                <span className="hxKickerDot" aria-hidden="true" />
                Live voting · Events · Nominees
              </p>
              <h1 className="hxTitle hxHeroIn hxHeroIn--2">
                Award nights that feel{" "}
                <span className="hxTitleGrad">effortless</span> for organisers and voters.
              </h1>
              <p className="hxLead hxHeroIn hxHeroIn--3">
                One platform for categories, nominees, and verified ballots—public lists for open events, or
                private invite-only voting when you need control.
              </p>
              <div className="hxHeroActions hxHeroIn hxHeroIn--4">
                <Link className="hxPillBtn hxPillBtn--lg" href="/admin" target="_blank" rel="noopener noreferrer">
                  Create an event
                </Link>
                <Link className="hxPillBtn hxPillBtn--lg hxPillBtn--soft" href="/events">
                  Browse public events
                </Link>
              </div>
              <ul className="hxHeroStats hxHeroIn hxHeroIn--5" aria-label="Platform highlights">
                {HERO_STATS.map((stat) => (
                  <li key={stat.label} className="hxHeroStat">
                    <strong className="hxHeroStatValue">{stat.value}</strong>
                    <span className="hxHeroStatLabel">{stat.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="hxHeroShowcase hxHeroIn hxHeroIn--3" aria-label="Voting dashboard preview">
              <div className="hxShowcaseCard">
                <div className="hxShowcaseHead">
                  <span className="hxShowcaseBadge">
                    <IconSpark className="hxShowcaseBadgeIcon" />
                    Annual Awards 2026
                  </span>
                  <span className="hxShowcaseLive">Live</span>
                </div>
                <div className="hxShowcaseBody">
                  <p className="hxShowcaseLabel">Best performer</p>
                  <ul className="hxShowcaseNominees">
                    <li className="hxShowcaseNominee hxShowcaseNominee--lead">
                      <span className="hxShowcaseAvatar">AK</span>
                      <span className="hxShowcaseName">Aanya Kapoor</span>
                      <span className="hxShowcasePct">42%</span>
                    </li>
                    <li className="hxShowcaseNominee">
                      <span className="hxShowcaseAvatar">RS</span>
                      <span className="hxShowcaseName">Rohan Singh</span>
                      <span className="hxShowcasePct">31%</span>
                    </li>
                    <li className="hxShowcaseNominee">
                      <span className="hxShowcaseAvatar">PM</span>
                      <span className="hxShowcaseName">Priya Mehta</span>
                      <span className="hxShowcasePct">27%</span>
                    </li>
                  </ul>
                </div>
                <div className="hxShowcaseFoot">
                  <span className="hxShowcaseFootItem">
                    <IconShield className="hxShowcaseFootIcon" />
                    OTP verified
                  </span>
                  <span className="hxShowcaseFootItem">
                    <IconLayers className="hxShowcaseFootIcon" />
                    6 categories
                  </span>
                </div>
              </div>
              <div className="hxShowcaseFloat hxShowcaseFloat--a" aria-hidden="true">
                <IconVote className="hxShowcaseFloatIcon" />
                <span>1,248 votes cast</span>
              </div>
              <div className="hxShowcaseFloat hxShowcaseFloat--b" aria-hidden="true">
                <IconTrophy className="hxShowcaseFloatIcon" />
                <span>Results ready</span>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <main className="hxMain" id="main-content">
        <section id="how" className="hxSection hxSection--how" aria-labelledby="how-heading">
          <Reveal className="hxSectionIntro hxSectionIntro--center">
            <p className="hxEyebrow">How it works</p>
            <h2 id="how-heading" className="hxH2">
              From setup to spotlight in three steps
            </h2>
            <p className="hxSub hxSub--center">
              Everything organisers and voters need—without spreadsheets, chaos, or guesswork.
            </p>
          </Reveal>
          <ol className="hxSteps">
            {STEPS.map((item, i) => (
              <Reveal key={item.step} className="hxStep" delay={i * 80}>
                <span className="hxStepNum" aria-hidden="true">
                  {item.step}
                </span>
                <h3 className="hxStepTitle">{item.title}</h3>
                <p className="hxStepDesc">{item.desc}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section id="why" className="hxSection hxSection--why" aria-labelledby="why-heading">
          <Reveal className="hxSectionIntro">
            <p className="hxEyebrow">Why Awards</p>
            <h2 id="why-heading" className="hxH2">
              Built for real ceremonies
            </h2>
            <p className="hxSub">Less chasing, more clarity—before the curtain goes up.</p>
          </Reveal>
          <div className="hxWhyGrid">
            {WHY_ITEMS.map((row, i) => {
              const Icon = row.icon;
              return (
                <Reveal key={row.title} className="hxWhyCard" delay={i * 90}>
                  <span className="hxWhyIconWrap" aria-hidden="true">
                    <Icon className="hxWhyIcon" />
                  </span>
                  <h3 className="hxWhyTitle">{row.title}</h3>
                  <p className="hxWhyDesc">{row.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="features" className="hxSection hxSection--features" aria-labelledby="features-heading">
          <Reveal className="hxSectionIntro hxSectionIntro--center">
            <p className="hxEyebrow">Features</p>
            <h2 id="features-heading" className="hxH2">
              Everything in one stack
            </h2>
            <p className="hxSub hxSub--center">Smooth surfaces, no clutter—just what your programme needs.</p>
          </Reveal>
          <div className="hxFeatureRiver">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} className="hxFeatureChip" delay={i * 55}>
                  <span className="hxFeatureIconWrap" aria-hidden="true">
                    <Icon className="hxFeatureIcon" />
                  </span>
                  <h3 className="hxFeatureChipTitle">{f.title}</h3>
                  <p className="hxFeatureChipDesc">{f.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="events" className="hxSection hxSection--events" aria-labelledby="events-heading">
          <Reveal className="hxSectionIntro hxSectionIntroRow">
            <div>
              <p className="hxEyebrow">Public events</p>
              <h2 id="events-heading" className="hxH2">
                Vote in open programmes
              </h2>
            </div>
            <p className="hxSub">
              {hasMoreEvents
                ? `Showing ${HOME_EVENTS_PREVIEW_LIMIT} of ${events.length}. Open Vote for the full list.`
                : "Browse event details and cast your ballot. Live voting is available only on live events."}
            </p>
          </Reveal>

          {eventsLoading ? (
            <p className="hxMuted hxShimmer" role="status" aria-live="polite">
              Loading events…
            </p>
          ) : events.length === 0 ? (
            <p className="hxMuted">
              No public events right now. Organisers can{" "}
              <Link href="/admin" target="_blank" rel="noopener noreferrer">
                open the dashboard
              </Link>{" "}
              to publish one. Private events never appear here.
            </p>
          ) : (
            <>
              <PublicEventsList events={previewEvents} apiOrigin={apiOrigin} preview />
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

        <section className="hxCtaBand" aria-labelledby="cta-heading">
          <Reveal className="hxCtaInner">
            <h2 id="cta-heading" className="hxCtaTitle">
              Ready to run your next award night?
            </h2>
            <p className="hxCtaLead">
              Set up categories, invite voters with OTP, and go live—all from one dashboard.
            </p>
            <div className="hxCtaActions">
              <Link className="hxPillBtn hxPillBtn--lg hxPillBtn--light" href="/admin" target="_blank" rel="noopener noreferrer">
                Open admin dashboard
              </Link>
              <Link className="hxPillBtn hxPillBtn--lg hxPillBtn--outline" href="/events">
                Explore public events
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="hxFooter">
        <div className="hxFooterGrid">
          <div className="hxFooterBrand">
            <Link href="/" className="hxFooterLogo">
              <span className="hxBrandMark" aria-hidden="true" />
              Awards
            </Link>
            <p className="hxFooterTagline">
              Verified voting for award ceremonies, corporate events, and community programmes.
            </p>
          </div>
          <nav className="hxFooterNav" aria-label="Footer">
            <p className="hxFooterNavTitle">Explore</p>
            <ul className="hxFooterLinks">
              <li>
                <Link href="/#how">How it works</Link>
              </li>
              <li>
                <Link href="/#features">Features</Link>
              </li>
              <li>
                <Link href="/events">Public events</Link>
              </li>
              <li>
                <Link href="/usersvote">Vote</Link>
              </li>
            </ul>
          </nav>
          <div className="hxFooterNav">
            <p className="hxFooterNavTitle">Organisers</p>
            <ul className="hxFooterLinks">
              <li>
                <Link href="/admin" target="_blank" rel="noopener noreferrer">
                  Admin dashboard
                </Link>
              </li>
              <li>
                <Link href="/register">Voter registration</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="hxFooterBottom">
          <p className="hxFooterNote">
            Private ballots use the link your organiser sends—they are not listed on this page.
          </p>
          <p className="hxFooterCopy">© {new Date().getFullYear()} Awards. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
