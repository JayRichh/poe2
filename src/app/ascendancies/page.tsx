import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Card } from "~/components/ui/Card";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

import {
  POE2_DATA_VERSION,
  type AscendancyWithMeta,
  ascendanciesByBaseClass,
} from "~/lib/ascendancies/data";

export const metadata: Metadata = {
  title: "Ascendancy Classes",
  description:
    "Comprehensive guide to Path of Exile 2 ascendancy classes. Explore each class's unique abilities, playstyles, key features, and optimal build directions.",
  alternates: {
    canonical: "/ascendancies",
  },
  openGraph: {
    title: "POE2 Ascendancy Classes",
    description:
      "Explore all ascendancy classes in Path of Exile 2. Find detailed information about playstyles, key features, and optimal builds.",
    type: "website",
    images: ["/ascendancies/acolyte.webp"],
  },
};

function AscendancyCard({ ascendancy }: { ascendancy: AscendancyWithMeta }) {
  return (
    <Link href={`/ascendancies/${ascendancy.id}`} className="block group">
      <Card className="h-full transition-colors hover:border-primary">
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-t-xl bg-muted/40">
          {ascendancy.image ? (
            <Image
              src={ascendancy.image}
              alt={ascendancy.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-4 text-center">
              <Text className="text-foreground/60 text-sm">{ascendancy.title}</Text>
            </div>
          )}
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Text variant="h3" className="text-xl font-semibold">
              {ascendancy.title}
            </Text>
            <span className="px-2 py-0.5 text-[10px] rounded-md bg-muted text-foreground/60 whitespace-nowrap">
              {ascendancy.introduced}
            </span>
          </div>
          <Text className="text-foreground/70">{ascendancy.description}</Text>
          <div className="pt-4 border-t border-border/50">
            <Text className="font-medium mb-2">Key Features</Text>
            <div className="flex flex-wrap gap-2">
              {ascendancy.keyFeatures.map((feature) => (
                <span
                  key={feature}
                  className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary/90"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function AscendanciesPage() {
  return (
    <Container className="py-8">
      <div className="space-y-8">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Text variant="h1" className="text-4xl font-bold">
              Ascendancy Classes
            </Text>
            <span className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary/90">
              Data: {POE2_DATA_VERSION}
            </span>
          </div>
          <Text className="text-lg text-foreground/80">
            Path of Exile 2 currently has 8 base classes and 22 ascendancies. Each base class
            unlocks its ascendancy at the Trial of the Sekhemas and the Trial of Chaos. Pick a
            class below to read its playstyle, mechanics and build directions.
          </Text>
        </div>

        {ascendanciesByBaseClass.map(({ base, ascendancies }) => (
          <section key={base.id} className="space-y-6">
            <div className="border-b border-border/50 pb-3">
              <div className="flex flex-wrap items-baseline gap-3">
                <Text variant="h2" className="text-2xl font-bold">
                  {base.name}
                </Text>
                <span className="text-sm text-foreground/60">{base.attributes}</span>
              </div>
              <Text className="text-foreground/70 mt-1">{base.description}</Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ascendancies.map((ascendancy) => (
                <AscendancyCard key={ascendancy.id} ascendancy={ascendancy} />
              ))}
            </div>
          </section>
        ))}

        <div className="mt-12 pt-8 border-t border-border/50">
          <Text variant="h2" className="text-2xl font-bold mb-6">
            Related Resources
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/build-planner" className="block group">
              <Card className="h-full p-6 transition-colors hover:border-primary">
                <Text variant="h3" className="text-lg font-semibold mb-2">
                  Build Planner
                </Text>
                <Text className="text-sm text-foreground/70">
                  Plan and optimize your ascendancy builds
                </Text>
              </Card>
            </Link>
            <Link href="/skill-tree" className="block group">
              <Card className="h-full p-6 transition-colors hover:border-primary">
                <Text variant="h3" className="text-lg font-semibold mb-2">
                  Skill Tree
                </Text>
                <Text className="text-sm text-foreground/70">
                  Explore passive skill options for your class
                </Text>
              </Card>
            </Link>
            <Link href="/guides/character-building" className="block group">
              <Card className="h-full p-6 transition-colors hover:border-primary">
                <Text variant="h3" className="text-lg font-semibold mb-2">
                  Character Guides
                </Text>
                <Text className="text-sm text-foreground/70">
                  Learn optimal builds and strategies
                </Text>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
