'use client'

import { useState, useEffect } from 'react'
import { createClient } from '~/lib/supabase/client'
import type { BudgetAnalytics } from '~/types/gift-list'
import type { Database } from '~/lib/supabase/types'
import { useAuth } from '~/contexts/auth'
import { giftListApi } from '~/services/gift-list-api'

type GiftRow = Database['public']['Tables']['gifts']['Row']
type GroupRow = Database['public']['Tables']['groups']['Row']

export function useBudgetAnalytics() {
  const [analytics, setAnalytics] = useState<BudgetAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchAnalytics = async () => {
    if (!user) {
      setAnalytics(null)
      setLoading(false)
      return
    }

    try {
      const { data, success } = await giftListApi.getBudgetAnalytics()
      if (!success) {
        throw new Error('Failed to fetch budget analytics')
      }
      
      setAnalytics(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching budget analytics:', err)
      setError('Failed to load budget analytics')
      setAnalytics(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()

    if (!user?.id) return

    const channelId = `budget_analytics_changes_${user.id}`
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
    analytics,
    loading,
    error,
    refetch: fetchAnalytics
  }
}
