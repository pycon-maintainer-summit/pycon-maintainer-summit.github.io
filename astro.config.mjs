import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import popular from 'astro-theme-popular';

// Production is served by GitHub Pages at the github.io URL (later the custom
// domain maintainers.pycon.org). On Netlify deploy previews / branch deploys,
// Netlify sets DEPLOY_PRIME_URL to that deploy's own URL — use it so canonical
// links, OG/Twitter images, and RSS resolve against the domain being viewed.
// Local `astro dev` is handled in BaseLayout via the live request origin.
const site = process.env.DEPLOY_PRIME_URL || 'https://pycon-maintainers-summit.github.io';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  integrations: [
    mdx(),
    // The theme provides components, layouts, styles, schemas, and behavior
    // JS. Every injected route group is disabled: this site's multi-edition
    // event model and /news/ URLs replace the theme's routes wholesale.
    popular({
      configFile: './src/config.ts',
      routes: {
        home: false,
        pages: false,
        authors: false,
        blog: false,
        events: false,
        organizers: false,
        speakers: false,
        venues: false,
        tags: false,
        rss: false,
        // This site aggregates its own `topics` collection at /talks/ (see
        // src/pages/talks/); the theme's archive reads its flat event model.
        talks: false,
        // The theme's calendar feed and llms.txt read its flat event schema
        // (a real `date`); this site's editions carry a human-readable date
        // string instead, so both would ship empty/wrong. Off until the
        // summit grows a machine-readable date and its own versions.
        calendar: false,
        llms: false,
      },
    }),
  ],
});
