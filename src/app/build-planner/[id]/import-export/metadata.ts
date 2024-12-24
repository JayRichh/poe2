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
      title: "Import/Export Build",
      description:
        "Import or export your Path of Exile 2 character build configuration. Share your builds with the community or backup your configurations.",
      path: `/build-planner/${id}/import-export`,
      openGraph: {
        type: "website",
      },
    });
  } catch (error) {
    console.error("Error generating import/export metadata:", error);
    return {};
  }
}
