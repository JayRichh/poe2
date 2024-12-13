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

export function useMembers(groupId?: string) {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchMembers = async () => {
    if (!user || !groupId) {
      setMembers([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('members')
        .select('*, groups!inner(*)')
        .eq('groups.user_id', user.id)
        .eq('group_id', groupId)
        .order('created_at', { ascending: true })

      if (error) throw error

      setMembers(data.map(formatMember))
    } catch (err) {
      console.error('Error fetching members:', err)
      setError('Failed to load members')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()

    if (!user?.id || !groupId) return

    const channelId = `members_changes_${groupId}_${user.id}`
    const subscription = supabase
      .channel(channelId)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'members',
          filter: `group_id=eq.${groupId}`
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
  }, [user?.id, groupId])

  const createMember = async (data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) throw new Error('Must be logged in to create members')
    if (!groupId) throw new Error('Group ID is required to create members')

    try {
      const { data: newMember, error } = await supabase
        .from('members')
        .insert({
          name: data.name,
          slug: data.slug,
          group_id: data.groupId
        })
        .select()
        .single()

      if (error) throw error

      const formattedMember = formatMember(newMember)
      setMembers(current => [...current, formattedMember])
      return formattedMember
    } catch (err) {
      console.error('Error creating member:', err)
      throw new Error('Failed to create member')
    }
  }

  const updateMember = async (id: string, data: Partial<Omit<Member, 'id' | 'groupId' | 'createdAt' | 'updatedAt'>>) => {
    if (!user) throw new Error('Must be logged in to update members')
    if (!groupId) throw new Error('Group ID is required to update members')

    try {
      const { data: updatedMember, error } = await supabase
        .from('members')
        .update({
          name: data.name,
          slug: data.slug
        })
        .eq('id', id)
        .eq('group_id', groupId)
        .select()
        .single()

      if (error) throw error

      const formattedMember = formatMember(updatedMember)
      setMembers(current => current.map(member => 
        member.id === id ? formattedMember : member
      ))
      return formattedMember
    } catch (err) {
      console.error('Error updating member:', err)
      throw new Error('Failed to update member')
    }
  }

  const deleteMember = async (id: string) => {
    if (!user) throw new Error('Must be logged in to delete members')
    if (!groupId) throw new Error('Group ID is required to delete members')

    try {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id)
        .eq('group_id', groupId)

      if (error) throw error

      setMembers(current => current.filter(member => member.id !== id))
    } catch (err) {
      console.error('Error deleting member:', err)
      throw new Error('Failed to delete member')
    }
  }

  return {
    members,
    loading,
    error,
    createMember,
    updateMember,
    deleteMember
  }
}
