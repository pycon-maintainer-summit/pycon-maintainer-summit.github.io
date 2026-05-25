---
title: "Writing News Posts"
description: "How to add a news / blog post, set authors, and use drafts and tags."
order: 45
audience: "organizer"
---

News posts (announcements, recaps, and other blog entries) are Markdown files
in `src/content/news/`. Drop a new file in that folder and it automatically
appears on the [News page](/news), gets its own detail page at
`/news/<filename>/`, and is added to the [RSS feed](/rss.xml). No template
changes are needed.

## Create a post

Create `src/content/news/my-post.md`. The filename (without `.md`) becomes the
URL slug, so keep it short and use hyphens — e.g. `cfp-now-open.md` →
`/news/cfp-now-open/`.

```markdown
---
title: "Headline goes here"
date: 2026-09-01
author: "Maintainers Summit Team"
summary: "One-line summary shown on the news index, the RSS feed, and social cards."
tags: ["announcement"]
draft: false
---

Your post body in Markdown. The first thing readers see under the title is the
`summary` above, styled as a lede — so write the body as if it picks up from
there.
```

### Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Headline. Also used for the page `<title>` and OG tags. |
| `date` | yes | `YYYY-MM-DD`. Posts are sorted newest-first by this date. |
| `summary` | yes | One sentence. Shown on the index card, the post lede, and the RSS description. |
| `author` | no | Defaults to `"Maintainers Summit Team"`. One name or several — see below. |
| `tags` | no | List of strings, shown as chips and included as RSS categories. |
| `draft` | no | `true` hides the post from the site and the feed. Defaults to `false`. |

## Multiple authors

`author` accepts either a single name or a list of names. A single name can be
written either way:

```yaml
author: "Mariatta Wijaya"
```

For several authors, use a YAML list:

```yaml
author:
  - "Mariatta Wijaya"
  - "Jane Doe"
```

The byline renders the names with proper "and" joining — two names become
"A and B", three become "A, B, and C" — on the news index, the post page, and
the RSS feed. Each name also gets its own `article:author` meta tag.

## Drafts

Set `draft: true` while a post is in progress. It is excluded from the news
index, the detail-page routes, and the RSS feed at build time, so it never
ships. Flip it to `false` (or remove the line) to publish.

## Preview before publishing

Run the dev server and the post hot-reloads as you edit:

```bash
npm run dev      # http://localhost:4321/news
```

Before opening a PR, run `npm run build` — Astro validates every post's
frontmatter against the schema in `src/content.config.ts`, so a typo in a field
name or a malformed date fails the build rather than shipping broken.