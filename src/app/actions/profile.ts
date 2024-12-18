'use server'

import { getServerClient } from '~/app/_actions/supabase'
import { revalidatePath } from 'next/cache'

export async function updateProfile(name: string) {
  const supabase = await getServerClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError) throw userError
  if (!user) throw new Error('Not authenticated')

  // Update auth metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: { name }
  })

  if (updateError) throw updateError

  // Update profile
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ name })
    .eq('id', user.id)

  if (profileError) throw profileError

  revalidatePath('/profile')
}

export async function updatePassword(newPassword: string) {
  const supabase = await getServerClient()

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) throw error
}

export async function deleteAccount() {
  const supabase = await getServerClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError) throw userError
  if (!user) throw new Error('Not authenticated')

  // Delete profile (cascades to other data via DB triggers)
  const { error: deleteError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', user.id)

  if (deleteError) throw deleteError

  // Sign out after deletion
  await supabase.auth.signOut()
}
