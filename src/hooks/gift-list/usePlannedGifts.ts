'use client'

import { useEffect, useState } from 'react'
import { createClient } from '~/lib/supabase/client'
import type { Gift } from '~/types/gift-list'
import type { Database } from '~/lib/supabase/types'
import { useAuth } from '~/contexts/auth'

type GiftRow = Database['public']['Tables']['gifts']['Row']

const formatGift = (gift: GiftRow): Gift => ({
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
})

export function usePlannedGifts() {
  const [plannedGifts, setPlannedGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchPlannedGifts = async () => {
    if (!user) {
      setPlannedGifts([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('gifts')
        .select(`
          *,
          members!inner(
            *,
            groups!inner(*)
          )
        `)
        .eq('members.groups.user_id', user.id)
        .eq('status', 'planned')
        .order('priority', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: true })

      if (error) throw error

      setPlannedGifts(data.map(formatGift))
    } catch (err) {
      console.error('Error fetching planned gifts:', err)
      setError('Failed to load planned gifts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlannedGifts()

    if (!user?.id) return

    const channelId = `planned_gifts_changes_${user.id}`
    const subscription = supabase
      .channel(channelId)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'gifts',
          filter: `status=eq.planned AND members.groups.user_id=eq.${user.id}`
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT' && payload.new.status === 'planned') {
            const newGift = payload.new as GiftRow
            setPlannedGifts(current => [...current, formatGift(newGift)])
          } else if (payload.eventType === 'DELETE' || (payload.eventType === 'UPDATE' && payload.new.status !== 'planned')) {
            setPlannedGifts(current => current.filter(gift => gift.id !== payload.old.id))
          } else if (payload.eventType === 'UPDATE' && payload.new.status === 'planned') {
            const updatedGift = payload.new as GiftRow
            setPlannedGifts(current => current.map(gift => 
              gift.id === updatedGift.id ? formatGift(updatedGift) : gift
            ))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user?.id])

  const updateGiftStatus = async (giftId: string, status: Gift['status']) => {
    if (!user) throw new Error('Must be logged in to update gifts')

    try {
      const { data: updatedGift, error } = await supabase
        .from('gifts')
        .update({ status })
        .eq('id', giftId)
        .select()
        .single()

      if (error) throw error

      if (status !== 'planned') {
        setPlannedGifts(current => current.filter(gift => gift.id !== giftId))
      } else {
        const formattedGift = formatGift(updatedGift)
        setPlannedGifts(current => current.map(gift => 
          gift.id === giftId ? formattedGift : gift
        ))
      }
    } catch (err) {
      console.error('Error updating gift status:', err)
      throw new Error('Failed to update gift status')
    }
  }

  const updateGiftPriority = async (giftId: string, priority?: number) => {
    if (!user) throw new Error('Must be logged in to update gifts')

    try {
      const { data: updatedGift, error } = await supabase
        .from('gifts')
        .update({ priority })
        .eq('id', giftId)
        .select()
        .single()

      if (error) throw error

      const formattedGift = formatGift(updatedGift)
      setPlannedGifts(current => current.map(gift => 
        gift.id === giftId ? formattedGift : gift
      ))
    } catch (err) {
      console.error('Error updating gift priority:', err)
      throw new Error('Failed to update gift priority')
    }
  }

  return {
    plannedGifts,
    loading,
    error,
    updateGiftStatus,
    updateGiftPriority
  }
}
