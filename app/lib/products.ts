/* -- Product & Item Types -- */
export interface FlowerProduct {
  sku: string;
  name: string;
  slug: string;
  tier: string;
  type: "indica" | "sativa" | "hybrid";
  isHot: boolean;
  isSale: boolean;
  thc: string;
  price3g: PricePoint | null;
  price5g: PricePoint | null;
  price14g: PricePoint | null;
  price28g: PricePoint | null;
  image: string;
}

export interface PricePoint {
  regular: number;
  sale: number | null;
}

export interface ItemProduct {
  sku: string;
  name: string;
  slug: string;
  category: string;
  type: string;
  thc: string;
  mg: string;
  price: string;
  image: string;
  promoImage: string | null;
}

/* ── Data imports (static fallback) ── */
import flowersJson from "./flowers.json";
import itemsJson from "./items.json";

export const allFlowers: FlowerProduct[] = flowersJson as FlowerProduct[];
export const allItems: ItemProduct[] = itemsJson as ItemProduct[];

/* ── Live stock fetch from Apps Script ── */
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || "";

interface LiveStockResponse {
  flowers: FlowerProduct[];
  items: ItemProduct[];
  storeCode?: string;
  stockDate?: string;
}

/**
 * Fetch live stock-filtered products from Apps Script endpoint.
 * Used at build time (getStaticProps / generateStaticParams).
 * Falls back to static JSON if endpoint not configured.
 */
