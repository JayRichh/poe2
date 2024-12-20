import type { Metadata, ResolvingMetadata } from "next";
import { NewsService } from "~/services/news-service";

type Props = {
  params: { [key: string]: string | string[] | undefined }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Get parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const previousKeywords = (await parent).keywords || []

  // Fetch latest news for dynamic metadata
  const latestNews = await NewsService.getLatestNews();
  const categories = await NewsService.getCategories();
  
  const description = `Latest Path of Exile 2 news, patch notes, developer updates, and community announcements. Stay informed about game mechanics, balance changes, and upcoming features for POE2.${
    latestNews.length ? ` Latest update: ${latestNews[0].title}` : ""
  }`;

  const pageUrl = "https://poe2.dev/news";

  // Combine with parent keywords and add category-specific keywords
  const newsKeywords = [
    "path of exile 2 news",
    "poe2 updates",
    "poe2 patch notes",
    "path of exile 2 announcements",
    "poe2 developer updates",
    "poe2 game changes",
    "path of exile 2 community news",
    "poe2 balance updates",
    ...categories.map(cat => `poe2 ${cat.toLowerCase()}`),
    ...previousKeywords
  ].filter((keyword): keyword is string => Boolean(keyword));

  // Enhanced schema.org data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "POE2 News Feed",
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "POE2 Tools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://poe2.dev/favicon.svg"
      }
    },
    "url": pageUrl,
    "hasPart": latestNews.slice(0, 5).map(article => ({
      "@type": "NewsArticle",
      "headline": article.title,
      "description": article.description,
      "datePublished": article.publishedAt,
      "author": {
        "@type": "Organization",
        "name": article.source
      },
      "url": `${pageUrl}/${article.id}`
    }))
  };

  return {
    title: { absolute: "News Feed | POE2 Tools" },
    description,
    keywords: newsKeywords,
    openGraph: {
      title: "POE2 News Feed - Latest Updates and Announcements",
      description,
      type: "website",
      url: pageUrl,
      images: [
        {
          url: "/poe2logonobg.png",
          width: 1200,
          height: 630,
          alt: "POE2 News Feed",
        },
        ...previousImages
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "POE2 News Feed",
      description,
      images: ["/poe2logonobg.png"],
    },
    alternates: {
      canonical: pageUrl,
      types: {
        "application/rss+xml": `${pageUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    other: {
      "schema:WebPage": JSON.stringify(schemaData),
      "news:sections": categories.join(","),
      "news:article_count": latestNews.length.toString(),
      "news:latest_update": latestNews[0]?.publishedAt || "",
      "feed:rss": `${pageUrl}/feed.xml`,
    },
  };
}
