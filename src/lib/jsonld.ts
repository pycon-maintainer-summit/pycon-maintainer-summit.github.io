/** Structured-data builders (schema.org JSON-LD).
 *
 *  `jsonld`, `buildOrgLd` and `buildBlogPostingLd` are copied verbatim from
 *  the theme's src/lib/jsonld.ts (astro-theme-popular 0.6.0) because the
 *  package's exports map has no `./lib/*` entry, so they cannot be imported
 *  (same reason src/lib/stats.ts exists). Delete the copies once upstream
 *  exports them.
 *
 *  `buildSummitEventLd` is ours: the theme's buildEventLd reads its flat
 *  meetup schema (a single `date`, a venue reference, a ticket price), while
 *  a summit edition is a day inside PyCon US with a prose location and no
 *  price of its own.
 */

/** Recursively key-sort so output matches Hugo's jsonify (sorted, no spaces). */
function sortKeys(v: any): any {
  if (Array.isArray(v)) return v.map(sortKeys);
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])]));
  }
  return v;
}

export function jsonld(obj: Record<string, any>): string {
  return JSON.stringify(sortKeys(obj));
}

export function buildOrgLd(i: {
  name: string; url: string; logo?: string; description?: string; sameAs?: string[];
}): Record<string, any> {
  const ld: Record<string, any> = {
    '@context': 'https://schema.org', '@type': 'Organization', name: i.name, url: i.url,
  };
  if (i.logo) ld.logo = i.logo;
  if (i.description) ld.description = i.description;
  if (i.sameAs && i.sameAs.length) ld.sameAs = i.sameAs;
  return ld;
}

export function buildBlogPostingLd(i: {
  title: string; datePublished: string; dateModified: string;
  authors: string[]; image?: string; url: string; description?: string;
  siteTitle: string; siteUrl: string;
}): Record<string, any> {
  const publisher = { '@type': 'Organization', name: i.siteTitle, url: i.siteUrl };
  const author = i.authors.length
    ? i.authors.map((name) => ({ '@type': 'Person', name }))
    : [publisher];
  const headline = i.title.length > 110 ? i.title.slice(0, 109) + '…' : i.title;
  const ld: Record<string, any> = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline,
    datePublished: i.datePublished, dateModified: i.dateModified, author,
    url: i.url, publisher,
  };
  if (i.image) ld.image = i.image;
  if (i.description) {
    const d = i.description.trim();
    ld.description = d.length > 300 ? d.slice(0, 299) + '…' : d;
  }
  return ld;
}

/** YYYY-MM-DD in UTC. Editions carry a day, never a wall-clock time, so the
 *  date-only form is the honest one: schema.org treats it as all-day. */
const day = (d: Date) => d.toISOString().slice(0, 10);

export function buildSummitEventLd(i: {
  title: string;
  startDate: Date;
  endDate?: Date;
  /** Prose location, e.g. "Room 402, David L. Lawrence Convention Center, Pittsburgh, PA". */
  location: string;
  /** True for the editions held virtually. */
  online?: boolean;
  /** Set when the edition did not run as planned. */
  disruption?: 'cancelled' | 'moved-online';
  description?: string;
  image?: string;
  /** PyCon US registration/dashboard link, when the edition has one. */
  registrationUrl?: string;
  permalink: string;
  siteUrl: string;
  siteTitle: string;
  /** Speaker names for this edition, becomes `performer`. */
  performers?: string[];
}): Record<string, any> {
  const virtual = i.online || i.disruption === 'moved-online';
  const eventStatus =
    i.disruption === 'cancelled'
      ? 'https://schema.org/EventCancelled'
      : i.disruption === 'moved-online'
        ? 'https://schema.org/EventMovedOnline'
        : 'https://schema.org/EventScheduled';
  const ld: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: i.title,
    startDate: day(i.startDate),
    eventStatus,
    eventAttendanceMode: virtual
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    organizer: { '@type': 'Organization', name: i.siteTitle, url: i.siteUrl },
    url: i.permalink,
  };
  if (i.endDate) ld.endDate = day(i.endDate);
  const desc = (i.description ?? '').trim();
  if (desc) ld.description = desc.length > 300 ? desc.slice(0, 299) + '…' : desc;
  ld.location = virtual
    ? { '@type': 'VirtualLocation', url: i.registrationUrl || i.permalink }
    : { '@type': 'Place', name: i.location, address: i.location };
  if (i.image) ld.image = i.image;
  if (i.performers && i.performers.length) {
    ld.performer = i.performers.map((name) => ({ '@type': 'Person', name }));
  }
  /* No `offers`: the summit charges nothing, but it is not free to attend
     either (it needs a PyCon US registration), so asserting either a price
     or isAccessibleForFree would be wrong. */
  return ld;
}