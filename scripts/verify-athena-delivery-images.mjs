import assert from "node:assert/strict";
import fs from "node:fs";

const menu = JSON.parse(fs.readFileSync(new URL("../app/delivery/delivery-menu.json", import.meta.url)));
assert.equal(menu.products.length, 63, "delivery fallback must contain 63 products");
const images = menu.products.flatMap((product) => product.images);
assert.equal(images.length, 66, "delivery fallback must preserve 66 image slots");
assert(images.every((url) => /^https:\/\/athena-cannabis-images\.vercel\.app\/products\/delivery\/v1\/delivery-v1-[a-f0-9]{24}\.webp$/.test(url)), "every image must use the versioned Athena path");
const source = fs.readFileSync(new URL("../app/delivery/DeliveryContent.tsx", import.meta.url), "utf8");
assert(source.includes("unoptimized"), "catalog images must bypass the storefront optimizer");
assert(!source.includes("/api/catalog-image"), "legacy SOD image proxy must not appear");
assert(!source.includes("__SOD_"), "placeholders must not ship");
const uniqueImages = [...new Set(images)];
const batchSize = 8;
const requestTimeoutMs = 15_000;
const requestAttempts = 3;

async function fetchWithRetry(url) {
  let lastError;
  for (let attempt = 1; attempt <= requestAttempts; attempt += 1) {
    try {
      return await fetch(url, { signal: AbortSignal.timeout(requestTimeoutMs) });
    } catch (error) {
      lastError = error;
      if (attempt < requestAttempts) {
        console.warn(`Retrying ${url} after attempt ${attempt}/${requestAttempts} failed: ${error.message}`);
      }
    }
  }
  throw new Error(`${url} failed after ${requestAttempts} attempts`, { cause: lastError });
}

console.log(`Checking ${uniqueImages.length} Athena delivery assets in bounded batches of ${batchSize}...`);
for (let start = 0; start < uniqueImages.length; start += batchSize) {
  const batch = uniqueImages.slice(start, start + batchSize);
  await Promise.all(batch.map(async (url) => {
    const response = await fetchWithRetry(url);
    assert.equal(response.status, 200, `${url} must return 200`);
    assert.match(response.headers.get("content-type") || "", /^image\//, `${url} must be an image`);
    assert.match(response.headers.get("cache-control") || "", /immutable/, `${url} must be immutable`);
  }));
  console.log(`Checked ${Math.min(start + batch.length, uniqueImages.length)}/${uniqueImages.length} assets.`);
}
console.log(`Verified ${menu.products.length} products, ${images.length} image slots, ${uniqueImages.length} immutable Athena assets.`);
