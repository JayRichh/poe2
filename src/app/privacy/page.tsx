import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

export default function PrivacyPolicy() {
  return (
    <Container size="md" className="py-16">
      <Text variant="h1" className="text-4xl font-bold mb-8">
        Privacy Policy
      </Text>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            Overview
          </Text>
          <Text className="text-muted-foreground">
            POE2 Tools is a community-driven, non-commercial project. It has no user accounts and
            no sign-in. The tools run entirely in your browser — we do not operate a database of
            your activity.
          </Text>
        </section>

        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            What is stored
          </Text>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              Builds you create are saved in your browser&apos;s local storage on your device only.
              Clearing your browser data removes them.
            </li>
            <li>
              Shared builds are encoded into the link itself — nothing is uploaded to a server.
            </li>
            <li>Aggregate, anonymous usage analytics (e.g. page views).</li>
          </ul>
        </section>

        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            Cookies &amp; advertising
          </Text>
          <Text className="text-muted-foreground">
            We do not use authentication cookies (there are no accounts). This site displays ads via
            Google AdSense, which may set cookies and use device identifiers to serve and measure
            ads. You can manage ad personalisation through Google&apos;s Ads Settings.
          </Text>
        </section>

        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            Data Usage
          </Text>
          <Text className="text-muted-foreground">
            We do not sell your data. Build data never leaves your device unless you choose to share
            a link or export it yourself.
          </Text>
        </section>

        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            Contact
          </Text>
          <Text className="text-muted-foreground">
            For any privacy-related questions, please reach out through our GitHub repository.
          </Text>
        </section>
      </div>
    </Container>
  );
}
