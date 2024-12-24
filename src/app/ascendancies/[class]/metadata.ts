import { type Metadata } from "next";

import { type AscendancyClass, ascendancies } from "~/lib/ascendancies/data";

interface Props {
  params: Promise<{ class: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const ascendancyClass = resolvedParams.class as AscendancyClass;
  const ascendancy = ascendancies[ascendancyClass];

  if (!ascendancy) {
    return {};
  }

  const title = `${ascendancy.title} Guide | POE2 Ascendancy Class`;
  const description = `${ascendancy.description} Learn about ${ascendancy.title}'s playstyle, key features, mechanics, and optimal builds in Path of Exile 2.`;

  const keywords = [
    `POE2 ${ascendancy.title}`,
    `Path of Exile 2 ${ascendancy.title}`,
    `${ascendancy.title} guide`,
    `${ascendancy.title} builds`,
    `${ascendancy.title} playstyle`,
    ...ascendancy.keyFeatures.map((feat) => `${ascendancy.title} ${feat}`),
    ...ascendancy.mechanics.map((mech) => `${ascendancy.title} ${mech}`),
    ...ascendancy.buildTypes.map((build) => `${ascendancy.title} ${build}`),
    `POE2 ${ascendancy.playstyle}`,
    `Path of Exile 2 ${ascendancy.title} guide`,
    `POE2 ${ascendancy.title} mechanics`,
    `POE2 ${ascendancy.title} builds`,
  ].join(", ");

  return {
    title,
    description,
    keywords,
    openGraph: {
      images: [`/ascendancies/${ascendancyClass}.webp`],
      type: "article",
      description: description,
      siteName: "POE2 Tools",
    },
    alternates: {
      canonical: `https://poe2.dev/ascendancies/${ascendancyClass}`,
    },
    category: "Game Guide",
  };
}
