'use client'

import { useState, useEffect } from 'react'
import { createClient } from '~/lib/supabase/client'
import type { GiftAnalytics } from '~/types/gift-list'
import type { Database } from '~/lib/supabase/types'
import { useAuth } from '~/contexts/auth'
import { giftListApi } from '~/services/gift-list-api'

type GiftRow = Database['public']['Tables']['gifts']['Row']

export function useGiftAnalytics() {
  const [analytics, setAnalytics] = useState<GiftAnalytics | null>(null)
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
      const { data, success } = await giftListApi.getGiftAnalytics()
      if (!success) {
        throw new Error('Failed to fetch gift analytics')
      }
      
      setAnalytics(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching gift analytics:', err)
      setError('Failed to load analytics')
      setAnalytics(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()

    if (!user?.id) return

    const channelId = `gift_analytics_changes_${user.id}`
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
          // Only fetch analytics if the change affects status or tags
          if (
            payload.eventType === 'INSERT' ||
            payload.eventType === 'DELETE' ||
            (payload.eventType === 'UPDATE' && (
              gift.status !== (payload.old as GiftRow).status ||
              JSON.stringify(gift.tags) !== JSON.stringify((payload.old as GiftRow).tags)
            ))
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
