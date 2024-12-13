"use client";

import { motion } from "framer-motion";
import { Tag, DollarSign } from "lucide-react";
import type { Gift } from "~/types/gift-list";
import { Card, CardContent } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import { Badge } from "~/components/ui/Badge";
import { ActionMenu } from "~/components/groups/ActionMenu";
import { Select } from "~/components/ui/Select";

const statusColors = {
  planned: "primary",
  purchased: "warning",
  delivered: "success",
} as const;

const statusOptions = [
  { label: "Planned", value: "planned" },
  { label: "Purchased", value: "purchased" },
  { label: "Delivered", value: "delivered" },
];

interface GiftCardProps {
  gift: Gift;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: (status: Gift["status"]) => void;
}

export function GiftCard({
  gift,
  onEdit,
  onDelete,
  onStatusChange,
}: GiftCardProps) {
  const handleStatusChange = (value: string) => {
    if (onStatusChange && (value === "planned" || value === "purchased" || value === "delivered")) {
      onStatusChange(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
    >
      <Card className="group hover:border-primary/20 transition-colors duration-200 h-full w-full p-2">
        <CardContent className="flex flex-col h-full">
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <Text variant="h3" className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {gift.name}
                </Text>
              </div>
              {(onEdit || onDelete) && (
                <ActionMenu onEdit={onEdit} onDelete={onDelete} />
              )}
            </div>

            {gift.notes && (
              <Text className="text-foreground-secondary line-clamp-2 text-sm">
                {gift.notes}
              </Text>
            )}

            {gift.tags && gift.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {gift.tags.map((tag, index) => (
                  <Badge 
                    key={`${gift.id}-${tag}-${index}`} 
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

          <div className="pt-3 mt-3 border-t border-border/50">
              <div className="flex items-start justify-between p-2">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-primary/60 -mr-1" />
                  <Text className="text-md">
                    {gift.cost.toFixed(2)}
                  </Text>
                </div>
                {gift.priority && (
                  <Badge
                    variant="outline"
                    size="sm"
                    color={gift.priority > 3 ? "error" : "primary"}
                    className="h-5 inline-flex items-center text-xs"
                  >
                    P{gift.priority} {gift.priority > 3 ? "High" : gift.priority > 1 ? "Med" : "Low"}
                  </Badge>
                )}
              </div>
              {onStatusChange ? (
                <Select
                  value={gift.status}
                  onChange={handleStatusChange}
                  options={statusOptions}
                  className="w-full mt-2"

                />
              ) : (
                <Badge
                  color={statusColors[gift.status]}
                  variant="solid"
                  className="h-5 inline-flex items-center text-xs"
                >
                  {gift.status.charAt(0).toUpperCase() + gift.status.slice(1)}
                </Badge>
              )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
