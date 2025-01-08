"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Text } from "~/components/ui/Text";
import { useItemsForSlot, useItemSearch } from "~/hooks/useItems";
import type { ItemBase } from "~/types/itemTypes";
import type { EquipmentSlot } from "~/lib/supabase/types";
import { CATEGORY_TO_SLOT } from "~/lib/constants/items";

interface EquipmentItemSelectorProps {
  slot: EquipmentSlot;
  onItemSelect: (item: ItemBase) => void;
  selectedItemUrl?: string;
  disabled?: boolean;
}

export function EquipmentItemSelector({
  slot,
  onItemSelect,
  selectedItemUrl,
  disabled
}: EquipmentItemSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: slotItems = [] } = useItemsForSlot(slot);
  const { data: searchResults = [] } = useItemSearch(searchQuery);

  const filteredItems = searchQuery
    ? searchResults.filter(item => {
        const mappedSlot = CATEGORY_TO_SLOT[item.category];
        return mappedSlot === slot;
      })
    : slotItems;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Text className="text-sm text-foreground/60 mb-2">Search Items</Text>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for items..."
            className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 pl-10 pr-4"
            disabled={disabled}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
        </div>
      </div>

      <div className="max-h-60 overflow-y-auto border-2 border-border/50 rounded-xl">
        {filteredItems.map((item) => (
          <button
            key={item.url}
            onClick={() => onItemSelect(item as ItemBase)}
            disabled={disabled}
            className={`w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors flex items-center gap-3 ${
              selectedItemUrl === item.url ? 'bg-accent' : ''
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <img src={item.icon} alt="" className="w-8 h-8" />
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-foreground/60">{item.category}</div>
            </div>
          </button>
        ))}
        {filteredItems.length === 0 && (
          <div className="px-4 py-3 text-foreground/60 text-center">
            No items found
          </div>
        )}
      </div>
    </div>
  );
}
