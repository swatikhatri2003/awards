"use client";

import React from "react";
import Link from "next/link";
import { HeaderAccountMenu } from "./HeaderAccountMenu";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#why", label: "Why us" },
  { href: "/#features", label: "Features" },
  { href: "/events", label: "Vote" },
] as const;

export function SiteNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="hxNav" aria-label="Primary">
      <div className={["hxNavBar", open ? "hxNavBar--open" : ""].filter(Boolean).join(" ")}>
        <Link href="/" className="hxBrand" onClick={() => setOpen(false)}>
          <span className="hxBrandMark" aria-hidden />
          <span className="hxBrandText">Awards</span>
        </Link>

        <button
          type="button"
          className="hxNavMenuBtn"
          aria-expanded={open}
          aria-controls="hx-nav-panel"
          id="hx-nav-toggle"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visuallyHidden">{open ? "Close menu" : "Open menu"}</span>
          <span className="hxNavMenuIcon" aria-hidden />
        </button>

        <div id="hx-nav-panel" className="hxNavCollapsible">
          <ul className="hxNavLinks">
            {links.map((item) => (
              <li key={item.href}>
                <Link className="hxNavLink" href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hxNavCta">
            <HeaderAccountMenu compact onNavigate={() => setOpen(false)} />
            <Link className="hxGhost" href="/admin" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              Admin
            </Link>
            <Link className="hxPillBtn" href="/admin" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              Run an event
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
