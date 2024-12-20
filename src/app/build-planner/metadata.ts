import type { Metadata } from "next";
import { getBuilds } from "~/app/actions/builds";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const publicBuilds = await getBuilds({ visibility: "public" });
    const buildCount = publicBuilds.length;

    const description = `Plan and explore Path of Exile 2 character builds. Browse ${buildCount} community builds or create your own. Features skill tree planning, equipment management, and build sharing.`;

    return {
      title: {
        absolute: "Build Planner | POE2 Tools"
      },
      description,
      openGraph: {
        title: {
          absolute: "Build Planner | POE2 Tools"
        },
        description,
        type: "website",
        url: "https://poe2.dev/build-planner",
      },
      twitter: {
        card: "summary",
        title: "Build Planner | POE2 Tools",
        description,
      },
      alternates: {
        canonical: "https://poe2.dev/build-planner",
      }
    };
  } catch (error) {
    return {
      title: {
        absolute: "Build Planner | POE2 Tools"
      },
      description: "Plan and explore Path of Exile 2 character builds. Create, customize, and share builds with the community.",
    };
  }
}
