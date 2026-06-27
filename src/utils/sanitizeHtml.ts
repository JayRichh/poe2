import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize untrusted HTML before it reaches a `dangerouslySetInnerHTML` sink.
 *
 * The news / patch-notes content is scraped verbatim from third-party forum
 * posts (pathofexile.com), so it must be treated as hostile: a post containing
 * `<script>`, `<img onerror>`, `<iframe>`, or a `javascript:` URL would
 * otherwise execute on our origin (stored XSS). DOMPurify strips active markup
 * while keeping the formatting tags these articles actually use.
 *
 * isomorphic-dompurify runs in both the server (jsdom) and the browser, so this
 * is safe to call from Server Components and Client Components alike.
 */
export function sanitizeHtml(dirty: string | null | undefined): string {
  return DOMPurify.sanitize(dirty ?? "", {
    USE_PROFILES: { html: true },
    // Allow links to open safely in a new tab.
    ADD_ATTR: ["target", "rel"],
    FORBID_TAGS: ["style", "iframe", "form"],
  });
}
