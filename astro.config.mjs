import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Production is served by GitHub Pages at the github.io URL (later the custom
// domain maintainers.pycon.org). On Netlify deploy previews / branch deploys,
// Netlify sets DEPLOY_PRIME_URL to that deploy's own URL — use it so canonical
// links, OG/Twitter images, and RSS resolve against the domain being viewed.
// Local `astro dev` is handled in BaseLayout via the live request origin.
const site = process.env.DEPLOY_PRIME_URL || 'https://pycon-maintainers-summit.github.io';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  integrations: [mdx()],
});
