import type { NewsItem } from "@/types/news";

import type { Metadata, ResolvingMetadata } from "next";

import { NewsService } from "~/services/news-service";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // Get parent metadata
    const previousImages = (await parent).openGraph?.images || [];
    const previousKeywords = (await parent).keywords || [];

    // Since we're using ID-based lookup in the service
    const article = await NewsService.getNewsById(params.slug);
    if (!article) {
      return {
        title: { absolute: "Article Not Found | POE2 Tools" },
        description: "The requested news article could not be found.",
        robots: {
          index: false,
          follow: true,
        },
      };
    }

    const description = article.description;
    const articleUrl = `https://poe2.dev/news/${params.slug}`;

    // Generate article-specific keywords
    const articleKeywords = [
      "path of exile 2 news",
      "poe2 updates",
      article.category.toLowerCase(),
      `poe2 ${article.category.toLowerCase()}`,
      ...previousKeywords,
    ].filter((keyword): keyword is string => Boolean(keyword));

    // Enhanced schema.org data
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.title,
      description: description,
      datePublished: article.publishedAt,
      author: {
        "@type": "Organization",
        name: article.source,
      },
      publisher: {
        "@type": "Organization",
        name: "POE2 Tools",
        logo: {
          "@type": "ImageObject",
          url: "https://poe2.dev/favicon.svg",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
      articleSection: article.category,
      url: articleUrl,
    };

    return {
      title: { absolute: `${article.title} | POE2 Tools` },
      description,
      keywords: articleKeywords,
      openGraph: {
        title: article.title,
        description,
        type: "article",
        url: articleUrl,
        publishedTime: article.publishedAt,
        authors: [article.source],
        images: [
          {
            url: "/poe2logonobg.png",
            width: 1200,
            height: 630,
            alt: `${article.title} - POE2 News`,
          },
          ...previousImages,
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description,
        images: ["/poe2logonobg.png"],
      },
      alternates: {
        canonical: articleUrl,
      },
      robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      other: {
        "schema:NewsArticle": JSON.stringify(schemaData),
        "article:published_time": article.publishedAt,
        "article:section": article.category,
        "article:source": article.source,
        "news:keywords": articleKeywords.join(","),
        "news:category": article.category,
        "news:source": article.source,
      },
    };
  } catch (error) {
    console.error("Error generating news article metadata:", error);
    return {
      title: { absolute: "Article Not Found | POE2 Tools" },
      description: "The requested news article could not be found.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}
