import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = process.env.POE2_DEV_URL ?? "http://localhost:3000";
const buildPath = path.join(repositoryRoot, "public", "builds", "untether_gemling_123.build");
const screenshotDirectory = path.join(repositoryRoot, "qa");

fs.mkdirSync(screenshotDirectory, { recursive: true });

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });

const errors = [];
let phase = "startup";
function captureErrors(targetPage) {
  targetPage.on("console", (message) => {
    if (message.type() === "error") {
      const location = message.location();
      errors.push(`[${phase}] [${location.url || "unknown"}] ${message.text()}`);
    }
  });
  targetPage.on("pageerror", (error) => errors.push(`[${phase}] ${error.message}`));
}
captureErrors(page);

async function waitForLoadedBuild() {
  await page.waitForFunction(
    () => document.body.textContent?.includes("Loaded 123 passives from") === true,
    { timeout: 30_000 }
  );
  await page.waitForFunction(() => document.body.textContent?.includes("Allocated:123") === true, {
    timeout: 30_000,
  });
}

try {
  phase = "query auto-load";
  await page.goto(`${baseUrl}/skill-tree?build=/builds/untether_gemling_123.build`, {
    waitUntil: "networkidle0",
  });
  await waitForLoadedBuild();

  const fitButton = await page.waitForSelector('button[title="Fit to view"]');
  await fitButton.click();
  await page.waitForFunction(
    () => document.querySelectorAll('[data-allocated="true"]').length === 123,
    { timeout: 30_000 }
  );

  const autoLoadState = await page.evaluate(() => ({
    allocated: document.querySelectorAll('[data-allocated="true"]').length,
    connections: document.querySelectorAll('svg[aria-label$="allocated passive connections"] line')
      .length,
    text: document.body.innerText,
  }));
  assert.equal(autoLoadState.allocated, 123);
  assert.equal(autoLoadState.connections, 117);
  assert.match(autoLoadState.text, /Ascendancy:\s*Gemling Legionnaire/);
  const treeVersion = JSON.parse(
    fs.readFileSync(
      path.join(repositoryRoot, "public", "data", "passive-tree-version.json"),
      "utf8"
    )
  );
  assert.ok(
    autoLoadState.text.includes(
      `Data: ${treeVersion.gameVersion} tree · compatible through ${treeVersion.compatibleThrough}`
    )
  );
  await page.screenshot({
    path: path.join(screenshotDirectory, "untether-auto-loaded.png"),
    fullPage: true,
  });

  // Exercise the visible file-input path separately from query-based auto-load.
  phase = "manual import navigation";
  const importPage = await browser.newPage();
  await importPage.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });
  captureErrors(importPage);
  await importPage.goto(`${baseUrl}/skill-tree`, { waitUntil: "networkidle0" });
  phase = "manual file upload";
  const fileInput = await importPage.waitForSelector('input[type="file"]');
  await fileInput.uploadFile(buildPath);
  await importPage.waitForFunction(
    () => document.body.textContent?.includes("Loaded 123 passives from") === true,
    { timeout: 30_000 }
  );
  await importPage.waitForFunction(
    () => document.body.textContent?.includes("Allocated:123") === true,
    { timeout: 30_000 }
  );
  assert.match(await importPage.evaluate(() => document.body.innerText), /Gemling Legionnaire/);

  // Search confirms the imported IDs resolve to current node names and details.
  phase = "node search";
  await importPage.evaluate(() => {
    const searchTab = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Search"
    );
    if (!(searchTab instanceof HTMLButtonElement)) throw new Error("Search tab was not found");
    searchTab.click();
  });
  const searchInput = await importPage.waitForSelector('input[placeholder*="Search"]');
  await searchInput.type("Mind Over Matter");
  await importPage.waitForFunction(
    () => document.body.textContent?.includes("Mind Over Matter") === true,
    { timeout: 10_000 }
  );

  // Junk ?p= ids must be dropped, leaving the tree allocatable by keyboard.
  phase = "junk ?p= ids";
  const junkPage = await browser.newPage();
  await junkPage.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });
  await junkPage.goto(`${baseUrl}/skill-tree?p=PrAOCcHsBdJAaAxpAdgZ2uAro256wDKmAligOZA`, {
    waitUntil: "networkidle0",
  });
  await (await junkPage.waitForSelector('button[title="Fit to view"]')).click();
  await junkPage.waitForSelector('[role="button"][data-node-id]');
  const pressed = await junkPage.evaluate(async () => {
    const nodes = Array.from(document.querySelectorAll('[role="button"][data-node-id]')).slice(
      0,
      80
    );
    for (const node of nodes) {
      node.focus();
      node.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (node.getAttribute("aria-pressed") === "true") return node.getAttribute("data-node-id");
    }
    return null;
  });
  assert.ok(pressed, "no node became aria-pressed after Enter with junk ?p= ids");

  const relevantErrors = errors.filter(
    (error) => !error.includes("Failed to load resource") && !error.includes("favicon")
  );
  assert.deepEqual(relevantErrors, []);

  console.log(
    JSON.stringify(
      {
        autoLoad: "passed",
        fileImport: "passed",
        allocatedNodes: autoLoadState.allocated,
        allocatedConnections: autoLoadState.connections,
        ascendancy: "Gemling Legionnaire",
        search: "passed",
        junkParamKeyboard: pressed,
        screenshot: "qa/untether-auto-loaded.png",
      },
      null,
      2
    )
  );
} finally {
  await browser.close();
}
