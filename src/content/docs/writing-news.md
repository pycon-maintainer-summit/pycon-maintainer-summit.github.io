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
| `updated` | no | `YYYY-MM-DD`. Shows "Updated …" in the byline when later than `date`. See below. |
| `summary` | yes | One sentence. Shown on the index card, the post lede, and the RSS description. |
| `author` | no | Defaults to `"Maintainers Summit Team"`. One name or several — see below. |
| `tags` | no | List of strings, shown as chips and included as RSS categories. |
| `image` | no | Social-share image (Open Graph / Twitter card). See below. |
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
  - "Inessa Pawson"
  - "Leah Wasser"
```

The byline renders the names with proper "and" joining — two names become
"A and B", three become "A, B, and C" — on the news index, the post page, and
the RSS feed. Each name also gets its own `article:author` meta tag.

## Social-share image

Set an `image` to give the post a cover image — it appears at the top of the
post, as the thumbnail on the news list, and as the preview card when the post
is shared on social media (Open Graph + the Twitter/X large card). It's optional;
posts without one simply have no image (and share using the site default, if one
is set in `src/data/site.ts`).

```yaml
image: "/og/my-post.jpg"
```

- **Where it goes:** put the file in `public/` (e.g. `public/og/my-post.jpg`)
  and reference it with an absolute path from the site root, like
  `/og/my-post.jpg`.
- **Size:** **1200 × 630 px** — the standard Open Graph ratio (1.91:1), used by
  Facebook, LinkedIn, and the X large card.
- **Format & file size:** JPG for photos, PNG for flat graphics. Keep it under
  ~1 MB (200–500 KB is ideal) so it loads quickly when shared.
- **Safe area:** keep faces and any text toward the center — feeds sometimes
  crop the edges.
- **Overlaid text:** if you put a title on the image, make it large; the card is
  shown small in feeds.

When `image` is set, the page emits `og:image` and `twitter:image` and upgrades
the Twitter card to `summary_large_image`. The layout turns the path into a full
URL automatically, so a root-relative path is all you need.

## Updated date

If you make a meaningful change to a post after it's published, add an `updated`
date. The byline then shows "Updated <date>" (only when it's later than `date`),
and the page sets `article:modified_time` for SEO. Use it for substantive
revisions — corrections or new information — not for typo fixes.

```yaml
date: 2026-09-01
updated: 2026-09-15
```

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