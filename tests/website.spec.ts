import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/program",
  "/aircraft",
  "/technology",
  "/mission",
  "/mission/cabin",
  "/mission/operations",
  "/research",
  "/products",
  "/products/tiltrotor",
  "/innovation/hsvtol",
  "/missions",
  "/contact",
  "/journal",
  "/company",
  "/support",
  "/media-credits",
  "/videos",
  "/innovation/hydrogen-electric",
  "/innovation/digital-engineering",
  "/support/training/pilot",
];

for (const route of routes) {
  test(`${route} renders a readable, accessible page`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(
      audit.violations.map((issue) => ({
        id: issue.id,
        nodes: issue.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
      })),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("mission modules work with pointer and keyboard", async ({ page }) => {
  await page.goto("/program");
  const cargo = page.getByRole("tab", { name: /Essential cargo/ });
  await cargo.click();
  await expect(cargo).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { name: "Deliver what matters." })).toBeVisible();
  await cargo.press("ArrowRight");
  const research = page.getByRole("tab", { name: /Flight research/ });
  await expect(research).toBeFocused();
  await expect(research).toHaveAttribute("aria-selected", "true");
  await research.press("Home");
  await expect(page.getByRole("tab", { name: /Critical care/ })).toBeFocused();
  await expect(page.getByRole("heading", { name: "Care, carried further." })).toBeVisible();
});

test("research trade updates the selected study point", async ({ page }) => {
  await page.goto("/research");
  const choices = page.getByRole("group", { name: "Select nominal duct diameter" });
  await choices.getByRole("button", { name: "2.4m", exact: true }).click();
  await expect(page.locator(".trade-point")).toContainText("747 kW");
  await expect(page.locator(".trade-point")).toContainText("1,744 kg");
  await choices.getByRole("button", { name: "3.2m", exact: true }).click();
  await expect(page.locator(".trade-point")).toContainText("381 kW");
  await expect(choices.getByRole("button", { name: "3.2m", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator(".trade-note")).toContainText("vessel was omitted");
});

test("published resources download successfully", async ({ page, request }) => {
  const pdf = await request.get("/resources/malus-taraka-x1-program-brief.pdf");
  expect(pdf.ok()).toBe(true);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const basis = await request.get("/resources/taraka-x1-design-basis.md");
  expect(basis.ok()).toBe(true);
  expect(await basis.text()).toContain("tank vessel omitted");
  const csv = await request.get("/resources/taraka-x1-duct-trade.csv");
  expect(csv.ok()).toBe(true);
  expect(await csv.text()).toContain("2.8,1537,1224,495,123");
  await page.goto("/");
  const download = page.waitForEvent("download");
  await page.locator(".c-footer-download").click();
  expect((await download).suggestedFilename()).toBe("malus-taraka-x1-program-brief.pdf");
});

test("mobile navigation traps focus, closes on Escape and follows a route", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile navigation is only displayed at smaller viewports.");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator("header .c-brand")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  await page.getByRole("button", { name: "Open navigation" }).click();
  const primary = page.getByRole("navigation", { name: "Primary", exact: true });
  await primary.getByRole("button", { name: "Aircraft", exact: true }).click();
  await primary.getByRole("link", { name: "MALUS platform", exact: true }).click();
  await expect(page).toHaveURL(/\/program$/);
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("small viewports preserve the page boundaries", async ({ page }) => {
  test.setTimeout(120_000);
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

test("medical hero links position the chapter beneath both navigation bars", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [route, anchor] of [
    ["/mission", "#medical-module"],
    ["/mission/cabin", "#cabin-layout"],
    ["/mission/operations", "#mission-sequence"],
  ]) {
    await page.goto(route);
    await page.locator(`.medical-hero a[href="${anchor}"]`).click();
    await expect(page.locator(".site-header")).toHaveClass(/header-scrolled/);
    await expect
      .poll(() =>
        page.evaluate((target) => {
          const chapter = document.querySelector(target)!.getBoundingClientRect();
          const navigation = document.querySelector(".medical-navigation")!.getBoundingClientRect();
          return chapter.top >= navigation.bottom && chapter.top <= navigation.bottom + 40;
        }, anchor),
      )
      .toBe(true);
  }
});

test("missing routes offer a clear path back", async ({ page }) => {
  const response = await page.goto("/a-page-that-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Return to Celestium" })).toBeVisible();
  await page.getByRole("link", { name: "Return to Celestium" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("aircraft section navigation follows the reader", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/aircraft");
  const navigation = page.getByRole("navigation", { name: "On this page" });
  await navigation.getByRole("link", { name: "Design basis" }).click();
  await expect(page).toHaveURL(/#specifications$/);
  await expect(navigation.getByRole("link", { name: "Design basis" })).toHaveAttribute(
    "aria-current",
    "location",
  );
  const position = await navigation.evaluate((element) => element.getBoundingClientRect());
  const headerBottom = await page
    .locator("header.site-header")
    .evaluate((element) => element.getBoundingClientRect().bottom);
  expect(position.top).toBeGreaterThanOrEqual(headerBottom - 1);
  expect(position.bottom).toBeLessThan(180);
  expect(
    await page.locator("#specifications").evaluate((element) => element.getBoundingClientRect().top),
  ).toBeGreaterThanOrEqual(position.bottom - 1);
  await page.locator("#mission-bay").scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const section = document.getElementById("mission-bay")!;
    window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - 160, behavior: "instant" });
  });
  await expect(navigation.getByRole("link", { name: "Mission bay" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test("the duct drawing retains readable detail within its own scroll area", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/technology");
  const drawing = page.getByRole("region", { name: "Duct section drawing" });
  await drawing.scrollIntoViewIfNeeded();
  expect(await drawing.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  await drawing.focus();
  await drawing.press("ArrowRight");
  await expect.poll(() => drawing.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test("navigation and the aircraft introduction remain usable without JavaScript", async ({
  browser,
  baseURL,
  viewport,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport });
  try {
    const page = await context.newPage();
    await page.goto("/");
    const navigation = page.getByRole("navigation", { name: "Primary without JavaScript" });
    await expect(navigation.getByRole("link", { name: "MALUS program", exact: true })).toBeVisible();
    await navigation.getByRole("link", { name: "MALUS program", exact: true }).click();
    await expect(page).toHaveURL(/\/program$/);
    await expect(page.getByRole("heading", { name: "Care, carried further." })).toBeVisible();
    await page.goto("/aircraft/studio");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "View the aircraft introduction" })).toBeVisible();
    await expect(page.locator(".studio-fallback .intro-description")).toContainText("needs JavaScript");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  } finally {
    await context.close();
  }
});

test("the skip link transfers keyboard focus to the content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("Celestium keeps its aircraft concept and technology references clear", async ({ page }) => {
  await page.goto("/");
  const malus = page.locator("h1.c-malus-name");
  await expect(malus).toContainText("MALUS");
  await expect(malus).toContainText("Modular Aerial");
  await expect(malus).toContainText("Lift Utility");
  await expect(malus).toContainText("System");
  await expect(page.getByRole("link", { name: "Explore MALUS", exact: true })).toHaveAttribute(
    "href",
    "/program",
  );
  const heroBox = await page.locator(".c-home-hero").boundingBox();
  const nameBox = await malus.boundingBox();
  expect(nameBox && heroBox).toBeTruthy();
  expect(nameBox!.y).toBeGreaterThanOrEqual(heroBox!.y);
  expect(nameBox!.y + nameBox!.height).toBeLessThanOrEqual(heroBox!.y + heroBox!.height);
  await page.getByRole("button", { name: "Show Tiltrotor story" }).click();
  await expect(page.locator("h1")).toContainText("The future has");
  await expect(page.getByRole("link", { name: "MALUS, Modular Aerial Lift Utility System" })).toBeVisible();
  await page.getByRole("button", { name: "Show Taraka X-1 story" }).click();
  await expect(page.locator(".c-home-hero-copy")).toContainText("hydrogen-electric");
  await expect(page.locator(".c-home-hero-bottom")).toContainText("Celestium / Concept visualization");
  await page.getByRole("link", { name: "Meet Taraka X-1", exact: true }).click();
  await expect(page).toHaveURL(/\/aircraft$/);
  await expect(page.locator("h1")).toContainText("Taraka X-1");
  await page.getByRole("link", { name: "Explore aircraft & airflow", exact: true }).click();
  await expect(page.getByRole("button", { name: /Explore in 3D/ })).toBeVisible();
  await page.goto("/mission");
  await page
    .getByRole("navigation", { name: "Medical mission pages" })
    .getByRole("link", { name: /The medical cabin/ })
    .click();
  await expect(page).toHaveURL(/\/mission\/cabin$/);
  await expect(page.locator(".medical-cabin-stage")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Medical mission pages" })
    .getByRole("link", { name: /The mission sequence/ })
    .click();
  await expect(page).toHaveURL(/\/mission\/operations$/);
  await expect(page.locator(".medical-sequence-list > div")).toHaveCount(4);
  const active = page.locator('.medical-navigation a[aria-current="page"]');
  await expect(active).toHaveText(/The mission sequence/);
  await expect
    .poll(() =>
      active.evaluate((link) => {
        const frame = link.parentElement!.getBoundingClientRect();
        const bounds = link.getBoundingClientRect();
        return bounds.left >= frame.left - 1 && bounds.right <= frame.right + 1;
      }),
    )
    .toBe(true);
});
