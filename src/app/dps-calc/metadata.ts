import { Metadata, ResolvingMetadata } from "next";

import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  props: { params: {} },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateDynamicMetadata(props, parent, {
    title: "POE2 DPS Calculator - Weapon & Skill Damage Calculator",
    description:
      "Advanced Path of Exile 2 DPS calculator with support for physical, elemental, and chaos damage. Compare weapons, calculate critical strikes, and optimize your character's damage output with real-time calculations.",
    path: "/dps-calc",
    openGraph: {
      type: "website",
    },
    schema: {
      type: "tool",
      data: {
        features: [
          "Real-time DPS calculations for all damage types",
          "Physical, Lightning, Fire, Cold, and Chaos damage support",
          "Advanced weapon comparison system",
          "Critical strike chance and multiplier calculations",
          "Attack speed and projectile modeling",
          "Status effect calculations (Shock, Exposure, etc.)",
          "Multiple weapon configuration support",
          "Damage conversion calculations",
          "Resistance penetration modeling",
          "Build optimization suggestions",
        ],
        keywords: [
          "poe2 dps calculator",
          "path of exile 2 damage calculator",
          "weapon damage comparison",
          "elemental damage calculator",
          "critical strike calculator",
          "poe2 build optimizer",
          "attack speed calculator",
          "damage effectiveness",
          "resistance penetration",
          "status effects calculator",
        ],
      },
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Tools", path: "/tools" },
        { name: "DPS Calculator", path: "/dps-calc" },
      ],
    },
  });
}
