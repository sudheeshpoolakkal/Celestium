import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("the aircraft model loads on demand and changes configuration", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/aircraft");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("button", { name: /Explore in 3D/ }).click();
  await expect(page.locator(".aircraft-preview canvas")).toBeVisible();
  await expect(page.locator(".preview-status")).toContainText("Live 3D");
  await page.getByRole("button", { name: /Cruise/ }).click();
  await expect(page.getByRole("button", { name: /Cruise/ })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".flight-explanation")).toContainText("ducts face forward");
  await page.getByRole("button", { name: /Transition/ }).click();
  await expect(page.getByRole("button", { name: /Transition/ })).toHaveAttribute("aria-pressed", "true");
  expect(errors).toEqual([]);
});

test("studio controls retain keyboard and subsystem behaviour", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/aircraft/studio");
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByRole("button", { name: "Hover", exact: true }).click();
  await expect(page.getByRole("slider", { name: "Duct angle in degrees" })).toHaveValue("90");
  await page.keyboard.press("c");
  await expect(page.getByRole("slider", { name: "Duct angle in degrees" })).toHaveValue("0");
  const systems = page.getByRole("button", { name: "Systems", exact: true });
  await systems.click();
  await expect(systems).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Cargo", exact: true }).click();
  await expect(page.locator("button.toggle").filter({ hasText: /^Ramp$/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "Surface", exact: true }).click();
  await expect(page.getByRole("button", { name: "Surface", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(
    audit.violations.map((issue) => ({
      id: issue.id,
      nodes: issue.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
    })),
  ).toEqual([]);
  expect(errors).toEqual([]);
});

test("WebGL-disabled browsers receive the aircraft introduction", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (type === "webgl" || type === "webgl2") return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.goto("/aircraft");
  await page.getByRole("button", { name: /Explore in 3D/ }).click();
  await expect(page.locator(".preview-fallback")).toContainText("WebGL 2");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.goto("/aircraft/studio");
  await expect(page.locator("h1")).toContainText("Taraka X-1");
  await expect(page.getByRole("link", { name: "View the aircraft introduction" })).toBeVisible();
});

test("a reduced-motion model stays still and remains keyboard-inspectable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    const counter = window as typeof window & { __tarakaDraws: number };
    counter.__tarakaDraws = 0;
    const prototype = WebGL2RenderingContext.prototype;
    for (const name of [
      "drawElements",
      "drawArrays",
      "drawElementsInstanced",
      "drawArraysInstanced",
    ] as const) {
      const original = prototype[name];
      Reflect.set(prototype, name, function (this: WebGL2RenderingContext, ...args: unknown[]) {
        counter.__tarakaDraws += 1;
        return Reflect.apply(original, this, args);
      });
    }
  });
  await page.goto("/aircraft/studio");
  const canvas = page.getByRole("img", { name: /Interactive Taraka X-1 research model/ });
  await expect(canvas).toBeVisible();
  await expect(page.getByRole("button", { name: "Rotor motion", exact: true })).toBeDisabled();
  const draws = () =>
    page.evaluate(() => (window as typeof window & { __tarakaDraws: number }).__tarakaDraws);
  await expect.poll(draws).toBeGreaterThan(0);
  await expect
    .poll(async () => {
      const before = await draws();
      await page.waitForTimeout(500);
      return (await draws()) - before;
    })
    .toBe(0);
  await canvas.focus();
  const initial = await canvas.screenshot();
  await canvas.press("ArrowRight");
  const orbit = await canvas.screenshot();
  expect(initial.equals(orbit)).toBe(false);
  await canvas.press("+");
  expect(orbit.equals(await canvas.screenshot())).toBe(false);
  await canvas.press("Home");
  await expect(canvas).toBeFocused();
  await page.getByRole("button", { name: "Tail camera view" }).click();
  expect(initial.equals(await canvas.screenshot())).toBe(false);
});

test("the model pauses offscreen and beneath mobile navigation", async ({ page, isMobile }) => {
  await page.addInitScript(() => {
    const counter = window as typeof window & { __tarakaDraws: number };
    counter.__tarakaDraws = 0;
    const original = WebGL2RenderingContext.prototype.drawElements;
    WebGL2RenderingContext.prototype.drawElements = function (...args: Parameters<typeof original>) {
      counter.__tarakaDraws += 1;
      return Reflect.apply(original, this, args);
    };
  });
  const draws = () =>
    page.evaluate(() => (window as typeof window & { __tarakaDraws: number }).__tarakaDraws);
  const expectPaused = async () => {
    await expect
      .poll(async () => {
        const before = await draws();
        await page.waitForTimeout(500);
        return (await draws()) - before;
      })
      .toBe(0);
  };
  await page.goto("/aircraft");
  await page.getByRole("button", { name: /Explore in 3D/ }).click();
  const canvas = page.locator(".aircraft-preview canvas");
  await expect(canvas).toBeVisible();
  await expect.poll(draws).toBeGreaterThan(0);
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    await expectPaused();
    const stopped = await draws();
    await page.keyboard.press("Escape");
    await expect.poll(draws).toBeGreaterThan(stopped);
  }
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect
    .poll(() => canvas.evaluate((element) => element.getBoundingClientRect().bottom))
    .toBeLessThan(0);
  await expectPaused();
  const stopped = await draws();
  await canvas.scrollIntoViewIfNeeded();
  await expect.poll(draws).toBeGreaterThan(stopped);
});

test("the inline model returns to its poster and restores focus", async ({ page }) => {
  await page.goto("/aircraft");
  const launch = page.getByRole("button", { name: /Explore in 3D/ });
  await launch.click();
  const canvas = page.locator(".aircraft-preview canvas");
  await expect(canvas).toBeVisible();
  await expect(page.locator(".preview-status")).toContainText("Live 3D");
  await page.getByRole("button", { name: "Exit 3D" }).click();
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(launch).toBeFocused();
  await launch.click();
  await expect(canvas).toBeVisible();
  await canvas.focus();
  await canvas.press("Escape");
  await expect(launch).toBeFocused();
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("inline airflow layers render and respond to flight configuration", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/aircraft");
  await page.getByRole("button", { name: /Explore in 3D/ }).click();
  const canvas = page.locator(".aircraft-preview canvas");
  const controls = page.getByRole("group", { name: "Airflow display" });
  await expect(controls.getByRole("button", { name: "Combined", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByLabel("Relative airflow speed legend")).toBeVisible();
  await canvas.focus();
  await page.waitForTimeout(300);
  const combined = await canvas.screenshot();
  await controls.getByRole("button", { name: "Off", exact: true }).click();
  await expect(page.getByLabel("Relative airflow speed legend")).toHaveCount(0);
  const withoutFlow = await canvas.screenshot();
  expect(combined.equals(withoutFlow)).toBe(false);
  await controls.getByRole("button", { name: "Streamlines", exact: true }).click();
  const transition = await canvas.screenshot();
  expect(transition.equals(withoutFlow)).toBe(false);
  await page.getByRole("button", { name: /Hover/ }).click();
  expect(transition.equals(await canvas.screenshot())).toBe(false);
  await controls.getByRole("button", { name: "Surface speed", exact: true }).click();
  const surface = await canvas.screenshot();
  await controls.getByRole("button", { name: "Off", exact: true }).click();
  expect(surface.equals(await canvas.screenshot())).toBe(false);
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations).toEqual([]);
});
