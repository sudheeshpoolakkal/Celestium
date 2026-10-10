import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { ALL_ROUTES } from "../lib/routes";

test("the complete route directory resolves without invented destinations", async ({ request }) => {
  test.setTimeout(120_000);
  for (const route of ALL_ROUTES) {
    const response = await request.get(route.path);
    expect(response.status(), route.path).toBe(200);
    const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    expect(html, route.path).toContain("<main");
    expect(html, route.path).not.toContain("This page could not be found.");
  }
});

test("flight stories and mission tabs respond to user choices", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Show HSVTOL story" }).click();
  await expect(page.locator("h1")).toContainText("A higher ambition");
  await expect(page.getByRole("link", { name: "Explore HSVTOL", exact: true })).toHaveAttribute(
    "href",
    "/innovation/hsvtol",
  );
  const tab = page.getByRole("tab", { name: /Energy & offshore/ });
  await tab.click();
  await expect(page.getByRole("tabpanel")).toContainText("power our world");
  await tab.press("End");
  await expect(page.getByRole("tab", { name: /Utility & exploration/ })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Reach beyond the familiar");
});

test("search finds a page and supports keyboard dismissal", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search Celestium" }).click();
  const dialog = page.getByRole("dialog", { name: "Search the Celestium website" });
  const input = page.getByRole("searchbox");
  await expect(input).toBeFocused();
  await input.fill("hydrogen");
  await expect(dialog.getByRole("link", { name: "Hydrogen-electric propulsion", exact: true })).toBeVisible();
  await input.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Search Celestium" })).toBeFocused();
  await page.getByRole("button", { name: "Search Celestium" }).click();
  await page.getByRole("searchbox").fill("no-matching-flight-path");
  await expect(dialog).toContainText("No destinations match");
  await page.getByRole("searchbox").fill("hydrogen");
  await dialog.getByRole("link", { name: "Hydrogen-electric propulsion", exact: true }).click();
  await expect(page).toHaveURL(/\/innovation\/hydrogen-electric$/);
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
});

test("the aircraft catalogue filters and compares actual study perspectives", async ({ page }) => {
  await page.goto("/products");
  await expect(page.locator(".c-product-item")).toHaveCount(6);
  await page.getByLabel("Mission perspective").selectOption("Medical");
  await expect(page.locator(".c-product-item")).toHaveCount(1);
  await expect(page.locator(".c-product-count")).toContainText("1 study");
  await page.getByRole("button", { name: /Reset filters/ }).click();
  await page.getByRole("checkbox", { name: "Celestium concepts only" }).check();
  await expect(page.locator(".c-product-item")).toHaveCount(2);
  await page.getByRole("checkbox", { name: "Celestium concepts only" }).uncheck();
  await page.getByRole("button", { name: "Compare Taraka X-1", exact: true }).click();
  await page.getByRole("button", { name: "Compare Tiltrotor architecture", exact: true }).click();
  const comparison = page.getByRole("region", { name: "Aircraft study comparison table" });
  await expect(comparison).toContainText("Twin tilting ducts");
  await expect(comparison).toContainText("Open-rotor tiltrotor");
  await page.getByRole("button", { name: /Clear comparison/ }).click();
  await expect(comparison).not.toBeVisible();
  await page.getByLabel("Architecture", { exact: true }).selectOption("High-speed VTOL");
  await page.getByLabel("Mission perspective").selectOption("Medical");
  await expect(page.getByRole("heading", { name: "No studies match these filters." })).toBeVisible();
  await page.getByRole("button", { name: "Show all studies" }).click();
  await expect(page.locator(".c-product-item")).toHaveCount(6);
});

test("tiltrotor and HSVTOL explain distinct flight modes", async ({ page }) => {
  await page.goto("/products/tiltrotor");
  const modes = page.getByRole("tablist", { name: "Tiltrotor flight modes" });
  await modes.getByRole("tab", { name: /Cruise/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Move forward on the wing");
  await expect(page.getByRole("slider", { name: "Propulsion orientation in degrees" })).toHaveValue("0");
  await modes.getByRole("tab", { name: /Cruise/ }).press("Home");
  await expect(modes.getByRole("tab", { name: /Hover/ })).toBeFocused();
  await expect(page.getByRole("slider")).toHaveValue("90");
  await page.goto("/innovation/hsvtol");
  await page
    .getByRole("tablist", { name: "HSVTOL flight modes" })
    .getByRole("tab", { name: /Cruise/ })
    .click();
  await expect(page.getByRole("tabpanel")).toContainText("Fold the rotor");
  await expect(page.getByRole("tabpanel")).toContainText("separate thrust path");
});

test("aircraft-only animations play on request and pause", async ({ page }) => {
  await page.goto("/videos");
  const media = page.locator(".c-motion-media").first();
  const video = media.locator("video");
  expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await media.getByRole("button", { name: "Play Folding-rotor sequence" }).click();
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(0.1);
  await media.getByRole("button", { name: "Pause Folding-rotor sequence" }).click();
  expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  expect(await video.evaluate((v: HTMLVideoElement) => v.muted)).toBe(true);
});

test("an enquiry becomes a reviewable local download", async ({ page }) => {
  const outbound: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") outbound.push(r.url());
  });
  await page.goto("/contact?topic=Student%20research");
  await page.getByLabel(/Your name/).fill("Research reviewer");
  await page.getByLabel("Email Optional").fill("reviewer@example.org");
  await page
    .getByLabel(/Your question or proposal/)
    .fill("I would like to study the sensitivity of hydrogen storage mass in the aircraft sizing model.");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(page.getByRole("heading", { name: "Your enquiry brief is ready." })).toBeVisible();
  await expect(page.locator(".c-enquiry-output")).toContainText("Student research");
  await expect(page.locator(".c-enquiry-output")).toBeFocused();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download the enquiry brief" }).click();
  expect((await download).suggestedFilename()).toBe("celestium-research-enquiry.md");
  expect(outbound).toEqual([]);
});

