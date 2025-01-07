import { savePatchNotes, saveAnnouncements, scrapePatchNotes } from "./patch-notes-service";

async function main() {
  console.log("Starting news scraper...");

  try {
    const allPosts = await scrapePatchNotes();
    const announcements = allPosts.filter(post => post.type === 'announcement');
    const patchNotes = allPosts.filter(post => post.type === 'patch-note');
    
    console.log(`Found ${announcements.length} announcements and ${patchNotes.length} patch notes`);

    await Promise.all([
      savePatchNotes(allPosts),
      saveAnnouncements(allPosts)
    ]);
    
    console.log("News posts saved successfully");
  } catch (error) {
    console.error("Error running scraper:", error);
    process.exit(1);
  }
}

main();
