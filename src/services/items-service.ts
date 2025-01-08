import { CATEGORY_TO_SLOT } from "~/lib/constants/items";
import type { EquipmentSlot } from "~/lib/supabase/types";
import type { AllItemData, ItemBase, ItemCategory, ItemModifier } from "~/types/itemTypes";

class ItemsService {
  private static instance: ItemsService;
  private itemsData: AllItemData | null = null;
  private itemsBySlot: Map<EquipmentSlot, ItemBase[]> = new Map();
  private modifiersByCategory: Map<string, ItemModifier[]> = new Map();
  private categoriesByGroup: Map<string, string[]> = new Map();

  private constructor() {}

  static getInstance(): ItemsService {
    if (!ItemsService.instance) {
      ItemsService.instance = new ItemsService();
    }
    return ItemsService.instance;
  }

  async initialize() {
    if (this.itemsData) return;

    try {
      const response = await fetch("/data/items.json");
      this.itemsData = await response.json();
      this.indexData();
    } catch (error) {
      console.error("Failed to load items data:", error);
      throw error;
    }
  }

  private indexData() {
    if (!this.itemsData) return;

    // Reset indexes
    this.itemsBySlot.clear();
    this.modifiersByCategory.clear();
    this.categoriesByGroup.clear();

    // Index all data
    for (const [groupName, categories] of Object.entries(this.itemsData as AllItemData)) {
      const categoryNames = Object.keys(categories);
      this.categoriesByGroup.set(groupName, categoryNames);

      for (const [categoryName, category] of Object.entries(categories)) {
        const typedCategory = category as ItemCategory;

        // Index modifiers
        if (typedCategory.modifiers) {
          this.modifiersByCategory.set(categoryName, typedCategory.modifiers);
        }

        // Index items by equipment slot
        const slot = CATEGORY_TO_SLOT[categoryName];
        if (slot) {
          console.log(
            `Indexing ${typedCategory.items.length} items from ${categoryName} to slot ${slot}`
          );
          const existingItems = this.itemsBySlot.get(slot) || [];
          // Create a Set of existing URLs for O(1) lookup
          const existingUrls = new Set(existingItems.map((item) => item.url));
          // Only add items that don't already exist in the slot
          const newItems = typedCategory.items.filter((item) => !existingUrls.has(item.url));
          this.itemsBySlot.set(slot, [...existingItems, ...newItems]);
        }
      }
    }

    // Log indexed data summary
    console.log("\nIndexed Items Summary:");
    this.itemsBySlot.forEach((items, slot) => {
      console.log(`${slot}: ${items.length} items`);
    });
    console.log("\nAvailable Categories by Group:");
    this.categoriesByGroup.forEach((categories, group) => {
      console.log(`${group}: ${categories.join(", ")}`);
    });
  }

  private normalizeCategory(category: string): string {
    // Convert spaces to underscores and handle other normalizations
    return category.replace(/\s+/g, "_");
  }

  searchItems(query: string): ItemBase[] {
    if (!query.trim()) return [];

    console.log("Searching items with query:", query);
    console.log("Available categories:", Array.from(this.categoriesByGroup.keys()));
    console.log(
      "Items by slot:",
      Array.from(this.itemsBySlot.entries()).map(
        ([slot, items]) => `${slot}: ${items.length} items`
      )
    );

    const searchRegex = new RegExp(query, "i");
    const results: ItemBase[] = [];

    // Search in all slots
    this.itemsBySlot.forEach((items, slot) => {
      items.forEach((item) => {
        const matches =
          searchRegex.test(item.name) ||
          searchRegex.test(item.category) ||
          (item.modifiers && item.modifiers.some((mod: string) => searchRegex.test(mod))) ||
          (item.description && searchRegex.test(item.description)) ||
          (item.grantedSkill &&
            (searchRegex.test(item.grantedSkill.name) ||
              (item.grantedSkill.description &&
                searchRegex.test(item.grantedSkill.description)))) ||
          (item.tabSource && searchRegex.test(item.tabSource));

        if (matches) {
          console.log("Found matching item:", item.name, "in slot:", slot);
          results.push(item);
        }
      });
    });

    console.log("Search results count:", results.length);
    return results;
  }

  getItemsForSlot(slot: EquipmentSlot): ItemBase[] {
    return this.itemsBySlot.get(slot) || [];
  }

  getModifiersForCategory(category: string): ItemModifier[] {
    return this.modifiersByCategory.get(category) || [];
  }

  getCategoriesForGroup(group: string): string[] {
    return this.categoriesByGroup.get(group) || [];
  }

  getItemByUrl(url: string): ItemBase | null {
    for (const items of this.itemsBySlot.values()) {
      const item = items.find((i) => i.url === url);
      if (item) return item;
    }
    return null;
  }
}

export const itemsService = ItemsService.getInstance();
