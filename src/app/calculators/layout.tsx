import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Calculators",
  description:
    "A suite of Path of Exile 2 calculators for DPS, attack speed, and currency conversion. Analyze damage types, optimize character speed, and track currency values.",
  alternates: {
    canonical: "/calculators",
  },
  openGraph: {
    title: "POE2 Calculators",
    description: "Advanced calculators for Path of Exile 2 mechanics and optimization.",
    type: "website",
    images: ["/poe2logonobg.png"],
  },
};

export default function CalculatorsLayout({ children }: PropsWithChildren) {
  return children;
}
