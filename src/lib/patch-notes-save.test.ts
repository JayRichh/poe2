import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { savePatchNotes } from "../../scripts/patch-notes-service";
import type { NewsPost } from "../../scripts/patch-notes-service";

const post = (id: string, date: string, content = "x"): NewsPost => ({
  id,
  title: id,
  date,
  url: `https://example.test/${id}`,
  content,
  author: "a",
  type: "patch-note",
});

describe("savePatchNotes", () => {
  it("keeps curated entries, updates scraped ones, sorts newest first", async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pn-"));
    const file = path.join(dir, "patch-notes.json");
    fs.writeFileSync(
      file,
      JSON.stringify([post("poe2-0-4-0", "Dec 12, 2025"), post("100", "Sep 3, 2026", "old")])
    );
    await savePatchNotes([post("100", "Sep 3, 2026", "new"), post("200", "Oct 6, 2026")], dir);
    const out: NewsPost[] = JSON.parse(fs.readFileSync(file, "utf8"));
    expect(out.map((p) => p.id)).toEqual(["200", "100", "poe2-0-4-0"]);
    expect(out[1].content).toBe("new");
    fs.rmSync(dir, { recursive: true });
  });
});
