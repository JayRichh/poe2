"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { mechanics } from "~/lib/mechanics/data";
import { ContentRenderer } from "~/components/shared/ContentRenderer";
import type { ContentCategory } from "~/lib/shared/types";
import { motion } from "framer-motion";
import { Text } from "~/components/ui/Text";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function MechanicPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const mechanic = mechanics[resolvedParams.slug as ContentCategory];

  if (!mechanic) {
    notFound();
  }

  return (
    <ContentRenderer 
      sections={[
        {
          title: mechanic.title,
          content: mechanic.sections[0]?.content || [mechanic.description],
          subsections: mechanic.sections[0]?.subsections || [],
          image: mechanic.sections[0]?.image
        },
        ...mechanic.sections.slice(1)
      ]}
      relatedContent={mechanic.relatedContent}
    />
  );
}
