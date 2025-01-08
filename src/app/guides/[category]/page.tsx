import { notFound } from "next/navigation";

import { ContentRenderer } from "~/components/shared/ContentRenderer";
import { Container } from "~/components/ui/Container";

import { guides } from "~/lib/guides/data";
import type { ContentCategory } from "~/lib/shared/types";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function GuidePage({ params }: PageProps) {
  const { category } = await params;
  const guide = guides[category as ContentCategory];

  if (!guide) {
    notFound();
  }

  return (
    <Container size="xl" noPadding>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <ContentRenderer sections={guide.sections} relatedContent={guide.relatedContent} />
      </div>
    </Container>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const guide = guides[category as ContentCategory];

  if (!guide) {
    return {};
  }

  return {
    title: guide.title,
    description: guide.description,
  };
}
