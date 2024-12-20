import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d97706" },
    { media: "(prefers-color-scheme: dark)", color: "#fbbf24" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://poe2.dev"),
  title: {
    template: "%s | POE2 Tools",
    default: "POE2 Tools - Path of Exile 2 Build Planning & Tools",
  },
  description:
    "Comprehensive Path of Exile 2 toolkit featuring an interactive build planner, skill tree calculator, DPS simulator, and character optimization tools. Plan, analyze, and share your POE2 builds with the community.",
  keywords: [
    "path of exile 2",
    "poe2",
    "build planner",
    "dps calculator",
    "skill tree planner",
    "poe tools",
    "character builder",
    "poe2 builds",
    "path of exile 2 calculator",
    "poe2 character optimization",
    "poe2 skill simulator",
    "path of exile 2 guides",
    "poe2 build guides",
    "poe2 character planning"
  ],
  authors: [{ name: "POE2 Tools Team" }],
  category: "Gaming Tools",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
        sizes: "32x32",
      },
    ],
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "POE2 Tools - Path of Exile 2 Build Planning & Tools",
    description:
      "Comprehensive Path of Exile 2 toolkit featuring an interactive build planner, skill tree calculator, DPS simulator, and character optimization tools. Plan, analyze, and share your POE2 builds with the community.",
    type: "website",
    locale: "en_US",
    siteName: "POE2 Tools",
    images: [
      {
        url: "/favicon.svg",
        width: 32,
        height: 32,
        alt: "POE2 Tools Icon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "POE2 Tools - Path of Exile 2 Build Planning & Tools",
    description:
      "Comprehensive Path of Exile 2 toolkit featuring an interactive build planner, skill tree calculator, DPS simulator, and character optimization tools. Plan, analyze, and share your POE2 builds with the community.",
    images: ["/favicon.svg"],
    creator: "@poe2tools",
  },
  alternates: {
    canonical: "https://poe2.dev",
    types: {
      "application/rss+xml": "https://poe2.dev/feed.xml",
    },
  },
  verification: {
    google: "google-site-verification-code", // Add your Google verification code
  },
};
