"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Tag, DollarSign } from "lucide-react";
import type { Member, Group } from "~/types/gift-list";
import { Card, CardContent } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import { Badge } from "~/components/ui/Badge";
import { Progress } from "~/components/ui/Progress";
import { ActionMenu } from "~/components/groups/ActionMenu";

interface MemberCardProps {
  member: Member;
  group: Group;
  giftCount?: number;
  giftProgress?: number;
  budgetSpent?: number;
  budgetTotal?: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function MemberCard({
  member,
  group,
  giftCount = 0,
  giftProgress = 0,
  budgetSpent = 0,
  budgetTotal = 0,
  onEdit,
  onDelete,
}: MemberCardProps) {
  const budgetProgress = budgetTotal > 0 ? (budgetSpent / budgetTotal) * 100 : 0;

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
              <Link href={`/groups/${group.slug}/members/${member.slug}`} className="flex-1">
                <Text variant="h3" className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {member.name}
                </Text>
              </Link>
              {(onEdit || onDelete) && (
                <ActionMenu onEdit={onEdit} onDelete={onDelete} />
              )}
            </div>

            {member.notes && (
              <Text className="text-foreground-secondary line-clamp-2 text-sm">
                {member.notes}
              </Text>
            )}

            {member.tags && member.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {member.tags.map((tag) => (
                  <Badge 
                    key={`${member.id}-${tag}`} 
                    variant="secondary" 
                    size="sm"
                    className="bg-background-secondary/50 h-5 inline-flex items-center text-xs"
                    icon={<Tag className="w-3 h-3 mr-0.5" />}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 mt-3 border-t border-border/50 space-y-3">
            {/* Gift Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Gift className="w-4 h-4 text-primary/60" />
                  <Text className="text-sm">
                    {giftCount} {giftCount === 1 ? "Gift" : "Gifts"}
                  </Text>
                </div>
                {giftCount > 0 && (
                  <Badge 
                    variant="outline" 
                    color={giftProgress === 100 ? "success" : "primary"}
                    size="sm"
                    className="h-5 inline-flex items-center text-xs"
                  >
                    {Math.round(giftProgress)}% Complete
                  </Badge>
                )}
              </div>
              {giftCount > 0 && (
                <Progress 
                  value={giftProgress} 
                  size="sm"
                  variant={giftProgress === 100 ? "default" : "gradient"}
                />
              )}
            </div>

            {/* Budget Progress */}
            {budgetTotal > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-primary/60" />
                    <Text className="text-sm">
                      ${budgetSpent.toFixed(2)} / ${budgetTotal.toFixed(2)}
                    </Text>
                  </div>
                  <Badge 
                    variant="outline" 
                    color={budgetProgress > 100 ? "error" : budgetProgress === 100 ? "success" : "primary"}
                    size="sm"
                    className="h-5 inline-flex items-center text-xs"
                  >
                    {Math.round(budgetProgress)}% Used
                  </Badge>
                </div>
                <Progress 
                  value={Math.min(budgetProgress, 100)} 
                  size="sm"
                  variant={budgetProgress === 100 ? "default" : "gradient"}
                  color={budgetProgress > 100 ? "error" : "primary"}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
