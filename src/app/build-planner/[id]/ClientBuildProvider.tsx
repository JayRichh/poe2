"use client";

import { BuildProvider } from "~/contexts/build";
import type { BuildWithRelations } from "~/app/actions/server/builds";

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
