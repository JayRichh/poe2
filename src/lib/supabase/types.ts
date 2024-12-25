export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type POEConnectionStatus = "connected" | "disconnected" | "connecting" | "error";
export type VisibilityType = "public" | "private" | "unlisted";
export type EquipmentSlot =
  | "mainhand"
  | "offhand"
  | "helm"
  | "body"
  | "gloves"
  | "boots"
  | "amulet"
  | "ring1"
  | "ring2"
  | "belt";
export type GemType = "active" | "support";
export type SocketColor = "R" | "G" | "B" | "W" | "A" | "DV";
export type ItemRarity = "Normal" | "Magic" | "Rare" | "Unique";

export interface POEAccountData {
  connected: boolean;
  accountName?: string;
  lastSync?: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email?: string;
          name?: string;
          poe_account?: POEAccountData | null;
          poe_refresh_token?: string | null;
          theme?: string;
          default_build_visibility?: VisibilityType;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string;
          name?: string;
          poe_account?: POEAccountData | null;
          poe_refresh_token?: string | null;
          theme?: string;
          default_build_visibility?: VisibilityType;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          poe_account?: POEAccountData | null;
          poe_refresh_token?: string | null;
          theme?: string;
          default_build_visibility?: VisibilityType;
          created_at?: string;
          updated_at?: string;
        };
      };
      builds: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description?: string;
          visibility: VisibilityType;
          slug: string;
          poe_class?: string;
          level?: number;
          notes?: string;
          is_template: boolean;
          parent_build_id?: string;
          version?: string;
          tags?: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string;
          visibility?: VisibilityType;
          slug?: string;
          poe_class?: string;
          level?: number;
          notes?: string;
          is_template?: boolean;
          parent_build_id?: string;
          version?: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string;
          visibility?: VisibilityType;
          slug?: string;
          poe_class?: string;
          level?: number;
          notes?: string;
          is_template?: boolean;
          parent_build_id?: string;
          version?: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      equipment: {
        Row: {
          id: string;
          build_id: string;
          slot: EquipmentSlot;
          name: string;
          base_type?: string;
          type_line?: string;
          width: number;
          height: number;
          icon?: string;
          rarity?: ItemRarity;
          identified: boolean;
          item_level?: number;
          requirements?: Json;
          influences?: Json;
          properties?: Json[];
          sockets?: Json[];
          implicit_mods?: string[];
          explicit_mods?: string[];
          crafted_mods?: string[];
          corrupted?: boolean;
          frame_type?: number;
          stats?: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          build_id: string;
          slot: EquipmentSlot;
          name: string;
          base_type?: string;
          type_line?: string;
          width?: number;
          height?: number;
          icon?: string;
          rarity?: ItemRarity;
          identified?: boolean;
          item_level?: number;
          requirements?: Json;
          influences?: Json;
          properties?: Json[];
          sockets?: Json[];
          implicit_mods?: string[];
          explicit_mods?: string[];
          crafted_mods?: string[];
          corrupted?: boolean;
          frame_type?: number;
          stats?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          build_id?: string;
          slot?: EquipmentSlot;
          name?: string;
          base_type?: string;
          type_line?: string;
          width?: number;
          height?: number;
          icon?: string;
          rarity?: ItemRarity;
          identified?: boolean;
          item_level?: number;
          requirements?: Json;
          influences?: Json;
          properties?: Json[];
          sockets?: Json[];
          implicit_mods?: string[];
          explicit_mods?: string[];
          crafted_mods?: string[];
          corrupted?: boolean;
          frame_type?: number;
          stats?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      skill_gems: {
        Row: {
          id: string;
          build_id: string;
          equipment_id?: string;
          name: string;
          type: GemType;
          color?: SocketColor;
          level: number;
          quality: number;
          socket_group?: number;
          socket_index?: number;
          support_skill: boolean;
          properties?: Json[];
          requirements?: Json[];
          added_mods?: string[];
          tags?: string[];
          stats?: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          build_id: string;
          equipment_id?: string;
          name: string;
          type: GemType;
          color?: SocketColor;
          level?: number;
          quality?: number;
          socket_group?: number;
          socket_index?: number;
          support_skill?: boolean;
          properties?: Json[];
          requirements?: Json[];
          added_mods?: string[];
          tags?: string[];
          stats?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          build_id?: string;
          equipment_id?: string;
          name?: string;
          type?: GemType;
          color?: SocketColor;
          level?: number;
          quality?: number;
          socket_group?: number;
          socket_index?: number;
          support_skill?: boolean;
          properties?: Json[];
          requirements?: Json[];
          added_mods?: string[];
          tags?: string[];
          stats?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      build_configs: {
        Row: {
          id: string;
          build_id: string;
          name: string;
          type: string;
          settings: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          build_id: string;
          name: string;
          type: string;
          settings: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          build_id?: string;
          name?: string;
          type?: string;
          settings?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      visibility_type: VisibilityType;
      equipment_slot: EquipmentSlot;
      gem_type: GemType;
      socket_color: SocketColor;
    };
  };
}
