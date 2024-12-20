import { createClient } from "~/lib/supabase/client";
import type { Database } from "~/lib/supabase/types";

type VisibilityType = Database["public"]["Enums"]["visibility_type"];
type EquipmentSlot = Database["public"]["Enums"]["equipment_slot"];
type GemType = Database["public"]["Enums"]["gem_type"];

const DEMO_BUILDS = [
  {
    name: "Cyclone Slayer",
    description: "A classic melee build using Cyclone skill",
    poe_class: "duelist",
    level: 90,
    visibility: "public" as VisibilityType,
    equipment: [
      {
        slot: "mainhand" as EquipmentSlot,
        name: "Starforge",
        base_type: "Infernal Sword",
        item_level: 80,
        requirements: { strength: 158, dexterity: 113 },
        stats: { physical_dps: 750 },
      },
      {
        slot: "body" as EquipmentSlot,
        name: "Belly of the Beast",
        base_type: "Full Wyrmscale",
        item_level: 75,
        requirements: { strength: 90, dexterity: 60 },
        stats: { life: 40 },
      },
    ],
    skill_gems: [
      {
        name: "Cyclone",
        type: "active" as GemType,
        level: 20,
        quality: 20,
        stats: { damage: 150 },
      },
      {
        name: "Melee Physical Damage Support",
        type: "support" as GemType,
        level: 20,
        quality: 20,
        stats: { multiplier: 49 },
      },
    ],
  },
  {
    name: "Arc Witch",
    description: "Lightning-based spell caster using Arc",
    poe_class: "witch",
    level: 85,
    visibility: "public" as VisibilityType,
    equipment: [
      {
        slot: "mainhand" as EquipmentSlot,
        name: "Void Battery",
        base_type: "Prophecy Wand",
        item_level: 75,
        requirements: { intelligence: 146 },
        stats: { spell_damage: 125 },
      },
      {
        slot: "body" as EquipmentSlot,
        name: "Tabula Rasa",
        base_type: "Simple Robe",
        item_level: 70,
        requirements: {},
        stats: {},
      },
    ],
    skill_gems: [
      {
        name: "Arc",
        type: "active" as GemType,
        level: 20,
        quality: 20,
        stats: { damage: 120 },
      },
      {
        name: "Lightning Penetration Support",
        type: "support" as GemType,
        level: 20,
        quality: 20,
        stats: { penetration: 37 },
      },
    ],
  },
];

export async function generateDemoData() {
  const supabase = createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User must be logged in to generate demo data");

  try {
    // Check if user already has builds
    const { data: existingBuilds } = await supabase
      .from("builds")
      .select("id")
      .eq("user_id", user.id)
      .limit(1);

    if (existingBuilds && existingBuilds.length > 0) {
      console.log("User already has builds, skipping demo data generation");
      return true;
    }

    console.log("Generating demo builds for new user...");

    // Generate demo builds
    for (const buildData of DEMO_BUILDS) {
      try {
        // Create build
        const { data: build, error: buildError } = await supabase
          .from("builds")
          .insert({
            user_id: user.id,
            name: buildData.name,
            description: buildData.description,
            poe_class: buildData.poe_class,
            level: buildData.level,
            visibility: buildData.visibility,
            is_template: true,
          })
          .select()
          .single();

        if (buildError) throw buildError;

        // Create equipment
        if (buildData.equipment?.length) {
          const equipment = buildData.equipment.map((item) => ({
            build_id: build.id,
            ...item,
            width: 1,
            height: 1,
            identified: true,
          }));

          const { error: equipError } = await supabase.from("equipment").insert(equipment);

          if (equipError) {
            console.error(`Error creating equipment for ${buildData.name}:`, equipError);
          }
        }

        // Create skill gems
        if (buildData.skill_gems?.length) {
          const gems = buildData.skill_gems.map((gem) => ({
            build_id: build.id,
            ...gem,
            support_skill: gem.type === "support",
          }));

          const { error: gemsError } = await supabase.from("skill_gems").insert(gems);

          if (gemsError) {
            console.error(`Error creating skill gems for ${buildData.name}:`, gemsError);
          }
        }
      } catch (buildError) {
        console.error(`Error creating build ${buildData.name}:`, buildError);
        // Continue with next build even if one fails
        continue;
      }
    }

    console.log("Demo builds generation completed");
    return true;
  } catch (error) {
    console.error("Error generating demo data:", error);
    throw error;
  }
}
