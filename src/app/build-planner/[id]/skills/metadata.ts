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
      title: "Skills Configuration - Build Planner",
      description:
        "Configure and optimize your Path of Exile 2 character's skills and gem setups. Plan your skill combinations and support gem links for maximum effectiveness.",
      path: `/build-planner/${id}/skills`,
      openGraph: {
        type: "website",
      },
    });
  } catch (error) {
    console.error("Error generating skills metadata:", error);
    return {};
  }
}
