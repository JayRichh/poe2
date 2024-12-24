"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { guides } from "~/lib/guides/data";
import { ContentRenderer } from "~/components/shared/ContentRenderer";
import type { ContentCategory } from "~/lib/shared/types";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function GuidePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const guide = guides[resolvedParams.category as ContentCategory];

  if (!guide) {
    notFound();
  }

  return (
    <ContentRenderer 
      sections={guide.sections}
      relatedContent={guide.relatedContent}
    />
  );
}
