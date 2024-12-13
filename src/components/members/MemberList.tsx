"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Filter, Users } from "lucide-react";
import type { Member, Group } from "~/types/gift-list";
import { MemberCard } from "./MemberCard";
import { useGifts } from "~/hooks/gift-list";
import { Card } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";
import { Select } from "~/components/ui/Select";

interface MemberListProps {
  members: Member[];
  group: Group;
  onEditMember?: (member: Member) => void;
  onDeleteMember?: (member: Member) => void;
}

const progressOptions = [
  { label: "All Members", value: "all" },
  { label: "No Gifts", value: "none" },
  { label: "In Progress", value: "progress" },
  { label: "Completed", value: "completed" },
];

export function MemberList({
  members,
  group,
  onEditMember,
  onDeleteMember
}: MemberListProps) {
  const [progressFilter, setProgressFilter] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { gifts } = useGifts();

  // Calculate member stats
  const memberStats = members.reduce((acc, member) => {
    const memberGifts = gifts.filter(gift => gift.memberId === member.id);
    const completedGifts = memberGifts.filter(gift => gift.status === "delivered");
    const progress = memberGifts.length > 0
      ? (completedGifts.length / memberGifts.length) * 100
      : 0;

    acc[member.id] = {
      giftCount: memberGifts.length,
      giftProgress: progress
    };
    return acc;
  }, {} as Record<string, { giftCount: number; giftProgress: number }>);

  // Get unique tags
  const allTags = Array.from(
    new Set(members.flatMap(member => member.tags ?? []))
  ).sort();

  // Filter members
  const filteredMembers = members.filter(member => {
    const stats = memberStats[member.id];
    const matchesProgress = progressFilter === "all" ||
      (progressFilter === "none" && stats.giftCount === 0) ||
      (progressFilter === "progress" && stats.giftProgress < 100 && stats.giftCount > 0) ||
      (progressFilter === "completed" && stats.giftProgress === 100);

    const matchesTag = !selectedTag || 
      (member.tags && member.tags.includes(selectedTag));

    return matchesProgress && matchesTag;
  });

  // Calculate aggregated stats
  const totalGifts = Object.values(memberStats).reduce((sum, stats) => sum + stats.giftCount, 0);
  const completedMembers = Object.values(memberStats).filter(stats => stats.giftProgress === 100).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-background-secondary/30 rounded-lg border border-border/50">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary/60" />
          <Select
            value={progressFilter}
            onChange={value => setProgressFilter(value)}
            options={progressOptions}
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex items-center gap-2 ml-2">
            <div className="flex gap-1.5">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className="focus:outline-none"
                >
                  <Badge
                    variant={selectedTag === tag ? "solid" : "secondary"}
                    className="hover:bg-background-secondary/80"
                  >
                    {tag}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="ml-auto flex items-center gap-4 pl-4 border-l border-border/50">
          <Badge variant="outline" size="sm">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            {filteredMembers.length} / {members.length}
          </Badge>
          {totalGifts > 0 && (
            <Badge variant="outline" size="sm" color="primary">
              {completedMembers} completed
            </Badge>
          )}
        </div>
      </div>

      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              group={group}
              giftCount={memberStats[member.id]?.giftCount || 0}
              giftProgress={memberStats[member.id]?.giftProgress || 0}
              onEdit={onEditMember ? () => onEditMember(member) : undefined}
              onDelete={onDeleteMember ? () => onDeleteMember(member) : undefined}
            />
          ))}
        </div>
      ) : (
        <Card>
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Users className="w-12 h-12 text-foreground-secondary/50 mb-4" />
            <div className="text-foreground-secondary text-lg">
              {members.length === 0
                ? "No members added yet."
                : "No members match the selected filters."}
            </div>
            {members.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setProgressFilter("all");
                  setSelectedTag(null);
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
