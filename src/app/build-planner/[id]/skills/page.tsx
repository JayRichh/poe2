"use client";

import { Suspense } from "react";
import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import { SkillGemManager } from "~/components/build-planner/SkillGemManager";
import { useBuild } from "~/contexts/build";
import { useAuth } from "~/contexts/auth";
import { createSkillGem, updateSkillGem, deleteSkillGem } from "~/app/actions/server/skill-gems";
import type { SkillGem } from "~/app/actions/server/skill-gems";

export default function SkillsPage() {
  const { user } = useAuth();
  const build = useBuild();
  
  const canModify = Boolean(user && build.user_id === user.id && build.visibility !== 'public');

  const handleSkillGemsUpdate = async (newGems: SkillGem[]) => {
    if (!canModify) return;
    
    try {
      const currentGems = build.skill_gems || [];
      
      // Find gems to delete
      const gemsToDelete = currentGems.filter(
        current => !newGems.find(gem => gem.id === current.id)
      );

      // Find gems to create
      const gemsToCreate = newGems.filter(
        gem => !gem.id || !currentGems.find(current => current.id === gem.id)
      );

      // Find gems to update
      const gemsToUpdate = newGems.filter(
        gem => gem.id && currentGems.find(current => current.id === gem.id)
      );

      // Execute operations
      await Promise.all([
        ...gemsToDelete.map(gem => deleteSkillGem(gem.id, build.id)),
        ...gemsToCreate.map(gem => createSkillGem({ ...gem, build_id: build.id })),
        ...gemsToUpdate.map(gem => updateSkillGem(gem.id, gem))
      ]);

    } catch (error) {
      console.error("Error updating skill gems:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Text className="text-xl font-semibold mb-4">Skill Gems</Text>
        <Text className="text-foreground/60 mb-6">
          Configure your build&apos;s skill gems and socket links
        </Text>

        <Suspense
          fallback={
            <div className="h-48 animate-pulse rounded-xl bg-foreground/5" />
          }
        >
          <SkillGemManager
            buildId={build.id}
            gems={build.skill_gems}
            onUpdate={handleSkillGemsUpdate}
          />
        </Suspense>
      </Card>
    </div>
  );
}
