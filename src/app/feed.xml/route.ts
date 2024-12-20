import { MetadataRoute } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://poe2.dev";

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>POE2 Tools</title>
  <link>${baseUrl}</link>
  <description>Community-driven tools for Path of Exile 2 players. Build planning, DPS calculations, and more.</description>
  <language>en</language>
  <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
  <item>
    <title>POE2 Skill Tree Planner</title>
    <link>${baseUrl}/skill-tree</link>
    <guid>${baseUrl}/skill-tree</guid>
    <description>Interactive skill tree planner for Path of Exile 2. Plan and share your character builds with the community.</description>
  </item>
  <item>
    <title>POE2 Build Planner</title>
    <link>${baseUrl}/build-planner</link>
    <guid>${baseUrl}/build-planner</guid>
    <description>Comprehensive build planning tool for Path of Exile 2. Plan your character's equipment, skills, and more.</description>
  </item>
  <item>
    <title>POE2 DPS Calculator</title>
    <link>${baseUrl}/dps-calc</link>
    <guid>${baseUrl}/dps-calc</guid>
    <description>Calculate and optimize your DPS in Path of Exile 2.</description>
  </item>
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
