import { serve } from 'std/http/server.ts';
import { createClient } from 'supabase';
import { DOMParser } from 'deno-dom';
import { NewsPost, PatchNote } from './types.ts';

// Puppeteer is not available in Deno, so we'll use fetch and DOM parsing instead
// This is a simplified version of the scraper that will work in the Edge Function environment

serve(async (req) => {
  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    console.log('Starting scrapers...');
    
    // Run scrapers
    const [patchNotes, ladderStats] = await Promise.all([
      scrapePatchNotes(),
      scrapeLadderStats()
    ]);
    
    console.log(`Found ${patchNotes.length} patch notes`);
    
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
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Scrapers ran successfully',
        patchNotesCount: patchNotes.length,
        ladderStatsTimestamp: ladderStats?.timestamp
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error running scrapers:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

// Simplified version of the patch notes scraper
async function scrapePatchNotes(): Promise<NewsPost[]> {
  const posts: NewsPost[] = [];
  
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
    const LADDER_URLS = {
      Standard: "https://pathofexile2.com/ladder/Standard",
      Hardcore: "https://pathofexile2.com/ladder/Hardcore",
      SSF: "https://pathofexile2.com/ladder/Solo%2520Self-Found",
      "HC SSF": "https://pathofexile2.com/ladder/Hardcore%2520SSF",
    };
    
    const ladderData: { [key: string]: any[] } = {};
    
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
    const stats = {
      timestamp: new Date().toISOString(),
      ladders: {} as Record<string, any>,
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
