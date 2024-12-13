// NOTE: Migration functionality has been removed to simplify the auth flow.
// Keeping this file for reference in case we need to implement data migration in the future.

/*
import { createClient } from '~/lib/supabase/client'
import type { Database } from '~/lib/supabase/types'
import type { Group, Member, Gift, GiftStatus } from '~/types/gift-list'

const STORAGE_KEYS = {
  SETUP_COMPLETED: 'hasCompletedSetup',
  BUDGET_PREFERENCES: 'budgetPreferences',
  GROUPS: 'gift-list-groups',
  MEMBERS: 'gift-list-members',
  GIFTS: 'gift-list-gifts',
  MIGRATION_COMPLETED: 'supabase-migration-completed'
}

const isValidGiftStatus = (status: string): status is GiftStatus => {
  return ['planned', 'purchased', 'delivered'].includes(status)
}

export async function migrateLocalDataToSupabase(userId: string) {
  const migrationCompleted = localStorage.getItem(STORAGE_KEYS.MIGRATION_COMPLETED)
  if (migrationCompleted) return

  const supabase = createClient()

  try {
    // First check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()

    if (profileError) {
      console.error('Profile check error:', profileError)
      throw new Error(`Profile check failed: ${profileError.message}`)
    }

    if (!profile) {
      throw new Error('Profile not found. Please ensure your profile is set up first.')
    }

    // Load local data
    const groups: Group[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.GROUPS) || '[]')
    const members: Member[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMBERS) || '[]')
    const gifts: Gift[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.GIFTS) || '[]')

    console.log('Local data found:', {
      groupCount: groups.length,
      memberCount: members.length,
      giftCount: gifts.length
    })

    if (groups.length === 0 && members.length === 0 && gifts.length === 0) {
      localStorage.setItem(STORAGE_KEYS.MIGRATION_COMPLETED, 'true')
      return
    }

    // Validate all data before starting migration
    for (const gift of gifts) {
      if (!isValidGiftStatus(gift.status)) {
        throw new Error(`Invalid gift status for gift ${gift.id}: ${gift.status}`)
      }
    }

    console.log('Starting migration cleanup...')
    
    // Begin migration by cleaning up any existing data
    const { error: beginError } = await supabase.rpc('begin_migration', { user_id: userId })
    if (beginError) {
      console.error('Begin migration error:', beginError)
      throw new Error(`Failed to begin migration: ${beginError.message}`)
    }

    console.log('Cleanup completed, starting data migration...')

    try {
      // Migrate groups
      if (groups.length > 0) {
        console.log('Migrating groups...')
        const { error: groupError } = await supabase
          .from('groups')
          .insert(groups.map(group => ({
            id: group.id,
            user_id: userId,
            name: group.name,
            slug: group.slug,
            budget: group.budget || null,
            created_at: group.createdAt,
            updated_at: group.updatedAt
          })))
        
        if (groupError) {
          console.error('Group migration error:', groupError)
          throw new Error(`Group migration failed: ${groupError.message}`)
        }
      }

      // Migrate members
      if (members.length > 0) {
        console.log('Migrating members...')
        const { error: memberError } = await supabase
          .from('members')
          .insert(members.map(member => ({
            id: member.id,
            group_id: member.groupId,
            name: member.name,
            slug: member.slug,
            created_at: member.createdAt,
            updated_at: member.updatedAt
          })))
        
        if (memberError) {
          console.error('Member migration error:', memberError)
          throw new Error(`Member migration failed: ${memberError.message}`)
        }
      }

      // Migrate gifts
      if (gifts.length > 0) {
        console.log('Migrating gifts...')
        const { error: giftError } = await supabase
          .from('gifts')
          .insert(gifts.map(gift => ({
            id: gift.id,
            member_id: gift.memberId,
            name: gift.name,
            description: gift.notes || null,
            cost: gift.cost,
            status: gift.status,
            tags: gift.tags || [],
            priority: gift.priority || null,
            created_at: gift.createdAt,
            updated_at: gift.updatedAt
          })))
        
        if (giftError) {
          console.error('Gift migration error:', giftError)
          throw new Error(`Gift migration failed: ${giftError.message}`)
        }
      }

      console.log('Migration completed successfully')
      
      // Mark migration as completed
      localStorage.setItem(STORAGE_KEYS.MIGRATION_COMPLETED, 'true')

    } catch (error) {
      // If any part fails, the begin_migration function's cleanup ensures we're in a clean state
      throw error
    }

  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
}

export async function clearLocalData() {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key)
  })
}
*/
