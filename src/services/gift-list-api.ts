import { createClient } from '~/lib/supabase/client'
import type {
  Group,
  GroupResponse,
  GroupsResponse,
  Gift,
  GiftResponse,
  GiftsResponse,
  Member,
  MemberResponse,
  MembersResponse,
  BudgetAnalytics,
  GiftAnalytics,
  GiftStatus,
  BudgetAnalyticsResponse,
  GiftAnalyticsResponse,
  PriceRange,
  BudgetPreference
} from "~/types/gift-list"
import { generateSlug } from "~/utils/slug"
import { Database } from '~/lib/supabase/types'

type DbGroup = Database['public']['Tables']['groups']['Row']
type DbMember = Database['public']['Tables']['members']['Row']
type DbGift = Database['public']['Tables']['gifts']['Row']
type DbProfile = Database['public']['Tables']['profiles']['Row']

interface GroupWithGifts extends DbGroup {
  members: Array<{
    id: string;
    gifts: Array<{
      cost: number;
    }>;
  }>;
}

// Helper function to transform database group to application group
const transformGroup = (dbGroup: DbGroup): Group => ({
  id: dbGroup.id,
  name: dbGroup.name,
  slug: dbGroup.slug,
  budget: dbGroup.budget || undefined,
  createdAt: dbGroup.created_at,
  updatedAt: dbGroup.updated_at
})

// Helper function to get price range breakdown
const getPriceRangeBreakdown = (giftsToAnalyze: DbGift[]) => {
  const ranges: PriceRange[] = [
    { min: 0, max: 25, label: "Under $25" },
    { min: 25, max: 50, label: "$25-$50" },
    { min: 50, max: 100, label: "$50-$100" },
    { min: 100, max: 250, label: "$100-$250" },
    { min: 250, max: 500, label: "$250-$500" },
    { min: 500, max: Infinity, label: "$500+" },
  ]

  return ranges.map(range => ({
    range,
    count: giftsToAnalyze.filter(g => g.cost >= range.min && g.cost < range.max).length,
    totalSpent: giftsToAnalyze
      .filter(g => g.cost >= range.min && g.cost < range.max)
      .reduce((sum, g) => sum + g.cost, 0),
  }))
}

// Helper function to get monthly spending breakdown
const getMonthlySpending = (giftsToAnalyze: DbGift[]) => {
  const monthlyData: Record<string, { spent: number; giftCount: number }> = {}
  
  giftsToAnalyze.forEach(gift => {
    const month = gift.created_at.substring(0, 7) // YYYY-MM format
    if (!monthlyData[month]) {
      monthlyData[month] = { spent: 0, giftCount: 0 }
    }
    monthlyData[month].spent += gift.cost
    monthlyData[month].giftCount += 1
  })

  return Object.entries(monthlyData).map(([month, data]) => ({
    month,
    spent: data.spent,
    giftCount: data.giftCount,
  }))
}

