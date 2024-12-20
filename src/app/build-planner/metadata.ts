import type { Metadata } from "next";
import { getBuilds } from "~/app/actions/builds";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const publicBuilds = await getBuilds({ visibility: "public" });
    const buildCount = publicBuilds.length;

    const description = `Plan and explore Path of Exile 2 character builds. Browse ${buildCount} community builds or create your own. Features skill tree planning, equipment management, and build sharing.`;

    return {
      title: "Build Planner",
      description,
      openGraph: {
        title: "Build Planner",
        description,
        type: "website",
        url: "https://poe2.dev/build-planner",
      },
      twitter: {
        card: "summary",
        title: "Build Planner",
        description,
      },
      alternates: {
        canonical: "https://poe2.dev/build-planner",
      }
    };
  } catch (error) {
    return {
      title: "Build Planner",
      description: "Plan and explore Path of Exile 2 character builds. Create, customize, and share builds with the community.",
    };
  }
}
