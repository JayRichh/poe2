import { useEffect, useState } from "react";

import type { EquipmentSlot } from "~/lib/supabase/types";
import { itemsService } from "~/services/items-service";
import type { ItemBase } from "~/types/itemTypes";

export function useRandomItems(count: number = 15) {
  const [topItems, setTopItems] = useState<ItemBase[]>([]);
  const [bottomItems, setBottomItems] = useState<ItemBase[]>([]);

  useEffect(() => {
    const initializeItems = async () => {
      await itemsService.initialize();

      // Get all items from different slots
      const slots: EquipmentSlot[] = [
        "mainhand",
        "offhand",
        "body",
        "helm",
        "gloves",
        "boots",
        "amulet",
        "ring1",
        "ring2",
      ];
      const allItems: ItemBase[] = [];

      for (const slot of slots) {
        const items = itemsService.getItemsForSlot(slot);
        if (items?.length) {
          // Take a few random items from each slot
          const randomItems = items
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.ceil(count / slots.length));
          allItems.push(...randomItems);
        }
      }

      // Ensure we have enough items for both rows
      const requiredItems = count * 2;
      while (allItems.length < requiredItems) {
        const moreItems = [...allItems];
        allItems.push(...moreItems);
      }

      // Shuffle all items
      const shuffled = allItems.sort(() => Math.random() - 0.5);

      // Split items evenly between top and bottom
      setTopItems(shuffled.slice(0, count));
      setBottomItems(shuffled.slice(count, count * 2));
    };

    initializeItems();
  }, [count]);

  return { topItems, bottomItems };
}
