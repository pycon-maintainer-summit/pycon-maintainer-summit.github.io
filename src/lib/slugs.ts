/*
 * Speakers and topics live in subdirectories named after their event id,
 * e.g. src/content/speakers/2026-pycon-us/jane-doe.md.
 * Astro's glob loader gives us the full path as the entry id.
 * These helpers extract the leaf slug for use in URLs.
 */
export function leafSlug(id: string): string {
  const parts = id.split("/");
  return parts[parts.length - 1] ?? id;
}