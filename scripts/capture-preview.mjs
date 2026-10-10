/** Capture reproducible desktop/mobile handoff views of the local website. */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const origin = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000";
const output = resolve("docs/previews");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--enable-unsafe-swiftshader", "--use-gl=angle", "--use-angle=swiftshader"],
});
try {
  for (const [name, viewport, routes] of [
    [
      "desktop",
      { width: 1440, height: 900 },
      [
        ["home", "/"],
        ["tiltrotor", "/products/tiltrotor"],
        ["tiltrotor-modes", "/products/tiltrotor#transition", ".c-transition-lab"],
        ["hsvtol", "/innovation/hsvtol"],
        ["hsvtol-modes", "/innovation/hsvtol#flight-modes", ".c-transition-lab"],
        ["catalogue", "/products"],
        ["catalogue-studies", "/products#aircraft-studies", ".c-product-browser"],
        ["energy", "/innovation/hydrogen-electric#powertrain"],
        ["energy-system", "/innovation/hydrogen-electric#powertrain", ".c-energy-explorer"],
        ["medical", "/mission/cabin"],
      ],
    ],
    [
      "mobile",
      { width: 390, height: 844 },
      [
        ["home", "/"],
        ["hsvtol", "/innovation/hsvtol"],
      ],
    ],
  ]) {
    const context = await browser.newContext({ viewport, reducedMotion: "reduce", deviceScaleFactor: 1 });
    const page = await context.newPage();
    for (const [label, route, selector] of routes) {
      await page.goto(origin + route, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images]
            .filter((image) => image.loading !== "lazy")
            .map((image) => image.decode().catch(() => {})),
        );
      });
      if (label === "tiltrotor-modes") await page.getByRole("tab", { name: /Transition/ }).click();
      if (label === "hsvtol-modes") await page.getByRole("tab", { name: /Cruise/ }).click();
      if (selector) await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForLoadState("networkidle");
      await page.evaluate(async () => {
        await Promise.all(
          [...document.images]
            .filter((image) => {
              const rect = image.getBoundingClientRect();
              return rect.bottom > 0 && rect.top < innerHeight;
            })
            .map((image) => image.decode().catch(() => {})),
        );
      });
      const file = resolve(output, `celestium-${label}-${name}.jpg`);
      await page.screenshot({ path: file, type: "jpeg", quality: 88 });
      console.log(file);
    }
    await context.close();
  }
} finally {
  await browser.close();
}
