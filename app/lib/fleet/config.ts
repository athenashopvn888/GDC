import { FULL_NAME_NAP } from "../fullNameNap.ts";
import { HOME_DOC_TITLE } from "../homeDelivery.ts";
import type { BannerId, Nap, ResolvedBanner, ResolvedPage } from "./types.ts";

/**
 * The only store-specific fleet file. Other stores replace this module
 * and leave the rest of app/lib/fleet and app/components/fleet as-is.
 */
export const FLEET_STORE_CODE = "GDC01";
export const FLEET_STORE_NAME = "Green Deal Cannabis";
export const FLEET_AREA = "York / Weston";
export const FLEET_DOMAIN = "www.greendealcannabis.com";
export const FLEET_DOMAINS = ["www.greendealcannabis.com", "greendealcannabis.com"] as const;
export const FLEET_ORIGIN = "https://www.greendealcannabis.com";

/** Public blob origin. Objects live at /{storeCode}/manifest.json and /{storeCode}/articles/. */
export const FLEET_BLOB_ORIGIN = "https://dhaah0upvlpukv56.public.blob.vercel-storage.com";

export const FLEET_COLORS = {
  banner: "#020b03",
  bannerText: "#84cc16",
} as const;

/** Digits or formatted numbers. An article containing any of these is dropped. */
export const FLEET_BLOCKED_PHONES: readonly string[] = [];

export const FLEET_ARTICLES_PATH = "/articles";

/** Page and spot names for the six TV2 category cards. Spot is the card name. */
export const TV2_PAGE = "TV2";
export const TV2_CARDS = [
  "PREROLLS_ADDONS",
  "VAPES",
  "EDIBLES",
  "CONCENTRATES",
  "CIGARETTES",
  "MAGIC",
] as const;

export const TV_PAGE = "TV";
export const TV_FULLSCREEN_SPOTS = [
  "Fullscreen promo 1",
  "Fullscreen promo 2",
  "Fullscreen promo 3",
] as const;

/** Fullscreen takeover defaults: 5s on screen, once a minute, 5s first preview, 650ms slide. */
export const TV_PROMO_SHOW_SECONDS = 5;
export const TV_PROMO_EVERY_MINUTES = 1;
export const TV_PROMO_INITIAL_DELAY_MS = 5_000;
export const TV_PROMO_SLIDE_MS = 650;

export function defaultManifestUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/manifest.json`;
}

export function articlesIndexUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/index.json`;
}

