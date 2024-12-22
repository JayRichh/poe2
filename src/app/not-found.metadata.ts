import { Metadata, ResolvingMetadata } from "next";
import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  props: { params: {} },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateDynamicMetadata(
    props,
    parent,
    {
      title: "Page Not Found - POE2 Tools",
      description: "The requested page could not be found. Browse our Path of Exile 2 tools including build planner, DPS calculator, and skill tree planner.",
      path: "/404",
      robots: {
        index: false,
        follow: true,
      },
      openGraph: {
        type: "website",
      },
    }
  );
}
