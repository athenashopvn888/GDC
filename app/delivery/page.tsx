import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";
import menu from "./delivery-menu.json";
import { resolveStorefrontTitle } from "../lib/metadataTitle";

export const metadata: Metadata = {
  title: resolveStorefrontTitle("Delivery Menu | Green Deal Cannabis"),
  description: "Browse the Green Deal Cannabis delivery product catalog and compare flower tiers and prices.",
  alternates: { canonical: "https://www.greendealcannabis.com/delivery" },
};

export default function DeliveryPage() {
  const structuredData = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Green Deal Cannabis Delivery Menu", url: "https://www.greendealcannabis.com/delivery", mainEntity: { "@type": "ItemList", numberOfItems: menu.products.length, itemListElement: menu.products.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.name })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><DeliveryContent /></>;
}
