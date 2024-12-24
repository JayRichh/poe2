import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | POE2 Ascendancy Classes",
  description:
    "The requested ascendancy page could not be found. Explore our comprehensive guide to Path of Exile 2 ascendancy classes, builds, and mechanics.",
  keywords: [
    "POE2 ascendancy classes",
    "Path of Exile 2 classes",
    "POE2 class guide",
    "POE2 builds",
    "POE2 character builds",
    "Path of Exile 2 ascendancies",
  ].join(", "),
  openGraph: {
    images: ["/ascendancies/acolyte.webp"],
    type: "website",
    description:
      "Explore our comprehensive guide to Path of Exile 2 ascendancy classes, builds, and mechanics.",
    siteName: "POE2 Tools",
  },
  robots: {
    index: false,
    follow: true,
  },
};
