-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create custom types
create type public.gift_status as enum ('planned', 'purchased', 'delivered');

-- Create tables
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text not null,
    name text,
    avatar_url text,
    budget_preferences jsonb,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

create table public.groups (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users on delete cascade not null,
    name text not null,
    slug text not null,
    budget numeric(10,2),
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    unique(user_id, slug)
);

create table public.members (
    id uuid default uuid_generate_v4() primary key,
    group_id uuid references public.groups on delete cascade not null,
    name text not null,
    slug text not null,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    unique(group_id, slug)
);

create table public.gifts (
    id uuid default uuid_generate_v4() primary key,
    member_id uuid references public.members on delete cascade not null,
    name text not null,
    description text,
    cost numeric(10,2) not null,
    status gift_status not null default 'planned',
    tags text[] default array[]::text[],
    priority smallint check (priority between 1 and 3),
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- Create indexes
create index idx_groups_user_id on public.groups(user_id);
create index idx_members_group_id on public.members(group_id);
create index idx_gifts_member_id on public.gifts(member_id);
create index idx_gifts_status on public.gifts(status);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.groups enable row level security;
alter table public.members enable row level security;
alter table public.gifts enable row level security;

-- Create RLS Policies
create policy "Users can view own profile"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Users can update own profile"
    on public.profiles for update
    using (auth.uid() = id);

create policy "Users can delete own profile"
    on public.profiles for delete
    using (auth.uid() = id);

create policy "Users can view own groups"
    on public.groups for select
    using (auth.uid() = user_id);

create policy "Users can create own groups"
    on public.groups for insert
    with check (auth.uid() = user_id);

create policy "Users can update own groups"
    on public.groups for update
    using (auth.uid() = user_id);

create policy "Users can delete own groups"
    on public.groups for delete
    using (auth.uid() = user_id);

create policy "Users can view members in own groups"
    on public.members for select
    using (
        exists (
            select 1 from public.groups
            where groups.id = members.group_id
            and groups.user_id = auth.uid()
        )
    );

create policy "Users can create members in own groups"
    on public.members for insert
    with check (
        exists (
            select 1 from public.groups
            where groups.id = members.group_id
            and groups.user_id = auth.uid()
        )
    );

create policy "Users can update members in own groups"
    on public.members for update
    using (
        exists (
            select 1 from public.groups
            where groups.id = members.group_id
            and groups.user_id = auth.uid()
        )
    );

create policy "Users can delete members in own groups"
    on public.members for delete
    using (
        exists (
            select 1 from public.groups
            where groups.id = members.group_id
            and groups.user_id = auth.uid()
        )
    );

create policy "Users can view gifts for own members"
    on public.gifts for select
    using (
        exists (
            select 1 from public.members
            join public.groups on groups.id = members.group_id
            where members.id = gifts.member_id
            and groups.user_id = auth.uid()
        )
    );

create policy "Users can create gifts for own members"
    on public.gifts for insert
    with check (
        exists (
            select 1 from public.members
            join public.groups on groups.id = members.group_id
            where members.id = gifts.member_id
            and groups.user_id = auth.uid()
        )
    );

create policy "Users can update gifts for own members"
    on public.gifts for update
    using (
        exists (
            select 1 from public.members
            join public.groups on groups.id = members.group_id
            where members.id = gifts.member_id
            and groups.user_id = auth.uid()
        )
    );

create policy "Users can delete gifts for own members"
    on public.gifts for delete
    using (
        exists (
            select 1 from public.members
            join public.groups on groups.id = members.group_id
            where members.id = gifts.member_id
            and groups.user_id = auth.uid()
        )
    );

-- Create functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email)
    values (new.id, new.email);
    return new;
end;
$$ language plpgsql security definer;

-- Create triggers
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Function to delete user
create or replace function delete_user()
returns void as $$
begin
  -- Delete user's profile (which will cascade to groups, members, and gifts)
  delete from auth.users where id = auth.uid();
end;
$$ language plpgsql security definer;
