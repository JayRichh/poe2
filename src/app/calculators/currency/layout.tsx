import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { JsonLd } from "~/components/seo/JsonLd";

import { toolJsonLd } from "~/utils/metadata";

const description =
  "Convert between different Path of Exile 2 currency types with real-time exchange rates and historical price tracking.";

export const metadata: Metadata = {
  title: "POE2 Currency Calculator - Exchange Rates & Conversion",
  description,
  alternates: {
    canonical: "/calculators/currency",
  },
  openGraph: {
    title: "POE2 Currency Calculator",
    description:
      "Convert between Path of Exile 2 currency types with real-time rates and historical tracking.",
    type: "website",
    images: ["/poe2logonobg.png"],
  },
};

export default function CurrencyCalculatorLayout({ children }: PropsWithChildren) {
  return (
    <>
      <JsonLd
        data={toolJsonLd(
          { title: "POE2 Currency Calculator", description, path: "/calculators/currency" },
          [
            { name: "Home", path: "/" },
            { name: "Calculators", path: "/calculators" },
            { name: "Currency Calculator", path: "/calculators/currency" },
          ]
        )}
      />
      {children}
    </>
  );
}
