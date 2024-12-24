import { Card } from "~/components/ui/Card";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

import { mechanics } from "~/lib/mechanics/data";

export default function StatusEffectsPage() {
  const mechanic = mechanics["status-effects"];

  return (
    <Container className="py-8">
      <div className="space-y-8 max-w-4xl mx-auto">
        <div>
          <Text variant="h1" className="text-4xl font-bold mb-4">
            {mechanic.title}
          </Text>
          <Text className="text-lg text-foreground/80">{mechanic.description}</Text>
        </div>

        <div className="space-y-6">
          {mechanic.sections.map((section) => (
            <Card key={section.title} className="p-6">
              <Text variant="h2" className="text-2xl font-semibold mb-4">
                {section.title}
              </Text>
              <div className="space-y-4">
                {section.content.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <Text className="text-foreground/80">{item}</Text>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <Text variant="h2" className="text-2xl font-bold mb-6">
            Related Resources
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="/mechanics/damage-types" className="block group">
              <Card className="h-full p-6 transition-colors hover:border-primary">
                <Text variant="h3" className="text-lg font-semibold mb-2">
                  Damage Types
                </Text>
                <Text className="text-sm text-foreground/70">
                  Learn about damage types that cause status effects
                </Text>
              </Card>
            </a>
            <a href="/guides?category=combat" className="block group">
              <Card className="h-full p-6 transition-colors hover:border-primary">
                <Text variant="h3" className="text-lg font-semibold mb-2">
                  Combat Guide
                </Text>
                <Text className="text-sm text-foreground/70">
                  Master combat mechanics and status effect application
                </Text>
              </Card>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
