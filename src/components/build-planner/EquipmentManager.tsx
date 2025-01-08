"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import { Button } from "~/components/ui/Button";
import { Select } from "~/components/ui/Select";
import { Plus, Save, AlertCircle, Search } from "lucide-react";
import { EquipmentItemSelector } from "./EquipmentItemSelector";
import type { ItemBase } from "~/types/itemTypes";
import type { Database, Json, EquipmentSlot, ItemRarity } from "~/lib/supabase/types";
import { useEquipmentManager } from "~/contexts/build";
import { 
  type PropertyJson, 
  type SocketJson, 
  type InfluenceJson,
  type RequirementJson,
  isPropertyJson,
  isSocketJson,
  isInfluenceJson,
  formatPropertyDisplay
} from "~/types/equipment";
import {
  EQUIPMENT_DEFAULTS,
  RARITY_COLORS,
  getQuickModsForSlot,
  MAX_SOCKETS,
  MAX_SOCKET_GROUPS
} from "~/lib/constants/equipment";

import type { EquipmentWithUrl } from "~/types/equipment";
type Equipment = EquipmentWithUrl;

interface EquipmentManagerProps {
  buildId: string;
  canModify: boolean;
}

type InfluenceType = typeof INFLUENCE_TYPES[number];

const INFLUENCE_TYPES = [
  "None",
  "Shaper",
  "Elder",
  "Crusader",
  "Redeemer",
  "Hunter",
  "Warlord"
] as const;

const SOCKET_COLORS = ["R", "G", "B", "W", "A", "DV"] as const;

const EQUIPMENT_SLOTS: Array<{ value: EquipmentSlot; label: string; defaultMods?: string[] }> = [
  { 
    value: "mainhand", 
    label: "Main Hand",
    defaultMods: ["+10% Physical Damage", "+5 to Weapon Range"]
  },
  { 
    value: "offhand", 
    label: "Off Hand",
    defaultMods: ["+5% Block Chance", "+10% Physical Damage"]
  },
  { 
    value: "helm", 
    label: "Helm",
    defaultMods: ["+30 to maximum Life", "+20% to Fire Resistance"]
  },
  { 
    value: "body", 
    label: "Body Armor",
    defaultMods: ["+50 to maximum Life", "+10% to all Elemental Resistances"]
  },
  { 
    value: "gloves", 
    label: "Gloves",
    defaultMods: ["+20 to maximum Life", "+15% increased Attack Speed"]
  },
  { 
    value: "boots", 
    label: "Boots",
    defaultMods: ["+20 to maximum Life", "20% increased Movement Speed"]
  },
  { 
    value: "amulet", 
    label: "Amulet",
    defaultMods: ["+20 to all Attributes", "+15% to all Elemental Resistances"]
  },
  { 
    value: "ring1", 
    label: "Ring 1",
    defaultMods: ["+15 to all Attributes", "+10% to all Elemental Resistances"]
  },
  { 
    value: "ring2", 
    label: "Ring 2",
    defaultMods: ["+15 to all Attributes", "+10% to all Elemental Resistances"]
  },
  { 
    value: "belt", 
    label: "Belt",
    defaultMods: ["+25 to maximum Life", "+15% to all Elemental Resistances"]
  }
];

const ITEM_RARITIES: Array<{ value: ItemRarity; label: string }> = [
  { value: "Normal", label: "Normal" },
  { value: "Magic", label: "Magic" },
  { value: "Rare", label: "Rare" },
  { value: "Unique", label: "Unique" }
];

