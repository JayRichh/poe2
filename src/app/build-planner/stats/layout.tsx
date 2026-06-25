import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Build Planner · Stats",
  description:
    "Track and tune your Path of Exile 2 character stats. Review attributes, defenses, and resistances to balance and optimize your build.",
  alternates: {
    canonical: "/build-planner/stats",
  },
  openGraph: {
    title: "POE2 Build Planner · Stats",
    description: "Track attributes, defenses, and resistances for your Path of Exile 2 build.",
    type: "website",
  },
};

export default function StatsLayout({ children }: PropsWithChildren) {
  return children;
}
