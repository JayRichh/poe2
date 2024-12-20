import type { Metadata } from "next";
import { getBuild } from "~/app/actions/builds";
import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];

interface GenerateMetadataProps {
  params: { id: string };
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  try {
    const build = await getBuild(params.id);
    if (!build) {
      return {
        title: "Build Not Found | POE2 Tools",
        description: "The requested Path of Exile 2 build could not be found.",
      };
    }

    const title = `${build.name} Build | POE2 Tools`;
    const description = `${build.name} - Level ${build.level || "?"} ${
      build.poe_class || "Unknown"
    } build for Path of Exile 2. ${build.description || ""}`.trim();

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://poe2.dev/build-planner/${params.id}`,
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
      alternates: {
        canonical: `https://poe2.dev/build-planner/${params.id}`,
      },
    };
  } catch (error) {
    console.error("Error generating build metadata:", error);
    return {
      title: "Build Not Found | POE2 Tools",
      description: "The requested Path of Exile 2 build could not be found.",
    };
  }
}
