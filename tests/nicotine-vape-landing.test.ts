import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { getSeoPageBySlug } from "../app/lib/seoPages.ts";

const expectedSlugs = [
  "geek-promax-5-30k-puffs",
  "geek-universe-25k-puffs",
  "level-x-g2-pod",
  "nexa-pix-30k-puffs-many-flavors",
  "ovns-10000-5-10k-puffs",
  "ovns-disposable-5-8ml-many-flavors",
  "ovns-pioneer-5-22k-puffs",
];

test("Green Deal nicotine page uses exactly seven live-checked category cards", () => {
  const page = getSeoPageBySlug("nicotine-vapes-york");
  assert.ok(page?.heroPreview);
  assert.deepEqual(page.heroPreview.products.map((product) => product.sourceSlug), expectedSlugs);
  assert.equal(page.heroPreview.products.length, 7);
  assert.ok(page.heroPreview.products.every((product) => product.image.startsWith("https://")));
  assert.equal(page.heroPreview.menuHref, "/items/vapes");
  assert.equal(page.heroPreview.secondaryHref, "#featured-vapes");
  assert.equal(page.warning, "Adults 19+. Nicotine is addictive.");
  assert.equal(page.suppressCannabisSections, true);
});

test("Green Deal nicotine page is canonical and discoverable", () => {
  const page = getSeoPageBySlug("nicotine-vapes-york");
  assert.equal(page?.canonical, "https://www.greendealcannabis.com/info/nicotine-vapes-york");
  assert.match(readFileSync("app/components/Footer.tsx", "utf8"), /href="\/info\/nicotine-vapes-york"/);
  assert.match(readFileSync("app/page.tsx", "utf8"), /href="\/info\/nicotine-vapes-york"/);
  assert.match(readFileSync("app/page.tsx", "utf8"), /Premium York Cannabis Dispensary/);
  assert.doesNotMatch(readFileSync("app/page.tsx", "utf8"), /Premium Etobicoke Cannabis Dispensary/);
});

test("Green Deal nicotine navigation excludes item-detail and THC routes", () => {
  const page = getSeoPageBySlug("nicotine-vapes-york");
  const copy = JSON.stringify(page);
  assert.doesNotMatch(copy, /GOOBER/i);
  assert.doesNotMatch(copy, /href.*\/item\//i);
  assert.ok(page?.sections.some((section) => section.body.includes("/items/vape-disposables") && section.body.includes("excluded")));
});
