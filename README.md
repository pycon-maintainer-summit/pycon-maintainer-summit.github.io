# PyCon US Maintainers Summit website

Source for the [PyCon US Maintainers Summit](https://pycon-maintainers-summit.github.io) site:
a gathering for open source Python maintainers at PyCon US.

## Developing

```sh
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

## Content

Everything editable lives in `src/content/`:

- `events/` — one file per summit edition, e.g. `2026-pycon-us.md`
- `speakers/<event-id>/` and `topics/<event-id>/` — the program for each edition
- `blog/` — news posts, served at `/news/` (set `draft: true` to keep a post unpublished)
- `organizers/` — organizer profiles; `years` lists every year the person helped organize
- `docs/` — guides for attendees, speakers, and organizers
- `pages/` — prose pages (about, contact)

Site-wide settings (name, navigation, footer, colors, home page copy) are in
`src/config.ts`.

## Deploying

Production deploys to GitHub Pages from `main`
(`.github/workflows/deploy.yml`). Netlify builds deploy previews for pull
requests only (`netlify.toml`).

## Theme

Built on *Popular*, a personal Astro theme by
[Mariatta](https://mariatta.ca), vendored into this repository. The theme's
own documentation is in [THEME.md](THEME.md); the `demos/` directory is
sample content from the theme and is not part of the site build.