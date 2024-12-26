alter table profiles
  add column if not exists build_settings jsonb default '{"defaultVisibility": "private", "autoSync": false}'::jsonb;

comment on column profiles.build_settings is 'User build settings including default visibility and auto-sync preferences';
