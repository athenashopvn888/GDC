export interface TierSeoData {
  seoTitle: string;
  seoIntro: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

function tierContent(name: string, position: string): TierSeoData {
  return {
    seoTitle: `${name} Cannabis Flower York | Green Deal Cannabis`,
    seoIntro: `Browse the ${name} flower tier at Green Deal Cannabis in York. Compare current product names, formats, weights, and posted menu details.`,
    sections: [
      {
        heading: `${name} Flower Tier`,
        body: `${name} is ${position} in the Green Deal Cannabis flower-tier navigation. Use this page to compare current listings; the tier label is a menu category, not a product specification.`,
      },
      {
        heading: "Compare Current Menu Details",
        body: "Product names, formats, weights, and posted prices can change. Review the current listing and ask staff when one item detail matters before choosing.",
      },
      {
        heading: "Visit Green Deal Cannabis",
        body: "Green Deal Cannabis is located at 1820 Jane St in York. Use the store page for directions, contact information, and listed hours before visiting.",
      },
    ],
    faqs: [
      { q: `What is the ${name} tier?`, a: `${name} is one of the five flower categories shown in the Green Deal Cannabis tier navigation.` },
      { q: `Do ${name} listings change?`, a: "Yes. Product names, formats, weights, and posted prices can change, so check the current menu or ask staff." },
      { q: `What does the ${name} label mean?`, a: "The tier label organizes the flower menu. Review each current listing for its own product and package details." },
    ],
  };
}

export const TIER_SEO: Record<string, TierSeoData> = {
  EXOTIC: tierContent("Exotic", "the first tier"),
  PREMIUM: tierContent("Premium", "the second tier"),
  "AAA+": tierContent("AAA+", "the middle tier"),
  AA: tierContent("AA", "a value-focused tier"),
  BUDGET: tierContent("Budget", "the entry-price tier"),
};
