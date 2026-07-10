"use client";

import React from "react";

export type HomePublicEvent = {
  event_id: number;
  title: string | null;
  description: string | null;
  image: string | null;
  is_live?: number | boolean | null;
};

export const HOME_EVENTS_PREVIEW_LIMIT = 3;

export function isLikelyFilePath(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  return /[A-Za-z]:\\/.test(t) || (/[\\/]/.test(t) && /workspace|Users|\.tsx|\.jsx|nextjs/i.test(t));
}

export function sanitizeEventDescription(raw: string | null | undefined): string {
  const text = (raw || "").trim();
  if (!text || isLikelyFilePath(text)) return "";
  return text;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setOn(true);
      },
      { threshold: 0.06, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`hxReveal ${on ? "hxReveal--on" : ""} ${className}`.trim()}
      style={{ ["--hx-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
