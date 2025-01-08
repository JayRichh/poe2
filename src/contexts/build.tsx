"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import type { BuildWithRelations } from "~/app/actions/server/builds";
import type {
  Equipment,
  EquipmentInsert,
  UpdateEquipmentParams,
} from "~/app/actions/server/equipment";
import { createEquipment, deleteEquipment, updateEquipment } from "~/app/actions/server/equipment";

interface BuildContextType {
  build: BuildWithRelations;
  equipment: Equipment[];
  isDirty: boolean;
  setEquipmentState: (equipment: Equipment[]) => void;
  saveBuild: () => Promise<void>;
}

const BuildContext = createContext<BuildContextType | null>(null);

export function BuildProvider({
  children,
  build: initialBuild,
}: {
  children: React.ReactNode;
  build: BuildWithRelations;
}) {
  const router = useRouter();
  const [build, setBuild] = useState(initialBuild);
  const [equipment, setEquipment] = useState(initialBuild.equipment || []);
  const [isDirty, setIsDirty] = useState(false);

  const setEquipmentState = (newEquipment: Equipment[]) => {
    setEquipment(newEquipment);
    setIsDirty(true);
  };

  const saveBuild = async () => {
    if (!isDirty) return;

    try {
      const currentEquipment = build.equipment || [];

      // Find items to delete
      const itemsToDelete = currentEquipment.filter(
        (current) => !equipment.find((item) => item.id === current.id)
      );

      // Find items to create
      const itemsToCreate = equipment.filter(
        (item) => !item.id || !currentEquipment.find((current) => current.id === item.id)
      );

      // Find items to update
      const itemsToUpdate = equipment.filter(
        (item) => item.id && currentEquipment.find((current) => current.id === item.id)
      );

      // Execute operations
      await Promise.all([
        ...itemsToDelete.map((item) => deleteEquipment(item.id!)),
        ...itemsToCreate.map((item) =>
          createEquipment({
            ...item,
            build_id: build.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as EquipmentInsert)
        ),
        ...itemsToUpdate.map((item) => {
          const { id, created_at, updated_at, build_id, ...updates } = item;
          const params: UpdateEquipmentParams = {
            id: id!,
            updates: {
              ...updates,
              updated_at: new Date().toISOString(),
            },
          };
          return updateEquipment(params);
        }),
      ]);

      setIsDirty(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to save equipment:", error);
      throw error;
    }
  };

  // Refresh data when build changes
  useEffect(() => {
    router.refresh();
  }, [build.id, build.slug, router]);

  return (
    <BuildContext.Provider
      value={{
        build,
        equipment,
        isDirty,
        setEquipmentState,
        saveBuild,
      }}
    >
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

export function useEquipmentManager() {
  const context = useContext(BuildContext);
  if (!context) {
    throw new Error("useEquipmentManager must be used within a BuildProvider");
  }
  return {
    equipment: context.equipment,
    isDirty: context.isDirty,
    updateEquipment: context.setEquipmentState,
    saveBuild: context.saveBuild,
  };
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
            onClick={() => router.push("/build-planner")}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            View All Builds
          </button>
        </div>
      </div>
    </div>
  );
}
