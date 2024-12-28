import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { getServerClient } from "~/app/_actions/supabase";
import { Container } from "~/components/ui/Container";
import { EditBuildForm } from "./EditBuildForm";
import { getBuild } from "~/app/actions/server/builds";

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
