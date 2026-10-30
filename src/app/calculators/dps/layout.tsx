import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { JsonLd } from "~/components/seo/JsonLd";

import { toolJsonLd } from "~/utils/metadata";

const description =
  "Advanced Path of Exile 2 DPS calculator with support for physical, elemental, and chaos damage. Compare weapons, calculate critical strikes, and optimize your character's damage output with real-time calculations.";

export const metadata: Metadata = {
  title: "POE2 DPS Calculator - Damage, Crit & Penetration",
  description,
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
  return (
    <>
      <JsonLd
        data={toolJsonLd({ title: "POE2 DPS Calculator", description, path: "/calculators/dps" }, [
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
          { name: "DPS Calculator", path: "/calculators/dps" },
        ])}
      />
      {children}
    </>
  );
}
