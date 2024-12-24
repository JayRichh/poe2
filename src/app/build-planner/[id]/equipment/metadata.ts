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
      title: "Equipment - Build Planner",
      description: "Configure equipment and gear for your Path of Exile 2 character build.",
      path: `/build-planner/${id}/equipment`,
      openGraph: {
        type: "website",
      },
    });
  } catch (error) {
    console.error("Error generating equipment metadata:", error);
    return {};
  }
}
