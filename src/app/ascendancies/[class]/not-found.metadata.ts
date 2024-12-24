import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Ascendancy Class Not Found | POE2 Classes",
  description:
    "This ascendancy class doesn't exist or has been moved. Explore our complete guide to Path of Exile 2 ascendancy classes, including Acolyte, Bloodmage, Chronomancer, and more.",
  keywords: [
    "POE2 ascendancy classes",
    "Path of Exile 2 classes",
    "POE2 class guide",
    "POE2 character builds",
    "POE2 class mechanics",
    "POE2 build guides",
    "Path of Exile 2 character classes",
  ].join(", "),
  openGraph: {
    images: ["/ascendancies/acolyte.webp"],
    type: "website",
    description:
      "Explore our complete guide to Path of Exile 2 ascendancy classes, including Acolyte, Bloodmage, Chronomancer, and more.",
    siteName: "POE2 Tools",
  },
  robots: {
    index: false,
    follow: true,
  },
};
