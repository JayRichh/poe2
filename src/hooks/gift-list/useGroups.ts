'use client'

import { useEffect, useState } from 'react'
import { createClient } from '~/lib/supabase/client'
import type { Group } from '~/types/gift-list'
import { useAuth } from '~/contexts/auth'

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchGroups = async () => {
    if (!user) {
      setGroups([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

      if (error) throw error

      const formattedGroups = data.map(group => ({
        id: group.id,
        name: group.name,
        slug: group.slug,
        description: group.description || undefined,
        budget: group.budget || 0,
        createdAt: group.created_at,
        updatedAt: group.updated_at
      }))

      setGroups(formattedGroups)
    } catch (err) {
      console.error('Error fetching groups:', err)
      setError('Failed to load groups')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()

    if (!user?.id) return

    const subscription = supabase
      .channel(`groups_changes_${user.id}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'groups',
          filter: `user_id=eq.${user.id}`
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newGroup = payload.new
            setGroups(current => [...current, {
              id: newGroup.id,
              name: newGroup.name,
              slug: newGroup.slug,
              description: newGroup.description || undefined,
              budget: newGroup.budget || 0,
              createdAt: newGroup.created_at,
              updatedAt: newGroup.updated_at
            }])
          } else if (payload.eventType === 'DELETE') {
            setGroups(current => current.filter(group => group.id !== payload.old.id))
          } else if (payload.eventType === 'UPDATE') {
            const updatedGroup = payload.new
            setGroups(current => current.map(group => 
              group.id === updatedGroup.id ? {
                id: updatedGroup.id,
                name: updatedGroup.name,
                slug: updatedGroup.slug,
                description: updatedGroup.description || undefined,
                budget: updatedGroup.budget || 0,
                createdAt: updatedGroup.created_at,
                updatedAt: updatedGroup.updated_at
              } : group
            ))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user?.id])

  const createGroup = async (data: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) throw new Error('Must be logged in to create groups')

    try {
      const { data: newGroup, error } = await supabase
        .from('groups')
        .insert({
          name: data.name,
          slug: data.slug,
          description: data.description,
          budget: data.budget,
          user_id: user.id
        })
        .select()
        .single()

      if (error) throw error

      const formattedGroup = {
        id: newGroup.id,
        name: newGroup.name,
        slug: newGroup.slug,
        description: newGroup.description || undefined,
        budget: newGroup.budget || 0,
        createdAt: newGroup.created_at,
        updatedAt: newGroup.updated_at
      }

      setGroups(current => [...current, formattedGroup])
      return formattedGroup
    } catch (err) {
      console.error('Error creating group:', err)
      throw new Error('Failed to create group')
    }
  }

  const updateGroup = async (id: string, data: Partial<Omit<Group, 'id' | 'createdAt' | 'updatedAt'>>) => {
    if (!user) throw new Error('Must be logged in to update groups')

    try {
      const { data: updatedGroup, error } = await supabase
        .from('groups')
        .update({
          name: data.name,
          slug: data.slug,
          description: data.description,
          budget: data.budget
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error

      const formattedGroup = {
        id: updatedGroup.id,
        name: updatedGroup.name,
        slug: updatedGroup.slug,
        description: updatedGroup.description || undefined,
        budget: updatedGroup.budget || 0,
        createdAt: updatedGroup.created_at,
        updatedAt: updatedGroup.updated_at
      }

      setGroups(current => 
        current.map(group => group.id === id ? formattedGroup : group)
      )

      return formattedGroup
    } catch (err) {
      console.error('Error updating group:', err)
      throw new Error('Failed to update group')
    }
  }

  const deleteGroup = async (id: string) => {
    if (!user) throw new Error('Must be logged in to delete groups')

    try {
      const { error } = await supabase
        .from('groups')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error

      setGroups(current => current.filter(group => group.id !== id))
    } catch (err) {
      console.error('Error deleting group:', err)
      throw new Error('Failed to delete group')
    }
  }

  return {
    groups,
    loading,
    error,
    createGroup,
    updateGroup,
    deleteGroup
  }
}
