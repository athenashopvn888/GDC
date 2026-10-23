import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { isCigaretteFlashWindow } from "../app/tv/flashMessages.ts";
import {
  getCigaretteOfferPromo,
  getTv2DaytimePromo,
  isCigaretteOfferVisible,
  isTv2Daytime,
  visibleTv2Cards,
} from "../app/tv2/tv2Promos.ts";

test("TV2 daytime is fixed to America/Toronto regardless of process timezone", () => {
  assert.equal(isTv2Daytime(new Date("2026-10-07T17:35:00.000Z")), true);
  assert.equal(isTv2Daytime(new Date("2026-10-07T13:59:00.000Z")), true);
  assert.equal(isTv2Daytime(new Date("2026-10-07T12:00:00.000Z")), true);
  assert.equal(isTv2Daytime(new Date("2026-10-07T11:59:00.000Z")), false);
  assert.equal(isTv2Daytime(new Date("2026-10-07T21:30:00.000Z")), false);
});

test("daytime cigarette slot shows the category collage without cigarette promo content", () => {
  for (const elapsedMs of [0, 10_000, 20_000]) {
    const promo = getTv2DaytimePromo("CIGARETTES", true, elapsedMs);
    assert.equal(promo?.src, "/banners/GreenDeal_THC_Vape.webp");
    assert.doesNotMatch(`${promo?.src} ${promo?.alt}`, /cig|marlboro|belmont/i);
  }
  assert.match(getTv2DaytimePromo("VAPES", true)?.alt || "", /Ultimate Cannabis Collection/);
  assert.equal(getTv2DaytimePromo("CIGARETTES", false), undefined);
});

test("live tv flag shows the cigarettes card and a false flag hides it", () => {
  const cards = [{ id: "VAPES" }, { id: "CIGARETTES" }, { id: "MAGIC" }];
  assert.deepEqual(visibleTv2Cards(cards, true).map((card) => card.id), ["VAPES", "CIGARETTES", "MAGIC"]);
  assert.deepEqual(visibleTv2Cards(cards, false).map((card) => card.id), ["VAPES", "MAGIC"]);
  assert.deepEqual(
    visibleTv2Cards(cards, false, "/off.webp").map((card) => card.id),
    ["VAPES", "CIGARETTES", "MAGIC"],
  );
});

test("tv boards read the cigarette header from the existing items poll", async () => {
  const [tv, tv2, feed] = await Promise.all([
    readFile("app/tv/page.tsx", "utf8"),
    readFile("app/tv2/page.tsx", "utf8"),
    readFile("app/lib/cigaretteFeed.ts", "utf8"),
  ]);
  assert.match(tv, /readCigaretteTvHeader\(iRes\.headers\)/);
  assert.match(tv2, /readCigaretteTvHeader\(res\.headers\)/);
  assert.match(tv2, /visibleTv2Cards\(CARD_CONFIG, tvCig\.show/);
  assert.doesNotMatch(tv2, /SHOW_CIGARETTES/);
  assert.doesNotMatch(feed, /!SHOW_CIGARETTES/);
});

test("cigarette flash window follows Toronto hours", () => {
  assert.equal(isCigaretteFlashWindow(new Date("2026-10-23T07:30:00.000Z")), true);
  assert.equal(isCigaretteFlashWindow(new Date("2026-10-23T16:00:00.000Z")), false);
});

test("5-second cigarette list overlay runs only outside Toronto daytime", () => {
  assert.equal(isCigaretteOfferVisible(true, 0), false);
  assert.equal(isCigaretteOfferVisible(false, 0), true);
  assert.equal(isCigaretteOfferVisible(false, 4_999), true);
  assert.equal(isCigaretteOfferVisible(false, 5_000), false);
  assert.equal(isCigaretteOfferVisible(false, 30_000), true);
  assert.equal(getCigaretteOfferPromo(true, 0), undefined);
  assert.equal(getCigaretteOfferPromo(false, 0)?.src, "/banners/luxury_mix_match_600_web.webp");
  assert.equal(getCigaretteOfferPromo(false, 30_000)?.src, "/banners/marlboro_belmont_600x600.webp");
});
