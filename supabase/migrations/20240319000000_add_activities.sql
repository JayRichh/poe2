create type activity_type as enum ('build', 'profile', 'settings', 'connection');

create table activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  type activity_type not null,
  title text not null,
  description text,
  metadata jsonb,
  created_at timestamptz default now() not null
);

create index activities_user_id_idx on activities(user_id);
create index activities_created_at_idx on activities(created_at desc);

-- Add RLS policies
alter table activities enable row level security;

create policy "Users can view their own activities"
  on activities for select
  using (auth.uid() = user_id);

create policy "Users can insert their own activities"
  on activities for insert
  with check (auth.uid() = user_id);
