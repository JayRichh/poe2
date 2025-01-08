"use client";

import type { BuildWithRelations } from "~/app/actions/server/builds";
import { BuildProvider } from "~/contexts/build";

export function ClientBuildProvider({
  build,
  children,
}: {
  build: BuildWithRelations | null;
  children: React.ReactNode;
}) {
  if (!build) {
    return null;
  }

  return <BuildProvider build={build}>{children}</BuildProvider>;
}
