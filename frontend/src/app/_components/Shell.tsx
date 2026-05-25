"use client";

import React from "react";

export function Shell(props: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  wide?: boolean;
  bare?: boolean;
}) {
  const containerClass = props.wide ? "container containerWide" : "container";
  const cardClass = props.bare
    ? "cardBare"
    : props.wide
      ? "card cardWide cardMotion"
      : "card cardMotion";
  const hasHeaderText = Boolean(props.title || props.subtitle);
  const hasHeader = hasHeaderText || Boolean(props.right);

  return (
    <main className={containerClass}>
      <section className={cardClass}>
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
  className?: string;
}) {
  const id = React.useId();
  const fieldClass = ["field", props.className].filter(Boolean).join(" ");
  return (
    <label className={fieldClass} htmlFor={id}>
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

