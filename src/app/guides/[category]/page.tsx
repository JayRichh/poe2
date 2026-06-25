import type { Metadata } from "next";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const guide = guides[category as ContentCategory];

  if (!guide) {
    return {
      title: "Guide Not Found",
      description: "The requested Path of Exile 2 guide could not be found.",
    };
  }

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `/guides/${category}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
    },
  };
}
