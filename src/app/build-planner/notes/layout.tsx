import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Build Planner · Notes",
  description:
    "Keep notes for your Path of Exile 2 build. Document leveling steps, gearing priorities, and strategy reminders alongside your planned character.",
  alternates: {
    canonical: "/build-planner/notes",
  },
  openGraph: {
    title: "POE2 Build Planner · Notes",
    description: "Document leveling, gearing, and strategy notes for your Path of Exile 2 build.",
    type: "website",
  },
};

export default function NotesLayout({ children }: PropsWithChildren) {
  return children;
}
