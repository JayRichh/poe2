import { Metadata, ResolvingMetadata } from "next";
import { generateDynamicMetadata } from "~/utils/metadata";
import { NewsService } from "~/services/news-service";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const news = await NewsService.getNewsById(params.id);
    if (!news) return {};

    return generateDynamicMetadata(
      { params },
      parent,
      {
        title: news.title,
        description: news.description,
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
            { name: news.category, path: `/news/${news.category.toLowerCase()}` },
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
