import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Public events — vote",
  description: "Browse all open public events, register, and cast your vote.",
};

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children;
}
