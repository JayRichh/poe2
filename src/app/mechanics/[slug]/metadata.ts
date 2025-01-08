import type { Metadata } from "next";

import { mechanics } from "~/lib/mechanics/data";
import type { ContentCategory } from "~/lib/shared/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const mechanic = mechanics[slug as ContentCategory];

    if (!mechanic) {
      return {
        title: "Not Found",
        description: "The requested mechanic guide could not be found",
      };
    }

    return {
      title: `${mechanic.title} - POE2 Game Mechanics`,
      description: mechanic.description,
      openGraph: {
        title: `${mechanic.title} - POE2 Game Mechanics`,
        description: mechanic.description,
        type: "article",
      },
    };
  } catch (error) {
    console.error("Error generating mechanic metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while loading the mechanic guide",
    };
  }
}
