import strainGuideData from "./strainGuides.json";

/** GDC01 strain guides (50). Educational only: no prices, no potency numbers, no stock promises. Lineage is "commonly reported". */
export type StrainGuide = { slug: string; name: string; type: string; group: "indica" | "sativa" | "hybrid"; lineage: string; aroma: string; note: string; intro: string; about: string; tip: string; faq: { q: string; a: string }; compare: string[]; local: string; closer: string; h1: string; title: string; description: string };

export const STRAIN_GUIDE_STORE = {
  "code": "GDC01",
  "name": "Green Deal Cannabis",
  "domain": "www.greendealcannabis.com",
  "street": "1820 Jane St",
  "address": "1820 Jane St, York, ON M9N 2T3",
  "area": "York",
  "near": "Jane & Weston",
  "phone": "+1 (437) 292-0413",
  "hours": "open 24 hours a day, every day",
  "delivery": true,
  "menuHref": "/"
} as const;

export const STRAIN_GUIDES = strainGuideData as StrainGuide[];
export const getStrainGuide = (slug: string) => STRAIN_GUIDES.find((guide) => guide.slug === slug);
