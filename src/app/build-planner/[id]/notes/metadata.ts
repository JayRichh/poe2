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
      title: "Build Notes - Build Planner",
      description:
        "Document and share detailed notes about your Path of Exile 2 character build. Add leveling guides, gameplay strategies, and gear progression plans.",
      path: `/build-planner/${id}/notes`,
      openGraph: {
        type: "article", // Using article type since it's text content
      },
    });
  } catch (error) {
    console.error("Error generating notes metadata:", error);
    return {};
  }
}
