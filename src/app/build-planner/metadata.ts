import type { Metadata, ResolvingMetadata } from "next";
import { getBuilds } from "~/app/actions/builds";

type Props = {
  params: { [key: string]: string | string[] | undefined }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // Get parent metadata
    const previousImages = (await parent).openGraph?.images || []
    const previousKeywords = (await parent).keywords || []

    // Fetch build statistics
    const publicBuilds = await getBuilds({ visibility: "public" });
    const buildCount = publicBuilds.length;
    
    // Get unique classes for keywords
    const uniqueClasses = Array.from(
      new Set(publicBuilds.map(b => b.poe_class).filter(Boolean))
    );

    const description = `Plan and explore Path of Exile 2 character builds. Browse ${buildCount} community builds or create your own. Features skill tree planning, equipment management, and build sharing.`;

    // Combine keywords with class-specific terms
    const buildKeywords = [
      "poe2 builds",
      "path of exile 2 builds",
      "build planner",
      "character planner",
      "skill tree",
      ...uniqueClasses.map(c => `${c?.toLowerCase()} builds`),
      ...previousKeywords
    ].filter((keyword): keyword is string => Boolean(keyword));

    const pageUrl = "https://poe2.dev/build-planner";

    return {
      title: { absolute: "Build Planner | POE2 Tools" },
      description,
      keywords: buildKeywords,
      openGraph: {
        title: "POE2 Build Planner - Create and Share Path of Exile 2 Builds",
        description,
        type: "website",
        url: pageUrl,
        images: [
          {
            url: "/build-planner-bg.jpg",
            width: 1200,
            height: 630,
            alt: "POE2 Build Planner",
          },
          ...previousImages
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "POE2 Build Planner | Create and Share Builds",
        description,
        images: ["/build-planner-bg.jpg"],
      },
      alternates: {
        canonical: pageUrl,
      },
      robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
      other: {
        "build:count": buildCount.toString(),
        "build:classes": uniqueClasses.join(","),
      },
    };
  } catch (error) {
    console.error("Error generating build planner metadata:", error);
    return {
      title: { absolute: "Build Planner | POE2 Tools" },
      description: "Plan and explore Path of Exile 2 character builds. Create, customize, and share builds with the community.",
      robots: {
        index: true,
        follow: true,
      }
    };
  }
}
