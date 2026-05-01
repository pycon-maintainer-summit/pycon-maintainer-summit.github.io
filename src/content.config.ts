import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    date: z.string(),
    location: z.string(),
    status: z.enum(["upcoming", "past"]),
    summary: z.string(),
    cfpUrl: z.string().url().optional(),
    registrationUrl: z.string().url().optional(),
    scheduleUrl: z.string().url().optional(),
    /** Link back to the original PyCon US event page. */
    pyconUrl: z.string().url().optional(),
  }),
});

const speakers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/speakers" }),
  schema: z.object({
    name: z.string(),
    affiliation: z.string().optional(),
    pronouns: z.string().optional(),
    bio: z.string(),
    photo: z.string().optional(),
    event: reference("events"),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
  }),
});

const topics = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/topics" }),
  schema: z.object({
    title: z.string(),
    abstract: z.string(),
    format: z.enum(["keynote", "talk", "lightning", "bof", "panel", "workshop"]).default("talk"),
    /** 24h "HH:MM" — used for sorting and display on the topics page. */
    time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
    event: reference("events"),
    speakers: z.array(reference("speakers")).default([]),
    tags: z.array(z.string()).default([]),
    slidesUrl: z.string().url().optional(),
    recordingUrl: z.string().url().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default("Maintainers Summit Team"),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(100),
    audience: z.enum(["attendee", "speaker", "organizer", "general"]).default("general"),
  }),
});

export const collections = { events, news, docs, speakers, topics };