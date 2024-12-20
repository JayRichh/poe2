import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "DPS Calculator | POE2 Tools"
  },
  description:
    "Advanced Path of Exile 2 DPS calculator with real-time damage simulation. Calculate skill damage, critical strikes, damage over time effects, and optimize your character's offensive capabilities.",
  keywords: [
    "path of exile 2 dps calculator",
    "poe2 damage calculator",
    "poe2 skill damage",
    "path of exile 2 damage simulation",
    "poe2 critical strike calculator",
    "poe2 dot calculator",
    "path of exile 2 damage optimizer",
    "poe2 dps simulation",
    "poe2 damage calculation",
    "path of exile 2 build damage"
  ],
  openGraph: {
    title: {
      absolute: "POE2 DPS Calculator"
    },
    description:
      "Advanced Path of Exile 2 DPS calculator with real-time damage simulation. Calculate skill damage, critical strikes, damage over time effects, and optimize your character's offensive capabilities.",
    type: "website",
    locale: "en_US",
    siteName: "POE2 Tools",
  },
  twitter: {
    card: "summary",
    title: "POE2 DPS Calculator",
    description:
      "Advanced Path of Exile 2 DPS calculator with real-time damage simulation. Calculate skill damage, critical strikes, damage over time effects, and optimize your character's offensive capabilities.",
  },
  alternates: {
    canonical: "https://poe2.dev/dps-calc",
  },
  other: {
    "schema:WebApplication": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "POE2 DPS Calculator",
      "applicationCategory": "GameApplication",
      "operatingSystem": "Any",
      "description": "Advanced Path of Exile 2 DPS calculator with real-time damage simulation. Calculate skill damage, critical strikes, and damage over time effects.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    })
  }
};
