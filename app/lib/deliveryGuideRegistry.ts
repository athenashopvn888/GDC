import deliveryGuideCopy from "./deliveryGuideCopy.json";
import { SHOW_CIGARETTES, isCigaretteGuide } from "./siteConfig";

export type DeliveryGuideFaq = { question: string; answer: string };
export type DeliveryGuideEntry = {
  slug: string;
  lane: "native_cig" | "nic_vape";
  name: string;
  title: string;
  description: string;
  h1: string;
  body_md: string;
  faq_items: DeliveryGuideFaq[];
  main_button: string;
  second_button: string;
  category_path: string;
  action_path: string;
};

export const DELIVERY_GUIDE_STORE = { domain: "www.greendealcannabis.com" } as const;
const DELIVERY_GUIDE_REGISTRY_RAW = deliveryGuideCopy as DeliveryGuideEntry[];
export const DELIVERY_GUIDE_REGISTRY = SHOW_CIGARETTES
  ? DELIVERY_GUIDE_REGISTRY_RAW
  : DELIVERY_GUIDE_REGISTRY_RAW.filter((guide) => !isCigaretteGuide(guide));
export const getDeliveryGuide = (slug: string) => DELIVERY_GUIDE_REGISTRY.find((guide) => guide.slug === slug);
