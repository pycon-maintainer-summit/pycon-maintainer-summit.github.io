import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Front-matter schemas. Forked from the Popular theme; the events model is
 *  extended for a multi-year summit (yearly editions with speakers/topics)
 *  rather than the theme's rolling meetup calendar. */

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** Optional last-updated date. Shown as "Updated …" only when after `date`. */
    updated: z.coerce.date().optional(),
    author: z.string().optional(), // simple byline fallback
    authors: z.array(z.string()).default([]), // slugs of entries in the organizers collection
    guestAuthors: z
      .array(
        z.object({
          name: z.string(),
          title: z.string().optional(),
          photo: z.string().optional(),
          bio: z.string().optional(),
          website: z.string().optional(),
          social: z.array(z.object({ label: z.string(), icon: z.string(), url: z.string() })).default([]),
        })
      )
      .default([]),
    description: z.string().optional(),
    /** Alias for description used by older posts; either works. */
    summary: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    speaker: z
      .object({
        name: z.string(),
        title: z.string().optional(),
        photo: z.string().optional(),
        bio: z.string().optional(),
      })
      .optional(),
  }),
});

/** One entry per summit edition, e.g. 2026-pycon-us.md. */
const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    date: z.string(), // human-readable, e.g. "Saturday, May 16, 2026"
    /** Machine-readable first day. Drives Event structured data; the prose
     *  `date` above stays the display string (it carries ranges and notes
     *  like "(originally scheduled)" that no date parser should see). */
    startDate: z.coerce.date(),
    /** Last day, for multi-day editions. Omit for single-day summits. */
    endDate: z.coerce.date().optional(),
    location: z.string(),
    /** Short city name, used for stat tiles and prev/next links. */
    city: z.string().optional(),
    status: z.enum(['upcoming', 'past']),
    /** Set only when an edition did not run as planned; maps to the matching
     *  schema.org eventStatus so the structured data does not claim a summit
     *  happened in a room it never happened in (2020 moved online). */
    disruption: z.enum(['cancelled', 'moved-online']).optional(),
    summary: z.string(),
    image: z.string().optional(),
    cfpUrl: z.string().url().optional(),
    registrationUrl: z.string().url().optional(),
    scheduleUrl: z.string().url().optional(),
    /** Link back to the original PyCon US event page. */
    pyconUrl: z.string().url().optional(),
  }),
});

const speakers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/speakers' }),
  schema: z.object({
    name: z.string(),
    affiliation: z.string().optional(),
    pronouns: z.string().optional(),
    bio: z.string(),
    photo: z.string().optional(),
    event: reference('events'),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
  }),
});

const topics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    abstract: z.string(),
    /** `remarks` is opening/closing housekeeping: it appears on an edition's
     *  schedule but is filtered out of the cross-edition /talks/ archive. */
    format: z.enum(['keynote', 'talk', 'lightning', 'bof', 'panel', 'workshop', 'remarks']).default('talk'),
    /** 24h "HH:MM" — used for sorting and display on the topics page. */
    time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
    event: reference('events'),
    speakers: z.array(reference('speakers')).default([]),
    tags: z.array(z.string()).default([]),
    slidesUrl: z.string().url().optional(),
    recordingUrl: z.string().url().optional(),
  }),
});

/** People who run the summit. This is also the author collection: news posts
 *  reference organizers by slug in `authors: [...]`, and /organizers/<slug>/
 *  is one profile page listing both the editions they organized and the posts
 *  they wrote. (Mirrors the-invisibles' `[sections] authors = team = hosts`.)
 *  Writers who are not organizers use a post's inline `guestAuthors` instead. */
const organizers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/organizers' }),
  schema: z.object({
    title: z.string(),
    weight: z.number().default(100),
    role: z.string().optional(),
    photo: z.string().optional(),
    /** Bio. `bio` is the theme's field name, `description` the summit's; the
     *  AuthorBox reads either, so both are accepted here. */
    description: z.string().optional(),
    bio: z.string().optional(),
    website: z.string().optional(),
    /** Every year this person helped organize the summit. */
    years: z.array(z.number()).default([]),
    social: z
      .array(z.object({ label: z.string(), icon: z.string(), url: z.string() }))
      .default([]),
  }),
});

/** Long-form docs (guides, handbook), MDX with Callout/Checklist components. */
const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    lead: z.string().optional(),
    description: z.string().optional(),
    /** Sidebar / index sort order (lower first). */
    order: z.number().default(100),
    audience: z.enum(['attendee', 'speaker', 'organizer', 'general']).default('general'),
  }),
});

/** Simple prose pages (about, contact). */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    lead: z.string().optional(),
  }),
});

export const collections = { blog, events, speakers, topics, organizers, docs, pages };
