/** Serialise JSON-LD for an inline script tag; "<" becomes the six characters < so "</script>" cannot close it. */
export function serializeJsonLd(data: object | object[]): string {
  const graph = (Array.isArray(data) ? data : [data]).map((d) => ({
    "@context": "https://schema.org",
    ...d,
  }));
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
