import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DPS Calculator - POE2 Tools",
  description: "Calculate and optimize your Path of Exile 2 character's damage per second (DPS). Advanced DPS simulator with skill gem configurations, equipment modifiers, and buff calculations.",
  openGraph: {
    title: "POE2 DPS Calculator - Optimize Your Character's Damage",
    description: "Calculate and optimize your Path of Exile 2 character's damage per second (DPS). Advanced DPS simulator with skill gem configurations, equipment modifiers, and buff calculations.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "POE2 Tools Icon",
        type: "image/png",
      },
    ],
  },
  other: {
    "schema:SoftwareApplication": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "POE2 DPS Calculator",
      applicationCategory: "GameApplication",
      operatingSystem: "Web Browser",
      description: "Calculate and optimize your Path of Exile 2 character's damage per second (DPS). Advanced DPS simulator with skill gem configurations, equipment modifiers, and buff calculations.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      featureList: [
        "DPS Calculations",
        "Skill Gem Configuration",
        "Equipment Modifiers",
        "Buff Management",
        "Damage Type Analysis",
        "DPS Comparison Tools"
      ]
    }),
    "schema:HowTo": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Calculate POE2 DPS",
      description: "Learn how to calculate and optimize your Path of Exile 2 character's damage output.",
      step: [
        {
          "@type": "HowToStep",
          name: "Configure Skills",
          text: "Select and configure your character's skill gems and support gems"
        },
        {
          "@type": "HowToStep",
          name: "Add Equipment",
          text: "Input your character's equipment and modifiers"
        },
        {
          "@type": "HowToStep",
          name: "Set Buffs",
          text: "Configure active buffs and conditions"
        },
        {
          "@type": "HowToStep",
          name: "View Results",
          text: "Analyze your character's total DPS and damage breakdown"
        }
      ]
    })
  }
};
