import { Suspense } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

import { getBuild } from "~/app/actions/server/builds";
import { BuildErrorBoundary } from "~/contexts/build";
import { LoadingOverlay } from "~/components/ui/LoadingOverlay";
import { ClientBuildProvider } from "./ClientBuildProvider";
import { getServerClient } from "~/app/_actions/supabase";
import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];

import { User } from "@supabase/supabase-js";

interface BuildNavProps {
  build: Build;
  currentPath: string;
  user: User | null;
}

function BuildNav({ build, currentPath, user }: BuildNavProps) {
  const pathBase = build.slug || build.id;
  const canEdit = user && build.user_id === user.id;
  
  const links = [
    { href: `/build-planner/${pathBase}`, label: "Overview" },
    ...(canEdit ? [{ href: `/build-planner/${pathBase}/edit`, label: "Edit" }] : []),
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

function BuildHeader({ build }: { build: Build }) {
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

export default async function BuildPlannerLayout({ children, params }: BuildPlannerLayoutProps) {
  // Check auth first
  const supabase = await getServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Await params before using
  const { id } = await params;

  // Get build data
  const { data: build, error } = await getBuild(id).then(
    build => ({ data: build, error: null }),
    error => ({ data: null, error })
  );

  // Handle loading and error states
  if (!build) {
    return (
      <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] p-4">
        <Container className="max-w-7xl py-8 relative min-h-[50vh]">
          <LoadingOverlay message="Loading build..." />
        </Container>
      </div>
    );
  }

  // Handle errors after loading
  if (error) {
    return (
      <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] p-4">
        <Container className="max-w-7xl py-8">
          <BuildErrorBoundary error={error} />
        </Container>
      </div>
    );
  }

  // Handle slug redirects
  if (build.slug && id !== build.slug) {
    redirect(`/build-planner/${build.slug}`);
  }

  // Get current path for nav and edit check
  const pathBase = build.slug || build.id;
  const childrenStr = String(children || '');
  const isEditPage = childrenStr.includes('EditBuildForm') || childrenStr.includes('edit/page');
  
  // Determine current path based on children content
  let currentPath = `/build-planner/${pathBase}`;
  if (isEditPage) {
    currentPath = `/build-planner/${pathBase}/edit`;
    // Check auth for edit page
    if (!user) {
      redirect('/auth/login');
    }
    if (build.user_id !== user.id) {
      redirect('/build-planner');
    }
  } else if (childrenStr.includes('equipment')) {
    currentPath = `/build-planner/${pathBase}/equipment`;
  } else if (childrenStr.includes('skills')) {
    currentPath = `/build-planner/${pathBase}/skills`;
  } else if (childrenStr.includes('stats')) {
    currentPath = `/build-planner/${pathBase}/stats`;
  } else if (childrenStr.includes('notes')) {
    currentPath = `/build-planner/${pathBase}/notes`;
  } else if (childrenStr.includes('import-export')) {
    currentPath = `/build-planner/${pathBase}/import-export`;
  }

  const content = (
    <Container className="max-w-7xl py-8 space-y-8">
      <Suspense fallback={<div className="h-20 animate-pulse rounded-xl bg-foreground/5" />}>
        <BuildHeader build={build} />
      </Suspense>

      <BuildNav build={build} currentPath={currentPath} user={user} />

      <div className="pt-4 border-t border-border/50">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-foreground/5" />}>
          {children}
        </Suspense>
      </div>
    </Container>
  );

  return (
    <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] p-4">
      <ClientBuildProvider build={build}>
        {content}
      </ClientBuildProvider>
    </div>
  );
}
