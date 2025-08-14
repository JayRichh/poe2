// For node-fetch v3, we need to use ESM import
import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// Load environment variables from .env.local
// dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

async function main() {
  try {
    console.log('Testing scraper Edge Function...');
    
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/run-scrapers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({})
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to call Edge Function: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Scraper result:', result);
    
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Error testing scraper:', error);
    process.exit(1);
  }
}

main();
