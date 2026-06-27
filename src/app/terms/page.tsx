import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

export default function TermsOfService() {
  return (
    <Container size="md" className="py-16">
      <Text variant="h1" className="text-4xl font-bold mb-8">
        Terms of Service
      </Text>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            Introduction
          </Text>
          <Text className="text-muted-foreground">
            POE2 Tools is a free, community-driven project providing build planning tools for Path
            of Exile 2. By using this service, you agree to these basic terms.
          </Text>
        </section>

        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            Service Usage
          </Text>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>The service is provided as-is, without any warranties</li>
            <li>We reserve the right to modify or discontinue the service at any time</li>
            <li>There are no accounts — builds you create are stored locally in your browser</li>
          </ul>
        </section>

        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            User Content
          </Text>
          <Text className="text-muted-foreground">
            Builds you create are saved only on your device and shared via self-contained links. You
            retain full ownership of your content; we do not store or host it on a server.
          </Text>
        </section>

        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            Disclaimer
          </Text>
          <Text className="text-muted-foreground">
            This is a fan-made toolkit and is not affiliated with or endorsed by Grinding Gear
            Games. All game-related content and assets belong to their respective owners.
          </Text>
        </section>

        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            Changes
          </Text>
          <Text className="text-muted-foreground">
            We may update these terms as needed. Continued use of the service after changes
            constitutes acceptance of the new terms.
          </Text>
        </section>
      </div>
    </Container>
  );
}
