import Image from "next/image";
import Link from "next/link";

import { Card } from "~/components/ui/Card";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

import { ascendanciesWithMeta } from "~/lib/ascendancies/data";

export default function AscendanciesPage() {
  return (
    <Container className="py-8">
      <div className="space-y-8">
        <div className="max-w-3xl">
          <Text variant="h1" className="text-4xl font-bold mb-4">
            Ascendancy Classes
          </Text>
          <Text className="text-lg text-foreground/80">
            Explore Path of Exile 2's unique ascendancy classes. Each class offers distinct
            playstyles, abilities, and build opportunities. Choose your path and master your class's
            unique powers.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ascendanciesWithMeta.map((ascendancy) => (
            <Link
              key={ascendancy.id}
              href={`/ascendancies/${ascendancy.id}`}
              className="block group"
            >
              <Card className="h-full transition-colors hover:border-primary">
                <div className="relative h-48 w-full mb-4 overflow-hidden rounded-t-xl">
                  <Image
                    src={ascendancy.image}
                    alt={ascendancy.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    priority={ascendancy.id === "acolyte"}
                  />
                </div>
                <div className="p-6 space-y-4">
                  <Text variant="h3" className="text-xl font-semibold">
                    {ascendancy.title}
                  </Text>
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
          ))}
        </div>

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
            <Link href="/guides?category=character-building" className="block group">
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
