import Link from "next/link";

import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

export default function AscendanciesNotFound() {
  return (
    <Container className="py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Text variant="h1" className="text-4xl font-bold mb-4">
          Page Not Found
        </Text>
        <Text className="text-lg text-foreground/80 mb-8 max-w-2xl">
          The ascendancy page you're looking for doesn't exist. Check out our available ascendancy
          classes below.
        </Text>
        <div className="flex gap-4">
          <Link href="/ascendancies">
            <Button variant="primary">View All Classes</Button>
          </Link>
          <Link href="/">
            <Button variant="ghost">Return Home</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
