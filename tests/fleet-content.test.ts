import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { CODED_BANNERS, CODED_NAP, CODED_PAGES, fleetVersion } from "../app/lib/fleet/coded.ts";
import { fleetImageAfterError, nextFleetImageSrc } from "../app/lib/fleet/imageFallback.ts";
import { resolveItemBanner, resolveTierBanner } from "../app/lib/corePromotionBanners.ts";
import {
  DEFAULT_FLEET_MANIFEST_URL,
  currentManifestHealth,
  readEmergencyCoded,
  readFleetContent,
  resetFleetContentCache,
  tvManifestDecision,
} from "../app/lib/fleet/read.ts";
import { phoneToTel, resolveBanners, resolveModeValue, resolveNap, resolvePages } from "../app/lib/fleet/resolve.ts";
import { revalidateAuthorized } from "../app/lib/fleet/secret.ts";
import { FLEET_AFFECTED_PATHS } from "../app/lib/fleet/routes.ts";
import { FLEET_MAX_BUNDLE_BYTES, type ContentBundle } from "../app/lib/fleet/types.ts";
import { parseBundle, parseManifest, rejectHttp } from "../app/lib/fleet/validate.ts";

const MANIFEST_URL = "https://fixture.test/GDC01/manifest.json";
const BUNDLE_URL = "https://fixture.test/GDC01/content-v1.json";
const manifest = JSON.parse(readFileSync(new URL("../fixtures/fleet/manifest.json", import.meta.url), "utf8"));
const bundle = JSON.parse(readFileSync(new URL("../fixtures/fleet/content-v1.json", import.meta.url), "utf8")) as ContentBundle;

function responseFor(body: string, status = 200, headers: Record<string, string> = {}) {
  return new Response(body, { status, headers });
}

function fetchServing(bodies: Record<string, { body: string; status?: number; headers?: Record<string, string> }>) {
  const calls: string[] = [];
  const fetchImpl = async (url: string | URL) => {
    const key = String(url);
    calls.push(key);
    const hit = bodies[key];
    if (!hit) return responseFor("missing", 404);
    return responseFor(hit.body, hit.status ?? 200, hit.headers);
  };
  return { fetchImpl: fetchImpl as typeof fetch, calls };
}

async function acceptFixture() {
  resetFleetContentCache();
  const { fetchImpl, calls } = fetchServing({
    [MANIFEST_URL]: { body: JSON.stringify(manifest), headers: { etag: '"GDC01-1"' } },
    [BUNDLE_URL]: { body: JSON.stringify(bundle) },
  });
  const state = await readFleetContent({
    manifestUrl: MANIFEST_URL,
    fetchImpl,
    emergencyCoded: false,
    renderedAt: "2026-10-22T12:00:01.000Z",
  });
  return { state, calls };
}

test("coded banners stay on the core promotion art and the coded city stays Etobicoke", () => {
  assert.equal(CODED_NAP.city, "Etobicoke");
  assert.equal(CODED_NAP.street, "1820 Jane St");
  assert.equal(CODED_BANNERS.find((banner) => banner.id === "weed")?.image, resolveTierBanner("exotic"));
  assert.equal(CODED_BANNERS.find((banner) => banner.id === "vapes")?.image, resolveItemBanner("vapes"));
  assert.equal(CODED_BANNERS.find((banner) => banner.id === "cigarettes")?.image, resolveItemBanner("cigarettes"));
});

test("a valid bundle is accepted and a missing manifest stays on coded content", async () => {
  const coded = await readFleetContent({ manifestUrl: "", emergencyCoded: false, renderedAt: "2026-10-22T00:00:00.000Z" });
  assert.equal(coded.active, false);
  assert.equal(coded.version, "GDC01:coded");
  assert.equal(coded.nap.street, CODED_NAP.street);
  assert.equal(coded.nap.city, "Etobicoke");
  assert.equal(coded.pages.Home.description, CODED_PAGES.Home.description);
  assert.equal(currentManifestHealth(), "ok");

  const { state: live, calls } = await acceptFixture();
  assert.equal(live.active, true);
  assert.equal(live.version, fleetVersion(1));
  assert.equal(live.contentVersion, 1);
  assert.equal(live.bundleUrl, BUNDLE_URL);
  assert.deepEqual(calls, [MANIFEST_URL, BUNDLE_URL]);
  assert.equal(live.banners[0].id, "weed");
  assert.equal(live.banners[0].textBar, "Sheet weed text bar");
  assert.equal(live.banners[0].render, "image");
  assert.equal(live.nap.city, "Etobicoke");
  assert.equal(currentManifestHealth(), "ok");
});

