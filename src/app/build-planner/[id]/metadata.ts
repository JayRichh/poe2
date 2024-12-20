import type { Metadata, ResolvingMetadata } from "next";
import { getBuild } from "~/app/actions/builds";
import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // Fetch build data
    const build = await getBuild(params.id);

    // Get parent metadata
    const previousImages = (await parent).openGraph?.images || []
    const previousKeywords = (await parent).keywords || []

    if (!build) {
      return {
        title: { absolute: "Build Not Found | POE2 Tools" },
        description: "The requested Path of Exile 2 build could not be found.",
        robots: {
          index: false,
          follow: true,
        }
      };
    }

    const description = `${build.name} - Level ${build.level || "?"} ${
      build.poe_class || "Unknown"
    } build for Path of Exile 2. ${build.description || ""}`.trim();

    const buildUrl = `https://poe2.dev/build-planner/${params.id}`;

    // Handle private/unlisted builds
    if (build.visibility !== "public") {
      return {
        title: { absolute: `${build.name} Build | POE2 Tools` },
        description,
        robots: {
          index: false,
          follow: false,
        },
        alternates: {
          canonical: buildUrl,
        },
      };
    }

    // Filter out undefined values and ensure string array
    const buildKeywords = [
      build.poe_class || "",
      "poe2 build",
      "path of exile 2 build",
      ...(build.tags || []),
      ...(Array.isArray(previousKeywords) ? previousKeywords : [previousKeywords].filter(Boolean))
    ].filter((keyword): keyword is string => Boolean(keyword));

    return {
      title: { absolute: `${build.name} Build | POE2 Tools` },
      description,
      keywords: buildKeywords,
      openGraph: {
        title: `${build.name} - Level ${build.level || "?"} ${build.poe_class || "Unknown"}`,
        description,
        type: "article",
        url: buildUrl,
        publishedTime: build.created_at,
        modifiedTime: build.updated_at,
        images: [
          {
            url: "/build-planner-bg.jpg",
            width: 1200,
            height: 630,
            alt: `${build.name} POE2 Build`,
          },
          ...previousImages
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${build.name} Build | POE2 Tools`,
        description,
        images: ["/build-planner-bg.jpg"],
      },
      alternates: {
        canonical: buildUrl,
      },
      robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
      other: {
        "article:published_time": build.created_at,
        "article:modified_time": build.updated_at,
        "article:author": build.user_id,
        "article:section": "Builds",
        "article:tag": build.tags?.join(",") || "",
      },
    };
  } catch (error) {
    console.error("Error generating build metadata:", error);
    return {
      title: { absolute: "Build Not Found | POE2 Tools" },
      description: "The requested Path of Exile 2 build could not be found.",
      robots: {
        index: false,
        follow: true,
      }
    };
  }
}
