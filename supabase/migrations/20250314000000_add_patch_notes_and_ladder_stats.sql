-- Create patch_notes table
CREATE TABLE IF NOT EXISTS patch_notes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  url TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  replies INTEGER,
  last_reply_by TEXT,
  last_reply_date TIMESTAMPTZ,
  type TEXT NOT NULL,
  image_url TEXT,
  slug TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_patch_notes_date ON patch_notes(date);
CREATE INDEX IF NOT EXISTS idx_patch_notes_type ON patch_notes(type);

-- Add RLS policies but disable for now to allow initial data migration
ALTER TABLE patch_notes DISABLE ROW LEVEL SECURITY;

-- Create ladder_stats table
CREATE TABLE IF NOT EXISTS ladder_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMPTZ NOT NULL,
  data JSONB NOT NULL, -- Store the entire ladder stats structure as JSON
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add index for timestamp queries
CREATE INDEX IF NOT EXISTS idx_ladder_stats_timestamp ON ladder_stats(timestamp);

-- Add RLS policies but disable for now to allow initial data migration
ALTER TABLE ladder_stats DISABLE ROW LEVEL SECURITY;

-- Create updated_at trigger function for patch_notes
CREATE OR REPLACE FUNCTION update_patch_notes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at trigger
CREATE TRIGGER patch_notes_updated_at
  BEFORE UPDATE ON patch_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_patch_notes_updated_at();
