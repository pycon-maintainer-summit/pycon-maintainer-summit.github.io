# Screenshots

Takes the screenshots of the proposal form shown in the
[CFP guide](../../src/content/docs/cfp-guide.md):

| Screenshot | What it shows |
|---|---|
| `propose-signed-out.png` | The proposal page before signing in |
| `about-you.png` | The About you part of the form, filled in |
| `your-session.png` | The Your session part, filled in for a lightning talk |
| `my-proposals.png` | My proposals after sending, pending review |

They are written to `public/images/docs/cfp-guide/` and committed. Take them
again whenever the form changes: a new Flashlights release on the summit's
instance, or a change to the edition's speaker settings or proposal
questions.

## How it works

The screenshots come from the summit's own Flashlights instance, run
locally: the image its repository builds (the pinned core plus the summit's
logo), loaded with the summit preset. `cfp_open.py` then opens the 2027 call
for proposals the way the live instance has it: Talk (15 minutes) and
Lightning talk (5 minutes) open, no prerequisites or language, and the two
link questions. `shoot-cfp.js` signs in as `new_speaker`, fills the form in
as an invented speaker and project, sends it, and crops each part of the
page with Playwright.

It runs as its own compose project, `summit-screenshots`, on
<http://127.0.0.1:8017/> (maildev on 9017), so it does not touch a summit
instance you run with `make up` on 8007. Every run starts from an empty
database and removes it at the end.

## What you need

- Docker, Node.js, `ffmpeg`, and a checkout of the summit's Flashlights repository
  (default `~/github/pycon-maintainer-summit/flashlights`; set
  `SUMMIT_FLASHLIGHTS` for another path). Check out the commit the live
  instance runs, usually `origin/main`.
- A Chromium for Playwright: `npx playwright install chromium-headless-shell`
  in this folder, once.

## Run it

From the repository root:

```
scripts/screenshots/run.sh
```

## Keeping it true

`cfp_open.py` is the only place the form's settings are written down. When
the instance's Speaker settings or Proposal questions change, change it to
match, then run the script again. The speaker in the screenshots is
invented: Alex Rivera does not exist.
