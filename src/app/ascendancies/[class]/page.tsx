import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card } from "~/components/ui/Card";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

import { type AscendancyClass, ascendancies } from "~/lib/ascendancies/data";

interface PageProps {
  params: Promise<{
    class: string;
  }>;
}

export default async function AscendancyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const ascendancyClass = resolvedParams.class as AscendancyClass;
  const ascendancy = ascendancies[ascendancyClass];

  if (!ascendancy) {
    notFound();
  }

  return (
    <Container className="py-8">
      <div className="space-y-8">
        <div className="relative h-64 w-full overflow-hidden rounded-xl">
          <Image
            src={`/ascendancies/${ascendancyClass}.webp`}
            alt={ascendancy.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <Text variant="h1" className="text-4xl font-bold mb-2">
              {ascendancy.title}
            </Text>
            <Text className="text-lg text-foreground/90 max-w-2xl">{ascendancy.description}</Text>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <Text variant="h2" className="text-2xl font-bold mb-4">
                Playstyle
              </Text>
              <Text className="text-foreground/80">{ascendancy.playstyle}</Text>
            </Card>

            <Card className="p-6">
              <Text variant="h2" className="text-2xl font-bold mb-4">
                Key Features
              </Text>
              <div className="space-y-3">
                {ascendancy.keyFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <Text className="text-foreground/80">{feature}</Text>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <Text variant="h2" className="text-2xl font-bold mb-4">
                Core Mechanics
              </Text>
              <div className="space-y-3">
                {ascendancy.mechanics.map((mechanic) => (
                  <div key={mechanic} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <Text className="text-foreground/80">{mechanic}</Text>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <Text variant="h2" className="text-2xl font-bold mb-4">
                Popular Build Types
              </Text>
              <div className="grid gap-4">
                {ascendancy.buildTypes.map((build) => (
                  <Card key={build} className="p-4 border-border/50">
                    <Text className="font-medium">{build}</Text>
                  </Card>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <Text variant="h2" className="text-2xl font-bold mb-4">
                Getting Started
              </Text>
              <div className="space-y-4">
                <Link href="/build-planner/new" className="block group">
                  <Card className="p-4 border-border/50 transition-colors hover:border-primary">
                    <Text className="font-medium">Create a Build</Text>
                    <Text className="text-sm text-foreground/70">
                      Plan your {ascendancy.title} build using our build planner
                    </Text>
                  </Card>
                </Link>
                <Link href="/guides?category=character-building" className="block group">
                  <Card className="p-4 border-border/50 transition-colors hover:border-primary">
                    <Text className="font-medium">View Guides</Text>
                    <Text className="text-sm text-foreground/70">
                      Learn from community guides and build tutorials
                    </Text>
                  </Card>
                </Link>
                <Link href="/skill-tree" className="block group">
                  <Card className="p-4 border-border/50 transition-colors hover:border-primary">
                    <Text className="font-medium">Explore Skill Tree</Text>
                    <Text className="text-sm text-foreground/70">
                      Plan your passive skill tree progression
                    </Text>
                  </Card>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
