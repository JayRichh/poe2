import { describe, expect, it } from "vitest";

import { serializeJsonLd } from "./jsonld";

describe("serializeJsonLd", () => {
  it("never emits a raw '<' so a title cannot close the script tag", () => {
    const out = serializeJsonLd({ "@type": "Article", headline: "x</script><script>alert(1)</script>" });
    expect(out).not.toContain("</");
    expect(out).not.toContain("<");
    expect(out).toContain("\\u003c/script>");
    expect(JSON.parse(out)[0].headline).toBe("x</script><script>alert(1)</script>");
  });
});
