import { Metadata, ResolvingMetadata } from "next";

import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateDynamicMetadata({ params: {} }, parent, {
    title: "POE2 Speed Calculator - Movement & Attack/Cast Speed",
    description:
      "Path of Exile 2 speed calculator (0.5.x). Compute effective movement speed and attack/cast speed: 'increased/reduced' modifiers stack additively (base × (1 + sum %)), 'more' modifiers multiply. Enter your own base values and modifiers, including chill and temporal slows as reductions.",
    path: "/calculators/speed",
    openGraph: {
      type: "website",
    },
    schema: {
      type: "tool",
      data: {
        features: [
          "Effective movement speed (additive increased/reduced bucket)",
          "Attack and cast speed scaling (increased additive, more multiplicative)",
          "Resulting APS and time-per-action",
          "Reduction handling for chill and temporal slows",
          "User-supplied base values — no fabricated weapon tables",
        ],
        keywords: [
          "poe2 speed calculator",
          "path of exile 2 movement speed",
          "poe2 attack speed calculator",
          "poe2 cast speed",
          "attacks per second calculator",
          "movement speed stacking",
        ],
      },
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Calculators", path: "/calculators" },
        { name: "Speed Calculator", path: "/calculators/speed" },
      ],
    },
  });
}

export default function SpeedCalcLayout({ children }: { children: React.ReactNode }) {
  return children;
}
