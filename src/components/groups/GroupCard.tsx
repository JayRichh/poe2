"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Users } from "lucide-react";
import type { Group } from "~/types/gift-list";
import { Card, CardContent } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import { Badge } from "~/components/ui/Badge";
import { Progress } from "~/components/ui/Progress";
import { ActionMenu } from "./ActionMenu";

interface GroupCardProps {
  group: Group;
  memberCount?: number;
  giftCount?: number;
  spentAmount?: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function GroupCard({
  group,
  memberCount = 0,
  giftCount = 0,
  spentAmount = 0,
  onEdit,
  onDelete,
}: GroupCardProps) {
  const progress = group.budget ? (spentAmount / group.budget) * 100 : 0;
  const isOverBudget = progress > 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
    >
      <Card className="group hover:border-primary/20 transition-colors duration-200 h-full w-full p-2">
        <CardContent className="flex flex-col h-full">
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <Link href={`/groups/${group.slug}`} className="flex-1">
                <Text variant="h3" className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {group.name}
                </Text>
              </Link>
              {(onEdit || onDelete) && (
                <ActionMenu onEdit={onEdit} onDelete={onDelete} />
              )}
            </div>

            {group.description && (
              <Text className="text-foreground-secondary line-clamp-2 text-sm">
                {group.description}
              </Text>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-primary/60" />
                <Text className="text-sm">
                  {memberCount} {memberCount === 1 ? "Member" : "Members"}
                </Text>
              </div>
              <div className="flex items-center gap-1">
                <Gift className="w-4 h-4 text-primary/60" />
                <Text className="text-sm">
                  {giftCount} {giftCount === 1 ? "Gift" : "Gifts"}
                </Text>
              </div>
            </div>
          </div>

          {group.budget && (
            <div className="pt-3 mt-3 border-t border-border/50">
              <div className="flex items-center justify-between">
                <Text className="text-sm">Budget Progress</Text>
                <Badge 
                  color={isOverBudget ? "error" : "primary"} 
                  variant={isOverBudget ? "solid" : "outline"}
                  size="sm"
                  className="h-5 inline-flex items-center text-xs"
                >
                  ${spentAmount.toFixed(2)} / ${group.budget.toFixed(2)}
                </Badge>
              </div>
              <Progress 
                value={Math.min(progress, 100)} 
                variant={isOverBudget ? "striped" : "default"}
                color={isOverBudget ? "error" : "primary"}
                size="sm"
                className="mt-2"
              />
              {isOverBudget && (
                <Text className="text-xs text-error mt-1">
                  Over budget by ${(spentAmount - group.budget).toFixed(2)}
                </Text>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
