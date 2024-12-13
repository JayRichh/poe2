"use client";

import { motion } from "framer-motion";
import type { Group } from "~/types/gift-list";
import { GroupCard } from "./GroupCard";

interface GroupListProps {
  groups: Group[];
  memberCounts?: Record<string, number>;
  giftCounts?: Record<string, number>;
  spentAmounts?: Record<string, number>;
  onEditGroup?: (group: Group) => void;
  onDeleteGroup?: (group: Group) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function GroupList({
  groups,
  memberCounts = {},
  giftCounts = {},
  spentAmounts = {},
  onEditGroup,
  onDeleteGroup
}: GroupListProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
    >
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          memberCount={memberCounts[group.id] || 0}
          giftCount={giftCounts[group.id] || 0}
          spentAmount={spentAmounts[group.id] || 0}
          onEdit={onEditGroup ? () => onEditGroup(group) : undefined}
          onDelete={onDeleteGroup ? () => onDeleteGroup(group) : undefined}
        />
      ))}
    </motion.div>
  );
}
