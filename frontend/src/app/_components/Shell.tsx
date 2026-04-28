"use client";

import React from "react";

// Must match `basePath` in next.config.ts. Override via NEXT_PUBLIC_BASE_PATH if needed.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/awards_f";

export function LogoHeader() {
  // Source PNGs have a baked-in black background. `mix-blend-mode: screen`
  // makes black pixels effectively transparent against the dark page bg.
  const logoStyleBase: React.CSSProperties = {
    height: "auto",
    objectFit: "contain",
    mixBlendMode: "screen",
    backgroundColor: "transparent",
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        margin: "0 0 16px",
        padding: "0 4px",
      }}
    >
      <img
        src={`${BASE_PATH}/logos/icc100.png`}
        alt="Indian Chamber of Commerce - Centenary"
        style={{
          ...logoStyleBase,
          width: "30%",
          maxWidth: 130,
        }}
      />
      <img
        src={`${BASE_PATH}/logos/ylf.png`}
        alt="Young Leaders Forum"
        style={{
          ...logoStyleBase,
          width: "34%",
          maxWidth: 150,
        }}
      />
      <img
        src={`${BASE_PATH}/logos/elevate.png`}
        alt="Elevate"
        style={{
          ...logoStyleBase,
          width: "30%",
          maxWidth: 130,
        }}
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
  return (
    <main className={containerClass}>
      <section className={cardClass}>
        {props.showLogos ? <LogoHeader /> : null}

        {props.title ? <h1 className="headline">{props.title}</h1> : null}
        {props.subtitle ? <p className="subhead">{props.subtitle}</p> : null}

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

