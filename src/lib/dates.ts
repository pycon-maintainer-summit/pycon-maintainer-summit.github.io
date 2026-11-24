import { SITE } from '../config';

/** A date-only value from front matter (parsed as UTC midnight), as a day in
 *  the site's locale. Formatted in UTC so it never drifts a day in western
 *  timezones. */
export const fmtDay = (date: Date) =>
  date.toLocaleDateString(SITE.locale, { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
