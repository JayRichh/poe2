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
      title: "DPS Calculator",
      description: "Calculate and optimize your Path of Exile 2 character's damage per second (DPS) with our advanced calculator tool.",
      path: "/dps-calc",
      openGraph: {
        type: "website",
      },
      schema: {
        type: "tool",
        data: {
          features: [
            "Real-time DPS calculations",
            "Support for all skill gems",
            "Damage effectiveness comparisons",
            "Critical strike calculations",
            "Damage over time modeling",
            "Multiple skill configurations"
          ]
        },
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "DPS Calculator", path: "/dps-calc" }
        ]
      }
    }
  );
}