export function articleBodyUrl(slug: string, storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/${encodeURIComponent(slug)}.json`;
}

/** Sheet spot names that drive each banner. The first name is the publisher's. */
export const HOME_SPOT_ALIASES: Record<BannerId, readonly string[]> = {
  weed: ["Top banner"],
  vapes: ["Promo banner 2"],
  cigarettes: ["Promo banner 3"],
  "premium-cigarettes": ["Promo banner 4"],
  hero: ["Hero", "Hero banner"],
  contact: ["Banner", "Contact banner"],
};

const WEED_CAPTION = "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)";
const VAPE_CAPTION = "Nicotine + THC vapes";
const CIGARETTE_CAPTION = "2 PACKS $5 / $25 CARTON";
const PREMIUM_CAPTION = "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack";

export const CODED_NAP: Nap = {
  name: FULL_NAME_NAP.fullName,
  street: FULL_NAME_NAP.street,
  city: FULL_NAME_NAP.city,
  province: FULL_NAME_NAP.region,
  postalCode: FULL_NAME_NAP.postal,
  cityLine: `${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`,
  area: FULL_NAME_NAP.neighbourhood,
  intersection: FULL_NAME_NAP.intersection,
  areaLine: [FULL_NAME_NAP.intersection, FULL_NAME_NAP.neighbourhood].filter(Boolean).join(", "),
  phoneDisplay: FULL_NAME_NAP.phoneDisplay,
  phoneTel: "+14372920413",
  hours: FULL_NAME_NAP.hours,
  mapsSearchUrl: FULL_NAME_NAP.mapsUrl,
  mapsEmbedUrl: "",
  lat: "43.7072275",
  lng: "-79.505337",
  schemaName: FULL_NAME_NAP.fullName,
  website: "https://www.greendealcannabis.com",
};

export const CODED_BANNERS: ResolvedBanner[] = [
  {
    id: "weed",
    page: "Home",
    spot: "Top banner",
    href: "/exotic",
    categoryName: "Exotic Weed",
    hidden: false,
    render: "image",
    image: "/banners/core-top-weed.webp",
    codedImage: "/banners/core-top-weed.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${FLEET_STORE_NAME} Exotic, Premium and AAA+ flower tiers`,
    title: WEED_CAPTION,
    textBar: WEED_CAPTION,
    caption: WEED_CAPTION,
  },
  {
    id: "vapes",
    page: "Home",
    spot: "Promo banner 2",
    href: "/items/vapes",
    categoryName: "Nicotine Vapes",
    hidden: false,
    render: "image",
    image: "/banners/core-vapes-nicotine-thc.webp",
    codedImage: "/banners/core-vapes-nicotine-thc.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${FLEET_STORE_NAME} nicotine and THC vape categories`,
    title: VAPE_CAPTION,
    textBar: VAPE_CAPTION,
    caption: VAPE_CAPTION,
  },
  {
    id: "cigarettes",
    page: "Home",
    spot: "Promo banner 3",
    href: "/items/cigarettes",
    categoryName: "Cigarettes",
    hidden: false,
    render: "image",
    image: "/banners/core-cigarette-mix-match.webp",
    codedImage: "/banners/core-cigarette-mix-match.webp",
    imageWidth: 2048,
    imageHeight: 768,
    alt: `${FLEET_STORE_NAME} 2 packs for $5 mix and match and $25 carton cigarette offer`,
    title: CIGARETTE_CAPTION,
    textBar: CIGARETTE_CAPTION,
    caption: CIGARETTE_CAPTION,
  },
  {
    id: "premium-cigarettes",
    page: "Home",
    spot: "Promo banner 4",
    href: "/items/cigarettes",
    categoryName: "Premium Cigarettes",
    hidden: false,
    render: "image",
    image: "/banners/core-premium-cigarettes.webp",
    codedImage: "/banners/core-premium-cigarettes.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${FLEET_STORE_NAME} BB Full Flavor and Lights, Marlboro and Belmont cigarettes`,
    title: PREMIUM_CAPTION,
    textBar: PREMIUM_CAPTION,
    caption: PREMIUM_CAPTION,
  },
  {
    id: "hero",
    page: "Home",
    spot: "Hero",
    href: "#menu",
    categoryName: FLEET_STORE_NAME,
    hidden: false,
    render: "image",
    image: "/banners/Green Deal Cannabis_Homepage_Hero.webp",
    codedImage: "/banners/Green Deal Cannabis_Homepage_Hero.webp",
    alt: "Green Deal Cannabis Dispensary Weed Delivery",
    title: "Green Deal Cannabis Dispensary Weed Delivery",
    textBar: "",
    caption: "",
  },
  {
    id: "contact",
    page: "Contact",
    spot: "Banner",
    href: "/contact",
    categoryName: "Contact",
    hidden: false,
    render: "image",
    image: "/banners/GreenDeal_ContactUs.webp",
    codedImage: "/banners/GreenDeal_ContactUs.webp",
    alt: "Contact Us",
    title: "Contact Us",
    textBar: "",
    caption: "",
  },
];

const HOME_DESCRIPTION = "Green Deal Cannabis is a cannabis dispensary on Jane St with adult 19+ store info and category browsing for flower, pre-rolls, vapes, edibles, concentrates, and accessories. Open 24 hours.";
const CONTACT_DESCRIPTION = "Visit Green Deal Cannabis at 1664 Jane St, York, ON M9N 2S1. Open 24 hours daily. Walk-ins welcome.";

export const CODED_PAGES: Record<string, ResolvedPage> = {
  Home: {
    description: HOME_DESCRIPTION,
    metaTitle: HOME_DOC_TITLE,
    metaDescription: HOME_DESCRIPTION,
  },
  Contact: {
    description: CONTACT_DESCRIPTION,
    metaTitle: "Contact Us — Green Deal Cannabis | 1664 Jane St, York",
    metaDescription: CONTACT_DESCRIPTION,
  },
};

export function bannerIdForSlug(slug: string): BannerId | null {
  if (slug === "cigarettes") return "cigarettes";
  if (slug === "vapes" || slug === "vape-disposables") return "vapes";
  if (slug === "exotic" || slug === "premium" || slug === "aaa") return "weed";
  return null;
}
