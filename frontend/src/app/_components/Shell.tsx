"use client";

import React from "react";

// Must match `basePath` in next.config.ts. In dev, basePath is unset — use "" so /public maps to /logos/...
// Override anytime via NEXT_PUBLIC_BASE_PATH.
const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/+$/, "") ??
  (process.env.NODE_ENV === "production" ? "/awards_f" : "");

export function LogoHeader() {
  // Source PNGs have a baked-in black background. `mix-blend-mode: screen`
  // makes black pixels effectively transparent against the dark page bg.
  return (
    <div className="logoStrip" role="presentation">
      <img
        className="logoStripImg"
        src={`${BASE_PATH}/logos/icc100.png`}
        alt="Indian Chamber of Commerce - Centenary"
      />
      <img
        className="logoStripImg logoStripImg--mid"
        src={`${BASE_PATH}/logos/ylf.png`}
        alt="Young Leaders Forum"
      />
      <img
        className="logoStripImg"
        src={`${BASE_PATH}/logos/elevate.png`}
        alt="Elevate"
      />
    </div>
  );
}

export function Shell(props: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  wide?: boolean;
  bare?: boolean;
  showLogos?: boolean;
}) {
  const containerClass = props.wide ? "container containerWide" : "container";
  const cardClass = props.bare
    ? "cardBare"
    : props.wide
      ? "card cardWide"
      : "card";
  const hasHeaderText = Boolean(props.title || props.subtitle);
  const hasHeader = hasHeaderText || Boolean(props.right);

  return (
    <main className={containerClass}>
      <section className={cardClass}>
        {props.showLogos ? <LogoHeader /> : null}

        {hasHeader ? (
          <header
            className={
              hasHeaderText
                ? "shellHeader"
                : "shellHeader shellHeader--actionsOnly"
            }
          >
            {hasHeaderText ? (
              <div className="shellHeaderBody">
                {props.title ? (
                  <h1 className="headline shellTitle">{props.title}</h1>
                ) : null}
                {props.subtitle ? (
                  <p className="subhead shellSubtitle">{props.subtitle}</p>
                ) : null}
              </div>
            ) : null}
            {props.right ? (
              <div className="shellHeaderActions">{props.right}</div>
            ) : null}
          </header>
        ) : null}

        {props.children}
      </section>
    </main>
  );
}

export function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const id = React.useId();
  return (
    <label className="field" htmlFor={id}>
      <div className="label">
        {props.label} {props.required ? <span className="req">*</span> : null}
      </div>
      <input
        id={id}
        className="input"
        value={props.value}
        type={props.type || "text"}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        required={props.required}
        inputMode={props.inputMode}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </label>
  );
}

