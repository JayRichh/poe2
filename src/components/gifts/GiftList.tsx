"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import type { Gift, GiftStatus } from "~/types/gift-list";
import { GiftCard } from "./GiftCard";
import { Button } from "~/components/ui/Button";
import { Select } from "~/components/ui/Select";
import { Badge } from "~/components/ui/Badge";
import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import { cn } from "~/utils/cn";

interface GiftListProps {
  gifts: Gift[];
  onEditGift?: (gift: Gift) => void;
  onDeleteGift?: (gift: Gift) => void;
  onStatusChange?: (gift: Gift, status: GiftStatus) => void;
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

const statusOptions = [
  { label: "All Statuses", value: "all" },
  { label: "Planned", value: "planned" },
  { label: "Purchased", value: "purchased" },
  { label: "Delivered", value: "delivered" },
];

export function GiftList({
  gifts,
  onEditGift,
  onDeleteGift,
  onStatusChange,
}: GiftListProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Get unique tags from all gifts
  const allTags = Array.from(
    new Set(gifts.flatMap(gift => gift.tags ?? []))
  ).sort();

  // Filter gifts based on status and tags
  const filteredGifts = gifts.filter(gift => {
    const matchesStatus = statusFilter === "all" || gift.status === statusFilter;
    const matchesTags = selectedTags.length === 0 || 
      (gift.tags && selectedTags.every(tag => gift.tags?.includes(tag)));
    return matchesStatus && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setSelectedTags([]);
  };

  const hasActiveFilters = statusFilter !== "all" || selectedTags.length > 0;

  return (
    <div className="space-y-8">
      {/* Filters */}
      <Card className="p-6 bg-background/80 backdrop-blur-sm">
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <Text className="font-medium">Filters</Text>
            </div>
            {hasActiveFilters && (
              <Badge variant="outline" size="sm" className="ml-2">
                {filteredGifts.length} of {gifts.length}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="sm:hidden"
          >
            {isFilterExpanded ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Filter Content */}
        <div className={cn(
          "space-y-6",
          !isFilterExpanded && "hidden sm:block"
        )}>
          {/* Status and Clear Filters */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-full sm:w-48">
              <Select
                value={statusFilter}
                onChange={value => setStatusFilter(value)}
                options={statusOptions}
                className="w-full"
                placeholder="Filter by status"
              />
            </div>

            {hasActiveFilters && (
              <Button
                variant="secondary"
                size="sm"
                onClick={clearFilters}
                className="w-full sm:w-auto"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="space-y-2">
              <Text className="text-sm font-medium text-foreground-secondary">
                Filter by Tags
              </Text>
              <div className="flex flex-wrap gap-2 max-w-2xl">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 rounded-full"
                  >
                    <Badge
                      variant={selectedTags.includes(tag) ? "solid" : "secondary"}
                      className="cursor-pointer hover:bg-background-secondary/80"
                    >
                      {tag}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Gift Grid */}
      {filteredGifts.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onEdit={onEditGift ? () => onEditGift(gift) : undefined}
              onDelete={onDeleteGift ? () => onDeleteGift(gift) : undefined}
              onStatusChange={
                onStatusChange
                  ? (status) => onStatusChange(gift, status)
                  : undefined
              }
            />
          ))}
        </motion.div>
      ) : (
        <Card className="bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Text className="text-foreground-secondary text-lg">
              {gifts.length === 0
                ? "No gifts added yet."
                : "No gifts match the selected filters."}
            </Text>
            {gifts.length > 0 && hasActiveFilters && (
              <Button
                variant="secondary"
                size="sm"
                onClick={clearFilters}
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
