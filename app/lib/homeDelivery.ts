export const HOME_TITLE = "Green Deal Cannabis Dispensary Weed Delivery";
export const HOME_DELIVERY_H2 = "Weed Delivery in York";
export const HOME_DELIVERY_PARAGRAPHS = [
  "Green Deal Cannabis provides a separate local delivery path from the 1820 Jane St storefront in York. Use the delivery page for current menu and ordering details, then confirm the exact address through that flow.",
  "The homepage keeps delivery connected to York and the Jane Street neighbourhood instead of presenting the store as a far-city directory. Walk-in information and local delivery information remain distinct.",
  "Choose STORE MENU to browse the existing Exotic flower route, or choose Delivery for the local delivery page. Adults 19+ need valid government-issued photo ID.",
] as const;
export const HOME_DELIVERY_CARDS = [
  { href: "/delivery", title: "York delivery", text: "Open the current Green Deal delivery and ordering page." },
  { href: "/weed-dispensary-york", title: "York dispensary guide", text: "Review the Jane Street storefront and local walk-in context." },
  { href: "/faq", title: "Store FAQ", text: "Read answers about menus, ID, the store, and local service." },
  { href: "/visit", title: "Visit Green Deal", text: "Use the York directions and storefront information page." },
] as const;
export const HOME_DELIVERY_FAQS = [
  { q: "Does Green Deal Cannabis offer weed delivery in York?", a: "Green Deal Cannabis has a separate delivery page for local York requests. Current details and address eligibility are confirmed through that flow." },
  { q: "Where is Green Deal Cannabis?", a: "The storefront is at 1820 Jane St in York. Use the Visit page for local directions." },
  { q: "How do I start a delivery request?", a: "Open Delivery, review the current menu information, and follow the linked ordering steps." },
  { q: "Where does STORE MENU go?", a: "STORE MENU opens the existing Exotic flower route at /exotic." },
  { q: "Do I need photo ID?", a: "Yes. Cannabis service is for adults 19+ with valid government-issued photo ID." },
  { q: "Does the homepage promise live inventory?", a: "No. Use the linked menu or delivery page for current details and confirm a specific item before relying on availability." },
] as const;
