-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE visibility_type AS ENUM ('public', 'private', 'unlisted');
CREATE TYPE equipment_slot AS ENUM (
  'mainhand',
  'offhand',
  'helm',
  'body',
  'gloves',
  'boots',
  'amulet',
  'ring1',
  'ring2',
  'belt'
);
CREATE TYPE gem_type AS ENUM ('active', 'support');
CREATE TYPE socket_color AS ENUM ('R', 'G', 'B', 'W', 'A', 'DV');

-- Create profiles table with POE integration
CREATE TABLE profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text,
  name text,
  poe_account jsonb,
  poe_refresh_token text,
  theme text DEFAULT 'system',
  default_build_visibility visibility_type DEFAULT 'private',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT poe_account_validation CHECK (
    poe_account IS NULL OR (
      poe_account ? 'connected' AND
      poe_account->>'connected' IS NOT NULL AND
      (poe_account->>'accountName' IS NULL OR jsonb_typeof(poe_account->'accountName') = 'string') AND
      (poe_account->>'lastSync' IS NULL OR jsonb_typeof(poe_account->'lastSync') = 'string')
    )
  )
);

-- Create builds table
CREATE TABLE builds (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  visibility visibility_type DEFAULT 'private',
  poe_class text,
  level integer,
  notes text,
  is_template boolean DEFAULT false,
  parent_build_id uuid REFERENCES builds(id),
  version text,
  tags text[],
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create equipment table matching POE API structure
CREATE TABLE equipment (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  build_id uuid REFERENCES builds(id) ON DELETE CASCADE,
  slot equipment_slot NOT NULL,
  name text NOT NULL,
  base_type text,
  type_line text,
  width integer NOT NULL DEFAULT 1,
  height integer NOT NULL DEFAULT 1,
  icon text,
  rarity text CHECK (rarity IN ('Normal', 'Magic', 'Rare', 'Unique')),
  identified boolean NOT NULL DEFAULT true,
  item_level integer,
  requirements jsonb,
  influences jsonb DEFAULT '{}'::jsonb,
  properties jsonb[] DEFAULT array[]::jsonb[],
  sockets jsonb[] DEFAULT array[]::jsonb[],
  implicit_mods text[] DEFAULT array[]::text[],
  explicit_mods text[] DEFAULT array[]::text[],
  crafted_mods text[] DEFAULT array[]::text[],
  corrupted boolean DEFAULT false,
  frame_type integer CHECK (frame_type BETWEEN 0 AND 11),
  stats jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create validation functions for equipment
CREATE OR REPLACE FUNCTION validate_equipment_json()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate influences
  IF NEW.influences IS NOT NULL AND (
    jsonb_typeof(NEW.influences) != 'object' OR
    NOT (
      NEW.influences ?| array['elder', 'shaper', 'searing', 'tangled']
    )
  ) THEN
    RAISE EXCEPTION 'Invalid influences format';
  END IF;

  -- Validate properties
  IF NEW.properties IS NOT NULL THEN
    FOR i IN 1..array_length(NEW.properties, 1) LOOP
      IF jsonb_typeof(NEW.properties[i]) != 'object' OR
         NOT (NEW.properties[i] ? 'name' AND NEW.properties[i] ? 'values') OR
         jsonb_typeof(NEW.properties[i]->'values') != 'array' THEN
        RAISE EXCEPTION 'Invalid property format at index %', i;
      END IF;
    END LOOP;
  END IF;

  -- Validate sockets
  IF NEW.sockets IS NOT NULL THEN
    FOR i IN 1..array_length(NEW.sockets, 1) LOOP
      IF jsonb_typeof(NEW.sockets[i]) != 'object' OR
         NOT (NEW.sockets[i] ? 'group' AND NEW.sockets[i] ? 'attr') THEN
        RAISE EXCEPTION 'Invalid socket format at index %', i;
      END IF;
    END LOOP;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create equipment validation triggers
CREATE TRIGGER validate_equipment_before_insert
  BEFORE INSERT ON equipment
  FOR EACH ROW
  EXECUTE FUNCTION validate_equipment_json();

CREATE TRIGGER validate_equipment_before_update
  BEFORE UPDATE ON equipment
  FOR EACH ROW
  EXECUTE FUNCTION validate_equipment_json();

-- Create skill gems table matching POE API structure
CREATE TABLE skill_gems (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  build_id uuid REFERENCES builds(id) ON DELETE CASCADE,
  equipment_id uuid REFERENCES equipment(id) ON DELETE CASCADE,
  name text NOT NULL,
  type gem_type NOT NULL,
  color socket_color,
  level integer DEFAULT 1,
  quality integer DEFAULT 0,
  socket_group integer,
  socket_index integer,
  support_skill boolean DEFAULT false,
  properties jsonb[] DEFAULT array[]::jsonb[],
  requirements jsonb[] DEFAULT array[]::jsonb[],
  added_mods text[] DEFAULT array[]::text[],
  tags text[],
  stats jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT valid_level CHECK (level BETWEEN 1 AND 21),
  CONSTRAINT valid_quality CHECK (quality BETWEEN 0 AND 23),
  CONSTRAINT valid_socket_index CHECK (socket_index >= 0)
);

-- Create build configurations table
CREATE TABLE build_configs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  build_id uuid REFERENCES builds(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  settings jsonb NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes
CREATE INDEX idx_profiles_poe_account_name ON profiles ((poe_account->>'accountName')) WHERE poe_account->>'connected' = 'true';
CREATE INDEX idx_builds_user ON builds(user_id);
CREATE INDEX idx_builds_visibility ON builds(visibility);
CREATE INDEX idx_equipment_build ON equipment(build_id);
CREATE INDEX idx_equipment_rarity ON equipment(rarity);
CREATE INDEX idx_equipment_frame_type ON equipment(frame_type);
CREATE INDEX idx_skill_gems_build ON skill_gems(build_id);
CREATE INDEX idx_skill_gems_equipment ON skill_gems(equipment_id);
CREATE INDEX idx_skill_gems_color ON skill_gems(color);
CREATE INDEX idx_build_configs_build ON build_configs(build_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at triggers
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER builds_updated_at
  BEFORE UPDATE ON builds
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER equipment_updated_at
  BEFORE UPDATE ON equipment
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER skill_gems_updated_at
  BEFORE UPDATE ON skill_gems
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER build_configs_updated_at
  BEFORE UPDATE ON build_configs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_gems ENABLE ROW LEVEL SECURITY;
ALTER TABLE build_configs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Builds policies
CREATE POLICY "Builds are viewable by owner"
  ON builds FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Public builds are viewable by everyone"
  ON builds FOR SELECT
  USING (visibility = 'public');

CREATE POLICY "Builds are insertable by owner"
  ON builds FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Builds are updatable by owner"
  ON builds FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Builds are deletable by owner"
  ON builds FOR DELETE
  USING (auth.uid() = user_id);

-- Equipment policies
CREATE POLICY "Equipment is viewable by build owner"
  ON equipment FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = equipment.build_id AND builds.user_id = auth.uid()
  ));

CREATE POLICY "Equipment is viewable with public builds"
  ON equipment FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = equipment.build_id AND builds.visibility = 'public'
  ));

