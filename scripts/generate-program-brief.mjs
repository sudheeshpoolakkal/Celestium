import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "public/resources/malus-taraka-x1-program-brief.pdf");
mkdirSync(dirname(output), { recursive: true });
const browser = process.env.CHROME_BIN || "google-chrome";
execFileSync(
  browser,
  [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${output}`,
    `file://${resolve(root, "assets/resources/program-brief.html")}`,
  ],
  { timeout: 30_000, stdio: "pipe" },
);
console.log(`Generated ${output}`);
