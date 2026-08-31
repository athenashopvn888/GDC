import assert from "node:assert/strict";
import test from "node:test";
import { resolveStorefrontTitle } from "../app/lib/metadataTitle.ts";

test("branded child titles bypass the root suffix", () => {
  const title = "AA Cannabis Flower York | Green Deal Cannabis";
  assert.deepEqual(resolveStorefrontTitle(title), { absolute: title });
});

test("unbranded child titles retain the root suffix", () => {
  assert.equal(resolveStorefrontTitle("Cannabis Edibles York"), "Cannabis Edibles York");
});

test("brand detection is case-insensitive without rewriting the title", () => {
  const title = "Guide | GREEN DEAL CANNABIS";
  assert.deepEqual(resolveStorefrontTitle(title), { absolute: title });
});
