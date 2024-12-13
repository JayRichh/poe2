export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type GiftStatus = 'planned' | 'purchased' | 'delivered'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          budget_preferences: {
            defaultBudget?: number
            trackingLevel: 'group' | 'member' | 'both'
            priceRanges: Array<{min: number, max: number, label: string}>
            enableAnalytics: boolean
          } | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          budget_preferences?: {
            defaultBudget?: number
            trackingLevel: 'group' | 'member' | 'both'
            priceRanges: Array<{min: number, max: number, label: string}>
            enableAnalytics: boolean
          } | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          budget_preferences?: {
            defaultBudget?: number
            trackingLevel: 'group' | 'member' | 'both'
            priceRanges: Array<{min: number, max: number, label: string}>
            enableAnalytics: boolean
          } | null
          created_at?: string
          updated_at?: string
        }
      }
      groups: {
        Row: {
          id: string
          user_id: string
          name: string
          slug: string
          description: string | null
          budget: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          slug: string
          description?: string | null
          budget?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          slug?: string
          description?: string | null
          budget?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      members: {
        Row: {
          id: string
          group_id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          group_id: string
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      gifts: {
        Row: {
          id: string
          member_id: string
          name: string
          description: string | null
          cost: number
          status: GiftStatus
          tags: string[]
          priority: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          member_id: string
          name: string
          description?: string | null
          cost: number
          status: GiftStatus
          tags?: string[]
          priority?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          member_id?: string
          name?: string
          description?: string | null
          cost?: number
          status?: GiftStatus
          tags?: string[]
          priority?: number | null
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
      [_ in never]: never
    }
  }
}
