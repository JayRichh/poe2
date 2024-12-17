'use server'

import { createClient } from '~/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(name: string) {
  const supabase = createClient()
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
  return { success: true }
}

export async function updatePassword(newPassword: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) throw error
  return { success: true }
}
