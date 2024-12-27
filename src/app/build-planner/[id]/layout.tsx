import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

import { getBuild } from "~/app/actions/server/builds";
import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];

interface BuildNavProps {
  build: Build;
  currentPath: string;
}

function BuildNav({ build, currentPath }: BuildNavProps) {
  const pathBase = build.slug || build.id;
  const links = [
    { href: `/build-planner/${pathBase}`, label: "Overview" },
    { href: `/build-planner/${pathBase}/equipment`, label: "Equipment" },
    { href: `/build-planner/${pathBase}/skills`, label: "Skills" },
    { href: `/build-planner/${pathBase}/stats`, label: "Stats" },
    { href: `/build-planner/${pathBase}/notes`, label: "Notes" },
    { href: `/build-planner/${pathBase}/import-export`, label: "Import/Export" },
  ];

  return (
    <nav className="flex items-center gap-2 overflow-x-auto pb-2">
      {links.map(({ href, label }) => (
        <Link key={href} href={href}>
          <Button variant={currentPath === href ? "primary" : "outline"} size="sm">
            {label}
          </Button>
        </Link>
      ))}
    </nav>
  );
}

async function BuildHeader({ buildId }: { buildId: string }) {
  const build = await getBuild(buildId);

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <Text className="text-3xl font-bold">{build.name}</Text>
        {build.description && <Text className="text-foreground/60 mt-1">{build.description}</Text>}
        <div className="flex items-center gap-4 mt-2">
          <Text className="text-sm text-foreground/60">Level {build.level || "?"}</Text>
          <Text className="text-sm text-foreground/60 capitalize">
            {build.poe_class || "Any Class"}
          </Text>
          {build.is_template && (
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
              Template
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface BuildPlannerLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function BuildPlannerLayout({ children, params }: BuildPlannerLayoutProps) {
  const { id } = await params;
  if (!id) notFound();

  try {
    const build = await getBuild(id);

    return (
      <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] p-4">
        <Container className="max-w-7xl py-8 space-y-8">
          <Suspense fallback={<div className="h-20 animate-pulse rounded-xl bg-foreground/5" />}>
            <BuildHeader buildId={id} />
          </Suspense>

          <BuildNav build={build} currentPath={`/build-planner/${build.slug || build.id}`} />

          <div className="pt-4 border-t border-border/50">{children}</div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error loading build:", error);
    notFound();
  }
}
