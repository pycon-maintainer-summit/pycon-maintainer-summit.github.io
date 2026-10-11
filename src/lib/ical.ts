/** iCalendar builder for summit editions and their milestone dates. Adapted
 *  from the theme's src/lib/ical.ts, copied because the package's `exports`
 *  map publishes no ./lib/* (same situation as lib/stats.ts). Differences
 *  from upstream, worth folding back in: entries here are all-day only (the
 *  summit announces days, not clock times), a multi-day entry gets the
 *  DTEND the upstream builder lacks, and icsEscape actually escapes
 *  semicolons (upstream's '\;' literal collapses to a plain ';'). */

const pad = (n: number) => String(n).padStart(2, '0');
const enc = new TextEncoder();

function ymd(d: Date): string {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
}

export function icsEscape(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/** One content line, CRLF-terminated, folded at 75 octets (continuations
 *  begin with a space, which counts toward the limit). */
export function fold(line: string): string {
  if (enc.encode(line).length <= 75) return line + '\r\n';
  let out = '';
  let cur = '';
  let curBytes = 0;
  let first = true;
  for (const ch of line) {
    const cb = enc.encode(ch).length;
    const limit = first ? 75 : 74;
    if (curBytes + cb > limit) {
      out += (first ? '' : ' ') + cur + '\r\n';
      first = false;
      cur = ch;
      curBytes = cb;
    } else {
      cur += ch;
      curBytes += cb;
    }
  }
  out += (first ? '' : ' ') + cur + '\r\n';
  return out;
}

export interface IcsAllDayEvent {
  /** Stable unique id; the edition permalink, plus a fragment for milestones. */
  uid: string;
  title: string;
  /** First (or only) day. */
  start: Date;
  /** Inclusive last day for multi-day events; DTEND is emitted exclusive. */
  end?: Date;
  description?: string;
  location?: string;
  url: string;
  cancelled?: boolean;
}

export function buildIcs(
  events: IcsAllDayEvent[],
  opts: { siteTitle: string; calName: string; dtstamp: string },
): string {
  const L: string[] = [];
  L.push(fold('BEGIN:VCALENDAR'));
  L.push(fold('VERSION:2.0'));
  L.push(fold(`PRODID:-//${opts.siteTitle}//Popular theme//EN`));
  L.push(fold('CALSCALE:GREGORIAN'));
  L.push(fold('METHOD:PUBLISH'));
  L.push(fold(`X-WR-CALNAME:${opts.calName}`));
  /* Subscription refresh hints (RFC 7986 + the Apple/Outlook legacy twin).
     Google Calendar ignores both and polls on its own schedule. */
  L.push(fold('REFRESH-INTERVAL;VALUE=DURATION:PT12H'));
  L.push(fold('X-PUBLISHED-TTL:PT12H'));
  for (const e of events) {
    L.push(fold('BEGIN:VEVENT'));
    L.push(fold(`UID:${e.uid}`));
    L.push(fold(`DTSTAMP:${opts.dtstamp}`));
    L.push(fold(`DTSTART;VALUE=DATE:${ymd(e.start)}`));
    if (e.end && +e.end > +e.start) {
      // DTEND for an all-day event names the day after the last day.
      const dayAfter = new Date(+e.end + 24 * 60 * 60 * 1000);
      L.push(fold(`DTEND;VALUE=DATE:${ymd(dayAfter)}`));
    }
    L.push(fold(`SUMMARY:${icsEscape(e.title)}`));
    if (e.location) L.push(fold(`LOCATION:${icsEscape(e.location)}`));
    const desc = `${(e.description ?? '').trim()}\n${e.url}`.trim();
    L.push(fold(`DESCRIPTION:${icsEscape(desc)}`));
    L.push(fold(`URL:${e.url}`));
    L.push(fold(`STATUS:${e.cancelled ? 'CANCELLED' : 'CONFIRMED'}`));
    L.push(fold('END:VEVENT'));
  }
  L.push(fold('END:VCALENDAR'));
  return L.join('');
}