CREATE POLICY "Equipment is insertable by build owner"
  ON equipment FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = equipment.build_id AND builds.user_id = auth.uid()
  ));

CREATE POLICY "Equipment is updatable by build owner"
  ON equipment FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = equipment.build_id AND builds.user_id = auth.uid()
  ));

CREATE POLICY "Equipment is deletable by build owner"
  ON equipment FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = equipment.build_id AND builds.user_id = auth.uid()
  ));

-- Skill gems policies
CREATE POLICY "Skill gems are viewable by build owner"
  ON skill_gems FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = skill_gems.build_id AND builds.user_id = auth.uid()
  ));

CREATE POLICY "Skill gems are viewable with public builds"
  ON skill_gems FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = skill_gems.build_id AND builds.visibility = 'public'
  ));

CREATE POLICY "Skill gems are insertable by build owner"
  ON skill_gems FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = skill_gems.build_id AND builds.user_id = auth.uid()
  ));

CREATE POLICY "Skill gems are updatable by build owner"
  ON skill_gems FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = skill_gems.build_id AND builds.user_id = auth.uid()
  ));

CREATE POLICY "Skill gems are deletable by build owner"
  ON skill_gems FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = skill_gems.build_id AND builds.user_id = auth.uid()
  ));

-- Build configs policies
CREATE POLICY "Build configs are viewable by build owner"
  ON build_configs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = build_configs.build_id AND builds.user_id = auth.uid()
  ));

CREATE POLICY "Build configs are viewable with public builds"
  ON build_configs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = build_configs.build_id AND builds.visibility = 'public'
  ));

CREATE POLICY "Build configs are insertable by build owner"
  ON build_configs FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = build_configs.build_id AND builds.user_id = auth.uid()
  ));

CREATE POLICY "Build configs are updatable by build owner"
  ON build_configs FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = build_configs.build_id AND builds.user_id = auth.uid()
  ));

CREATE POLICY "Build configs are deletable by build owner"
  ON build_configs FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM builds WHERE builds.id = build_configs.build_id AND builds.user_id = auth.uid()
  ));

-- Create function to handle new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
