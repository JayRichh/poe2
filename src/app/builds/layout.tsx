import { Metadata } from "next";

import { JsonLd } from "~/components/seo/JsonLd";

import { toolJsonLd } from "~/utils/metadata";

export const metadata: Metadata = {
  title: "POE2 Meta Builds & Top 1000 Ladder Statistics",
  description: "Discover the current POE2 meta builds and most powerful character builds based on comprehensive analysis of Path of Exile 2's top 1000 players. Updated daily with latest meta trends, class distribution, and build statistics across Standard, Hardcore, SSF, and HC SSF leagues.",
  keywords: [
    // Meta Build Keywords
    "poe2 meta builds",
    "best poe2 builds",
    "top poe2 builds",
    "path of exile 2 meta",
    "poe2 build tier list",
    "strongest poe2 builds",
    "current poe2 meta",
    "poe2 class tier list",
    "best poe2 classes",
    "poe2 ladder builds",
    // Build Types
    "poe2 stormweaver build",
    "poe2 infernalist build",
    "poe2 lightning build",
    "poe2 minion build",
    "poe2 bleed build",
    // Build Categories
    "poe2 starter builds",
    "poe2 endgame builds",
    "poe2 hardcore builds",
    "poe2 ssf builds",
    "poe2 league starter"
  ],
  alternates: { canonical: "/builds" },
  openGraph: {
    title: "POE2 Meta Builds & Top 1000 Ladder Statistics",
    description: "Discover the current POE2 meta builds and most powerful character builds based on comprehensive analysis of Path of Exile 2's top 1000 players. Updated daily with latest meta trends.",
    images: ["/android-chrome-512x512.png"],
    type: "website",
    siteName: "POE2 Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "POE2 Meta Builds & Top 1000 Ladder Statistics",
    description: "Discover the current POE2 meta builds and most powerful character builds based on comprehensive analysis of Path of Exile 2's top 1000 players. Updated daily with latest meta trends.",
    images: ["/android-chrome-512x512.png"],
    creator: "@poe2tools",
    site: "@poe2tools",
  }
};

export default function BuildsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={toolJsonLd(
          { title: "POE2 Meta Builds & Ladder Statistics", description: metadata.description as string, path: "/builds" },
          [
            { name: "Home", path: "/" },
            { name: "Meta Builds", path: "/builds" },
          ]
        )}
      />
      {children}
    </>
  );
}
