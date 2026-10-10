import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { ALL_ROUTES } from "../lib/routes";
import { FLIGHT_PAGES } from "../lib/flight-pages";
import { PERSPECTIVES } from "../lib/perspectives";
import { JOURNAL } from "../lib/journal";
import { CATALOG, MISSIONS } from "../lib/catalog";
import { MEGA_NAV, FOUNDATION_LINKS } from "../lib/celestium";

const failures: string[] = [];
const paths = new Set(ALL_ROUTES.map((r) => r.path));
const checkLink = (href: string, from: string) => {
  const path = href.split(/[?#]/)[0];
  if (!path || !path.startsWith("/")) return;
  if (path.startsWith("/resources/") || path.startsWith("/media/") || path.startsWith("/images/")) {
    if (!existsSync(resolve("public", path.slice(1)))) failures.push(`${from}: missing file ${path}`);
  } else if (!paths.has(path)) failures.push(`${from}: missing route ${path}`);
};
if (paths.size !== ALL_ROUTES.length) failures.push("Duplicate routes in the site directory");
for (const page of FLIGHT_PAGES) {
  checkLink(page.image, page.path);
  checkLink(page.feature.image || page.image, page.path);
  checkLink(page.feature.href, page.path);
  for (const href of page.related) {
    checkLink(href, page.path);
    if (!PERSPECTIVES.some((perspective) => perspective.path === href))
      failures.push(`${page.path}: reading path cannot render ${href}`);
  }
  if (page.overview.paragraphs.length < 2 || page.priorities.length < 3)
    failures.push(`${page.path}: incomplete authored content`);
}
for (const perspective of PERSPECTIVES) {
  checkLink(perspective.path, "reading paths");
  checkLink(perspective.image, perspective.path);
}
for (const article of JOURNAL) {
  checkLink(article.image, article.slug);
  for (const link of article.related) checkLink(link.href, article.slug);
}
for (const item of [...CATALOG, ...MISSIONS]) {
  checkLink(item.href, item.title);
  checkLink(item.image, item.title);
}
for (const group of MEGA_NAV) {
  checkLink(group.href, group.label);
  checkLink(group.image, group.label);
  for (const column of group.columns) for (const item of column.links) checkLink(item.href, group.label);
}
for (const item of FOUNDATION_LINKS) checkLink(item.href, "foundation");
const manifest = JSON.parse(readFileSync("docs/reference/bell-media.json", "utf8")) as {
  id: string;
  path: string;
  sha256: string;
}[];
const rejected = JSON.parse(readFileSync("docs/reference/bell-rejected-media.json", "utf8")) as {
  id: string;
}[];
const names = new Set(manifest.map((m) => m.path.split("/").at(-1)));
for (const item of manifest) {
  checkLink(item.path, "media manifest");
  if (
    existsSync("public" + item.path) &&
    createHash("sha256")
      .update(readFileSync("public" + item.path))
      .digest("hex") !== item.sha256
  )
    failures.push(`Hash mismatch: ${item.path}`);
  if (rejected.some((r) => r.id === item.id)) failures.push(`Rejected image remains in manifest: ${item.id}`);
}
for (const name of readdirSync("public/media/bell"))
  if (!names.has(name)) failures.push(`Unreviewed Bell media file: ${name}`);
const mapping = JSON.parse(readFileSync("docs/reference/bell-page-map.json", "utf8")) as {
  reference: string;
  celestium: string;
}[];
for (const item of mapping) checkLink(item.celestium, item.reference);
console.log(
  `Checked ${paths.size} routes, ${FLIGHT_PAGES.length} authored topic pages, ${JOURNAL.length} journal articles, ${manifest.length} reviewed media files and ${mapping.length} Bell reference mappings.`,
);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else console.log("Site data, media integrity and destinations passed.");
