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
  title: "POE2 Tools - Path of Exile 2 Build Planning & Tools",
  description:
    "Community-driven tools for Path of Exile 2 players. Build planning, DPS calculations, and more.",
  keywords: ["path of exile 2", "poe2", "build planner", "dps calculator", "poe tools"],
  authors: [{ name: "POE2 Tools Team" }],
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
      "Community-driven tools for Path of Exile 2 players. Build planning, DPS calculations, and more.",
    type: "website",
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
      "Community-driven tools for Path of Exile 2 players. Build planning, DPS calculations, and more.",
    images: ["/favicon.svg"],
  },
};
