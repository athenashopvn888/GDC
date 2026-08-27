const NATIVE_HERO_DISCLOSURE = "Brand preview only. Selection varies by store; check the current cigarette menu before visiting.";
const NATIVE_HERO_PRODUCTS = [
  { name: "BB Lights", image: "/products/1001-BB-LIGHTS-CARTONS.webp" },
  { name: "BB Full", image: "/products/1003-BB-FULL-CARTON.webp" },
  { name: "Canadian Lights", image: "/products/1005-CANADIAN-LIGHTS.webp" },
  { name: "Canadian Full", image: "/products/1006-CANADIAN-FULL.webp" },
  { name: "Canadian Classics Silver", image: "/products/1015-CANADIAN-CLASSICS-SILVER.webp" },
  { name: "Canadian Menthol", image: "/products/1013-CANADIAN-MENTHOL.webp" },
] as const;

const NICOTINE_VAPE_PRODUCTS = [
  { name: "Geek Promax — 30K Puffs", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/GEEK-PROMAX.jpg", sourceSlug: "geek-promax-5-30k-puffs" },
  { name: "Geek Universe — 25K Puffs", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/geek_universe_pulse_x_25k.webp", sourceSlug: "geek-universe-25k-puffs" },
  { name: "Level X G2 Pod", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/1086-Level-X-G2-pod.webp", sourceSlug: "level-x-g2-pod" },
  { name: "NEXA PIX — 30K Puffs", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/nexa_showcase_600x600.webp", sourceSlug: "nexa-pix-30k-puffs-many-flavors" },
  { name: "OVNS 10000 — 10K Puffs", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/1081OVNS10000.jpg", sourceSlug: "ovns-10000-5-10k-puffs" },
  { name: "OVNS Disposable — 8 mL", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/OVNS500x500HQ.webp", sourceSlug: "ovns-disposable-5-8ml-many-flavors" },
  { name: "OVNS Pioneer — 22K Puffs", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/OVNS_PIONEER_5_22K_PUFFS.webp", sourceSlug: "ovns-pioneer-5-22k-puffs" },
] as const;

export interface SeoPageData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  icon: string;
  heroTagline: string;
  canonical?: string;
  warning?: string;
  suppressCannabisSections?: boolean;
  heroPreview?: {
    eyebrow: string;
    intro: string;
    products: ReadonlyArray<{ name: string; image: string; sourceSlug?: string }>;
    disclosure: string;
    theme?: "nicotine";
    menuHref?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    identityStrip?: string;
    featuredHeading?: string;
    featuredIntro?: string;
  };
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
    heroPreview: {
      eyebrow: "Green Deal Cannabis · 1820 Jane St, York",
      intro: "Cigarette category guide for Jane Street",
      products: NATIVE_HERO_PRODUCTS,
      disclosure: NATIVE_HERO_DISCLOSURE,
    },
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
    slug: "nicotine-vapes-york",
    title: "Nicotine Vapes in York | Green Deal Cannabis",
    metaDescription: "Adults 19+: review seven live-checked nicotine vape product pages from Green Deal Cannabis in York, then use /items/vapes for current category information. Nicotine is addictive.",
    canonical: "https://www.greendealcannabis.com/info/nicotine-vapes-york",
    h1: "Nicotine Vapes at Green Deal Cannabis in York",
    icon: "",
    heroTagline: "Adult nicotine vape guide for York and Weston",
    warning: "Adults 19+. Nicotine is addictive.",
    suppressCannabisSections: true,
    heroPreview: {
      theme: "nicotine",
      eyebrow: "GREEN DEAL CANNABIS • YORK • JANE STREET / WESTON • ADULTS 19+",
      intro: "This Green Deal Cannabis guide presents seven image-backed product pages live-checked in the VAPE PENS category. Use the cards to open /items/vapes, where the storefront presents its nicotine category information. Product details can change. Nicotine is addictive.",
      products: NICOTINE_VAPE_PRODUCTS,
      disclosure: "Seven live-checked product pages. This is not a claim about complete selection, stock, price or availability.",
      menuHref: "/items/vapes",
      primaryLabel: "Browse Nicotine Vapes",
      secondaryLabel: "Compare Seven Featured Items",
      secondaryHref: "#featured-vapes",
      identityStrip: "Green Deal Cannabis | York | Jane Street and Weston | Adults 19+ | Nicotine is addictive.",
      featuredHeading: "Seven Live-Checked Green Deal Vape Cards",
      featuredIntro: "These image-backed cards were verified from Green Deal Cannabis’s current VAPE PENS pages. They are navigation aids, not a guarantee of complete selection, stock, price or availability. Use /items/vapes for the category information currently presented by the storefront.",
    },
    sections: [
      { heading: "Product Names Help Separate the Listings", body: "The verified set includes Geek, Level X, NEXA and OVNS pages. Puff counts and format terms are used only as listing identifiers, not as promises of duration, performance or superiority. Open /items/vapes before choosing." },
      { heading: "Keep Each Format With Its Own Product", body: "One live-checked page identifies a Level X G2 Pod, while another identifies an OVNS Disposable. Do not apply pod or disposable wording to another item unless its current record supports that format." },
      { heading: "A Clear Nicotine and THC Boundary", body: "This adult guide uses nicotine products from Green Deal Cannabis’s VAPE PENS category under /items/vapes. THC and cannabis vape products under /items/vape-disposables are excluded from the featured cards and calls to action." },
    ],
    faqs: [
      { q: "Where should I check Green Deal Cannabis’s current nicotine category?", a: "Use /items/vapes. The seven featured cards are live-checked starting points, while the current category page should control changing product information." },
      { q: "Does every featured Green Deal item use the same format?", a: "No format should be assumed. Read the current category record and keep pod or disposable wording attached only to the item it describes." },
      { q: "Does this York nicotine vape guide include cannabis vapes?", a: "No. It covers nicotine products from the VAPE PENS category for adults 19+. THC and cannabis vape products under /items/vape-disposables are excluded." },
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
