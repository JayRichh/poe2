import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "DPS Calculator",
  description:
    "Advanced Path of Exile 2 DPS calculator with support for physical, elemental, and chaos damage. Compare weapons, calculate critical strikes, and optimize your character's damage output with real-time calculations.",
  alternates: {
    canonical: "/calculators/dps",
  },
  openGraph: {
    title: "POE2 DPS Calculator",
    description:
      "Real-time POE2 DPS calculations across all damage types, weapon comparison, critical strikes, and resistance penetration modeling.",
    type: "website",
  },
};

export default function DpsCalculatorLayout({ children }: PropsWithChildren) {
  return children;
}
