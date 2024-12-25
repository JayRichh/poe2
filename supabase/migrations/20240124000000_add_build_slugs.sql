DO $$ 
BEGIN
    -- Add slug column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'builds' 
        AND column_name = 'slug'
    ) THEN
        ALTER TABLE public.builds ADD COLUMN slug text;
    END IF;

    -- Drop existing index if it exists
    DROP INDEX IF EXISTS idx_builds_slug;
    
    -- Create new unique index for public builds
    CREATE UNIQUE INDEX idx_builds_slug 
    ON public.builds(slug) 
    WHERE visibility = 'public';

    -- Update existing builds with slugs
    UPDATE public.builds 
    SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || SUBSTRING(id::text, 1, 8)
    WHERE slug IS NULL;

    -- Drop existing constraint if it exists (Optional)
    -- Since we're using a unique index, a table-level unique constraint isn't necessary.
    -- However, if there are other constraints related to 'slug', ensure they are handled appropriately.
    ALTER TABLE public.builds 
    DROP CONSTRAINT IF EXISTS unique_public_slug;

    -- Remove the invalid ADD CONSTRAINT statement
    -- ALTER TABLE public.builds 
    -- ADD CONSTRAINT unique_public_slug UNIQUE (slug) WHERE visibility = 'public';

    -- Make slug required for new builds
    ALTER TABLE public.builds 
    ALTER COLUMN slug SET NOT NULL;
END $$;