export function EquipmentManager({ buildId, canModify }: EquipmentManagerProps) {
  const { equipment, isDirty, updateEquipment: setEquipmentState, saveBuild } = useEquipmentManager();
  const [activeSet, setActiveSet] = useState("default");
  const [equipmentSets, setEquipmentSets] = useState<EquipmentWithUrl[]>(equipment as EquipmentWithUrl[]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setEquipmentSets(equipment);
  }, [equipment]);

  const validateSet = (set: Equipment): string[] => {
    const errors: string[] = [];
    
    if (!set.name?.trim()) {
      errors.push("Name is required");
    }
    if (!set.slot) {
      errors.push("Slot is required");
    }
    if (!set.base_type?.trim()) {
      errors.push("Base type is required");
    }
    
    return errors;
  };

  const handleAddSet = () => {
    if (!canModify) return;

    const defaults = EQUIPMENT_DEFAULTS[EQUIPMENT_SLOTS[0].value];
    const newSet: EquipmentWithUrl = {
      id: uuidv4(),
      build_id: buildId,
      name: `Set ${equipmentSets.length + 1}`,
      slot: EQUIPMENT_SLOTS[0].value,
      base_type: defaults.base_type,
      type_line: defaults.type_line,
      width: 1,
      height: 1,
      icon: '',
      rarity: "Normal",
      identified: true,
      corrupted: false,
      item_level: 1,
      sockets: [],
      properties: [
        { 
          name: "quality", 
          value: 0, 
          display: "0%",
          type: "quality"
        } as PropertyJson,
        ...defaults.properties.map(prop => ({
          ...prop,
          type: prop.name
        })) as PropertyJson[]
      ] as Json[],
      requirements: defaults.requirements.map(req => ({
        name: req.name,
        value: req.value,
        display: req.name === 'level' ? `Level ${req.value}` : `${req.value} ${req.name.toUpperCase()}`
      })) as RequirementJson[],
      implicit_mods: defaults.implicitMods,
      explicit_mods: [],
      crafted_mods: [],
      influences: null,
      frame_type: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const validationErrors = validateSet(newSet);
    if (validationErrors.length > 0) {
      setErrors({ [newSet.id]: validationErrors.join(", ") });
      return;
    }

    const updatedSets = [...equipmentSets, newSet];
    setEquipmentSets(updatedSets);
    setEquipmentState(updatedSets as Equipment[]);
    setErrors({});
  };

  const handleUpdateSet = (setId: string, updates: Partial<Equipment>) => {
    if (!canModify) return;

    const updatedSets = equipmentSets.map(set => {
      if (set.id === setId) {
        const newSet = { 
          ...set,
          ...updates,
          updated_at: new Date().toISOString()
        };

        // Validate the updated set
        const validationErrors = validateSet(newSet);
        if (validationErrors.length > 0) {
          setErrors({ [newSet.id]: validationErrors.join(", ") });
          return set; // Return original set if validation fails
        }

        // Ensure properties are properly formatted
        if (updates.properties) {
          newSet.properties = updates.properties.map((p: any) => {
            if (isPropertyJson(p)) {
              return {
                ...p,
                display: formatPropertyDisplay(p),
                type: p.name // Ensure type is set
              } as Json;
            }
            return p;
          });
        }

        // Ensure influences is properly formatted
        if ('influences' in updates) {
          newSet.influences = updates.influences === null || 
            (typeof updates.influences === 'object' && Object.keys(updates.influences).length === 0)
            ? null 
            : updates.influences;
        }

        return newSet;
      }
      return set;
    });
    
    setEquipmentSets(updatedSets);
    setEquipmentState(updatedSets as Equipment[]);
    setErrors({});
  };

  const handleSlotChange = (setId: string, slot: EquipmentSlot) => {
    if (!canModify) return;

    const defaults = EQUIPMENT_DEFAULTS[slot];
    const currentSet = equipmentSets.find(s => s.id === setId);
    if (!currentSet) return;

    handleUpdateSet(setId, {
      slot,
      base_type: defaults.base_type,
      type_line: defaults.type_line,
      // Keep quality property but update other properties based on slot
      properties: [
        ...(currentSet.properties || []).filter((p: Json) => 
          isPropertyJson(p) && p.name === 'quality'
        ),
        ...defaults.properties.map(prop => ({
          ...prop,
          type: prop.name
        })) as PropertyJson[]
      ] as Json[],
      requirements: defaults.requirements.map(req => ({
        name: req.name,
        value: req.value,
        display: req.name === 'level' ? `Level ${req.value}` : `${req.value} ${req.name.toUpperCase()}`
      })) as RequirementJson[],
      implicit_mods: defaults.implicitMods,
      explicit_mods: [],
      // Reset mods when changing slots
      crafted_mods: []
    });
  };

  const handleSave = async () => {
    if (!canModify) return;

    // Validate all sets before saving
    let hasErrors = false;
    const allErrors: Record<string, string> = {};
    
    equipmentSets.forEach(set => {
      const validationErrors = validateSet(set);
      if (validationErrors.length > 0) {
        hasErrors = true;
        allErrors[set.id] = validationErrors.join(", ");
      }
    });

    if (hasErrors) {
      setErrors(allErrors);
      return;
    }

    try {
      await saveBuild();
      setErrors({});
    } catch (error) {
      console.error('Failed to save equipment:', error);
      setErrors({ save: 'Failed to save changes. Please try again.' });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Text className="text-xl font-semibold">Equipment Sets</Text>
        <div className="flex gap-2">
          {isDirty && (
            <Button
              variant="default"
              onClick={handleSave}
              disabled={!canModify}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleAddSet}
            disabled={!canModify || equipmentSets.length >= 3}
          >
            Add Set
          </Button>
        </div>
      </div>

      {errors.save && (
        <div className="mb-4 p-3 rounded bg-red-500/10 text-red-500 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {errors.save}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        {equipmentSets.map((set) => (
          <Button
            key={set.id}
            variant={activeSet === set.id ? "default" : "outline"}
            onClick={() => setActiveSet(set.id)}
          >
            {set.name}
            {errors[set.id] && (
              <AlertCircle className="h-4 w-4 ml-2 text-red-500" />
            )}
          </Button>
        ))}
      </div>

      {equipmentSets.map((set) => (
        <div 
          key={set.id}
          className={activeSet === set.id ? "block" : "hidden"}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border/50 bg-background/95">
                <Text className="text-sm text-foreground/60 mb-2">
                  Name {errors.name && <span className="text-red-500">*</span>}
                </Text>
                <input
                  type="text"
                  value={set.name}
                  onChange={(e) => handleUpdateSet(set.id, { name: e.target.value })}
                  disabled={!canModify}
                  className={`w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-border/50'} bg-background ${!canModify ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {errors.name && (
                  <Text className="text-sm text-red-500 mt-1">{errors.name}</Text>
                )}
              </div>
              <div className="p-4 rounded-lg border border-border/50 bg-background/95">
                <Text className="text-sm text-foreground/60 mb-2">
                  Slot {errors.slot && <span className="text-red-500">*</span>}
                </Text>
                <Select
                  value={set.slot}
                  onChange={(value) => handleSlotChange(set.id, value as EquipmentSlot)}
                  options={EQUIPMENT_SLOTS}
                  placeholder="Select slot"
                  disabled={!canModify}
                />
                {errors.slot && (
                  <Text className="text-sm text-red-500 mt-1">{errors.slot}</Text>
                )}
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border/50 bg-background/95">
              <Text className="text-sm text-foreground/60 mb-4">
                Select Item
              </Text>
              <EquipmentItemSelector
                slot={set.slot}
                selectedItemUrl={set.url}
                onItemSelect={(item) => {
                  handleUpdateSet(set.id, {
                    name: item.name,
                    base_type: item.category,
                    type_line: item.name,
                    icon: item.icon,
                    url: item.url,
                    item_level: item.requirements?.level || 1,
                    requirements: item.requirements ? [
                      {
                        name: "level",
                        value: item.requirements.level || 1,
                        display: `Level ${item.requirements.level || 1}`
                      }
                    ] as RequirementJson[] : [],
                    implicit_mods: item.modifiers || [],
                    explicit_mods: [],
                    crafted_mods: []
                  });
                }}
                disabled={!canModify}
              />
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}
