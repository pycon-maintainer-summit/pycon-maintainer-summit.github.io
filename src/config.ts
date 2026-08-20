/** PyCon US Maintainer Summit: site configuration (Popular theme fork). */

export const SITE = {
  title: "PyCon US Maintainer Summit",
  shortName: "Maintainer Summit",
  tagline: "A gathering for open source Python maintainers at PyCon US",
  description:
    `The PyCon US Maintainer Summit brings together maintainers, contributors, researchers,
    policymakers, and everyone invested in the health and sustainability of the open source
    Python ecosystem.`,
  brandName: "Maintainer Summit",
  brandSub: "PyCon US",
  logo: "",
  favicon: "/favicon.svg",
  /** Default social-share image. Leave blank to omit og:image on pages without one. */
  ogImage: "",
  locale: "en-US",
  fontAwesome: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
  landAcknowledgement: "",
  rssTitle: "PyCon US Maintainer Summit — News",
  /** Banner above the header: { text, url? }. `text` takes inline markdown;
   *  `url` appends a "Learn more" link. Static and not dismissible, so keep
   *  it to one timely thing (CFP open, registration live) and set it back to
   *  null when that window closes. */
  notice: null as { text: string; url?: string } | null,
};

/** The year of the upcoming/current summit — used to flag "this year" organizers. */
export const CURRENT_YEAR = 2026;

export const CONTACT = {
  email: "maintainers-pyconus@googlegroups.com",
  github: "https://github.com/pycon-maintainer-summit/pycon-maintainer-summit.github.io",
};

/* UI strings. Keys map 1:1 to the upstream theme's STRINGS (see PARITY.md). */
export const STRINGS: Record<string, string> = {
  skipToContent: 'Skip to content',
  primaryNav: 'Primary',
  toggleMenu: 'Toggle menu',
  onThisPage: 'On this page',
  nextMeetup: "This year's summit",
  venueTba: 'Location to be announced',
  rsvp: 'Register',
  rsvpExternal: 'Register for PyCon US',
  allEvents: 'All events',
  comingUp: 'Coming up',
  upcomingEvents: 'Upcoming',
  upcomingLead: 'Join us at the next summit — space is limited.',
  noUpcomingEvents: 'The next summit will be announced here. Subscribe to the RSS feed or check back soon.',
  lookingBack: 'Summit archive',
  pastEvents: 'Past events',
  venueWanted: 'Location TBD',
  confirmed: 'Confirmed',
  fromTheBlog: 'News',
  latestFromCommunity: 'Latest news',
  readTheBlog: 'All news',
  allPosts: 'All news',
  filterLabel: 'Filter:',
  filterAll: 'All',
  subscribeRss: 'Subscribe via RSS',
  subscribeRssTitle: 'Follow news in any feed reader',
  noPosts: 'No news yet, check back soon.',
  ourSpeaker: 'Our speaker',
  minRead: '{n} min read',
  authorsBy: 'By',
  listSeparator: ', ',
  listSeparatorFinal: ' & ',
  posts: 'Posts',
  guest: 'Guest',
  website: 'Website',
  eyebrowOrganizer: 'Organizer',
  checklist: 'Checklist',
  copyCode: 'Copy code',
  checklistDone: 'done',
  writtenBy: 'Written by {name}',
  eyebrowBlog: 'News & Announcements',
  eyebrowEvents: 'Events',
  eyebrowAuthor: 'Author',
  eyebrowDocs: 'Docs',
  eyebrowTag: 'Tag',
  taggedCount: '{n} post(s) tagged {tag}',
  speakers: 'Speakers',
  eyebrowSpeaker: 'Speaker',
  sessionsBy: 'Sessions by {name}',
  eyebrowVenue: 'Venue',
  venueEvents: 'Events held here',
  beforeYouArrive: 'Before you arrive',
  postNavigation: 'More posts',
  newerPost: 'Newer post',
  olderPost: 'Older post',
  paginationLabel: 'Pagination',
  paginationPrev: 'Previous',
  paginationNext: 'Next',
  learnMore: 'Learn more',
  talks: 'Talks',
  talksLead: 'Every talk, lightning talk, and discussion session from every summit, newest first.',
  watchRecording: 'Watch',
  viewSlides: 'Slides',
  // Summit-specific additions (not in the upstream theme).
  statusUpcoming: 'Upcoming',
  statusPast: 'Past',
  viewDetails: 'View details',
};

/* List pagination size. High enough that the summit archive and news show on one page. */
export const PAGINATION = { pageSize: 12 };

export const BRAND: Record<string, string> = {
  // PyCon-inspired blue + python yellow, carried over from the previous site.
  primary: "#2d4a87",
  primaryHover: "#1f3461",
  primaryActive: "#1f3461",
  secondary: "#1f3461",
  // Python yellow, carried over from the previous site. Used on dark surfaces
  // (stats band) and as chips/buttons with navy text; never as text on white.
  accent: "#ffd43b",
  accentHover: "#f0c419",
  // Distinct link color so links stand apart from body text (prose links are
  // also underlined, see components.css).
  link: "#2d4a87",
  linkHover: "#4a6bb0",
  ink: "#1a1d24",
  // The upstream theme renamed the surfacePink* keys to surfaceWash*.
  surfaceWash: "#e7edf6",
  surfaceWashSoft: "#f6f8fb",
  surfaceInk: "#1f3461",
  fontSans: 'Inter, system-ui, sans-serif',
  fontDisplay: 'Inter, system-ui, sans-serif',
};

