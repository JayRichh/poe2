"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { GradientBackground } from "~/components/ui/GradientBackground";
import { Text } from "~/components/ui/Text";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <GradientBackground />
      <Container className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="space-y-2">
            <Text variant="h1" className="text-8xl font-bold mb-4">
              404
            </Text>
            <Text variant="h2" className="text-2xl font-semibold">
              Page not found
            </Text>
            <Text className="text-foreground/70">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </Text>
          </div>

          <div className="flex justify-center gap-4">
            <Link href="/" passHref>
              <Button>Go home</Button>
            </Link>
            <Button variant="outline" onClick={() => router.back()}>
              Go back
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
