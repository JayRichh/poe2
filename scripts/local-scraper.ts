// For node-fetch v3, we need to use ESM import
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { DOMParser } from 'linkedom';

// Load environment variables from .env.local if available
dotenv.config({ path: '.env.local' });

// We'll make these optional since we're not saving to Supabase in this local version
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Log if environment variables are missing, but don't exit
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  console.log('Note: Some Supabase environment variables are missing. Data will not be saved to Supabase.');
}

async function main() {
  try {
    console.log('Running local scraper...');
    
    // Run scrapers
    const [patchNotes, ladderStats] = await Promise.all([
      scrapePatchNotes(),
      scrapeLadderStats()
    ]);
    
    console.log(`Found ${patchNotes.length} patch notes`);
    console.log('Ladder stats timestamp:', ladderStats?.timestamp);
    
    // Save to Supabase if needed
    // This part is commented out for now, uncomment if you want to save to Supabase
    /*
    // Create Supabase client
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseClient = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Save patch notes to database
    if (patchNotes.length > 0) {
      const { error: patchNotesError } = await supabaseClient
        .from('patch_notes')
        .upsert(
          patchNotes.map(note => {
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
        console.error('Error saving patch notes:', patchNotesError);
        throw patchNotesError;
      }
      
      console.log('Patch notes saved to database');
    }
    
    // Save ladder stats to database
    if (ladderStats) {
      const { error: ladderStatsError } = await supabaseClient
        .from('ladder_stats')
        .insert({
          timestamp: new Date(ladderStats.timestamp).toISOString(),
          data: ladderStats
        });
      
      if (ladderStatsError) {
        console.error('Error saving ladder stats:', ladderStatsError);
        throw ladderStatsError;
      }
      
      console.log('Ladder stats saved to database');
    }
    */
    
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Error running local scraper:', error);
    process.exit(1);
  }
}

// Simplified version of the patch notes scraper
async function scrapePatchNotes() {
  const posts = [];
  
  try {
    // Scrape patch notes forum
    const patchNotesResponse = await fetch('https://www.pathofexile.com/forum/view-forum/2212');
    const patchNotesHtml = await patchNotesResponse.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(patchNotesHtml, 'text/html');
    
    if (!doc) {
      throw new Error('Failed to parse HTML');
    }
    
    const threadElements = doc.querySelectorAll('.forumTable tbody tr');
    
    for (let i = 0; i < threadElements.length; i++) {
      const thread = threadElements[i];
      
      const titleElement = thread.querySelector('.thread .title a');
      const dateElement = thread.querySelector('.postBy .post_date');
      const authorElement = thread.querySelector('.postBy .profile-link.post_by_account a');
      const repliesElement = thread.querySelector('.views span');
      const lastReplyByElement = thread.querySelector('.last_post .profile-link a');
      const lastReplyDateElement = thread.querySelector('.last_post .post_date a');
      
      if (!titleElement || !dateElement || !authorElement) continue;
      
      const title = titleElement.textContent?.trim() || '';
      
      // Only include patch notes
      if (!title.toLowerCase().includes('patch notes') && !title.toLowerCase().includes('hotfix')) {
        continue;
      }
      
      const threadUrl = titleElement.getAttribute('href') || '';
      const threadId = threadUrl.split('/')[3] || '';
      
      // Get thread content
      const threadResponse = await fetch(`https://www.pathofexile.com${threadUrl}`);
      const threadHtml = await threadResponse.text();
      const threadDoc = parser.parseFromString(threadHtml, 'text/html');
      
      if (!threadDoc) continue;
      
      const staffPost = threadDoc.querySelector('tr.newsPost') || threadDoc.querySelector('tr.staff');
      if (!staffPost) continue;
      
      const contentElement = staffPost.querySelector('.content');
      const imageElement = staffPost.querySelector('.content img');
      
      if (!contentElement) continue;
      
      posts.push({
        id: threadId,
        title,
        date: dateElement.textContent?.replace(',', '').trim() || '',
        url: `https://www.pathofexile.com${threadUrl}`,
        content: contentElement.innerHTML || '',
        author: authorElement.textContent?.trim() || '',
        replies: parseInt(repliesElement?.textContent || '0', 10),
        lastReplyBy: lastReplyByElement?.textContent?.trim(),
        lastReplyDate: lastReplyDateElement?.textContent?.trim(),
        type: 'patch-note',
        imageUrl: imageElement?.getAttribute('src'),
      });
    }
    
    // Sort by date, newest first
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error scraping patch notes:', error);
    return [];
  }
}