export async function fetchLiveProducts(): Promise<{
  flowers: FlowerProduct[];
  items: ItemProduct[];
  isLive: boolean;
  stockDate: string | null;
}> {
  if (!APPS_SCRIPT_URL) {
    return { flowers: allFlowers, items: allItems, isLive: false, stockDate: null };
  }

  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?store=GDC01`, {
      next: { revalidate: 300 }, // Cache for 5 min during build
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: LiveStockResponse = await res.json();
    return {
      flowers: data.flowers || allFlowers,
      items: data.items || allItems,
      isLive: true,
      stockDate: data.stockDate || null,
    };
  } catch (err) {
    console.warn("[products] Live fetch failed, using static data:", err);
    return { flowers: allFlowers, items: allItems, isLive: false, stockDate: null };
  }
}

export const TIER_CONFIG: Record<
  string,
  {
    name: string; slug: string; color: string; icon: string; tagline: string; banner: string;
    unitPrice: number; /* $/g */
    deal3g: { label: string; total: string; price: number } | null; /* 3g bundle pricing */
    deal6g: { label: string; total: string; price: number } | null; /* 6g bundle pricing (top 3 only) */
  }
> = {
  EXOTIC: {
    name: "Exotic",
    slug: "exotic",
    color: "#f59e0b",
    icon: "\uD83D\uDD25",
    tagline: "Explore the Exotic flower tier",
    banner: "/banners/Green Deal Cannabis_Exotic.webp",
    unitPrice: 20,
    deal3g: { label: "3g bundle", total: "3G", price: 40 },
    deal6g: { label: "6g bundle", total: "6G", price: 60 },
  },
  PREMIUM: {
    name: "Premium",
    slug: "premium",
    color: "#a78bfa",
    icon: "\uD83D\uDC8E",
    tagline: "Explore the Premium flower tier",
    banner: "/banners/Green Deal Cannabis_Premium.webp",
    unitPrice: 15,
    deal3g: { label: "3g bundle", total: "3G", price: 30 },
    deal6g: { label: "6g bundle", total: "6G", price: 45 },
  },
  "AAA+": {
    name: "AAA+",
    slug: "aaa",
    color: "#22d3ee",
    icon: "\u26A1",
    tagline: "Explore the AAA+ flower tier",
    banner: "/banners/Green Deal Cannabis_AAAplus.webp",
    unitPrice: 10,
    deal3g: { label: "3g bundle", total: "3G", price: 20 },
    deal6g: { label: "6g bundle", total: "6G", price: 30 },
  },
  AA: {
    name: "AA",
    slug: "aa",
    color: "#34d399",
    icon: "\u2726",
    tagline: "Explore the AA flower tier",
    banner: "/banners/Green Deal Cannabis_AA.webp",
    unitPrice: 4,
    deal3g: null,
    deal6g: null,
  },
  BUDGET: {
    name: "Budget",
    slug: "budget",
    color: "#94a3b8",
    icon: "\uD83D\uDCB0",
    tagline: "Shreds & value OZs \u00B7 From $40/oz",
    banner: "/banners/Green Deal Cannabis_Budget.webp",
    unitPrice: 3,
    deal3g: { label: "$10 / 3g Special", total: "3G", price: 10 },
    deal6g: null,
  },
};

/* ── Item category config ── */
export interface CategoryInfo {
  name: string; slug: string; color: string; icon: string; banner?: string;
  seoTitle: string; seoIntro: string; seoDescription: string;
  faqs: { q: string; a: string }[];
}

export const CATEGORY_CONFIG: Record<string, CategoryInfo> = {
  EDIBLES: {
      banner: "/banners/Green Deal Cannabis_Edibles.webp",
    name: "Edibles", slug: "edibles", color: "#f97316", icon: "🍬",
    seoTitle: "Cannabis Edibles York — Gummies, Chocolates & Drinks",
    seoIntro: "Browse the edibles category at Green Deal Cannabis on Jane St in York. Compare current names, formats, package details, and posted prices.",
    seoDescription: "Use the edibles category to compare current product names, package details, and posted prices at Green Deal Cannabis. Visit us at 1820 Jane St — open daily 10am - 2am.",
    faqs: [
      { q: "What edible formats are listed?", a: "Use the current menu to review listed gummies, chocolates, beverages, capsules, baked goods, and package details." },
      { q: "Where should shoppers confirm edible details?", a: "Review the current menu and package information, or ask staff when an item detail matters." },
      { q: "Where can I review edible listings?", a: "Use the current edibles category or ask staff. Visit us at 1820 Jane St, York — open daily 10am - 2am." },
    ],
  },
  "VAPE PENS": {
      banner: "/banners/GreenDeal_Nic_Vape.webp",
    name: "THC Vape", slug: "vapes", color: "#8b5cf6", icon: "💨",
    seoTitle: "Vape Pens York — THC & Nicotine Cartridges",
    seoIntro: "Browse vape listings at Green Deal Cannabis in York, including cartridges, disposables, and compatible accessories where listed.",
    seoDescription: "Use the vape category to compare current product names, formats, package details, and posted prices. Visit Green Deal Cannabis at 1820 Jane St in York.",
    faqs: [
      { q: "What vape formats are listed?", a: "Use the current menu to compare cartridges, pods, disposables, and compatible accessories where listed." },
      { q: "Where can I check battery compatibility?", a: "Review the package details or ask staff when compatibility matters." },
    ],
  },
  "VAPE DISPOSABLE": {
      banner: "/banners/Green Deal Cannabis_THC_Vape.webp",
    name: "Nic Vape", slug: "vape-disposables", color: "#a78bfa", icon: "💨",
    seoTitle: "Disposable Vapes York — THC Disposable Pens",
    seoIntro: "Browse disposable vape listings at Green Deal Cannabis in York and compare current formats and package details.",
    seoDescription: "Use the disposable vape category to compare current product names, formats, package details, and posted prices. Visit Green Deal Cannabis at 1820 Jane St, York.",
    faqs: [
      { q: "Where are disposable specifications listed?", a: "Review the current menu and package information for capacity and format details." },
      { q: "Are rechargeable models listed?", a: "Some package listings may include charging information. Confirm the exact model details before choosing." },
    ],
  },
  CONCENTRATES: {
      banner: "/banners/Green Deal Cannabis_Concentrate.webp",
    name: "Concentrates", slug: "concentrates", color: "#f59e0b", icon: "💎",
    seoTitle: "Cannabis Concentrates York — Shatter, Wax, Hash & Live Resin",
    seoIntro: "Browse concentrate listings at Green Deal Cannabis in York, including shatter, wax, hash, live resin, and other formats where listed.",
    seoDescription: "Use the concentrates category to compare current product names, formats, package details, and posted prices. Visit Green Deal Cannabis at 1820 Jane St.",
    faqs: [
      { q: "What concentrate formats are listed?", a: "Use the current menu to compare shatter, wax, budder, live resin, rosin, hash, kief, and other formats where listed." },
      { q: "Where should shoppers confirm concentrate details?", a: "Review the current menu and package information, or ask staff when a format detail matters." },
    ],
  },
  PREROLLS: {
    banner: "/banners/Green Deal Cannabis_Pre-Rolls.webp", name: "Pre-Rolls", slug: "prerolls", color: "#22c55e", icon: "🚬",
    seoTitle: "Pre-Rolls York — Ready-to-Smoke Cannabis Joints",
    seoIntro: "Browse pre-roll listings at Green Deal Cannabis in York, including singles and multi-packs where listed.",
    seoDescription: "Use the pre-roll category to compare current product names, formats, pack details, and posted prices. Visit us at 1820 Jane St — open daily 10am - 2am.",
    faqs: [
      { q: "What pre-roll formats are listed?", a: "Use the current menu to compare listed singles, multi-packs, and other pre-roll formats." },
      { q: "Where can I confirm pre-roll details?", a: "Review the current menu and package information, or ask staff when a pack detail matters." },
    ],
  },
  "ADD ONS": {
      banner: "/banners/Green Deal Cannabis_Accessories.webp",
    name: "Accessories", slug: "add-ons", color: "#34d399", icon: "➕",
    seoTitle: "Cannabis Accessories York — Grinders, Papers, Lighters & More",
    seoIntro: "Essential cannabis accessories at Green Deal Cannabis, York. Grinders, rolling papers, lighters, trays, and more.",
    seoDescription: "Use the accessories category to compare listed grinders, rolling papers, lighters, trays, storage containers, and other items. Visit us at 1820 Jane St, York.",
    faqs: [
      { q: "What accessories do you sell?", a: "We carry grinders, rolling papers, filter tips, lighters, rolling trays, storage jars, and more." },
    ],
  },
  "MAGIC & OTHERS": {
    name: "Magic Stuff", slug: "magic", color: "#64748b", icon: "*",
    seoTitle: "Magic Stuff - Specialty Items",
    seoIntro: "Browse the current menu for specialty item listings and package details.",
    seoDescription: "Use the specialty category for the product names, formats, package details, and posted prices currently shown.",
    faqs: [
      { q: "What specialty items are listed?", a: "Check the current menu for the specialty product names and package details shown." },
      { q: "Can specialty listings change?", a: "Yes. Check the current menu for the listings shown for this location." },
    ],
  },
  CIGARETTES: {
      banner: "/banners/Green Deal Cannabis_Cigarettes_No_Cigarette.webp",
    name: "Cigarettes", slug: "cigarettes", color: "#78716c", icon: "🏷️",
    seoTitle: "Native Cigarettes York — Discount Tobacco at Green Deal Cannabis",
    seoIntro: "Browse Native cigarette listings at Green Deal Cannabis in York and compare current brand and format details.",
    seoDescription: "Use the cigarette category to compare current brand names, formats, and posted prices. Green Deal Cannabis is located at 1820 Jane St and is open daily 10am - 2am.",
    faqs: [
      { q: "Does the site include cigarettes?", a: "Yes. Use the cigarette category for the listings currently shown." },
      { q: "What cigarette brands are listed?", a: "Check the current menu or ask staff because brand names and formats can change." },
      { q: "Where can I confirm cigarette prices?", a: "Use the current menu or ask staff for current posted prices." },
    ],
  },
};

/* ── Helper functions ── */
export function getFlowersByTier(tier: string): FlowerProduct[] {
  return allFlowers.filter(
    (f) => f.tier.toUpperCase() === tier.toUpperCase()
  );
}

export function getFlowerBySlug(slug: string): FlowerProduct | undefined {
  return allFlowers.find((f) => f.slug === slug);
}

export function getItemsByCategory(category: string): ItemProduct[] {
  return allItems.filter(
    (i) => i.category.toUpperCase() === category.toUpperCase()
  );
}

export function getTierFromSlug(
  slug: string
): { key: string; config: (typeof TIER_CONFIG)[string] } | undefined {
  const entry = Object.entries(TIER_CONFIG).find(
    ([, v]) => v.slug === slug
  );
  if (!entry) return undefined;
  return { key: entry[0], config: entry[1] };
}

export function getCategoryFromSlug(
  slug: string
): { key: string; config: (typeof CATEGORY_CONFIG)[string] } | undefined {
  const entry = Object.entries(CATEGORY_CONFIG).find(
    ([, v]) => v.slug === slug
  );
  if (!entry) return undefined;
  return { key: entry[0], config: entry[1] };
}

export function getLowestPrice(flower: FlowerProduct): number | null {
  const prices = [flower.price3g, flower.price5g, flower.price14g, flower.price28g]
    .filter((p): p is PricePoint => p !== null)
    .map((p) => p.sale ?? p.regular);
  return prices.length ? Math.min(...prices) : null;
}

export function formatPrice(p: PricePoint | null): string {
  if (!p) return "—";
  if (p.sale !== null) return `$${p.sale}`;
  return `$${p.regular}`;
}
