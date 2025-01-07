"use client";

import { Suspense, useEffect } from "react";
import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import { EquipmentManager } from "~/components/build-planner/EquipmentManager";
import { useBuild } from "~/contexts/build";
import { ErrorBoundary } from "~/components/shared/ErrorBoundary";
import { useAuth } from "~/contexts/auth";

export default function EquipmentPage() {
  const { user } = useAuth();
  const build = useBuild();
  
  const canModify = Boolean(user && build.user_id === user.id && build.visibility !== 'public');

  useEffect(() => {
    if (!canModify) {
      throw new Error("You don't have permission to modify this build");
    }
  }, [canModify]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Text className="text-xl font-semibold mb-4">Equipment Management</Text>
        <Text className="text-foreground/60 mb-6">
          Manage your build&apos;s equipment sets and configurations
        </Text>

        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-12 animate-pulse rounded-lg bg-foreground/5" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 animate-pulse rounded-lg bg-foreground/5" />
                <div className="h-24 animate-pulse rounded-lg bg-foreground/5" />
              </div>
            </div>
          }
        >
          <ErrorBoundary fallback={<ErrorMessage />}>
            <EquipmentManager buildId={build.id} canModify={canModify} />
          </ErrorBoundary>
        </Suspense>
      </Card>
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="p-4 rounded-lg bg-red-500/10 text-red-500">
      <Text className="font-medium">Failed to load equipment</Text>
      <Text className="text-sm mt-1">Please try refreshing the page</Text>
    </div>
  );
}