export const giftListApi = {
  // Profile and preferences operations
  async getBudgetPreferences(): Promise<{ success: boolean; data: BudgetPreference | null }> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('budget_preferences')
      .single()

    if (error) throw error
    return { success: true, data: data?.budget_preferences || null }
  },

  async updateBudgetPreferences(preferences: BudgetPreference): Promise<{ success: boolean }> {
    const supabase = createClient()
    const user = (await supabase.auth.getUser()).data.user
    if (!user?.id) throw new Error('User not found')

    const { error } = await supabase
      .from('profiles')
      .update({ budget_preferences: preferences })
      .eq('id', user.id)

    if (error) throw error
    return { success: true }
  },

  // Group operations
  async getGroups(): Promise<GroupsResponse> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error
    return { success: true, data: data.map(transformGroup) }
  },

  async getGroup(idOrSlug: string): Promise<GroupResponse> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
      .single()

    if (error) throw error
    if (!data) throw new Error("Group not found")
    return { success: true, data: transformGroup(data) }
  },

  async createGroup(data: Omit<Group, "id" | "createdAt" | "updatedAt">): Promise<GroupResponse> {
    const supabase = createClient()
    const user = (await supabase.auth.getUser()).data.user
    if (!user?.id) throw new Error('User not found')

    const { data: newGroup, error } = await supabase
      .from('groups')
      .insert({
        user_id: user.id,
        name: data.name,
        slug: data.slug || generateSlug(data.name),
        budget: data.budget
      })
      .select()
      .single()

    if (error) throw error
    return { success: true, data: transformGroup(newGroup) }
  },

  async updateGroup(
    idOrSlug: string,
    data: Partial<Omit<Group, "id" | "createdAt" | "updatedAt">>
  ): Promise<GroupResponse> {
    const supabase = createClient()
    const { data: updatedGroup, error } = await supabase
      .from('groups')
      .update({
        name: data.name,
        slug: data.name ? generateSlug(data.name) : undefined,
        budget: data.budget
      })
      .match({ id: idOrSlug })
      .select()
      .single()

    if (error) throw error
    return { success: true, data: transformGroup(updatedGroup) }
  },

  async deleteGroup(idOrSlug: string): Promise<{ success: boolean }> {
    const supabase = createClient()
    const { error } = await supabase
      .from('groups')
      .delete()
      .match({ id: idOrSlug })

    if (error) throw error
    return { success: true }
  },

  // Member operations
  async getMembers(groupId: string): Promise<MembersResponse> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('group_id', groupId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return { success: true, data: data.map(member => ({
      id: member.id,
      groupId: member.group_id,
      name: member.name,
      slug: member.slug,
      createdAt: member.created_at,
      updatedAt: member.updated_at
    })) }
  },

  async getMember(idOrSlug: string): Promise<MemberResponse> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
      .single()

    if (error) throw error
    if (!data) throw new Error("Member not found")
    return { success: true, data: {
      id: data.id,
      groupId: data.group_id,
      name: data.name,
      slug: data.slug,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }}
  },

  async createMember(
    data: Omit<Member, "id" | "createdAt" | "updatedAt">
  ): Promise<MemberResponse> {
    const supabase = createClient()
    const { data: newMember, error } = await supabase
      .from('members')
      .insert({
        group_id: data.groupId,
        name: data.name,
        slug: data.slug || generateSlug(data.name)
      })
      .select()
      .single()

    if (error) throw error
    return { success: true, data: {
      id: newMember.id,
      groupId: newMember.group_id,
      name: newMember.name,
      slug: newMember.slug,
      createdAt: newMember.created_at,
      updatedAt: newMember.updated_at
    }}
  },

  async updateMember(
    idOrSlug: string,
    data: Partial<Omit<Member, "id" | "groupId" | "createdAt" | "updatedAt">>
  ): Promise<MemberResponse> {
    const supabase = createClient()
    const { data: updatedMember, error } = await supabase
      .from('members')
      .update({
        name: data.name,
        slug: data.name ? generateSlug(data.name) : undefined
      })
      .match({ id: idOrSlug })
      .select()
      .single()

    if (error) throw error
    return { success: true, data: {
      id: updatedMember.id,
      groupId: updatedMember.group_id,
      name: updatedMember.name,
      slug: updatedMember.slug,
      createdAt: updatedMember.created_at,
      updatedAt: updatedMember.updated_at
    }}
  },

  async deleteMember(idOrSlug: string): Promise<{ success: boolean }> {
    const supabase = createClient()
    const { error } = await supabase
      .from('members')
      .delete()
      .match({ id: idOrSlug })

    if (error) throw error
    return { success: true }
  },

  // Gift operations
  async getGifts(memberId?: string): Promise<GiftsResponse> {
    const supabase = createClient()
    let query = supabase
      .from('gifts')
      .select('*')
      .order('created_at', { ascending: true })

    if (memberId) {
      query = query.eq('member_id', memberId)
    }

    const { data, error } = await query
    if (error) throw error
    return { success: true, data: data.map(gift => ({
      id: gift.id,
      memberId: gift.member_id,
      name: gift.name,
      notes: gift.description || undefined,
      cost: gift.cost,
      status: gift.status,
      tags: gift.tags || [],
      priority: gift.priority || undefined,
      createdAt: gift.created_at,
      updatedAt: gift.updated_at
    })) }
  },

  async getGift(id: string): Promise<GiftResponse> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    if (!data) throw new Error("Gift not found")
    return { success: true, data: {
      id: data.id,
      memberId: data.member_id,
      name: data.name,
      notes: data.description || undefined,
      cost: data.cost,
      status: data.status,
      tags: data.tags || [],
      priority: data.priority || undefined,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }}
  },

  async createGift(data: Omit<Gift, "id" | "createdAt" | "updatedAt">): Promise<GiftResponse> {
    const supabase = createClient()
    const { data: newGift, error } = await supabase
      .from('gifts')
      .insert({
        member_id: data.memberId,
        name: data.name,
        description: data.notes,
        cost: data.cost,
        status: data.status,
        tags: data.tags,
        priority: data.priority
      })
      .select()
      .single()

    if (error) throw error
    return { success: true, data: {
      id: newGift.id,
      memberId: newGift.member_id,
      name: newGift.name,
      notes: newGift.description || undefined,
      cost: newGift.cost,
      status: newGift.status,
      tags: newGift.tags || [],
      priority: newGift.priority || undefined,
      createdAt: newGift.created_at,
      updatedAt: newGift.updated_at
    }}
  },

  async updateGift(
    id: string,
    data: Partial<Omit<Gift, "id" | "memberId" | "createdAt" | "updatedAt">>
  ): Promise<GiftResponse> {
    const supabase = createClient()
    const { data: updatedGift, error } = await supabase
      .from('gifts')
      .update({
        name: data.name,
        description: data.notes,
        cost: data.cost,
        status: data.status,
        tags: data.tags,
        priority: data.priority
      })
      .match({ id })
      .select()
      .single()

    if (error) throw error
    return { success: true, data: {
      id: updatedGift.id,
      memberId: updatedGift.member_id,
      name: updatedGift.name,
      notes: updatedGift.description || undefined,
      cost: updatedGift.cost,
      status: updatedGift.status,
      tags: updatedGift.tags || [],
      priority: updatedGift.priority || undefined,
      createdAt: updatedGift.created_at,
      updatedAt: updatedGift.updated_at
    }}
  },

  async deleteGift(id: string): Promise<{ success: boolean }> {
    const supabase = createClient()
    const { error } = await supabase
      .from('gifts')
      .delete()
      .match({ id })

    if (error) throw error
    return { success: true }
  },

  // Analytics operations
  async getBudgetAnalytics(): Promise<BudgetAnalyticsResponse> {
    const supabase = createClient()
    
    // Get all groups with their gifts through members
    const { data: groups, error: groupsError } = await supabase
      .from('groups')
      .select(`
        id,
        name,
        budget,
        members (
          id,
          gifts (
            cost
          )
        )
      `) as { data: GroupWithGifts[] | null; error: any }

    if (groupsError) throw groupsError
    if (!groups) throw new Error('Failed to load groups')

    const groupBreakdown = groups.map(group => {
      const gifts = group.members.flatMap(member => member.gifts)
      const spent = gifts.reduce((sum, gift) => sum + gift.cost, 0)
      
      return {
        groupId: group.id,
        groupName: group.name,
        budget: group.budget || 0,
        spent,
      }
    })

    // Get all gifts for price range breakdown
    const { data: gifts, error: giftsError } = await supabase
      .from('gifts')
      .select('*')

    if (giftsError) throw giftsError
    if (!gifts) throw new Error('Failed to load gifts')

    const totalBudget = groupBreakdown.reduce((sum, g) => sum + g.budget, 0)
    const spentAmount = groupBreakdown.reduce((sum, g) => sum + g.spent, 0)

    return {
      success: true,
      data: {
        totalBudget,
        spentAmount,
        remainingAmount: totalBudget - spentAmount,
        groupBreakdown,
        priceRangeBreakdown: getPriceRangeBreakdown(gifts)
      }
    }
  },

  async getGiftAnalytics(): Promise<GiftAnalyticsResponse> {
    const supabase = createClient()
    
    const { data: gifts, error } = await supabase
      .from('gifts')
      .select('*')

    if (error) throw error
    if (!gifts) throw new Error('Failed to load gifts')

    const statusCount: Record<GiftStatus, number> = {
      planned: 0,
      purchased: 0,
      delivered: 0,
    }

    const tagCount: Record<string, number> = {}

    gifts.forEach((gift: DbGift) => {
      // Count by status
      statusCount[gift.status as GiftStatus]++

      // Count by tags
      gift.tags?.forEach((tag: string) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    })

    return {
      success: true,
      data: {
        totalGifts: gifts.length,
        statusBreakdown: Object.entries(statusCount).map(([status, count]) => ({
          status: status as GiftStatus,
          count,
        })),
        tagBreakdown: Object.entries(tagCount).map(([tag, count]) => ({
          tag,
          count,
        })),
        priceRangeBreakdown: getPriceRangeBreakdown(gifts),
        monthlySpending: getMonthlySpending(gifts),
      }
    }
  },
}
