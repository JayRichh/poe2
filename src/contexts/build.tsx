"use client";

import { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { BuildWithRelations } from "~/app/actions/server/builds";

interface BuildContextType {
  build: BuildWithRelations;
}

const BuildContext = createContext<BuildContextType | null>(null);

export function BuildProvider({ 
  children, 
  build 
}: { 
  children: React.ReactNode;
  build: BuildWithRelations;
}) {
  const router = useRouter();

  // Refresh data when build changes
  useEffect(() => {
    router.refresh();
  }, [build.id, build.slug, router]);

  return (
    <BuildContext.Provider value={{ build }}>
      {children}
    </BuildContext.Provider>
  );
}

export function useBuild() {
  const context = useContext(BuildContext);
  if (!context) {
    throw new Error("useBuild must be used within a BuildProvider");
  }
  return context.build;
}

export function BuildErrorBoundary({ error }: { error: Error }) {
  const router = useRouter();
  const isNotFound = error.message === "Build not found";

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          {isNotFound ? "Build Not Found" : "Error Loading Build"}
        </h1>
        <p className="text-foreground/60 mb-6">
          {isNotFound 
            ? "The build you're looking for doesn't exist or you don't have permission to view it."
            : error.message || "There was a problem loading this build."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-foreground/10 text-foreground rounded-lg hover:bg-foreground/20"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push('/build-planner')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            View All Builds
          </button>
        </div>
      </div>
    </div>
  );
}
