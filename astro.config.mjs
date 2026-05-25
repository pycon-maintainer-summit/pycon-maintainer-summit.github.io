import { defineConfig } from 'astro/config';

export default defineConfig({
  // On github.io for now (root site repo). Switch to the custom domain
  // 'https://maintainers.pycon.org' once DNS is pointed at GitHub Pages.
  site: 'https://pycon-maintainers-summit.github.io',
  trailingSlash: 'ignore',
});