import { Metadata, ResolvingMetadata } from "next";
import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateDynamicMetadata(
    { params },
    parent,
    {
      title: "Build Notes - Build Planner",
      description: "Document and share detailed notes about your Path of Exile 2 character build. Add leveling guides, gameplay strategies, and gear progression plans.",
      path: `/build-planner/${params.id}/notes`,
      openGraph: {
        type: "article", // Using article type since it's text content
      },
    }
  );
}
