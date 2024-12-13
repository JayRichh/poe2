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

    // First get all groups for this user
    const { data: groups, error: groupsError } = await supabase
      .from('groups')
      .select('id')
      .eq('user_id', user.id)
    if (groupsError) throw groupsError
    const groupIds = groups.map(g => g.id)

    if (groupIds.length > 0) {
      // Get all members in these groups
      const { data: members, error: membersError } = await supabase
        .from('members')
        .select('id')
        .in('group_id', groupIds)
      if (membersError) throw membersError
      const memberIds = members.map(m => m.id)

      if (memberIds.length > 0) {
        // Delete all gifts for these members
        const { error: giftsError } = await supabase
          .from('gifts')
          .delete()
          .in('member_id', memberIds)
        if (giftsError) throw giftsError
      }

      // Delete all members in these groups
      const { error: membersDeleteError } = await supabase
        .from('members')
        .delete()
        .in('group_id', groupIds)
      if (membersDeleteError) throw membersDeleteError

      // Delete all groups
      const { error: groupsDeleteError } = await supabase
        .from('groups')
        .delete()
        .eq('user_id', user.id)
      if (groupsDeleteError) throw groupsDeleteError
    }

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
