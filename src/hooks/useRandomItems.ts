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
      let allItems: ItemBase[] = [];

      for (const slot of slots) {
        const items = itemsService.getItemsForSlot(slot);
        if (items?.length) {
          // Take more items initially to account for potential invalid images
          const randomItems = items
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.ceil((count * 2) / slots.length));
          allItems.push(...randomItems);
        }
      }

      // Shuffle all items
      allItems = allItems.sort(() => Math.random() - 0.5);

      // Split items evenly between top and bottom
      setTopItems(allItems.slice(0, count));
      setBottomItems(allItems.slice(count, count * 2));
    };

    initializeItems();
  }, [count]);

  return { topItems, bottomItems };
}
