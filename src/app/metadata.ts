import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4F46E5" },
    { media: "(prefers-color-scheme: dark)", color: "#4F46E5" },
  ],
};

export const metadata: Metadata = {
  title: "Gift List - Organize Your Gift Giving",
  description: "A modern app to manage and track gifts for your family and friends",
  keywords: ["gift list", "gift tracking", "gift management", "gift organization"],
  authors: [{ name: "Gift List Team" }],
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
        sizes: "32x32"
      }
    ],
    shortcut: "/icon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Gift List - Organize Your Gift Giving",
    description: "A modern app to manage and track gifts for your family and friends",
    type: "website",
    images: [{
      url: "/icon.svg",
      width: 32,
      height: 32,
      alt: "Gift List App Icon"
    }],
  },
  twitter: {
    card: "summary",
    title: "Gift List - Organize Your Gift Giving",
    description: "A modern app to manage and track gifts for your family and friends",
    images: ["/icon.svg"],
  },
};
