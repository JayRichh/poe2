import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Currency Calculator",
  description:
    "Convert between different Path of Exile 2 currency types with real-time exchange rates and historical price tracking.",
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
  return children;
}
