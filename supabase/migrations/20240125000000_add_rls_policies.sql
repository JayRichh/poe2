-- Add build_settings validation
alter table profiles
  add constraint build_settings_schema check (
    build_settings is null or 
    jsonb_typeof(build_settings) = 'object' and
    (build_settings->>'defaultVisibility' is null or 
     build_settings->>'defaultVisibility' in ('private', 'unlisted', 'public')) and
    (build_settings->>'autoSync' is null or 
     jsonb_typeof(build_settings->>'autoSync') = 'boolean')
  );

alter table builds
  add constraint valid_name_length check (length(name) between 2 and 100),
  add constraint valid_description_length check (description is null or length(description) <= 2000),
  add constraint valid_notes_length check (notes is null or length(notes) <= 10000);

alter table equipment
  add constraint valid_name_length check (length(name) between 1 and 100),
  add constraint valid_base_type_length check (base_type is null or length(base_type) <= 100);

alter table skill_gems
  add constraint valid_name_length check (length(name) between 1 and 100);

alter table build_configs
  add constraint valid_name_length check (length(name) between 1 and 100),
  add constraint valid_type_length check (length(type) <= 50),
  add constraint valid_settings_size check (octet_length(settings::text) <= 10240); -- 10KB limit
