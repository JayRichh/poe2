-- Add nullable description column to groups table
alter table public.groups 
add column description text null;
