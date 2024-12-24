import { Metadata, ResolvingMetadata } from "next";

import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateDynamicMetadata({ params }, parent, {
    title: "Import/Export Build",
    description:
      "Import or export your Path of Exile 2 character build configuration. Share your builds with the community or backup your configurations.",
    path: `/build-planner/${params.id}/import-export`,
    openGraph: {
      type: "website",
    },
  });
}
