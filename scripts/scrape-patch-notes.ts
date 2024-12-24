import { savePatchNotes, scrapePatchNotes } from "./patch-notes-service";

async function main() {
  console.log("Starting patch notes scraper...");

  try {
    const patchNotes = await scrapePatchNotes();
    console.log(`Found ${patchNotes.length} patch notes`);

    await savePatchNotes(patchNotes);
    console.log("Patch notes saved successfully");
  } catch (error) {
    console.error("Error running scraper:", error);
    process.exit(1);
  }
}

main();
