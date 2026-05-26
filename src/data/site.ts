/*
 * Single source of truth for site-wide info.
 * Edit values here — they're consumed by layouts, header, footer, and pages.
 */
export const site = {
  name: "PyCon US Maintainers Summit",
  shortName: "Maintainers Summit",
  tagline: "A gathering for open source Python maintainers at PyCon US.",
  description:
    "The PyCon US Maintainers Summit brings together maintainers of Python open source projects to share, learn, and collaborate.",
  // On github.io for now; switch to "https://maintainers.pycon.org" when the
  // custom domain is pointed at GitHub Pages (keep in sync with astro.config.mjs).
  url: "https://pycon-maintainers-summit.github.io",
  locale: "en-US",
  /** Default social-share image. Path is relative to the site root (place file in /public). Leave blank to omit. */
  defaultOgImage: "",
  rssTitle: "PyCon US Maintainers Summit — News",
} as const;

/** Site-wide banner. Set `show: false` to hide. */
export const banner = {
  show: false,
  title: "DEMO ONLY",
  message: "This site is still under construction.",
} as const;

export const contact = {
  email: "maintainers-pyconus@googlegroups.com",
  github: "https://github.com/pycon-maintainers-summit/pycon-maintainers-summit.github.io",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Docs", href: "/docs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;