import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Build Planner · Skills",
  description:
    "Plan your Path of Exile 2 skill gem setup. Choose active and support gems, link combinations, and design the skill loadout that powers your build.",
  alternates: {
    canonical: "/build-planner/skills",
  },
  openGraph: {
    title: "POE2 Build Planner · Skills",
    description: "Plan active and support skill gem links for your Path of Exile 2 build.",
    type: "website",
  },
};

export default function SkillsLayout({ children }: PropsWithChildren) {
  return children;
}
