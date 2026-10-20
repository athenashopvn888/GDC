export const ARTICLE_H1 = "Cannabis in the car: Ontario's sealed-or-out-of-reach rule";

export const ARTICLE_PATH = "/resources/cannabis-in-the-car-ontario";

export const ARTICLE_CANONICAL = "https://www.greendealcannabis.com/resources/cannabis-in-the-car-ontario";

export const ARTICLE_DESCRIPTION =
  "You've bought cannabis legally and you're driving home. Where it rides in the car matters under Ontario law. The province treats cannabis in a vehicle much like it treats alcohol: how it's packaged and where it sits both count. This guide sets out the rule in the Government of Ontario's own terms, then runs through everyday situations so you can see how it applies. It covers transporting cannabis only. Impaired driving is a separate subject.";

/** Reader-facing markdown after the H1. Frontmatter is omitted. The editor marker is stripped at parse time. */
export const ARTICLE_BODY = `*Last checked: September 30, 2026*
You've bought cannabis legally and you're driving home. Where it rides in the car matters under Ontario law. The province treats cannabis in a vehicle much like it treats alcohol: how it's packaged and where it sits both count. This guide sets out the rule in the Government of Ontario's own terms, then runs through everyday situations so you can see how it applies. It covers transporting cannabis only. Impaired driving is a separate subject.

## The rule in one paragraph

Ontario makes it illegal to carry cannabis in any motorized vehicle (the province gives cars and boats as examples) when it is **open ("unfastened") and not in its original packaging** and **not packed in baggage and readily available to anyone in the vehicle**. Those are the two conditions ontario.ca lists. The province introduces this as "similar to the rules for alcohol." Separately, Ontario bans consuming cannabis (smoking, vaping and eating all count) inside any vehicle or boat that's underway or will be.

The easiest way to meet both parts of the transport rule at once: **keep it sealed in the package it came in, and pack it away where nobody in the car can reach it.**

## Everyday situations

### A sealed package in the trunk
This is the setup the rule describes. The package is unopened and in its original packaging, and it's stowed beyond the reach of the driver and every passenger.

### An open pouch in the cupholder or door pocket
This is the situation the rule is aimed at. The product is open, and it's readily available to the driver and passengers. Don't carry it like this.

### A sealed package in the glovebox or centre console
The package is sealed, which answers the first part of the rule. But a glovebox or console sits within reach of the front seats, and the ontario.ca summary doesn't say whether a closed compartment counts as "packed in baggage." Don't rely on it. The trunk, or a closed bag stowed out of reach, fits the rule's wording more clearly.

### A package you've already opened
Once the seal is broken, the product is no longer unopened in its original packaging. Ontario's summary doesn't spell out every combination, so the cautious approach is a closed bag, stowed away from the cabin, for example in the trunk, and leave it there until you're home.

### A passenger who wants to use it on the drive
The consumption rule covers everyone in the vehicle, not just the driver. While the vehicle is on the road, or will be soon, nobody on board consumes cannabis in any form.

### A parked motorhome or boat with a galley and bunks
Ontario does allow cannabis use in residential vehicles and boats that meet certain criteria, for example ones with permanent sleeping accommodation and cooking facilities that are parked or anchored. A regular car doesn't qualify, even when it's parked.

### A pickup truck or SUV without a separate trunk
The rule is about whether cannabis is readily available to anyone in the vehicle. In a vehicle with no closed-off trunk, put the sealed package in a closed bag as far from the seats as the vehicle allows. The ontario.ca summary doesn't give a specific rule for these vehicles, so stay with the sealed-and-packed-away approach.

## Longer trips

The same packaging-and-placement rule applies whether you're going ten minutes across the city or a long day's drive across the province. Road trips simply give you more chances to open a package along the way, so settle that before you leave.


- **Crossing into the US:** don't. Ontario's driving page warns that taking cannabis over the Canadian border breaks the law, and a car trip is no exception.
- **Flying within Canada:** the province points travellers to their airline for its rules on cannabis.
- **How much you're carrying:** the vehicle rule sits on top of Ontario's general public-possession limit for adults 19 and over: 30 g, measured as dried.

## A thirty-second checklist before you drive

1. Is the package still sealed in its original packaging?
2. Is it packed away, out of reach of everyone in the car?
3. Has everyone agreed not to consume anything during the trip?
4. Are you staying in Canada?

Four yeses, and your cannabis is travelling the way Ontario's summary describes.

## Quick answers

**Can I keep cannabis in my car in Ontario?**
Yes, if it's transported the way the province describes: never unsealed outside its original package, and never loose within anyone's reach.

**Does the rule apply to boats?**
Yes. Ontario's wording names cars and boats as examples of motorized vehicles.

**Is this the same as the impaired-driving law?**
No. This page covers how cannabis is carried. Impaired driving has its own separate set of laws.

<!-- LOCAL-PARA GDC01 -->
Green Deal Cannabis is at 1820 Jane St in Toronto. To plan a stop, see our [visit page](/visit).
`;

