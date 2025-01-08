"use client";

import { useState, useMemo } from "react";
import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";
import { Search } from "lucide-react";
import type { Database } from "~/lib/supabase/types";
import { useItemsForSlot, useItemSearch } from "~/hooks/useItems";
import type { ItemBase } from "~/types/itemTypes";
import { CATEGORY_TO_SLOT } from "~/lib/constants/items";

type Equipment = Database["public"]["Tables"]["equipment"]["Row"];
type EquipmentInsert = Database["public"]["Tables"]["equipment"]["Insert"];
type EquipmentSlot = Database["public"]["Enums"]["equipment_slot"];
type ItemRarity = "Normal" | "Magic" | "Rare" | "Unique";

interface EquipmentFormProps {
  buildId: string;
  initialEquipment?: Partial<Equipment>;
  onSubmit: (equipment: EquipmentInsert) => Promise<void>;
}

export function EquipmentForm({ buildId, initialEquipment, onSubmit }: EquipmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [name, setName] = useState(initialEquipment?.name || "");
  const [slot, setSlot] = useState<EquipmentSlot>(initialEquipment?.slot || "mainhand");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<ItemBase | null>(null);
  const { data: slotItems = [] } = useItemsForSlot(slot);
  const { data: searchResults = [] } = useItemSearch(searchQuery);

  const filteredItems = useMemo(() => {
    if (searchQuery) {
      return searchResults.filter(item => {
        const mappedSlot = CATEGORY_TO_SLOT[item.category];
        return mappedSlot === slot;
      });
    }
    return slotItems;
  }, [searchQuery, searchResults, slotItems, slot]);

  const handleItemSelect = (item: ItemBase) => {
    setSelectedItem(item);
    setName(item.name);
    setBaseType(item.category);
    setTypeLine(item.name);
    if (item.requirements?.level) {
      setItemLevel(item.requirements.level.toString());
    }
  };

  const [baseType, setBaseType] = useState(initialEquipment?.base_type || "");
  const [typeLine, setTypeLine] = useState(initialEquipment?.type_line || "");
  const [itemLevel, setItemLevel] = useState(initialEquipment?.item_level?.toString() || "");
  const [rarity, setRarity] = useState<ItemRarity | undefined>(initialEquipment?.rarity);
  const [requirements, setRequirements] = useState<Record<string, number>>(
    (initialEquipment?.requirements as Record<string, number>) || {}
  );
  const [stats, setStats] = useState<Record<string, number>>(
    (initialEquipment?.stats as Record<string, number>) || {}
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slot) return;

    setLoading(true);
    setError(undefined);

    try {
      await onSubmit({
        build_id: buildId,
        name,
        slot,
        base_type: baseType || undefined,
        type_line: typeLine || undefined,
        width: 1, // Default width
        height: 1, // Default height
        rarity,
        identified: true, // Default to identified
        item_level: itemLevel ? parseInt(itemLevel, 10) : undefined,
        requirements: Object.keys(requirements).length ? requirements : undefined,
        stats: Object.keys(stats).length ? stats : undefined,
        influences: {}, // Default empty influences
        properties: [], // Default empty properties
        sockets: [], // Default empty sockets
        implicit_mods: [], // Default empty mods
        explicit_mods: [], // Default empty mods
        crafted_mods: [], // Default empty mods
        corrupted: false, // Default not corrupted
      });
    } catch (err) {
      console.error("Error saving equipment:", err);
      setError("Failed to save equipment");
    } finally {
      setLoading(false);
    }
  };

  const updateRequirement = (stat: string, value: string) => {
    setRequirements((prev) => {
      const newReqs = { ...prev };
      const numValue = value ? parseInt(value, 10) : 0;
      if (numValue > 0) {
        newReqs[stat] = numValue;
      } else {
        delete newReqs[stat];
      }
      return newReqs;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Text className="text-sm text-foreground/60">Item Name</Text>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
            className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
            required
          />
        </div>

        <div className="space-y-2">
          <Text className="text-sm text-foreground/60">Equipment Slot</Text>
          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value as EquipmentSlot)}
            className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
            required
          >
            <option value="mainhand">Main Hand</option>
            <option value="offhand">Off Hand</option>
            <option value="helm">Helm</option>
            <option value="body">Body Armour</option>
            <option value="gloves">Gloves</option>
            <option value="boots">Boots</option>
            <option value="amulet">Amulet</option>
            <option value="ring1">Ring 1</option>
            <option value="ring2">Ring 2</option>
            <option value="belt">Belt</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto border-2 border-border/50 rounded-xl">
            {filteredItems.map((item) => (
              <button
                key={item.url}
                onClick={() => handleItemSelect(item)}
                className={`w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors flex items-center gap-3 ${
                  selectedItem?.url === item.url ? 'bg-accent' : ''
                }`}
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

          <div className="space-y-2">
            <Text className="text-sm text-foreground/60">Base Type</Text>
            <input
              type="text"
              value={baseType}
              onChange={(e) => setBaseType(e.target.value)}
              placeholder="Enter base type"
              className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
            />
          </div>
        </div>

          <div className="space-y-2">
            <Text className="text-sm text-foreground/60">Item Level</Text>
            <input
              type="number"
              value={itemLevel}
              onChange={(e) => setItemLevel(e.target.value)}
              placeholder="Enter item level"
              min="1"
              max="100"
              className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Text className="text-sm text-foreground/60">Rarity</Text>
          <select
            value={rarity || ""}
            onChange={(e) => setRarity((e.target.value as ItemRarity) || undefined)}
            className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
          >
            <option value="">Select Rarity</option>
            <option value="Normal">Normal</option>
            <option value="Magic">Magic</option>
            <option value="Rare">Rare</option>
            <option value="Unique">Unique</option>
          </select>
        </div>

        <div className="space-y-2">
          <Text className="text-sm text-foreground/60">Requirements</Text>
          <div className="grid grid-cols-3 gap-4">
            {["strength", "dexterity", "intelligence"].map((stat) => (
              <div key={stat} className="space-y-1">
                <Text className="text-xs text-foreground/40 capitalize">{stat}</Text>
                <input
                  type="number"
                  value={requirements[stat] || ""}
                  onChange={(e) => updateRequirement(stat, e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full h-10 rounded-lg bg-background/95 border-2 border-border/50 px-3"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5">
          <Text className="text-sm text-destructive">{error}</Text>
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Saving..." : "Save Equipment"}
        </Button>
      </div>
    </form>
  );
}
