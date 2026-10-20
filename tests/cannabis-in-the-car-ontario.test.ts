import assert from "node:assert/strict";
import test from "node:test";
import { ARTICLE_BODY, ARTICLE_CANONICAL, ARTICLE_DESCRIPTION, ARTICLE_H1, ARTICLE_JSON_LD, inlineText, parseArticle } from "../app/resources/cannabis-in-the-car-ontario/article.ts";

test("article metadata is a self-canonical www resource URL", () => {
  assert.equal(ARTICLE_H1, "Cannabis in the car: Ontario's sealed-or-out-of-reach rule");
  assert.equal(ARTICLE_CANONICAL, "https://www.greendealcannabis.com/resources/cannabis-in-the-car-ontario");
  assert.equal(ARTICLE_JSON_LD["@type"], "Article");
  assert.equal(ARTICLE_JSON_LD.headline, ARTICLE_H1);
  assert.equal(ARTICLE_JSON_LD.url, ARTICLE_CANONICAL);
  assert.equal(ARTICLE_JSON_LD.mainEntityOfPage["@id"], ARTICLE_CANONICAL);
  assert.equal(ARTICLE_JSON_LD.dateModified, "2026-09-30");
  assert.equal(JSON.stringify(ARTICLE_JSON_LD).includes("telephone"), false);
});

test("body keeps the approved copy, last-checked line, and visit link", () => {
  const blocks = parseArticle(ARTICLE_BODY);
  const text = blocks.map((block) => block.type === "ul" || block.type === "ol" ? block.items.map(inlineText).join("\n") : inlineText(block.inlines)).join("\n");
  assert.match(text, /^Last checked: September 30, 2026/);
  assert.equal(text.includes(ARTICLE_DESCRIPTION), true);
  assert.equal(text.includes("Green Deal Cannabis is at 1820 Jane St in Toronto."), true);
  assert.equal(text.includes("LOCAL-PARA"), false);
  assert.equal(blocks.filter((block) => block.type === "h2").length, 5);
  assert.equal(blocks.filter((block) => block.type === "h3").length, 7);
  const list = blocks.find((block) => block.type === "ol");
  assert.equal(list && list.type === "ol" ? list.items.length : 0, 4);
  const links = blocks.flatMap((block) => {
    const rows = block.type === "ul" || block.type === "ol" ? block.items : [block.inlines];
    return rows.flat().filter((inline) => inline.type === "link");
  });
  assert.deepEqual(links, [{ type: "link", text: "visit page", href: "/visit" }]);
  assert.doesNotMatch(text, /tel:|\+1|\(\d{3}\)\s*\d{3}/);
  assert.doesNotMatch(ARTICLE_DESCRIPTION, /\$|24\/7|promo/i);
});
