import { Metadata, ResolvingMetadata } from "next";

import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> | undefined },
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!params) {
    return {
      title: "Build Not Found",
      description: "The requested build could not be found",
    };
  }

  try {
    const { id } = await params;
    return generateDynamicMetadata({ params: { id } }, parent, {
      title: "Character Stats - Build Planner",
      description:
        "View and analyze your Path of Exile 2 character's statistics, including defensive layers, offensive capabilities, and other key metrics. Optimize your build's performance with detailed stat breakdowns.",
      path: `/build-planner/${id}/stats`,
      openGraph: {
        type: "website",
      },
    });
  } catch (error) {
    console.error("Error generating stats metadata:", error);
    return {};
  }
}