export const NAV: {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}[] = [
  { label: 'Events', href: '/events/' },
  { label: 'Talks', href: '/talks/' },
  { label: 'News', href: '/news/' },
  { label: 'Docs', href: '/docs/' },
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'About the summit', href: '/about/' },
      { label: 'FAQ', href: '/faq/' },
      { label: 'Organizers', href: '/organizers/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];

/** Header call-to-action button. Set to null to hide (e.g. between summits). */
export const CTA = null;

export const SOCIAL = [
  { label: 'GitHub', icon: 'fa-brands fa-github', url: CONTACT.github },
  { label: 'RSS', icon: 'fa-solid fa-rss', url: '/rss.xml' },
  { label: 'Email', icon: 'fa-solid fa-envelope', url: `mailto:${CONTACT.email}` },
];

export const FOOTER = {
  tagline: "A gathering for open source Python maintainers at PyCon US",
  // The repo, not mariatta.ca: the theme's Footer appends its own version
  // number ("· v0.7.0") when the credit URL points at mariatta.ca, which
  // suits the theme's demos but not a PyCon-branded site.
  credit: { label: 'Popular Astro theme by Mariatta', url: 'https://github.com/mariatta/astro-theme-popular' },
  columns: [
    { title: 'Summit', links: [
      { label: 'Events', href: '/events/' },
      { label: 'News', href: '/news/' },
      { label: 'Organizers', href: '/organizers/' },
    ]},
    { title: 'Get involved', links: [
      { label: 'Attendee Guide', href: '/docs/attendee-guide/' },
      { label: 'CFP Guide', href: '/docs/cfp-guide/' },
      { label: 'Attendee survey', href: 'https://secretcodes.dev/surveys/maintainer-summit-survey/' },
      { label: 'Contact us', href: '/contact/' },
    ]},
    { title: 'More', links: [
      { label: 'Docs', href: '/docs/' },
      { label: 'Code of Conduct', href: '/docs/code-of-conduct/' },
      { label: 'RSS feed', href: '/rss.xml' },
    ]},
  ],
};

/** Support box at the bottom of news posts, null hides it. */
export const SUPPORT = null;

/** Common footer rendered at the end of every news post, so the subscribe
 *  pitch lives in one place instead of being pasted into each post. Set to
 *  null to hide it. `body` paragraphs take inline markdown (links, bold,
 *  emphasis, code); block syntax is not supported. */
export const POST_FOOTER = {
  title: 'Subscribe to the RSS feed',
  body: [
    "Don't want to miss a post? Subscribe to our [RSS feed](/rss.xml) and every new announcement, recap, and blog post will land in your reader automatically. No account or inbox required.",
    'Thanks for being part of our community!',
  ],
} as { title?: string; body: string[] } | null;

/** Section list-page headers. */
export const SECTIONS = {
  blog: { eyebrow: 'News & Announcements', title: 'News', lead: 'Announcements and updates from the Maintainer Summit team.' },
  events: { eyebrow: 'Summit archive', title: 'Events', lead: 'Browse the upcoming summit and our past gatherings, every year since 2019.' },
  organizers: { eyebrow: 'The team', title: 'Organizers', lead: 'The volunteers who make the summit happen, this year and in years past.' },
};

export const HOME = {
  hero: {
    eyebrow: 'PyCon US',
    title: 'Maintainer Summit',
    lead: "A gathering for open source Python maintainers at PyCon US. We come together to share what we've learned, find collaborators, and support each other in the often-invisible work of maintenance.",
    ctas: [
      { label: "See this year's summit", url: '/events/', variant: 'accent' },
      { label: 'About the summit', url: '/about/', variant: 'outline' },
    ],
  },
  stats: [
    { value: '2019', label: 'first summit' },
    // Live counts (see lib/stats): editions with status 'past', and entries in
    // the speakers collection. "listed", not "so far": the collection only
    // covers the editions whose speakers we have written up.
    { value: '@pastEventCount', label: 'summits held' },
    { value: '@count:speakers', label: 'speakers listed' },
    { value: 'Free', label: 'with PyCon US registration' },
  ],
  featuresHead: { eyebrow: 'What happens at the summit', title: 'A day for the people who keep Python running', lead: 'Maintainers of projects big and small, new and veteran, are all welcome.' },
  features: [
    { icon: 'fa-solid fa-microphone-lines', title: 'Talks & lightning talks', body: 'Maintainers share lessons learned: sustainability, governance, funding, tooling, and everything in between.' },
    { icon: 'fa-solid fa-comments', title: 'Discussions & roundtables', body: 'Open conversations about the challenges of maintenance, with people who have faced the same ones.' },
    { icon: 'fa-solid fa-people-group', title: 'A community of peers', body: 'Meet the humans behind the projects you depend on, and the ones who depend on yours.' },
  ],
  getInvolved: {
    eyebrow: 'Get involved',
    title: 'Attend, speak, or help organize',
    lead: 'Read the attendee guide, submit a talk proposal, or join the organizing team.',
    ctas: [
      { label: 'Attendee Guide', url: '/docs/attendee-guide/', variant: 'primary' },
      { label: 'Speak at the summit', url: '/docs/cfp-guide/', variant: 'outline' },
      { label: 'Contact us', url: '/contact/', variant: 'outline' },
    ],
  },
};

/** Demo-only switcher bar from the upstream theme. Always null on this site. */
export const DEMO_BAR = null;
