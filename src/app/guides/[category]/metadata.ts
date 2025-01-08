import type { Metadata } from "next";

import { guides } from "~/lib/guides/data";
import type { ContentCategory } from "~/lib/shared/types";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const guide = guides[params.category as ContentCategory];

  if (!guide) {
    return {
      title: "Guide Not Found",
      description: "The requested guide could not be found.",
    };
  }

  return {
    title: guide.title,
    description: guide.description,
  };
}
