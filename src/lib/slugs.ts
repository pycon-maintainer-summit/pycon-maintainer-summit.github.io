/*
 * Speakers and topics live in subdirectories named after their event id,
 * e.g. src/content/speakers/2026-pycon-us/jane-doe.md.
 * Astro's glob loader gives us the full path as the entry id.
 * This helper extracts the leaf slug for use in URLs.
 */
export function leafSlug(id: string): string {
  const parts = id.split("/");
  return parts[parts.length - 1] ?? id;
}

/** Slugify a tag the way Hugo urlizes taxonomy terms, so both theme
    implementations generate the same tag URLs (see PARITY.md).
    Display labels keep the tag's first-seen spelling; only URLs use this. */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}