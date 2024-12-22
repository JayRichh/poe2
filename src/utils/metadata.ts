import { Metadata, ResolvingMetadata } from "next";
import {
  generateWebsiteSchema,
  generateNewsArticleSchema,
  generateToolSchema,
  generateBuildPlannerSchema,
  generateProfileSchema,
  generateBreadcrumbSchema,
  combineSchemas,
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
    type?: "website" | "article" | "book" | "profile" | "music.song" | "music.album" | "music.playlist" | "music.radio_station" | "video.movie" | "video.episode" | "video.tv_show" | "video.other";
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
    type: "website" | "article" | "tool" | "build" | "profile";
    data?: any;
    breadcrumbs?: Array<{ name: string; path: string; }>;
  };
}

const defaultContext = {
  siteUrl: "https://poe2.dev",
  siteName: "POE2 Tools",
  siteImage: "https://poe2.dev/android-chrome-512x512.png",
};

export async function generateDynamicMetadata(
  props: MetadataProps,
  parent: ResolvingMetadata,
  data: BaseMetadata
): Promise<Metadata> {
  const url = `https://poe2.dev${data.path}`;

  // Build base OpenGraph metadata
  const baseOpenGraph = {
    title: data.title,
    description: data.description,
    url,
    siteName: "POE2 Tools",
    type: data.openGraph?.type ?? "website",
  } as const;

  // Build type-specific OpenGraph metadata
  const openGraph: Metadata['openGraph'] = {
    ...baseOpenGraph,
    ...(data.openGraph?.type === "article" && data.openGraph?.publishedTime && {
      type: "article" as const,
      publishedTime: data.openGraph.publishedTime,
      authors: data.openGraph.authors,
    }),
    ...(data.openGraph?.images && {
      images: data.openGraph.images.map(image => ({
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

  // Add schema.org structured data
  if (data.schema) {
    const schemaData = generateSchemaData(data.schema, data);
    metadata.other = {
      "schema:WebApplication": JSON.stringify(schemaData),
    };
  }

  return metadata;
}

function generateSchemaData(schema: NonNullable<BaseMetadata['schema']>, data: BaseMetadata) {
  const context = defaultContext;
  const schemas = [];

  // Always include website schema and breadcrumbs if provided
  schemas.push(generateWebsiteSchema(context));
  if (schema?.breadcrumbs) {
    schemas.push(generateBreadcrumbSchema(context, schema.breadcrumbs));
  }

  // Add type-specific schema
  switch (schema?.type) {
    case "article":
      schemas.push(generateNewsArticleSchema(context, schema.data));
      break;
    case "tool":
      schemas.push(generateToolSchema(context, {
        name: data.title,
        path: data.path,
        description: data.description,
        features: schema.data?.features,
      }));
      break;
    case "build":
      schemas.push(generateBuildPlannerSchema(context, schema.data));
      break;
    case "profile":
      schemas.push(generateProfileSchema(context, schema.data));
      break;
  }

  return combineSchemas(...schemas);
}
