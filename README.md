# PyCon US Maintainers Summit website

A static site for the [PyCon US Maintainers Summit](https://us.pycon.org/2026/events/maintainers-summit/),
built with [Astro](https://astro.build/) 5.

The site is content-driven: speakers, topics, events, news, and docs all live
as Markdown files under `src/content/`. Adding a new speaker or session means
dropping a `.md` file in the right folder — no template changes required.

> **Status:** Demo / under construction. The "DEMO ONLY" banner at the top is
> wired through `src/data/site.ts` (the `banner` constant). Set `show: false`
> to hide it.

---

## Quick start

Requirements: Node 20+ recommended (18.20+ works with engine warnings).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # preview the production build
```

---

## Project layout

```
src/
├── content/                # All site content as Markdown
│   ├── events/             # One file per event year
│   ├── speakers/<event>/   # Speakers nested under their event
│   ├── topics/<event>/     # Sessions nested under their event
│   ├── news/               # Blog / announcements
│   └── docs/               # Attendee, speaker, CFP, organizer guides, CoC
├── content.config.ts       # Zod schemas for the collections above
├── data/
│   ├── site.ts             # Site name, tagline, contact, nav, banner
│   └── organizers.ts       # Past + current organizer list
├── layouts/                # BaseLayout, DocLayout, NewsLayout
├── components/             # Header, Footer, Nav, Banner, *Card, EventSubnav, …
├── pages/
│   ├── index.astro         # Home
│   ├── about.astro         # Mission + organizers
│   ├── contact.astro
│   ├── docs/[…slug].astro  # Generated from src/content/docs
│   ├── news/[…slug].astro  # Generated from src/content/news
│   ├── events/
│   │   ├── index.astro
│   │   └── [event]/
│   │       ├── index.astro              # Event overview
│   │       ├── speakers/                # List + detail
│   │       └── topics/                  # Schedule + detail
│   └── rss.xml.ts          # RSS feed for /news
├── styles/theme.css        # CSS custom properties — re-skin the site here
└── lib/slugs.ts            # Helper for nested-collection slugs
```

---

## How to: add or change content

All content lives in `src/content/`. The dev server hot-reloads when you save.

### Add a new event year

Create `src/content/events/<year>-pycon-us.md`:

```markdown
---
title: "PyCon US Maintainers Summit 2027"
year: 2027
date: "Friday, May 14, 2027"
location: "Venue, City, State"
status: "upcoming"            # or "past"
summary: "One-line summary used on cards and OG tags."
registrationUrl: "https://…"  # optional
cfpUrl: "https://…"           # optional
scheduleUrl: "https://…"      # optional
---

Markdown body shown on the event overview page.
```

The event automatically appears on `/events`, gets its own page at
`/events/<id>/`, and creates `/speakers` and `/topics` sub-pages.

### Add a speaker

Place the file under the event's directory (the directory name **must** match
the event id):

`src/content/speakers/2027-pycon-us/jane-doe.md`

```markdown
---
name: "Jane Doe"
affiliation: "Example Project"
pronouns: "she/her"             # optional
bio: "One-paragraph bio."
event: 2027-pycon-us            # must match an existing event id
links:                          # optional
  - label: "GitHub"
    href: "https://github.com/janedoe"
---

Optional longer-form Markdown body shown on the speaker's detail page.
```

The same person speaking in multiple years needs one file per year — that's
intentional, since affiliations and bios change.

### Add a topic / session

`src/content/topics/2027-pycon-us/my-talk.md`

```markdown
---
title: "My Talk"
abstract: "One-paragraph abstract."
format: "talk"                  # talk | keynote | lightning | bof | panel | workshop
time: "14:30"                   # 24h, optional — used to sort the schedule
event: 2027-pycon-us
speakers:
  - 2027-pycon-us/jane-doe      # must match speaker file paths
tags: ["governance", "tooling"] # optional
slidesUrl: "https://…"          # optional
recordingUrl: "https://…"       # optional
---

Optional longer Markdown body shown on the topic's detail page.
```

The schedule page sorts chronologically when `time` is set; otherwise falls
back to title order.

### Add a news / blog post

`src/content/news/my-post.md`

```markdown
---
title: "Headline"
date: 2026-09-01
author: "Maintainers Summit Team"
summary: "One-line summary."
tags: ["announcement"]
draft: false                    # true to hide
---

Markdown body.
```

Posts auto-appear on `/news`, get a detail page, and are added to `/rss.xml`.

### Add or edit a doc

`src/content/docs/my-guide.md`

```markdown
---
title: "My Guide"
description: "Optional one-line description."
order: 100                      # lower = higher in sidebar
audience: "attendee"            # attendee | speaker | organizer | general
---

Markdown body.
```

Docs are grouped by `audience` in the sidebar.

### Update the organizer list

Edit `src/data/organizers.ts`. Each entry has a `years` array — add the
current year to anyone returning. The About page splits the list into
"this year's organizers" and "past organizers" automatically.

To roll over to next year, change `currentYear` at the bottom of the file.

### Update site-wide info

`src/data/site.ts` is the single source of truth for:

- Site name / tagline / description
- Contact email and social links — used by Footer, About, Contact, and the
  home "Help organize" card
- Top nav items
- Demo banner (`banner.show: false` to hide, or change the message)
- Default OG share image (`defaultOgImage`)

---

## How to: re-skin

`src/styles/theme.css` exposes everything as CSS custom properties — colors,
spacing, font sizes, layout widths, radii, shadows. Change the values at the
top and the entire site updates.

The brand uses `--color-brand` (PyCon blue) plus `--color-accent` (Python
yellow). For a dark mode or alternate palette, override these variables on a
parent selector (e.g. `[data-theme="dark"]`).

---

## Content schemas (reference)

Defined in `src/content.config.ts`. Astro validates frontmatter at build time;
a typo in a field name will fail the build.

| Collection | Required fields | Optional |
|---|---|---|
| `events`    | `title`, `year`, `date`, `location`, `status`, `summary` | `cfpUrl`, `registrationUrl`, `scheduleUrl`, `pyconUrl` |
| `speakers`  | `name`, `bio`, `event`                                   | `affiliation`, `pronouns`, `photo`, `links` |
| `topics`    | `title`, `abstract`, `event`                              | `format` (default `talk`), `time`, `speakers`, `tags`, `slidesUrl`, `recordingUrl` |
| `news`      | `title`, `date`, `summary`                                | `author`, `tags`, `draft` |
| `docs`      | `title`                                                  | `description`, `order`, `audience` |

Cross-collection refs (`event:`, `speakers:`) use the file path of the
referenced entry, e.g. `2026-pycon-us` (event) or
`2026-pycon-us/jane-doe` (speaker).

---

## Build & deploy

`npm run build` outputs a fully static site to `dist/`. The site URL is
configured at the top of `astro.config.mjs` — update it before deploying so
canonical URLs and RSS links resolve correctly.

The RSS feed is at `/rss.xml` and is auto-discovered via
`<link rel="alternate">` in every page's `<head>`.

### Continuous integration

`.github/workflows/ci.yml` runs on every PR to `main` and on pushes to
`main`. It runs `npm ci && npm run build` and uploads the built `dist/` as
an artifact. A failing build blocks merge once you set this workflow as a
required check in branch protection.

### Netlify

`netlify.toml` pins the Node version and publish directory. To deploy:

1. In Netlify, "Add new site" → "Import an existing project" → connect this
   repo.
2. Netlify reads `netlify.toml` and builds. No further config needed.
3. Netlify gives you a `<sitename>.netlify.app` URL. To use a custom
   domain later, point DNS at Netlify and add it under Site settings →
   Domain management.

> **Note on internal links:** internal links throughout the site are
> absolute (`/events`, `/news/welcome`, etc.), so they only resolve
> correctly at the root of a domain. That's fine on Netlify (your
> `*.netlify.app` URL is the root of a subdomain) and on any custom
> domain. If you ever want to host on a sub-path (e.g. GitHub Pages
> project pages at `https://user.github.io/repo/`), the links need a
> base-path refactor.

---

## Conventions

- **Speakers and topics live in subdirectories named after their event id.**
  This keeps slugs unique per event (e.g. two different "Jane Doe" speakers
  in different years can both be `jane-doe.md`).
- **Markdown body is optional** for speakers and topics — short cards work
  fine with just frontmatter. Add a body when there's prose to show.
- **Don't hand-edit the route files** in `src/pages/events/[event]/` to add
  per-event content. Add data via collections instead — the routes pick it up.
- **Reusable components** live in `src/components/`. Prefer extracting a
  small component over duplicating markup across pages (see `EventSubnav`
  for an example).
