import { headers } from "next/headers";

/** Renders schema.org JSON-LD as a real script tag (server component). */
export async function JsonLd({ data }: { data: object | object[] }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const graph = (Array.isArray(data) ? data : [data]).map((d) => ({
    "@context": "https://schema.org",
    ...d,
  }));
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      // "<" escaped so article text can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\u003c") }}
    />
  );
}
