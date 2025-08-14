import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
// import dotenv from 'dotenv';

// Load environment variables from .env.local
// dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

// Initialize Supabase client with service role key for admin privileges
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  // Set auth header to bypass RLS
  global: {
    headers: {
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
    }
  }
});

async function main() {
  try {
    // Migrate patch notes
    console.log('Migrating patch notes...');
    const patchNotesPath = path.join(process.cwd(), 'public', 'data', 'patch-notes.json');
    const patchNotes = JSON.parse(fs.readFileSync(patchNotesPath, 'utf8'));
    
    const { error: patchNotesError } = await supabase
      .from('patch_notes')
      .upsert(
        patchNotes.map((note: any) => {
          // Create a new object with snake_case keys
          const { imageUrl, lastReplyBy, lastReplyDate, ...rest } = note;
          return {
            ...rest,
            date: new Date(note.date).toISOString(),
            last_reply_by: lastReplyBy,
            last_reply_date: lastReplyDate ? new Date(lastReplyDate).toISOString() : null,
            image_url: imageUrl,
          };
        }),
        { onConflict: 'id' }
      );
    
    if (patchNotesError) {
      console.error('Error migrating patch notes:', patchNotesError);
    } else {
      console.log(`Successfully migrated ${patchNotes.length} patch notes`);
    }
    
    // Migrate ladder stats
    console.log('Migrating ladder stats...');
    const ladderStatsPath = path.join(process.cwd(), 'public', 'data', 'ladder-stats.json');
    const ladderStats = JSON.parse(fs.readFileSync(ladderStatsPath, 'utf8'));
    
    const { error: ladderStatsError } = await supabase
      .from('ladder_stats')
      .insert({
        timestamp: new Date(ladderStats.timestamp).toISOString(),
        data: ladderStats
      });
    
    if (ladderStatsError) {
      console.error('Error migrating ladder stats:', ladderStatsError);
    } else {
      console.log('Successfully migrated ladder stats');
    }
    
    console.log('Migration completed');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();
