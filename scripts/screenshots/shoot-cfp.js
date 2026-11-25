// Screenshots of the proposal form for the CFP guide (src/content/docs/cfp-guide.md).
// Drives a local summit instance seeded by run.sh and writes PNGs to
// public/images/docs/cfp-guide/. The speaker in them is invented.
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright-core");

const BASE = process.env.BASE_URL || "http://127.0.0.1:8017";
const OUT = process.env.SHOTS || path.resolve(__dirname, "../../public/images/docs/cfp-guide");
const WIDTH = 1040;

// A vertical band of the page: from the top of `from` to the bottom of `to`.
async function band(page, from, to, file, { pad = 16, padBottom = 24 } = {}) {
  // No focus ring on the last field filled in, and no hover highlight
  // wherever the last click left the mouse.
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  await page.mouse.move(0, 0);
  // Let the focus ring's fade-out transition finish.
  await page.waitForTimeout(600);
  const scrollY = await page.evaluate(() => window.scrollY);
  const a = await from.first().boundingBox();
  const b = await to.first().boundingBox();
  const left = Math.max(0, a.x - 24);
  const top = Math.max(0, a.y + scrollY - pad);
  const bottom = b.y + b.height + scrollY + padBottom;
  await page.screenshot({
    path: path.join(OUT, file),
    fullPage: true,
    clip: { x: left, y: top, width: WIDTH - 2 * left, height: bottom - top },
  });
  console.log("wrote", path.join(OUT, file));
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: 900 },
    deviceScaleFactor: 2,
    locale: "en-US",
  });
  const page = await context.newPage();

  // Signed out: the form asks you to sign in or create an account.
  await page.goto(BASE + "/speakers/propose/");
  const heading = page.getByRole("heading", { name: /Propose a session/ });
  await band(page, heading, page.getByRole("link", { name: "Sign in", exact: true }).last(), "propose-signed-out.png");

  await page.goto(BASE + "/accounts/login/");
  await page.fill('input[name="login"]', "new_speaker");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForURL((url) => !url.pathname.startsWith("/accounts/login"));
  await page.goto(BASE + "/speakers/propose/");

  // About you.
  await page.fill('input[name="you-display_name"]', "Alex Rivera");
  await page.fill('input[name="you-pronouns"]', "they/them");
  await page.fill(
    'textarea[name="you-bio_md"]',
    "Alex maintains a few open source Python packages, reviews pull requests on " +
      "packaging tools, and helps run a local Python user group.",
  );
  await page.fill('input[name="you-location"]', "Portland, Oregon");
  await page.fill('input[name="you-github_username"]', "alexrivera-example");
  const kind = page.locator('select[name$="-kind"]').first();
  const community = await kind.locator("option", { hasText: /community/i }).first().getAttribute("value");
  if (community) await kind.selectOption(community);
  await page.getByPlaceholder("Name", { exact: true }).first().fill("Python user group");
  const aboutYou = page.getByRole("button", { name: "About you" });
  const affiliations = page.getByRole("button", { name: /Add another/ });
  await band(page, aboutYou, affiliations, "about-you.png");

  // Your session: a Tools Track lightning talk.
  await page.getByLabel(/Lightning talk/).check();
  await page.fill('input[name="session-title"]', "Publishing to PyPI without API tokens");
  await page.fill(
    'textarea[name="session-summary_md"]',
    "Trusted Publishing lets your CI upload releases to PyPI with no long-lived " +
      "token to leak. In five minutes: how it works and how to switch an existing project.",
  );
  await page.fill(
    'textarea[name="session-outline_md"]',
    "1. Why API tokens are a risk\n2. How Trusted Publishing works\n3. Switching your project over",
  );
  await page.fill(
    'textarea[name="session-audience_md"]',
    "Maintainers who publish packages to PyPI, especially those still using an API token in CI.",
  );
  await page.getByLabel("All levels").check();
  await page.getByLabel(/based on/).fill("https://docs.pypi.org/trusted-publishers/");
  const yourSession = page.getByRole("button", { name: "Your session" });
  const send = page.getByRole("button", { name: "Send the proposal" });
  await band(page, yourSession, send, "your-session.png");

  // After sending: My proposals.
  await send.click();
  await page.waitForURL((url) => url.pathname.includes("proposals"));
  const mine = page.getByRole("heading", { name: "My proposals", level: 1 });
  const withdraw = page.getByRole("button", { name: /Withdraw/ }).first();
  await band(page, mine, withdraw, "my-proposals.png", { pad: 24 });

  await browser.close();
})().catch((error) => {
  console.error("FAILED", error.message.split("\n")[0]);
  process.exit(1);
});
