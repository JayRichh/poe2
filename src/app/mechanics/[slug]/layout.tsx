import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { JsonLd } from "~/components/seo/JsonLd";

import { articleJsonLd } from "~/utils/metadata";
import { mechanics } from "~/lib/mechanics/data";
import type { ContentCategory } from "~/lib/shared/types";

interface LayoutProps extends PropsWithChildren {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mechanic = mechanics[slug as ContentCategory];

  if (!mechanic) {
    return {
      title: "Mechanic Not Found",
      description: "The requested Path of Exile 2 mechanic guide could not be found.",
    };
  }

  return {
    title: `${mechanic.title} · Game Mechanics`,
    description: `${mechanic.description.replace(/[.\s]+$/, "")}. A Path of Exile 2 mechanics reference from PoE2 Tools.`,
    alternates: {
      canonical: `/mechanics/${slug}`,
    },
    openGraph: {
      title: `${mechanic.title} · POE2 Game Mechanics`,
      description: mechanic.description,
      type: "article",
    },
  };
}

export default async function MechanicLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const mechanic = mechanics[slug as ContentCategory];
  return (
    <>
      {mechanic && (
        <JsonLd
          data={articleJsonLd(
            { headline: mechanic.title, description: mechanic.description, path: `/mechanics/${slug}` },
            [
              { name: "Home", path: "/" },
              { name: "Mechanics", path: "/mechanics" },
              { name: mechanic.title, path: `/mechanics/${slug}` },
            ]
          )}
        />
      )}
      {children}
    </>
  );
}
