import { Metadata, ResolvingMetadata } from "next";

import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateDynamicMetadata({ params }, parent, {
    title: "Character Stats - Build Planner",
    description:
      "View and analyze your Path of Exile 2 character's statistics, including defensive layers, offensive capabilities, and other key metrics. Optimize your build's performance with detailed stat breakdowns.",
    path: `/build-planner/${params.id}/stats`,
    openGraph: {
      type: "website",
    },
  });
}
