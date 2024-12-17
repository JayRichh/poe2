'use server'

import { cookies } from 'next/headers'
import { createClient } from '~/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '~/lib/supabase/types'

type Build = Database['public']['Tables']['builds']['Row']
type BuildInsert = Database['public']['Tables']['builds']['Insert']
type BuildUpdate = Database['public']['Tables']['builds']['Update']

export async function createBuild(build: BuildInsert) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in to create builds')

  const { data, error } = await supabase
    .from('builds')
    .insert({
      ...build,
      user_id: user.id
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/build-planner')
  return data
}

export async function updateBuild(id: string, updates: BuildUpdate) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in to update builds')

  // Verify ownership
  const { data: build } = await supabase
    .from('builds')
    .select()
    .eq('id', id)
    .single()

  if (!build || build.user_id !== user.id) {
    throw new Error('Build not found or unauthorized')
  }

  const { data, error } = await supabase
    .from('builds')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  revalidatePath('/build-planner')
  revalidatePath(`/build-planner/${id}`)
  return data
}

export async function deleteBuild(id: string) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in to delete builds')

  // Verify ownership
  const { data: build } = await supabase
    .from('builds')
    .select()
    .eq('id', id)
    .single()

  if (!build || build.user_id !== user.id) {
    throw new Error('Build not found or unauthorized')
  }

  const { error } = await supabase
    .from('builds')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath('/build-planner')
}

export async function getBuild(id: string) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in to view builds')

  const { data, error } = await supabase
    .from('builds')
    .select(`
      *,
      equipment (*),
      skill_gems (*),
      build_configs (*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error

  // Check if build is public or owned by user
  if (data.visibility !== 'public' && data.user_id !== user.id) {
    throw new Error('Build not found or unauthorized')
  }

  return data
}

export async function getBuilds(options: {
  userId?: string
  visibility?: Database['public']['Enums']['visibility_type']
  isTemplate?: boolean
  limit?: number
  offset?: number
} = {}) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in to view builds')

  const {
    userId = user.id,
    visibility,
    isTemplate,
    limit = 10,
    offset = 0
  } = options

  let query = supabase
    .from('builds')
    .select('*')
    .range(offset, offset + limit - 1)
    .order('updated_at', { ascending: false })

  if (userId) {
    query = query.eq('user_id', userId)
  }

  if (visibility) {
    query = query.eq('visibility', visibility)
  }

  if (typeof isTemplate === 'boolean') {
    query = query.eq('is_template', isTemplate)
  }

  const { data, error } = await query
  if (error) throw error

  return data
}

export async function cloneBuild(id: string, updates: Partial<BuildInsert> = {}) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in to clone builds')

  // Get original build with all related data
  const original = await getBuild(id)
  if (!original) throw new Error('Build not found')

  // Create new build
  const { data: newBuild, error: buildError } = await supabase
    .from('builds')
    .insert({
      ...original,
      id: undefined,
      user_id: user.id,
      parent_build_id: original.id,
      name: `Copy of ${original.name}`,
      ...updates
    })
    .select()
    .single()

  if (buildError) throw buildError

  // Clone equipment
  if (original.equipment?.length) {
    const { error: equipError } = await supabase
      .from('equipment')
      .insert(
        original.equipment.map((item: any) => ({
          ...item,
          id: undefined,
          build_id: newBuild.id
        }))
      )

    if (equipError) throw equipError
  }

  // Clone skill gems
  if (original.skill_gems?.length) {
    const { error: gemsError } = await supabase
      .from('skill_gems')
      .insert(
        original.skill_gems.map((gem: any) => ({
          ...gem,
          id: undefined,
          build_id: newBuild.id
        }))
      )

    if (gemsError) throw gemsError
  }

  // Clone build configs
  if (original.build_configs?.length) {
    const { error: configError } = await supabase
      .from('build_configs')
      .insert(
        original.build_configs.map((config: any) => ({
          ...config,
          id: undefined,
          build_id: newBuild.id
        }))
      )

    if (configError) throw configError
  }

  revalidatePath('/build-planner')
  return newBuild
}
