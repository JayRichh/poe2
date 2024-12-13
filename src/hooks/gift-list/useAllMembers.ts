'use client'

import { useEffect, useState } from 'react'
import { createClient } from '~/lib/supabase/client'
import type { Member } from '~/types/gift-list'
import type { Database } from '~/lib/supabase/types'
import { useAuth } from '~/contexts/auth'

type MemberRow = Database['public']['Tables']['members']['Row']

const formatMember = (member: MemberRow): Member => ({
  id: member.id,
  groupId: member.group_id,
  name: member.name,
  slug: member.slug,
  createdAt: member.created_at,
  updatedAt: member.updated_at
})

export function useAllMembers() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchMembers = async () => {
    if (!user) {
      setMembers([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('members')
        .select(`
          *,
          groups!inner(*)
        `)
        .eq('groups.user_id', user.id)
        .order('name', { ascending: true })

      if (error) throw error

      setMembers(data.map(formatMember))
    } catch (err) {
      console.error('Error fetching all members:', err)
      setError('Failed to load members')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()

    if (!user?.id) return

    const channelId = `all_members_changes_${user.id}`
    const subscription = supabase
      .channel(channelId)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'members',
          filter: `groups.user_id=eq.${user.id}`
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newMember = payload.new as MemberRow
            setMembers(current => [...current, formatMember(newMember)])
          } else if (payload.eventType === 'DELETE') {
            setMembers(current => current.filter(member => member.id !== payload.old.id))
          } else if (payload.eventType === 'UPDATE') {
            const updatedMember = payload.new as MemberRow
            setMembers(current => current.map(member => 
              member.id === updatedMember.id ? formatMember(updatedMember) : member
            ))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user?.id])

  const getMemberById = (id: string): Member | undefined => {
    return members.find(member => member.id === id)
  }

  const getMembersByGroupId = (groupId: string): Member[] => {
    return members.filter(member => member.groupId === groupId)
  }

  return {
    members,
    loading,
    error,
    getMemberById,
    getMembersByGroupId
  }
}