test("invalid-200 responses are rejected before they replace the last good bundle", async () => {
  const badImage = structuredClone(bundle);
  badImage.slots![0].image = "javascript:alert(1)";
  badImage.contentVersion = 2;
  badImage.publishedAt = "2026-10-23T00:00:00.000Z";
  const cases: Array<{ name: string; body: string; status?: number }> = [
    { name: "http", body: JSON.stringify(bundle), status: 500 },
    { name: "invalid-json", body: "{not json" },
    { name: "schema-version", body: JSON.stringify({ ...bundle, schemaVersion: 2, contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z" }) },
    { name: "wrong-store", body: JSON.stringify({ ...bundle, storeCode: "GJC01", contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z", slots: [{ ...bundle.slots![0], textBar: "SHOULD NOT RENDER" }] }) },
    { name: "wrong-domain", body: JSON.stringify({ ...bundle, domain: "example.com", contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z" }) },
    { name: "missing-identity", body: JSON.stringify({ ...bundle, jobId: "", contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z" }) },
    { name: "oversized", body: JSON.stringify({ ...bundle, sourceHash: "x".repeat(FLEET_MAX_BUNDLE_BYTES) }) },
    { name: "published-at-older", body: JSON.stringify({ ...bundle, contentVersion: 2, publishedAt: "2020-01-01T00:00:00.000Z" }) },
    { name: "duplicate-version", body: JSON.stringify({ ...bundle, publishedAt: "2026-10-23T00:00:00.000Z", slots: [{ ...bundle.slots![0], textBar: "SHOULD NOT RENDER" }] }) },
    { name: "decreasing-version", body: JSON.stringify({ ...bundle, contentVersion: 0, publishedAt: "2026-10-23T00:00:00.000Z" }) },
    { name: "bad-image", body: JSON.stringify(badImage) },
  ];

  for (const item of cases) {
    const direct = item.status && item.status !== 200
      ? rejectHttp(item.status)
      : parseBundle(item.body, item.name === "bad-image" ? null : bundle);
    assert.equal(direct?.ok, false, item.name);
    if (direct && !direct.ok) assert.equal(direct.reason, item.name);

    await acceptFixture();
    const { fetchImpl } = fetchServing({
      [MANIFEST_URL]: { body: JSON.stringify({ ...manifest, contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z" }) },
      [BUNDLE_URL]: { body: item.body, status: item.status ?? 200 },
    });
    const kept = await readFleetContent({
      manifestUrl: MANIFEST_URL,
      fetchImpl,
      emergencyCoded: false,
      renderedAt: "2026-10-23T00:00:01.000Z",
    });
    assert.equal(kept.contentVersion, 1, item.name);
    assert.equal(kept.banners[0].textBar, "Sheet weed text bar", item.name);
    assert.equal(kept.version, "GDC01:1", item.name);
    assert.equal(currentManifestHealth(), "err", item.name);
  }
});

test("a blank cell keeps coded copy and a missing image becomes the bold category banner", async () => {
  const { state: live } = await acceptFixture();
  const vapes = live.banners.find((banner) => banner.id === "vapes");
  const codedVapes = CODED_BANNERS.find((banner) => banner.id === "vapes");
  assert.equal(vapes?.textBar, codedVapes?.textBar);
  assert.equal(vapes?.alt, codedVapes?.alt);
  assert.equal(live.nap.street, CODED_NAP.street);
  assert.equal(live.nap.phoneDisplay, CODED_NAP.phoneDisplay);
  assert.equal(live.pages.Contact.metaDescription, CODED_PAGES.Contact.metaDescription);
  assert.equal(live.banners.find((banner) => banner.id === "premium-cigarettes")?.hidden, true);
  assert.equal(live.banners.find((banner) => banner.id === "cigarettes")?.image, CODED_BANNERS.find((banner) => banner.id === "cigarettes")?.image);

  const broken = structuredClone(bundle);
  broken.slots![0].image = "";
  const banners = resolveBanners(broken);
  assert.equal(banners[0].render, "text");
  assert.equal(banners[0].image, "");
  assert.equal(banners[0].codedImage, CODED_BANNERS[0].image);
  assert.equal(banners[0].categoryName, "Exotic Weed");
  assert.equal(banners[0].textBar, "Sheet weed text bar");

  broken.slots![0].image = "https://example.blob.vercel-storage.com/weed.webp";
  const kept = resolveBanners(broken);
  assert.equal(kept[0].render, "image");
  assert.equal(kept[0].image, "https://example.blob.vercel-storage.com/weed.webp");
  assert.equal(kept[0].codedImage, CODED_BANNERS[0].image);
  const bannerSource = readFileSync(new URL("../app/components/FleetAnnouncementBanner.tsx", import.meta.url), "utf8");
  const imageSource = readFileSync(new URL("../app/components/FleetSheetImage.tsx", import.meta.url), "utf8");
  assert.match(imageSource, /onError=\{\(\) => \{/);
  assert.match(imageSource, /codedImage/);
  assert.match(imageSource, /data-fleet-text-banner/);
  assert.match(imageSource, /width=\{width\}/);
  assert.match(imageSource, /height=\{height\}/);
  assert.match(bannerSource, /FleetSheetImage/);
});

test("Follow ALL, Custom, Coded and Hidden each resolve on their own", () => {
  assert.deepEqual(resolveModeValue("Follow ALL", "ignored", "coded", "all value"), { hidden: false, value: "all value" });
  assert.deepEqual(resolveModeValue("Follow ALL", "ignored", "coded", "  "), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Custom", "custom value", "coded"), { hidden: false, value: "custom value" });
  assert.deepEqual(resolveModeValue("Custom", "", "coded"), { hidden: false, value: "coded" });
  const blocked = ["3", "5"].join(".");
  assert.deepEqual(resolveModeValue("Custom", `call ${blocked}`, "coded"), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Custom", "ask for farmers link", "coded"), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Custom", "telnyx desk", "coded"), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Coded", "custom value", "coded"), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Hidden", "custom value", "coded"), { hidden: true, value: "coded" });

  const follow = structuredClone(bundle);
  follow.slots![0].mode = "Follow ALL";
  assert.equal(resolveBanners(follow)[0].textBar, "ALL weed text bar");
  follow.slots![0].mode = "Coded";
  assert.equal(resolveBanners(follow)[0].textBar, CODED_BANNERS[0].textBar);
  assert.equal(resolveBanners(follow)[0].image, CODED_BANNERS[0].image);
  assert.equal(resolveNap(null).name, CODED_NAP.name);
  assert.equal(resolveNap(null).city, "Etobicoke");
  assert.equal(resolvePages(bundle).Home.metaDescription, CODED_PAGES.Home.metaDescription);

  const withMeta = structuredClone(bundle);
  withMeta.slots!.push({
    page: "Home",
    spot: "Page meta",
    mode: "Custom",
    metaTitle: "Sheet home title",
    metaDescription: "Sheet home description",
    description: "Sheet home description",
  });
  const pages = resolvePages(withMeta);
  assert.equal(pages.Home.metaTitle, "Sheet home title");
  assert.equal(pages.Home.metaDescription, "Sheet home description");
  withMeta.slots!.find((slot) => slot.spot === "Page meta")!.mode = "Coded";
  assert.equal(resolvePages(withMeta).Home.metaDescription, CODED_PAGES.Home.metaDescription);

  assert.equal(phoneToTel("4372920413", CODED_NAP.phoneTel), "+14372920413");
  assert.equal(phoneToTel("(437) 292-0413", CODED_NAP.phoneTel), "+14372920413");
  assert.equal(phoneToTel("1 (437) 292-0413", CODED_NAP.phoneTel), "+14372920413");
  assert.equal(phoneToTel("not a phone", CODED_NAP.phoneTel), CODED_NAP.phoneTel);
});

test("the version marker, tv manifest 304, emergency coded flag, and revalidate secret stay in their lanes", async () => {
  assert.equal(fleetVersion(null), "GDC01:coded");
  assert.equal(fleetVersion(4), "GDC01:4");
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /<meta name="fleet-content-version" content=\{fleet\.version\} \/>/);
  const revalidateSource = readFileSync(new URL("../app/api/revalidate/route.ts", import.meta.url), "utf8");
  assert.match(revalidateSource, /revalidateTag\(FLEET_CONTENT_TAG, "max"\)/);
  assert.match(revalidateSource, /export async function POST/);
  assert.doesNotMatch(revalidateSource, /export async function GET/);
  const manifestRoute = readFileSync(new URL("../app/api/tv-manifest/route.ts", import.meta.url), "utf8");
  assert.match(manifestRoute, /s-maxage=60/);
  assert.match(manifestRoute, /stale-while-revalidate=300/);
  assert.match(manifestRoute, /ETag: decision\.etag/);
  const statusRoute = readFileSync(new URL("../app/api/content-status/route.ts", import.meta.url), "utf8");
  assert.match(statusRoute, /manifest: currentManifestHealth\(\)/);
  assert.match(statusRoute, /mode: fleet\.active \? "bundle" : "coded"/);
  assert.doesNotMatch(statusRoute, /process\.env/);
  assert.ok(FLEET_AFFECTED_PATHS.includes("/items/cigarettes"));
  assert.ok(FLEET_AFFECTED_PATHS.includes("/tv"));
  assert.ok(FLEET_AFFECTED_PATHS.includes("/tv2"));

  const coded = await readFleetContent({ manifestUrl: "", emergencyCoded: false, renderedAt: "2026-10-22T00:00:00.000Z" });
  const miss = tvManifestDecision(coded, '"other"');
  assert.equal(miss.status, 200);
  assert.equal(miss.etag, '"GDC01-coded"');
  assert.equal(tvManifestDecision(coded, miss.etag).status, 304);

  const { state: live } = await acceptFixture();
  assert.equal(tvManifestDecision(live, '"GDC01-1"').status, 304);
  const manifestBody = tvManifestDecision(live, null).body;
  assert.equal(manifestBody?.bundleUrl, BUNDLE_URL);
  assert.equal(manifestBody?.contentVersion, 1);
  assert.equal((await readFleetContent({ manifestUrl: MANIFEST_URL, emergencyCoded: true, renderedAt: "2026-10-22T00:00:00.000Z" })).version, "GDC01:coded");

  assert.equal(revalidateAuthorized("right-secret", "right-secret"), true);
  assert.equal(revalidateAuthorized("wrong-secret", "right-secret"), false);
  assert.equal(revalidateAuthorized(null, "right-secret"), false);
  assert.equal(revalidateAuthorized("right-secret", ""), false);
  assert.equal(revalidateAuthorized("right-secret", undefined), false);
  const secretSource = readFileSync(new URL("../app/lib/fleet/secret.ts", import.meta.url), "utf8");
  assert.match(secretSource, /FLEET_REVALIDATE_ENV/);
  assert.match(secretSource, /timingSafeEqual/);
  assert.doesNotMatch(secretSource, /right-secret/);

  const previous = process.env.EDGE_CONFIG;
  const previousMode = process.env.contentMode;
  delete process.env.contentMode;
  process.env.EDGE_CONFIG = "https://edge-config.vercel.com/ecfg-test?token=test-token";
  let requestUrl = "";
  const fetchImpl = async (url: string | URL, init?: RequestInit) => {
    requestUrl = String(url);
    const auth = new Headers(init?.headers).get("authorization") || "";
    assert.equal(auth.startsWith("Bearer "), true);
    assert.equal(auth.includes(" "), true);
    return responseFor(JSON.stringify("coded"));
  };
  try {
    assert.equal(await readEmergencyCoded(fetchImpl as typeof fetch), true);
    assert.equal(requestUrl.includes("token"), false);
    process.env.contentMode = "coded";
    assert.equal(await readEmergencyCoded(fetchImpl as typeof fetch), true);
  } finally {
    if (previous == null) delete process.env.EDGE_CONFIG;
    else process.env.EDGE_CONFIG = previous;
    if (previousMode == null) delete process.env.contentMode;
    else process.env.contentMode = previousMode;
  }
});

test("an unset manifest env uses the public GDC01 blob and refreshes through ISR", async () => {
  resetFleetContentCache();
  const previous = process.env.FLEET_CONTENT_MANIFEST_URL;
  delete process.env.FLEET_CONTENT_MANIFEST_URL;
  const calls: string[] = [];
  const fetchImpl = async (url: string | URL) => {
    calls.push(String(url));
    return responseFor("missing", 404);
  };
  try {
    const state = await readFleetContent({
      fetchImpl: fetchImpl as typeof fetch,
      emergencyCoded: false,
      renderedAt: "2026-10-22T00:00:00.000Z",
    });
    assert.equal(state.version, "GDC01:coded");
    assert.equal(state.active, false);
    assert.equal(calls[0], DEFAULT_FLEET_MANIFEST_URL);
    assert.equal(currentManifestHealth(), "err");
  } finally {
    if (previous == null) delete process.env.FLEET_CONTENT_MANIFEST_URL;
    else process.env.FLEET_CONTENT_MANIFEST_URL = previous;
  }
  const source = readFileSync(new URL("../app/lib/fleet/read.ts", import.meta.url), "utf8");
  assert.match(source, /FLEET_FETCH_REVALIDATE_SECONDS = 300/);
  assert.match(source, /dhaah0upvlpukv56\.public\.blob\.vercel-storage\.com\/\$\{FLEET_STORE_CODE\}\/manifest\.json/);
  assert.match(source, /revalidate: FLEET_FETCH_REVALIDATE_SECONDS/);
});

const HOME_SPOTS = [
  { spot: "Top banner", id: "weed" },
  { spot: "Promo banner 2", id: "vapes" },
  { spot: "Promo banner 3", id: "cigarettes" },
  { spot: "Promo banner 4", id: "premium-cigarettes" },
] as const;

function homeSpotBundle(spot: string, mode: "Follow ALL" | "Custom" | "Coded" | "Hidden"): ContentBundle {
  return {
    ...bundle,
    slots: [{
      page: "Home",
      spot,
      mode,
      image: "/banners/custom-home.webp",
      textBar: `Text ${spot}`,
      alt: `Alt ${spot}`,
      title: `Title ${spot}`,
      caption: `Caption ${spot}`,
      categoryName: `Category ${spot}`,
    }],
  };
}

for (const { spot, id } of HOME_SPOTS) {
  test(`Home ${spot} Hidden removes that banner and Custom overrides its fields`, () => {
    const coded = CODED_BANNERS.find((banner) => banner.id === id);
    assert.ok(coded);
    const hidden = resolveBanners(homeSpotBundle(spot, "Hidden")).find((banner) => banner.id === id);
    assert.equal(hidden?.hidden, true, spot);
    const custom = resolveBanners(homeSpotBundle(spot, "Custom")).find((banner) => banner.id === id);
    assert.equal(custom?.hidden, false, spot);
    assert.equal(custom?.image, "/banners/custom-home.webp", spot);
    assert.equal(custom?.textBar, `Text ${spot}`, spot);
    assert.equal(custom?.alt, `Alt ${spot}`, spot);
    assert.equal(custom?.title, `Title ${spot}`, spot);
    assert.equal(custom?.caption, `Caption ${spot}`, spot);
    assert.equal(custom?.codedImage, coded.image, spot);
    const unchanged = resolveBanners(homeSpotBundle(spot, "Coded")).find((banner) => banner.id === id);
    assert.equal(unchanged?.hidden, coded.hidden, spot);
    assert.equal(unchanged?.image, coded.image, spot);
    assert.equal(unchanged?.textBar, coded.textBar, spot);
  });
}

test("a broken sheet image uses the coded image, then a category-name banner", () => {
  const coded = "/banners/core-top-weed.webp";
  const sheet = "https://example.blob.vercel-storage.com/sheet.webp";
  assert.equal(nextFleetImageSrc(sheet, coded), coded);
  assert.equal(nextFleetImageSrc(coded, coded), null);
  assert.equal(nextFleetImageSrc(sheet, ""), null);
  assert.equal(nextFleetImageSrc(sheet, "   "), null);
  assert.equal(nextFleetImageSrc(sheet, undefined), null);

  const first = fleetImageAfterError(sheet, coded);
  assert.equal(first.category, false);
  assert.equal(first.src, coded);
  const second = fleetImageAfterError(first.src, coded);
  assert.equal(second.category, true);
  assert.equal(second.src, "");
  const noCoded = fleetImageAfterError(sheet, "");
  assert.equal(noCoded.category, true);
  const sameUrl = fleetImageAfterError(coded, coded);
  assert.equal(sameUrl.category, true);

  const banner = readFileSync(new URL("../app/components/FleetAnnouncementBanner.tsx", import.meta.url), "utf8");
  const image = readFileSync(new URL("../app/components/FleetSheetImage.tsx", import.meta.url), "utf8");
  const style = readFileSync(new URL("../app/lib/fleet/imageFallback.ts", import.meta.url), "utf8");
  assert.match(image, /fleetImageAfterError\(src, banner\.codedImage\)/);
  assert.match(image, /data-fleet-text-banner/);
  assert.match(image, /banner\.categoryName/);
  assert.match(image, /aspectRatio/);
  assert.match(banner, /FleetSheetImage/);
  assert.match(style, /#020b03/);
  assert.match(style, /#84cc16/);
  assert.doesNotMatch(style, /backgroundImage|background-image/);
  assert.doesNotMatch(image, /backgroundImage|background-image/);
});

test("manifest identity failures and a wrong-store manifest do not publish", () => {
  assert.equal(parseManifest(JSON.stringify({ ...manifest, storeCode: "GJC01" })).ok, false);
  assert.equal(parseManifest("{").ok, false);
  const missing = parseBundle(JSON.stringify({ schemaVersion: 1 }), null);
  assert.equal(missing.ok, false);
  if (!missing.ok) assert.equal(missing.reason, "missing-identity");
  const httpImage = parseBundle(JSON.stringify({ ...bundle, slots: [{ ...bundle.slots![0], image: "http://insecure.example/weed.webp" }] }), null);
  assert.equal(httpImage.ok, false);
  if (!httpImage.ok) assert.equal(httpImage.reason, "bad-image");
});
