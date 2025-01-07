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

    // Validate type if category provided
    if (category) {
      const newsType = category.toLowerCase() === 'patch' ? 'patch-note' : 'announcement';
      if (news.type !== newsType) {
        return {};
      }
    }

    const newsType = news.type === 'patch-note' ? 'Patch Notes' : 'Announcements';
    const newsPath = news.type === 'patch-note' ? `/news/patch-notes/${news.slug || news.id}` : `/news/${news.slug || news.id}`;

    return generateDynamicMetadata({ params: resolvedParams }, parent, {
      title: news.title,
      description: news.processedContent || news.content || `Read about ${news.title} on POE2 Tools`,
      path: newsPath,
      openGraph: {
        type: "article",
        publishedTime: news.date,
        authors: [news.author],
      },
      schema: {
        type: "article",
        data: {
          ...news,
          author: {
            name: news.author,
            url: "https://poe2.dev/about",
          },
        },
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: newsType, path: `/news?type=${news.type}` },
          { name: news.title, path: newsPath },
        ],
      },
    });
  } catch (error) {
    console.error("Error generating news metadata:", error);
    return {};
  }
}
