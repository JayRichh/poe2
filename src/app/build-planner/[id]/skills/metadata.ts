import { Metadata, ResolvingMetadata } from "next";

import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateDynamicMetadata({ params }, parent, {
    title: "Skills Configuration - Build Planner",
    description:
      "Configure and optimize your Path of Exile 2 character's skills and gem setups. Plan your skill combinations and support gem links for maximum effectiveness.",
    path: `/build-planner/${params.id}/skills`,
    openGraph: {
      type: "website",
    },
  });
}
