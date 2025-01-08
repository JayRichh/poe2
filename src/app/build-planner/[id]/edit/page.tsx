import { Suspense } from "react";

import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { Container } from "~/components/ui/Container";

import { getServerClient } from "~/app/_actions/supabase";
import { getBuild } from "~/app/actions/server/builds";

import { EditBuildForm } from "./EditBuildForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Build - POE2 Build Planner",
  description: "Edit your POE2 build configuration",
};

export default async function EditBuildPage({ params }: PageProps) {
  // Await params before using
  const { id } = await params;

  return (
    <Container className="max-w-7xl py-8">
      <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-foreground/5" />}>
        <EditBuildForm id={id} />
      </Suspense>
    </Container>
  );
}
