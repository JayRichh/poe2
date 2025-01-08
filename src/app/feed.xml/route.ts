import { MetadataRoute } from "next";
import { NextResponse } from "next/server";

import { NewsService } from "~/services/news-service";

export async function GET(request: Request) {
  const baseUrl = "https://poe2.dev";
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const allNews = await NewsService.getAllNews();
  const filteredNews = type
    ? allNews.filter((news) => {
        switch (type) {
          case "news":
            return news.type === "announcement";
          case "patch":
            return news.type === "patch-note";
          default:
            return true;
        }
      })
    : allNews;

  // Format date for RSS
  const formatDate = (date: string | Date) => {
    return new Date(date).toUTCString();
  };

  // Generate news items XML
  const newsItems = filteredNews
    .map((news) => {
      const path =
        news.type === "patch-note"
          ? `/news/patch-notes/${news.slug || news.id}`
          : `/news/${news.slug || news.id}`;

      return `
  <item>
    <title>${news.title}</title>
    <link>${baseUrl}${path}</link>
    <guid isPermaLink="true">${baseUrl}${path}</guid>
    <description><![CDATA[${news.processedContent || news.content || news.title}]]></description>
    <pubDate>${formatDate(news.date)}</pubDate>
    <category>${news.type === "patch-note" ? "Patch Notes" : "Announcements"}</category>
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
<channel>
  <title>POE2 Tools - ${type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Feed` : "All Updates"}</title>
  <link>${baseUrl}</link>
  <description>Latest news, patch notes, and updates for Path of Exile 2 tools including build planner, DPS calculator, and skill tree planner.</description>
  <language>en</language>
  <lastBuildDate>${formatDate(new Date())}</lastBuildDate>
  <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
  <image>
    <url>${baseUrl}/android-chrome-512x512.png</url>
    <title>POE2 Tools</title>
    <link>${baseUrl}</link>
  </image>
  
  <!-- Static Tool Pages -->
  <item>
    <title>POE2 Skill Tree Planner</title>
    <link>${baseUrl}/skill-tree</link>
    <guid isPermaLink="true">${baseUrl}/skill-tree</guid>
    <description><![CDATA[Interactive skill tree planner for Path of Exile 2. Plan and share your character builds with the community.]]></description>
    <category>Tools</category>
  </item>
  <item>
    <title>POE2 Build Planner</title>
    <link>${baseUrl}/build-planner</link>
    <guid isPermaLink="true">${baseUrl}/build-planner</guid>
    <description><![CDATA[Comprehensive build planning tool for Path of Exile 2. Plan your character's equipment, skills, and more.]]></description>
    <category>Tools</category>
  </item>
  <item>
    <title>POE2 DPS Calculator</title>
    <link>${baseUrl}/dps-calc</link>
    <guid isPermaLink="true">${baseUrl}/dps-calc</guid>
    <description><![CDATA[Calculate and optimize your DPS in Path of Exile 2.]]></description>
    <category>Tools</category>
  </item>
  
  <!-- Dynamic News Items -->
  ${newsItems}
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
