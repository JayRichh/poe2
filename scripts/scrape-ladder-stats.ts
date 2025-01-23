import { scrapeLadderStats, saveLadderStats } from "./ladder-service";

async function main() {
  try {
    console.log("Scraping ladder statistics...");
    const stats = await scrapeLadderStats();
    
    console.log("Saving ladder statistics...");
    await saveLadderStats(stats);
    
    console.log("Successfully updated ladder statistics");
  } catch (error) {
    console.error("Error updating ladder statistics:", error);
    process.exit(1);
  }
}

main();
