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
            POE2 Tools is a community-driven, non-commercial project. We collect minimal data
            necessary for basic functionality and user authentication.
          </Text>
        </section>

        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            Data Collection
          </Text>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Authentication data (managed by Supabase)</li>
            <li>Build configurations you create</li>
            <li>Basic usage analytics (page views)</li>
          </ul>
        </section>

        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            Cookies
          </Text>
          <Text className="text-muted-foreground">
            We use essential cookies for authentication purposes only. These cookies are necessary
            for the website to function and cannot be switched off.
          </Text>
        </section>

        <section>
          <Text variant="h2" className="text-2xl font-semibold mb-4">
            Data Usage
          </Text>
          <Text className="text-muted-foreground">
            Your data is used solely for providing the service functionality. We do not sell or
            share your data with third parties.
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
