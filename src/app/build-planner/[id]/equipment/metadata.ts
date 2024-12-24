import { Metadata, ResolvingMetadata } from "next";

import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateDynamicMetadata({ params }, parent, {
    title: "Equipment - Build Planner",
    description: "Configure equipment and gear for your Path of Exile 2 character build.",
    path: `/build-planner/${params.id}/equipment`,
    openGraph: {
      type: "website",
    },
  });
}
