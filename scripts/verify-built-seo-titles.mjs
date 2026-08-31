import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const appOutput = path.resolve(".next/server/app");
const storefrontName = "Green Deal Cannabis";

function firstHtml(relativeDirectory) {
  const directory = path.join(appOutput, relativeDirectory);
  const file = fs.readdirSync(directory).find((entry) => entry.endsWith(".html"));
  assert(file, `Expected a generated HTML route in ${relativeDirectory}`);
  return path.join(relativeDirectory, file);
}

const routes = [
  ["root", "index.html"],
  ["tier", "aa.html"],
  ["flower", firstHtml("flower")],
  ["item", firstHtml("item")],
  ["category", path.join("items", "edibles.html")],
];

for (const [routeFamily, relativeFile] of routes) {
  const html = fs.readFileSync(path.join(appOutput, relativeFile), "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || "";
  const brandCount = title.match(/Green Deal Cannabis/gi)?.length || 0;
  assert.equal(brandCount, 1, `${routeFamily} rendered title must contain ${storefrontName} exactly once: ${title}`);
  console.log(`${routeFamily}: ${title}`);
}

console.log("Rendered storefront titles contain Green Deal Cannabis exactly once across all representative route families.");
