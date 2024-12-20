import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { [key: string]: string | string[] | undefined }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Get parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const previousKeywords = (await parent).keywords || []

  const description = "Advanced Path of Exile 2 DPS calculator with real-time damage simulation. Calculate skill damage, critical strikes, damage over time effects, and optimize your character's offensive capabilities.";

  const pageUrl = "https://poe2.dev/dps-calc";

  // Combine with parent keywords
  const dpsCalcKeywords = [
    "path of exile 2 dps calculator",
    "poe2 damage calculator",
    "poe2 skill damage",
    "path of exile 2 damage simulation",
    "poe2 critical strike calculator",
    "poe2 dot calculator",
    "path of exile 2 damage optimizer",
    "poe2 dps simulation",
    "poe2 damage calculation",
    "path of exile 2 build damage",
    ...previousKeywords
  ].filter((keyword): keyword is string => Boolean(keyword));

  // Enhanced schema.org data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "POE2 DPS Calculator",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any",
    "description": description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Real-time damage simulation",
      "Critical strike calculation",
      "Damage over time effects",
      "Skill damage calculation",
      "Character offensive optimization",
      "Build comparison tools"
    ],
    "url": pageUrl,
    "applicationSubCategory": "Game Calculator",
    "releaseNotes": "Supports all Path of Exile 2 skills and damage mechanics",
    "requirements": "Modern web browser with JavaScript enabled"
  };

  return {
    title: { absolute: "DPS Calculator | POE2 Tools" },
    description,
    keywords: dpsCalcKeywords,
    openGraph: {
      title: "POE2 DPS Calculator - Optimize Your Character's Damage",
      description,
      type: "website",
      url: pageUrl,
      images: [
        {
          url: "/tooltip-header.png",
          width: 1200,
          height: 630,
          alt: "POE2 DPS Calculator Interface",
        },
        ...previousImages
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "POE2 DPS Calculator",
      description,
      images: ["/tooltip-header.png"],
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    other: {
      "schema:WebApplication": JSON.stringify(schemaData),
      "application:type": "GameApplication",
      "application:category": "DPS Calculator",
      "application:features": [
        "Real-time simulation",
        "Critical strikes",
        "DoT effects",
        "Skill damage",
        "Build optimization"
      ].join(","),
      "calculator:type": "DPS",
      "calculator:game": "Path of Exile 2",
      "calculator:metrics": [
        "Damage per Second",
        "Critical Strike Chance",
        "Critical Strike Multiplier",
        "Damage over Time",
        "Effective DPS"
      ].join(",")
    },
  };
}