// Simplified version of the ladder stats scraper
async function scrapeLadderStats() {
  try {
    const LADDER_URLS: Record<string, string> = {
      Standard: "https://pathofexile2.com/ladder/Standard",
      Hardcore: "https://pathofexile2.com/ladder/Hardcore",
      SSF: "https://pathofexile2.com/ladder/Solo%2520Self-Found",
      "HC SSF": "https://pathofexile2.com/ladder/Hardcore%2520SSF",
    };
    
    const ladderData: Record<string, any[]> = {};
    
    for (const [name, url] of Object.entries(LADDER_URLS)) {
      console.log(`Scraping ${name} ladder...`);
      
      const response = await fetch(url);
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      if (!doc) {
        console.error(`Failed to parse HTML for ${name} ladder`);
        continue;
      }
      
      const tableRows = doc.querySelectorAll(".league-ladder__entry");
      const entries = [];
      
      for (let i = 0; i < tableRows.length; i++) {
        const row = tableRows[i];
        const cells = row.querySelectorAll("td");
        
        if (cells.length < 6) continue;
        
        entries.push({
          rank: parseInt(cells[0]?.textContent || "0", 10),
          account: cells[1]?.querySelector("a")?.textContent?.trim() || "",
          character: cells[2]?.textContent?.trim() || "",
          class: cells[3]?.textContent?.trim() || "",
          level: parseInt(cells[4]?.textContent || "0", 10),
          experience: parseInt(cells[5]?.textContent?.replace(/,/g, "") || "0", 10),
        });
      }
      
      ladderData[name] = entries;
    }
    
    const allEntries = Object.values(ladderData).flat();
    
    // Calculate class distribution
    const classCounts: Record<string, number> = {};
    for (const entry of allEntries) {
      classCounts[entry.class] = (classCounts[entry.class] || 0) + 1;
    }
    
    const total = allEntries.length;
    const distribution = Object.entries(classCounts)
      .map(([className, count]) => ({
        className,
        count,
        percentage: Math.round(((count / total) * 100) * 10) / 10,
      }))
      .sort((a, b) => b.count - a.count);
    
    // Build the stats object
    const stats: {
      timestamp: string;
      ladders: Record<string, any>;
      overall: {
        total: number;
        distribution: Array<{
          className: string;
          count: number;
          percentage: number;
        }>;
      };
    } = {
      timestamp: new Date().toISOString(),
      ladders: {},
      overall: {
        total,
        distribution,
      },
    };
    
    for (const [name, entries] of Object.entries(ladderData)) {
      // Calculate distribution for this ladder
      const ladderClassCounts: Record<string, number> = {};
      for (const entry of entries) {
        ladderClassCounts[entry.class] = (ladderClassCounts[entry.class] || 0) + 1;
      }
      
      const ladderTotal = entries.length;
      const ladderDistribution = Object.entries(ladderClassCounts)
        .map(([className, count]) => ({
          className,
          count,
          percentage: Math.round(((count / ladderTotal) * 100) * 10) / 10,
        }))
        .sort((a, b) => b.count - a.count);
      
      stats.ladders[name] = {
        total: ladderTotal,
        distribution: ladderDistribution,
      };
    }
    
    return stats;
  } catch (error) {
    console.error('Error scraping ladder stats:', error);
    return null;
  }
}

main();
