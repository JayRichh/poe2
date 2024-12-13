'use client'

import { useState, useEffect } from 'react'
import { createClient } from '~/lib/supabase/client'
import type { BudgetAnalytics, GiftAnalytics } from '~/types/gift-list'
import type { Database } from '~/lib/supabase/types'
import { useAuth } from '~/contexts/auth'
import { giftListApi } from '~/services/gift-list-api'

type GiftRow = Database['public']['Tables']['gifts']['Row']
type GroupRow = Database['public']['Tables']['groups']['Row']

export function useAnalytics() {
  const [budgetAnalytics, setBudgetAnalytics] = useState<BudgetAnalytics | null>(null)
  const [giftAnalytics, setGiftAnalytics] = useState<GiftAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchAnalytics = async () => {
    if (!user) {
      setBudgetAnalytics(null)
      setGiftAnalytics(null)
      setLoading(false)
      return
    }

    try {
      const [budgetResponse, giftResponse] = await Promise.all([
        giftListApi.getBudgetAnalytics(),
        giftListApi.getGiftAnalytics()
      ])

      if (!budgetResponse.success) {
        throw new Error('Failed to fetch budget analytics')
      }

      if (!giftResponse.success) {
        throw new Error('Failed to fetch gift analytics')
      }

      setBudgetAnalytics(budgetResponse.data)
      setGiftAnalytics(giftResponse.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching analytics:', err)
      setError('Failed to load analytics')
      setBudgetAnalytics(null)
      setGiftAnalytics(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()

    if (!user?.id) return

    const channelId = `analytics_changes_${user.id}`
    const subscription = supabase
      .channel(channelId)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'gifts',
          filter: `members.groups.user_id=eq.${user.id}`
        }, 
        (payload) => {
          const gift = payload.new as GiftRow
          // Only fetch analytics if the change affects cost or status
          if (
            payload.eventType === 'INSERT' ||
            payload.eventType === 'DELETE' ||
            (payload.eventType === 'UPDATE' && (
              gift.cost !== (payload.old as GiftRow).cost ||
              gift.status !== (payload.old as GiftRow).status
            ))
          ) {
            fetchAnalytics()
          }
        }
      )
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'groups',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const group = payload.new as GroupRow
          // Only fetch analytics if the change affects budget
          if (
            payload.eventType === 'INSERT' ||
            payload.eventType === 'DELETE' ||
            (payload.eventType === 'UPDATE' && 
              group.budget !== (payload.old as GroupRow).budget
            )
          ) {
            fetchAnalytics()
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user?.id])

  return {
    budgetAnalytics,
    giftAnalytics,
    loading,
    error,
    refetch: fetchAnalytics
  }
}
