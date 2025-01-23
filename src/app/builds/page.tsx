"use client";

import { BuildStats } from "~/components/builds/BuildStats";
import { Container } from "~/components/ui/Container";

export default function BuildsPage() {
  return (
    <main>
      <Container className="px-6 md:px-8 lg:px-10 max-w-7xl py-8 mt-4">
        <BuildStats />
      </Container>
    </main>
  );
}