export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_H1,
  description: ARTICLE_DESCRIPTION,
  dateModified: "2026-09-30",
  inLanguage: "en-CA",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": ARTICLE_CANONICAL,
  },
  url: ARTICLE_CANONICAL,
  author: {
    "@type": "Organization",
    name: "Green Deal Cannabis",
    url: "https://www.greendealcannabis.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Green Deal Cannabis",
    url: "https://www.greendealcannabis.com",
  },
};

export type ArticleInline =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "em"; text: string }
  | { type: "link"; text: string; href: string };

export type ArticleBlock =
  | { type: "p"; inlines: ArticleInline[] }
  | { type: "h2"; inlines: ArticleInline[] }
  | { type: "h3"; inlines: ArticleInline[] }
  | { type: "ul"; items: ArticleInline[][] }
  | { type: "ol"; items: ArticleInline[][] };

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\*[^*\n]+\*)/g;

export function parseInlines(text: string): ArticleInline[] {
  const inlines: ArticleInline[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_PATTERN)) {
    const index = match.index ?? 0;
    if (index > last) inlines.push({ type: "text", text: text.slice(last, index) });
    const token = match[0];
    if (token.startsWith("**")) {
      inlines.push({ type: "strong", text: token.slice(2, -2) });
    } else if (token.startsWith("[")) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) inlines.push({ type: "link", text: link[1], href: link[2] });
      else inlines.push({ type: "text", text: token });
    } else {
      inlines.push({ type: "em", text: token.slice(1, -1) });
    }
    last = index + token.length;
  }
  if (last < text.length) inlines.push({ type: "text", text: text.slice(last) });
  return inlines;
}

export function parseArticle(markdown: string): ArticleBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").replace(/<!--[\s\S]*?-->/g, "").split("\n");
  const blocks: ArticleBlock[] = [];
  let paragraph: string[] = [];
  let bullets: string[] = [];
  let numbered: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: "p", inlines: parseInlines(paragraph.join(" ")) });
    paragraph = [];
  };
  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push({ type: "ul", items: bullets.map(parseInlines) });
    bullets = [];
  };
  const flushNumbered = () => {
    if (!numbered.length) return;
    blocks.push({ type: "ol", items: numbered.map(parseInlines) });
    numbered = [];
  };
  const flushAll = () => {
    flushParagraph();
    flushBullets();
    flushNumbered();
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushAll();
      continue;
    }
    const italicLine = line.match(/^\*([^*]+)\*$/);
    if (italicLine) {
      flushAll();
      blocks.push({ type: "p", inlines: [{ type: "em", text: italicLine[1] }] });
      continue;
    }
    if (line.startsWith("### ")) {
      flushAll();
      blocks.push({ type: "h3", inlines: parseInlines(line.slice(4)) });
      continue;
    }
    if (line.startsWith("## ")) {
      flushAll();
      blocks.push({ type: "h2", inlines: parseInlines(line.slice(3)) });
      continue;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      flushNumbered();
      bullets.push(line.slice(2));
      continue;
    }
    const ordered = line.match(/^\d+\. (.*)$/);
    if (ordered) {
      flushParagraph();
      flushBullets();
      numbered.push(ordered[1]);
      continue;
    }
    flushBullets();
    flushNumbered();
    paragraph.push(line);
  }
  flushAll();
  return blocks;
}

export function inlineText(inlines: ArticleInline[]): string {
  return inlines.map((inline) => inline.text).join("");
}
