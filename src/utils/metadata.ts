import { Metadata, ResolvingMetadata } from "next";

import {
  combineSchemas,
  generateAscendancySchema,
  generateBreadcrumbSchema,
  generateBuildPlannerSchema,
  generateMechanicsSchema,
  generateNewsArticleSchema,
  generateProfileSchema,
  generateToolSchema,
} from "./schema";

export type MetadataProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export interface BaseMetadata {
  title: string;
  description: string;
  path: string;
  openGraph?: {
    images?: string[];
    type?:
      | "website"
      | "article"
      | "book"
      | "profile"
      | "music.song"
      | "music.album"
      | "music.playlist"
      | "music.radio_station"
      | "video.movie"
      | "video.episode"
      | "video.tv_show"
      | "video.other";
    publishedTime?: string;
    authors?: string[];
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    nocache?: boolean;
    noarchive?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      "max-image-preview"?: "none" | "standard" | "large";
      "max-snippet"?: number;
    };
  };
  schema?: {
    type: "website" | "article" | "tool" | "build" | "profile" | "mechanics" | "ascendancy";
    data?: any;
    breadcrumbs?: Array<{ name: string; path: string }>;
  };
}

const defaultContext = {
  siteUrl: "https://www.poe2.dev",
  siteName: "POE2 Tools",
  siteImage: "https://www.poe2.dev/android-chrome-512x512.png",
};

export async function generateDynamicMetadata(
  props: MetadataProps,
  parent: ResolvingMetadata,
  data: BaseMetadata
): Promise<Metadata> {
  const url = `https://www.poe2.dev${data.path}`;

  // Build base OpenGraph metadata
  const baseOpenGraph = {
    title: data.title,
    description: data.description,
    url,
    siteName: "POE2 Tools",
    type: data.openGraph?.type ?? "website",
  } as const;

  // Build type-specific OpenGraph metadata
  const openGraph: Metadata["openGraph"] = {
    ...baseOpenGraph,
    ...(data.openGraph?.type === "article" &&
      data.openGraph?.publishedTime && {
        type: "article" as const,
        publishedTime: data.openGraph.publishedTime,
        authors: data.openGraph.authors,
      }),
    ...(data.openGraph?.images && {
      images: data.openGraph.images.map((image) => ({
        url: image,
        width: 1200,
        height: 630,
        alt: data.title,
      })),
    }),
  };

  const metadata: Metadata = {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: url,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      ...(data.openGraph?.images && {
        images: data.openGraph.images,
      }),
    },
    robots: {
      index: data.robots?.index ?? true,
      follow: data.robots?.follow ?? true,
      ...(data.robots?.nocache && { nocache: true }),
      ...(data.robots?.noarchive && { noarchive: true }),
      googleBot: {
        index: data.robots?.googleBot?.index ?? true,
        follow: data.robots?.googleBot?.follow ?? true,
        "max-image-preview": data.robots?.googleBot?.["max-image-preview"] ?? "large",
        "max-snippet": data.robots?.googleBot?.["max-snippet"] ?? -1,
      },
    },
  };

  return metadata;
}

export function generateSchemaData(schema: NonNullable<BaseMetadata["schema"]>, data: BaseMetadata) {
  const context = defaultContext;
  const schemas = [];

  // Always include website schema and breadcrumbs if provided
  if (schema?.breadcrumbs) {
    schemas.push(generateBreadcrumbSchema(context, schema.breadcrumbs));
  }

  // Add type-specific schema
  switch (schema?.type) {
    case "article":
      schemas.push(generateNewsArticleSchema(context, schema.data));
      break;
    case "tool":
      schemas.push(
        generateToolSchema(context, {
          name: data.title,
          path: data.path,
          description: data.description,
          features: schema.data?.features,
        })
      );
      break;
    case "build":
      schemas.push(generateBuildPlannerSchema(context, schema.data));
      break;
    case "profile":
      schemas.push(generateProfileSchema(context, schema.data));
      break;
    case "mechanics":
      schemas.push(generateMechanicsSchema(context, schema.data));
      break;
    case "ascendancy":
      schemas.push(generateAscendancySchema(context, schema.data));
      break;
  }

  return combineSchemas(...schemas);
}

/** BreadcrumbList + WebApplication JSON-LD for a tool page; render with <JsonLd>. */
export function toolJsonLd(
  tool: { title: string; description: string; path: string; features?: string[] },
  breadcrumbs: Array<{ name: string; path: string }>
) {
  return generateSchemaData(
    { type: "tool", data: { features: tool.features }, breadcrumbs },
    { title: tool.title, description: tool.description, path: tool.path }
  );
}

/** BreadcrumbList + Article JSON-LD for guides, mechanics and ascendancy pages. */
export function articleJsonLd(
  a: { headline: string; description: string; path: string; datePublished?: string; image?: string },
  breadcrumbs: Array<{ name: string; path: string }>
) {
  return [
    generateBreadcrumbSchema(defaultContext, breadcrumbs),
    {
      "@type": "Article",
      headline: a.headline,
      description: a.description,
      mainEntityOfPage: `${defaultContext.siteUrl}${a.path}`,
      ...(a.datePublished && { datePublished: a.datePublished, dateModified: a.datePublished }),
      image: a.image ?? defaultContext.siteImage,
      author: { "@type": "Organization", name: defaultContext.siteName },
      publisher: { "@type": "Organization", name: defaultContext.siteName, url: defaultContext.siteUrl },
    },
  ];
}
