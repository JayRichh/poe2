import { headers } from "next/headers";

import { serializeJsonLd } from "~/utils/jsonld";

/** Renders schema.org JSON-LD as a real script tag (server component). */
export async function JsonLd({ data }: { data: object | object[] }) {
  const nonce = (await headers()).get("x-nonce") || undefined;
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
