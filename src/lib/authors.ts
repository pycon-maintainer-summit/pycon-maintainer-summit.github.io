/*
 * News posts may have one or several authors (see the news collection schema,
 * which always normalizes `author` to an array). These helpers render that
 * list for display ("A, B, and C") and for single-string metadata fields.
 */
const listFormatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

/** Human-readable byline, e.g. "Jane Doe, John Roe, and Sam Lee". */
export function formatAuthors(authors: string[]): string {
  return listFormatter.format(authors);
}