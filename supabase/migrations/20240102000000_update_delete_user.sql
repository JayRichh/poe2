-- Drop existing function
drop function if exists delete_user();

-- Create updated function with proper user deletion
create or replace function delete_user()
returns void as $$
declare
  v_user_id uuid;
begin
  -- Get current user ID
  v_user_id := auth.uid();
  
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  -- Delete profile (which will cascade to groups, members, and gifts)
  delete from public.profiles where id = v_user_id;
  
  -- Delete auth user using Supabase's admin function
  perform supabase_admin.delete_user(v_user_id::text);
end;
$$ language plpgsql security definer;

-- Grant execute permission to authenticated users
grant execute on function delete_user to authenticated;
