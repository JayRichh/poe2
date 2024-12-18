import { getServerClient } from '~/lib/supabase/actions'
import { revalidatePath } from 'next/cache'
import type { Database } from '~/lib/supabase/types'

type Build = Database['public']['Tables']['builds']['Row']
type BuildInsert = Database['public']['Tables']['builds']['Insert']
type BuildUpdate = Database['public']['Tables']['builds']['Update']

interface BuildWithRelations extends Build {
  equipment?: Database['public']['Tables']['equipment']['Row'][]
  skill_gems?: Database['public']['Tables']['skill_gems']['Row'][]
  build_configs?: Database['public']['Tables']['build_configs']['Row'][]
}

export async function createBuild(build: BuildInsert) {
  const supabase = await getServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in to create builds')

  const { data, error } = await supabase
    .from('builds')
    .insert([{ ...build, user_id: user.id }])
    .select()
    .single()

  if (error) throw error

  revalidatePath('/build-planner')
  return data
}

export async function updateBuild(id: string, updates: BuildUpdate) {
  const supabase = await getServerClient()

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

  revalidatePath(`/build-planner/${id}`)
  return data
}

export async function deleteBuild(id: string) {
  const supabase = await getServerClient()

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

export async function getBuild(id: string): Promise<BuildWithRelations> {
  const supabase = await getServerClient()

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
  if (!data) throw new Error('Build not found')

  // Check visibility
  if (data.visibility !== 'public') {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || data.user_id !== user.id) {
      throw new Error('Build not found or unauthorized')
    }
  }

  return data
}

export async function getBuilds({
  userId,
  visibility = 'public'
}: {
  userId?: string
  visibility?: 'public' | 'private' | 'unlisted'
} = {}): Promise<Build[]> {
  const supabase = await getServerClient()

  let query = supabase
    .from('builds')
    .select()
    .order('created_at', { ascending: false })

  if (userId) {
    query = query.eq('user_id', userId)
  }

  if (visibility) {
    query = query.eq('visibility', visibility)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function cloneBuild(id: string, updates: Partial<BuildInsert> = {}) {
  const supabase = await getServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in to clone builds')

  // Get original build with relations
  const original = await getBuild(id)

  // Create new build
  const { data: newBuild, error: buildError } = await supabase
    .from('builds')
    .insert([{
      ...original,
      ...updates,
      id: undefined,
      user_id: user.id,
      created_at: undefined,
      updated_at: undefined
    }])
    .select()
    .single()

  if (buildError) throw buildError

  // Clone relations if they exist
  if (original.equipment?.length) {
    const { error: equipError } = await supabase
      .from('equipment')
      .insert(
        original.equipment.map(item => ({
          ...item,
          id: undefined,
          build_id: newBuild.id,
          created_at: undefined,
          updated_at: undefined
        }))
      )
    if (equipError) throw equipError
  }

  if (original.skill_gems?.length) {
    const { error: gemsError } = await supabase
      .from('skill_gems')
      .insert(
        original.skill_gems.map(gem => ({
          ...gem,
          id: undefined,
          build_id: newBuild.id,
          created_at: undefined,
          updated_at: undefined
        }))
      )
    if (gemsError) throw gemsError
  }

  if (original.build_configs?.length) {
    const { error: configError } = await supabase
      .from('build_configs')
      .insert(
        original.build_configs.map(config => ({
          ...config,
          id: undefined,
          build_id: newBuild.id,
          created_at: undefined,
          updated_at: undefined
        }))
      )
    if (configError) throw configError
  }

  revalidatePath('/build-planner')
  return newBuild
}
