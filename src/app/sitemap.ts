import { MetadataRoute } from 'next';
import { mechanics } from '~/lib/mechanics/data';
import { guides } from '~/lib/guides/data';
import { NewsService } from '~/services/news-service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://poe2.tools';
  const defaultDate = new Date();

  // Get all news items including patch notes
  const allNews = await NewsService.getAllNews();

  const routes = [
    {
      url: baseUrl,
      lastModified: defaultDate,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: defaultDate,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: defaultDate,
    },
    {
      url: `${baseUrl}/mechanics`,
      lastModified: defaultDate,
    },
  ];

  // Add mechanics pages
  const mechanicsRoutes = Object.keys(mechanics).map((slug) => ({
    url: `${baseUrl}/mechanics/${slug}`,
    lastModified: defaultDate,
  }));

  // Add guide pages
  const guideRoutes = Object.keys(guides).map((slug) => ({
    url: `${baseUrl}/guides?category=${slug}`,
    lastModified: defaultDate,
  }));

  // Add news pages with proper routing
  const newsRoutes = allNews.map((news) => {
    // Safely handle date parsing
    let lastMod = defaultDate;
    try {
      if (news.publishedAt) {
        lastMod = new Date(news.publishedAt);
      } else if (news.date) {
        lastMod = new Date(news.date);
      }
    } catch (e) {
      console.error('Error parsing date:', e);
    }

    const path = news.type === 'patch' 
      ? `/news/patch-notes/${news.slug || news.id}`
      : `/news/${news.slug || news.id}`;
    
    return {
      url: `${baseUrl}${path}`,
      lastModified: lastMod,
    };
  });

  return [
    ...routes,
    ...mechanicsRoutes,
    ...guideRoutes,
    ...newsRoutes,
  ];
}
