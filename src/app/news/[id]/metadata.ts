import { Metadata, ResolvingMetadata } from "next";
import { generateDynamicMetadata } from "~/utils/metadata";
import { NewsService } from "~/services/news-service";

interface PageProps {
  params: Promise<{ id: string }> | undefined;
  searchParams: Promise<{ category?: string }> | undefined;
}

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!params || !searchParams) return {};

  // Await params and searchParams before using
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
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
      { params: resolvedParams },
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
