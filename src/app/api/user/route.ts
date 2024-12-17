import { createClient } from '~/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE() {
  const supabase = createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Delete builds and related data
    const { error: buildsError } = await supabase
      .from('builds')
      .delete()
      .eq('user_id', user.id)
    if (buildsError) throw buildsError

    // Delete equipment
    const { error: equipmentError } = await supabase
      .from('equipment')
      .delete()
      .eq('user_id', user.id)
    if (equipmentError) throw equipmentError

    // Delete skill gems
    const { error: skillGemsError } = await supabase
      .from('skill_gems')
      .delete()
      .eq('user_id', user.id)
    if (skillGemsError) throw skillGemsError

    // Delete build configs
    const { error: buildConfigsError } = await supabase
      .from('build_configs')
      .delete()
      .eq('user_id', user.id)
    if (buildConfigsError) throw buildConfigsError

    // Delete profile (which will trigger auth.users deletion via our function)
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', user.id)
    if (profileError) throw profileError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
