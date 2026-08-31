import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const sha256 = (relativePath) => createHash("sha256").update(read(relativePath)).digest("hex");

test("protected dynamic routes emit self-canonical metadata", () => {
  const tiers = read("app/[tier]/page.tsx");
  const flowers = read("app/flower/[slug]/page.tsx");
  const categories = read("app/items/[category]/page.tsx");

  assert.match(tiers, /canonical: `https:\/\/www\.greendealcannabis\.com\/\$\{tierInfo\.config\.slug\}`/);
  assert.match(flowers, /canonical: `https:\/\/www\.greendealcannabis\.com\/flower\/\$\{flower\.slug\}`/);
  assert.match(categories, /canonical: `https:\/\/www\.greendealcannabis\.com\/items\/\$\{catInfo\.config\.slug\}`/);
});

test("storefront templates contain no Cafe Value brand residue", () => {
  const sourceFiles = [
    "app/[tier]/page.tsx",
    "app/flower/[slug]/page.tsx",
    "app/items/[category]/page.tsx",
  ];
  for (const sourceFile of sourceFiles) {
    assert.doesNotMatch(read(sourceFile), /Cafe Value/i, sourceFile);
  }
});

test("local prebuild safe mode cannot dirty tracked stock JSON", () => {
  const stockFiles = ["app/lib/flowers.json", "app/lib/items.json"];
  const before = stockFiles.map(sha256);
  const result = spawnSync(process.execPath, [path.join(root, "scripts/prebuild-stock.js")], {
    cwd: root,
    encoding: "utf8",
    env: {
      ...process.env,
      APPS_SCRIPT_URL: "http://127.0.0.1:1/should-not-be-called",
      VERCEL: "",
      GDC_ALLOW_TRACKED_STOCK_WRITE: "",
    },
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Local safe mode/);
  assert.deepEqual(stockFiles.map(sha256), before);
});
