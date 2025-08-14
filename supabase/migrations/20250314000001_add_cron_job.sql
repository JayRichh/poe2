-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a function to run the scraper
CREATE OR REPLACE FUNCTION run_scrapers()
RETURNS void AS $$
BEGIN
  -- Call our Edge Function
  PERFORM net.http_post(
    'https://jcumrdfiiuggbwuqcrer.supabase.co/functions/v1/run-scrapers',
    '{}',
    format('{"Authorization": "Bearer %s"}', current_setting('app.settings.anon_key')),
    'application/json'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Schedule the job to run daily at midnight
SELECT cron.schedule(
  'daily-scrapers',
  '0 0 * * *',  -- Run at midnight every day
  'SELECT run_scrapers()'
);
