import { Activity, Swords, User, Zap } from "lucide-react";

import { Suspense } from "react";

import Link from "next/link";

import { Card } from "~/components/ui/Card";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

import { mechanicsWithMeta } from "~/lib/mechanics/data";

const iconMap = {
  Zap: Zap,
  Activity: Activity,
  User: User,
  Swords: Swords,
} as const;

export default function MechanicsPage() {
  return (
    <Container className="py-8">
      <div className="space-y-8">
        <div className="max-w-3xl">
          <Text variant="h1" className="text-4xl font-bold mb-4">
            Game Mechanics
          </Text>
          <Text className="text-lg text-foreground/80">
            Comprehensive guides to Path of Exile 2's core game mechanics and systems. Learn about
            damage types, status effects, character attributes, and combat mechanics.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Suspense
            fallback={
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            }
          >
            {mechanicsWithMeta.map((mechanic) => {
              const Icon = iconMap[mechanic.icon];
              return (
                <Link key={mechanic.id} href={`/mechanics/${mechanic.id}`} className="block group">
                  <Card className="h-full p-6 transition-colors hover:border-primary">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <Text variant="h3" className="text-xl font-semibold mb-2">
                          {mechanic.title}
                        </Text>
                        <Text className="text-foreground/70">{mechanic.description}</Text>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </Suspense>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <Text variant="h2" className="text-2xl font-bold mb-4">
            Additional Resources
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/guides" className="block group">
              <Card className="h-full p-6 transition-colors hover:border-primary">
                <Text variant="h3" className="text-lg font-semibold mb-2">
                  Game Guides
                </Text>
                <Text className="text-sm text-foreground/70">
                  Comprehensive guides for all aspects of POE2
                </Text>
              </Card>
            </Link>
            <Link href="/build-planner" className="block group">
              <Card className="h-full p-6 transition-colors hover:border-primary">
                <Text variant="h3" className="text-lg font-semibold mb-2">
                  Build Planner
                </Text>
                <Text className="text-sm text-foreground/70">
                  Plan and optimize your character builds
                </Text>
              </Card>
            </Link>
            <Link href="/dps-calc" className="block group">
              <Card className="h-full p-6 transition-colors hover:border-primary">
                <Text variant="h3" className="text-lg font-semibold mb-2">
                  DPS Calculator
                </Text>
                <Text className="text-sm text-foreground/70">
                  Calculate and compare skill damage
                </Text>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
