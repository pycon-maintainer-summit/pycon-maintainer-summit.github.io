import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildIcs, type IcsAllDayEvent } from '../../lib/ical';
import { SITE } from '../../config';

/* iCalendar feed for the summit: one all-day entry per edition that has a
   machine-readable startDate, plus one all-day entry per milestone (CFP
   opens/closes, speaker notification, ...). Replaces the theme's injected
   calendar route (disabled in astro.config.mjs), which reads the theme's
   flat single-event schema. Like upstream, the feed carries upcoming dates
   plus the last 90 days, so a subscribed calendar stays tidy. */

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL('https://example.com');
  const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
  const editions = (await getCollection('events')).sort((a, b) => a.data.year - b.data.year);

  const entries: IcsAllDayEvent[] = [];
  for (const e of editions) {
    const d = e.data;
    const permalink = new URL(`/events/${e.id}/`, origin).href;
    if (d.startDate && +d.startDate >= cutoff) {
      entries.push({
        uid: permalink,
        title: d.title,
        start: d.startDate,
        end: d.endDate,
        description: d.summary,
        location: d.location,
        url: permalink,
        cancelled: d.disruption === 'cancelled',
      });
    }
    // Milestones can be known (and subscribed to) before the summit day is.
    for (const m of d.milestones) {
      if (+m.date < cutoff) continue;
      entries.push({
        uid: `${permalink}#${slug(m.label)}`,
        title: `${d.title}: ${m.label}`,
        start: m.date,
        url: m.url ?? permalink,
      });
    }
  }
  entries.sort((a, b) => +a.start - +b.start);

  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const body = buildIcs(entries, {
    siteTitle: SITE.title,
    calName: `${SITE.title} important dates`,
    dtstamp,
  });
  return new Response(body, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
