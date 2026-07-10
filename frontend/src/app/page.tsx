import type { Metadata } from "next";
import { HomeJsonLd } from "./_components/HomeJsonLd";
import { HomePageClient } from "./_components/HomePageClient";
import { siteConfig } from "./_lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <HomePageClient />
    </>
  );
}
