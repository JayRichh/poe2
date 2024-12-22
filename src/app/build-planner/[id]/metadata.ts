import { Metadata, ResolvingMetadata } from "next";
import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // TODO: Replace with actual build service call when implemented
    const build = {
      id: params.id,
      name: "Example Build",
      description: "A detailed Path of Exile 2 character build configuration.",
      author: "POE2 Tools User",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      class: "Ranger",
      level: 90,
      tags: ["Bow", "Critical Strike", "Elemental"],
      views: 1000,
      likes: 50,
    };

    return generateDynamicMetadata(
      { params },
      parent,
      {
        title: `${build.name} (${build.class}) - POE2 Build`,
        description: `Level ${build.level} ${build.class} build. ${build.description}`,
        path: `/build-planner/${build.id}`,
        openGraph: {
          type: "website",
          publishedTime: build.createdAt,
          authors: [build.author],
        },
        schema: {
          type: "build",
          data: {
            ...build,
            applicationCategory: "Game Build Configuration",
            keywords: [
              "Path of Exile 2",
              "POE2",
              build.class,
              ...build.tags,
              "Build Guide",
              "Character Build"
            ],
            interactionStatistic: [
              {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/ViewAction",
                userInteractionCount: build.views
              },
              {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/LikeAction",
                userInteractionCount: build.likes
              }
            ]
          },
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Build Planner", path: "/build-planner" },
            { name: build.class, path: `/build-planner?class=${build.class.toLowerCase()}` },
            { name: build.name, path: `/build-planner/${build.id}` }
          ]
        }
      }
    );
  } catch (error) {
    console.error("Error generating build metadata:", error);
    return {};
  }
}
