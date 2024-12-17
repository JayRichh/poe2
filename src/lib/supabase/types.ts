export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type POEConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error'
export type VisibilityType = 'public' | 'private' | 'unlisted'
export type EquipmentSlot = 'mainhand' | 'offhand' | 'helm' | 'body' | 'gloves' | 'boots' | 'amulet' | 'ring1' | 'ring2' | 'belt'
export type GemType = 'active' | 'support'

export interface POEAccountData {
  connected: boolean
  accountName?: string
  lastSync?: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email?: string
          name?: string
          poe_account?: POEAccountData | null
          poe_refresh_token?: string | null
          theme?: string
          default_build_visibility?: VisibilityType
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string
          name?: string
          poe_account?: POEAccountData | null
          poe_refresh_token?: string | null
          theme?: string
          default_build_visibility?: VisibilityType
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          poe_account?: POEAccountData | null
          poe_refresh_token?: string | null
          theme?: string
          default_build_visibility?: VisibilityType
          created_at?: string
          updated_at?: string
        }
      }
      builds: {
        Row: {
          id: string
          user_id: string
          name: string
          description?: string
          visibility: VisibilityType
          poe_class?: string
          level?: number
          created_at: string
          updated_at: string
          notes?: string
          is_template: boolean
          parent_build_id?: string
          version?: string
          tags?: string[]
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string
          visibility?: VisibilityType
          poe_class?: string
          level?: number
          created_at?: string
          updated_at?: string
          notes?: string
          is_template?: boolean
          parent_build_id?: string
          version?: string
          tags?: string[]
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          visibility?: VisibilityType
          poe_class?: string
          level?: number
          created_at?: string
          updated_at?: string
          notes?: string
          is_template?: boolean
          parent_build_id?: string
          version?: string
          tags?: string[]
        }
      }
      equipment: {
        Row: {
          id: string
          build_id: string
          slot: EquipmentSlot
          name: string
          base_type?: string
          item_level?: number
          requirements?: Json
          stats?: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          build_id: string
          slot: EquipmentSlot
          name: string
          base_type?: string
          item_level?: number
          requirements?: Json
          stats?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          build_id?: string
          slot?: EquipmentSlot
          name?: string
          base_type?: string
          item_level?: number
          requirements?: Json
          stats?: Json
          created_at?: string
          updated_at?: string
        }
      }
      skill_gems: {
        Row: {
          id: string
          build_id: string
          equipment_id?: string
          name: string
          type: GemType
          level: number
          quality: number
          socket_group?: number
          socket_index?: number
          tags?: string[]
          stats?: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          build_id: string
          equipment_id?: string
          name: string
          type: GemType
          level?: number
          quality?: number
          socket_group?: number
          socket_index?: number
          tags?: string[]
          stats?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          build_id?: string
          equipment_id?: string
          name?: string
          type?: GemType
          level?: number
          quality?: number
          socket_group?: number
          socket_index?: number
          tags?: string[]
          stats?: Json
          created_at?: string
          updated_at?: string
        }
      }
      build_configs: {
        Row: {
          id: string
          build_id: string
          name: string
          type: string
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          build_id: string
          name: string
          type: string
          settings: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          build_id?: string
          name?: string
          type?: string
          settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      visibility_type: VisibilityType
      equipment_slot: EquipmentSlot
      gem_type: GemType
    }
  }
}
