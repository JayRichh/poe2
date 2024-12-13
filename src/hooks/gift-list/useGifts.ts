'use client'

import { useEffect, useState } from 'react'
import { createClient } from '~/lib/supabase/client'
import type { Gift, GiftStatus } from '~/types/gift-list'
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

export function useGifts(memberId?: string) {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchGifts = async () => {
    if (!user) {
      setGifts([])
      setLoading(false)
      return
    }

    try {
      let query = supabase
        .from('gifts')
        .select(`
          *,
          members!inner(
            *,
            groups!inner(*)
          )
        `)
        .eq('members.groups.user_id', user.id)
        .order('created_at', { ascending: true })

      if (memberId) {
        query = query.eq('member_id', memberId)
      }

      const { data, error } = await query

      if (error) throw error

      setGifts(data.map(formatGift))
    } catch (err) {
      console.error('Error fetching gifts:', err)
      setError('Failed to load gifts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGifts()

    if (!user?.id) return

    const channelId = memberId ? `gifts_changes_${memberId}` : `gifts_changes_${user.id}`
    const subscription = supabase
      .channel(channelId)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'gifts',
          filter: memberId ? `member_id=eq.${memberId}` : undefined
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newGift = payload.new as GiftRow
            setGifts(current => [...current, formatGift(newGift)])
          } else if (payload.eventType === 'DELETE') {
            setGifts(current => current.filter(gift => gift.id !== payload.old.id))
          } else if (payload.eventType === 'UPDATE') {
            const updatedGift = payload.new as GiftRow
            setGifts(current => current.map(gift => 
              gift.id === updatedGift.id ? formatGift(updatedGift) : gift
            ))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user?.id, memberId])

  const createGift = async (data: Omit<Gift, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) throw new Error('Must be logged in to create gifts')

    try {
      const { data: newGift, error } = await supabase
        .from('gifts')
        .insert({
          member_id: data.memberId,
          name: data.name,
          description: data.notes,
          cost: data.cost,
          status: data.status,
          tags: data.tags,
          priority: data.priority && data.priority <= 3 ? data.priority : undefined
        })
        .select()
        .single()

      if (error) throw error

      const formattedGift = formatGift(newGift)
      setGifts(current => [...current, formattedGift])
      return formattedGift
    } catch (err) {
      console.error('Error creating gift:', err)
      throw new Error('Failed to create gift')
    }
  }

  const updateGift = async (id: string, data: Partial<Omit<Gift, 'id' | 'memberId' | 'createdAt' | 'updatedAt'>>) => {
    if (!user) throw new Error('Must be logged in to update gifts')

    try {
      const { data: updatedGift, error } = await supabase
        .from('gifts')
        .update({
          name: data.name,
          description: data.notes,
          cost: data.cost,
          status: data.status,
          tags: data.tags,
          priority: data.priority && data.priority <= 3 ? data.priority : undefined
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const formattedGift = formatGift(updatedGift)
      setGifts(current => current.map(gift => gift.id === id ? formattedGift : gift))
      return formattedGift
    } catch (err) {
      console.error('Error updating gift:', err)
      throw new Error('Failed to update gift')
    }
  }

  const deleteGift = async (id: string) => {
    if (!user) throw new Error('Must be logged in to delete gifts')

    try {
      const { error } = await supabase
        .from('gifts')
        .delete()
        .eq('id', id)

      if (error) throw error

      setGifts(current => current.filter(gift => gift.id !== id))
    } catch (err) {
      console.error('Error deleting gift:', err)
      throw new Error('Failed to delete gift')
    }
  }

  return {
    gifts,
    loading,
    error,
    createGift,
    updateGift,
    deleteGift
  }
}
