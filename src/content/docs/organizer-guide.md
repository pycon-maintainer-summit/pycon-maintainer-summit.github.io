---
title: "Organizer Guide"
description: "Internal documentation for summit organizers."
order: 40
audience: "organizer"
---

## Important dates and the calendar feed

Each edition's dates live in the `milestones` list in the front matter of
its file under `src/content/events/`. Each entry has a `label`, a `date`
and an optional `url`. The list renders as the Important dates section on
the edition page and as all-day entries in the calendar feed at
`/events/calendar.ics`, which the page's subscribe buttons point at.

Two things to know before editing:

- Labels must be unique within an edition; the build fails otherwise.
- The feed derives each entry's identity from its label. Changing a date
  updates the entry in subscribers' calendars. Renaming a label replaces
  it with a new entry instead, so prefer keeping labels stable from year
  to year, such as "CFP opens", "CFP closes" and "Speaker notifications
  sent".

The feed carries upcoming dates and the last 90 days, so old editions drop
out of subscribers' calendars on their own.
