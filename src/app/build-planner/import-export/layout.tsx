import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Build Planner · Import & Export",
  description:
    "Import and export your Path of Exile 2 builds. Share build codes, back up your planned characters, and load builds from the community.",
  alternates: {
    canonical: "/build-planner/import-export",
  },
  openGraph: {
    title: "POE2 Build Planner · Import & Export",
    description: "Share, back up, and load Path of Exile 2 build codes.",
    type: "website",
  },
};

export default function ImportExportLayout({ children }: PropsWithChildren) {
  return children;
}
