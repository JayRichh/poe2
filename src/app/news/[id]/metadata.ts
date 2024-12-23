import { Metadata, ResolvingMetadata } from "next";
import { generateDynamicMetadata } from "~/utils/metadata";
import { NewsService } from "~/services/news-service";

interface PageProps {
  params: { id: string };
  searchParams: { category?: string };
}

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await params and searchParams before using
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);
  
  const id = resolvedParams.id;
  const category = resolvedSearchParams.category;

  try {
    const news = await NewsService.getNewsById(id);
    if (!news) return {};

    // Validate category if provided
    if (category && news.category?.toLowerCase() !== category.toLowerCase()) {
      return {};
    }

    return generateDynamicMetadata(
      { params },
      parent,
      {
        title: news.title,
        description: news.description || `Read about ${news.title} on POE2 Tools`,
        path: `/news/${news.id}`,
        openGraph: {
          type: "article",
          publishedTime: news.publishedAt,
          authors: ["POE2 Tools Team"],
        },
        schema: {
          type: "article",
          data: {
            ...news,
            author: {
              name: "POE2 Tools Team",
              url: "https://poe2.dev/about",
            },
          },
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "News", path: "/news" },
            ...(news.category ? [{ name: news.category, path: `/news?category=${news.category.toLowerCase()}` }] : []),
            { name: news.title, path: `/news/${news.id}` }
          ]
        }
      }
    );
  } catch (error) {
    console.error("Error generating news metadata:", error);
    return {};
  }
}