test("journal filters and FAQs expose their content", async ({ page }) => {
  await page.goto("/journal");
  await page.getByRole("button", { name: "Mission design", exact: true }).click();
  await expect(page.locator(".c-journal-grid .c-flight-card")).toHaveCount(2);
  await page.getByRole("link", { name: /An aircraft around care/ }).click();
  await expect(page.locator(".c-article-body")).toContainText("The mission starts before takeoff");
  await page.goto("/innovation/hsvtol");
  await page.locator("summary").filter({ hasText: "Does Celestium have an HSVTOL aircraft?" }).click();
  await expect(page.locator("details[open]")).toContainText("No Celestium HSVTOL performance");
});

test("new layouts remain within compact and tablet viewports", async ({ page }) => {
  test.setTimeout(120_000);
  const routes = [
    "/",
    "/products",
    "/products/tiltrotor",
    "/innovation/hsvtol",
    "/missions",
    "/company",
    "/contact",
    "/journal",
    "/site-directory",
    "/media-credits",
    "/videos",
    "/innovation/hydrogen-electric",
  ];
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${route} at ${width}px`,
      ).toBe(true);
    }
  }
});

test("expanded navigation and search remain accessible", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Primary", exact: true })
    .getByRole("button", { name: "Innovation", exact: true })
    .click();
  let audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) }))).toEqual([]);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Search Celestium" }).click();
  audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) }))).toEqual([]);
});

test("the image library classifies and inspects credited references", async ({ page }) => {
  await page.goto("/videos");
  const filters = page.getByRole("group", { name: "Filter reference imagery" });
  await filters.getByRole("button", { name: "HSVTOL", exact: true }).click();
  await expect(page.locator(".c-photo-grid figure")).toHaveCount(3);
  await filters.getByRole("button", { name: "Tiltrotor", exact: true }).click();
  await expect(page.locator(".c-photo-grid figure")).toHaveCount(4);
  await expect(page.locator(".c-photo-grid")).toContainText("Bell Boeing V-22 in low flight above a runway");
  await filters.getByRole("button", { name: "Missions & environments", exact: true }).click();
  await expect(page.locator(".c-photo-grid figure")).toHaveCount(1);
  await expect(page.locator(".c-photo-grid")).toContainText("Aerial city view from Bell innovation page");
  await filters.getByRole("button", { name: "HSVTOL", exact: true }).click();
  const opener = page.getByRole("button", { name: "Inspect Bell HSVTOL aircraft concepts above the clouds" });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close aircraft image" })).toBeFocused();
  await expect(dialog).toContainText("Bell Textron");
  await dialog.getByRole("button", { name: "Next aircraft image" }).click();
  await expect(dialog.locator("h2")).not.toHaveText("Bell HSVTOL aircraft concepts above the clouds");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.locator("h2")).toHaveText("Bell HSVTOL aircraft concepts above the clouds");
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) }))).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test("the energy architecture explains interfaces and unresolved storage mass", async ({ page }) => {
  await page.goto("/innovation/hydrogen-electric");
  const systems = page.getByRole("tablist", { name: "Explore the hydrogen-electric powertrain" });
  await systems.getByRole("tab", { name: /Hydrogen storage/ }).click();
  const panel = page.getByRole("tabpanel");
  await expect(panel).toContainText("tank-vessel mass unresolved");
  await systems.getByRole("tab", { name: /Hydrogen storage/ }).press("End");
  await expect(systems.getByRole("tab", { name: /Thermal system/ })).toBeFocused();
  await expect(panel).toContainText("Heat has to leave the aircraft");
  await expect(panel).toContainText("hover");
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) }))).toEqual([]);
});

test("topic reading paths include dedicated mission and research pages", async ({ page }) => {
  await page.goto("/support/training/mission");
  let section = page
    .locator("section")
    .filter({ has: page.getByRole("heading", { name: "Connected perspectives.", exact: true }) });
  await expect(section.getByRole("link", { name: /Medical cabin/ })).toHaveAttribute(
    "href",
    "/mission/cabin",
  );
  await expect(section.getByRole("link", { name: /Medical mission sequence/ })).toHaveAttribute(
    "href",
    "/mission/operations",
  );
  await expect(section.getByRole("link")).toHaveCount(3);
  await page.goto("/company/partners");
  section = page
    .locator("section")
    .filter({ has: page.getByRole("heading", { name: "Connected perspectives.", exact: true }) });
  await expect(section.getByRole("link", { name: /Research & design basis/ })).toHaveAttribute(
    "href",
    "/research",
  );
  await expect(section.getByRole("link")).toHaveCount(3);
});

test("every primary headline fits the smallest supported viewport", async ({ page }) => {
  test.setTimeout(180_000);
  await page.setViewportSize({ width: 320, height: 900 });
  const clipped: string[] = [];
  for (const route of ALL_ROUTES) {
    await page.goto(route.path);
    await page.evaluate(() => document.fonts.ready);
    const dimensions = await page.locator("h1").evaluate((element: HTMLElement) => ({
      width: element.clientWidth,
      textWidth: element.scrollWidth,
    }));
    if (dimensions.textWidth > dimensions.width + 1)
      clipped.push(`${route.path}: ${dimensions.textWidth}px text within ${dimensions.width}px`);
  }
  expect(clipped).toEqual([]);
});
