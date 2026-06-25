import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Build Planner · Equipment",
  description:
    "Plan your Path of Exile 2 character's equipment loadout. Assign weapons, armour, and accessories to every slot and shape your build around your gear.",
  alternates: {
    canonical: "/build-planner/equipment",
  },
  openGraph: {
    title: "POE2 Build Planner · Equipment",
    description: "Plan weapons, armour, and accessories for your Path of Exile 2 build.",
    type: "website",
  },
};

export default function EquipmentLayout({ children }: PropsWithChildren) {
  return children;
}
