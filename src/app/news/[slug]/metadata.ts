import type { Metadata } from "next";
import { NewsService } from "~/services/news-service";
import type { NewsItem } from "~/types/news";

interface GenerateMetadataProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  try {
    // Since we're using ID-based lookup in the service
    const article = await NewsService.getNewsById(params.slug);
    if (!article) {
      return {
        title: "Article Not Found | POE2 Tools",
        description: "The requested news article could not be found.",
      };
    }

    const title = `${article.title} | POE2 Tools News`;
    const description = article.description;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://poe2.dev/news/${params.slug}`,
        publishedTime: article.publishedAt,
        authors: [article.source],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      alternates: {
        canonical: `https://poe2.dev/news/${params.slug}`,
      },
      other: {
        "article:published_time": article.publishedAt,
        "article:section": article.category,
        "article:source": article.source,
      },
    };
  } catch (error) {
    console.error("Error generating news article metadata:", error);
    return {
      title: "Article Not Found | POE2 Tools",
      description: "The requested news article could not be found.",
    };
  }
}
