"use client";

import React from "react";

export function Shell(props: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  wide?: boolean;
}) {
  const containerClass = props.wide ? "container containerWide" : "container";
  const cardClass = props.wide ? "card cardWide" : "card";
  return (
    <main className={containerClass}>
      <section className={cardClass}>
        {/* <div className="brandRow">
          <div className="brand">
            <div className="brandMark" aria-hidden="true" />
            <div>
              <div className="brandTitle">YLF Member Awards</div>
              <div className="brandSubtitle">Nominations & Recognition</div>
            </div>
          </div>
          {props.right ? <div className="brandRight">{props.right}</div> : null}
        </div> */}

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

