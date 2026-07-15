export interface SeoPageData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  icon: string;
  heroTagline: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const SEO_PAGES: SeoPageData[] = [
  {
    slug: "york-weed-dispensary",
    title: "York Weed Dispensary - Green Deal Cannabis | 10am - 2am | Jane St",
    metaDescription: "Green Deal Cannabis is located at 1820 Jane St in York, Toronto. Open daily 10am - 2am with menu categories for flower, edibles, vapes, concentrates, pre-rolls, cigarettes, and accessories.",
    h1: "York Weed Dispensary - Green Deal Cannabis",
    icon: "",
    heroTagline: "Cannabis on Jane St - Open 10am - 2am Daily - Walk-In Welcome",
    sections: [
      { heading: "Green Deal Cannabis on Jane Street", body: "Green Deal Cannabis is located at 1820 Jane St in York, Toronto. Adults 19+ can use the store page for directions, contact information, menu categories, and current details before visiting." },
      { heading: "Five Flower Tiers", body: "The flower menu is organized into Exotic, Premium, AAA+, AA, and Budget tiers. Use the tier pages to compare product names, formats, weights, and posted prices." },
      { heading: "More Menu Categories", body: "The site also links to edibles, vapes, concentrates, pre-rolls, cigarettes, and accessories. Product names and posted details can change, so check the current menu or ask staff." },
      { heading: "Open Daily 10am - 2am on Jane Street", body: "Green Deal Cannabis is open from 10 AM to 2 AM daily, 7 days a week. The store is located at 1820 Jane St in York near Weston Road and TTC routes serving the area." },
    ],
    faqs: [
      { q: "Where is Green Deal Cannabis located?", a: "Green Deal Cannabis is located at 1820 Jane St, York, ON M9N 2T3." },
      { q: "What are the hours for Green Deal Cannabis?", a: "Green Deal Cannabis is open from 10 AM to 2 AM daily, 7 days a week." },
      { q: "What menu categories are listed?", a: "The site includes flower tiers, edibles, vapes, concentrates, pre-rolls, cigarettes, and accessories." },
      { q: "Can menu details change?", a: "Yes. Check the current menu or ask staff when a product name, price, or format matters for the visit." },
    ],
  },
  {
    slug: "cheap-weed-york",
    title: "Cheap Weed York - Budget Cannabis Menu | Green Deal Cannabis",
    metaDescription: "Compare Budget, AA, AAA+, Premium, and Exotic flower tiers at Green Deal Cannabis. Open daily 10am - 2am at 1820 Jane St.",
    h1: "Cheap Weed York - Budget Cannabis Guide",
    icon: "",
    heroTagline: "Compare Flower Tiers - Open 10am - 2am Daily",
    sections: [
      { heading: "Start With The Budget Tier", body: "Use the Budget and AA tier pages to compare the lower-priced flower lanes shown on the current menu. Check each listing for the current product name, weight, and posted price." },
      { heading: "Compare All Five Tiers", body: "Green Deal Cannabis organizes flower into Budget, AA, AAA+, Premium, and Exotic tiers. The tier navigation keeps each lane separate and makes current menu comparisons easier." },
      { heading: "Current Details Matter", body: "Product names, weights, bundle listings, and posted prices can change. Use the current tier page or ask staff before choosing." },
    ],
    faqs: [
      { q: "Where should value shoppers start?", a: "Start with the Budget and AA tier pages, then compare the current listed details." },
      { q: "Where can I confirm current prices?", a: "Check the menu or ask staff for current prices and package sizes." },
      { q: "Where is Green Deal Cannabis?", a: "The store is at 1820 Jane St in York and is open daily 10am - 2am." },
    ],
  },
  {
    slug: "native-cigarettes-york",
    title: "Native Cigarettes York | Green Deal Cannabis",
    metaDescription: "Use the cigarette category at Green Deal Cannabis to review current Native cigarette listings. 1820 Jane St. Open 10am - 2am Daily.",
    h1: "Native Cigarettes York",
    icon: "",
    heroTagline: "Cigarette Category Guide - Open 10am - 2am Daily",
    sections: [
      { heading: "Start With The Cigarette Category", body: "Use the cigarette category to review the names and formats currently shown for Green Deal Cannabis. Ask staff when a specific listing matters for the visit." },
      { heading: "Jane Street Location", body: "Green Deal Cannabis is located at 1820 Jane St in York. Use the contact page for directions and store information before visiting." },
      { heading: "Menu Details Can Change", body: "Brand names, formats, and posted prices can change. The current menu or store staff can provide the latest details." },
    ],
    faqs: [
      { q: "Does the site include a cigarette category?", a: "Yes. Use the cigarette category for the listings currently shown." },
      { q: "What cigarette brands are listed?", a: "Check the current cigarette category or ask staff because brand names and formats can change." },
      { q: "What are the store hours?", a: "Green Deal Cannabis is open daily from 10 AM to 2 AM." },
    ],
  },
  {
    slug: "weed-delivery-york",
    title: "Green Deal Cannabis Delivery Updates | York & Toronto",
    metaDescription: "Review the prepared Green Deal Cannabis delivery information page for future updates. Store shopping remains available at 1820 Jane St during listed hours.",
    h1: "Green Deal Cannabis Delivery Updates",
    icon: "",
    heroTagline: "Delivery Information Is Being Prepared",
    sections: [
      { heading: "Delivery Preparation", body: "Green Deal Cannabis has a prepared delivery information page for future updates. This guide does not promise active delivery, coverage, timing, pricing, or checkout availability." },
      { heading: "Use The Store Page", body: "For current shopping information, use the main store page, menu categories, contact details, and directions for 1820 Jane St." },
      { heading: "Check Before Relying On Delivery", body: "Do not rely on old delivery descriptions. Confirm any future delivery launch, service area, ordering method, and schedule through the current store website." },
    ],
    faqs: [
      { q: "Where can I find delivery updates?", a: "Use the delivery information page for future service updates." },
      { q: "Does this page confirm a delivery area?", a: "No. Any future service area and ordering instructions must be confirmed on the current store website." },
      { q: "What are the store hours?", a: "Green Deal Cannabis is open daily from 10 AM to 2 AM for store visits." },
    ],
  },
  {
    slug: "dispensary-near-me-york",
    title: "Cannabis Dispensary Near Me York - Green Deal Cannabis | Open 10am - 2am Daily",
    metaDescription: "Green Deal Cannabis is located at 1820 Jane St in York, Toronto. Open 10am - 2am Daily with store details and menu-category links.",
    h1: "Cannabis Dispensary Near Me - York",
    icon: "",
    heroTagline: "Walk-In Welcome - Open 10am - 2am Daily",
    sections: [
      { heading: "Green Deal Cannabis In York", body: "Green Deal Cannabis is located at 1820 Jane St near Weston Road. Use the store page for directions, contact information, and menu-category links." },
      { heading: "Browse By Category", body: "Start with flower tiers, edibles, vapes, concentrates, pre-rolls, cigarettes, or accessories. Check the current menu or ask staff when a listing detail matters." },
      { heading: "Areas Around The Store", body: "The Jane Street location is accessible from York, Weston, Mount Dennis, and nearby Toronto neighbourhoods. Use the contact page for current directions." },
    ],
    faqs: [
      { q: "Where is Green Deal Cannabis?", a: "Green Deal Cannabis is at 1820 Jane St, York, ON M9N 2T3." },
      { q: "Is Green Deal Cannabis walk-in friendly?", a: "Yes. The store is open daily from 10 AM to 2 AM." },
      { q: "How should I check current menu details?", a: "Use the current menu or ask staff before visiting." },
    ],
  },
];

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((page) => page.slug === slug);
}
