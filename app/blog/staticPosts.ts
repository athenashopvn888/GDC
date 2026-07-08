export interface StaticBlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  seo_title: string;
  metaDescription: string;
  meta_description: string;
  h1: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  faq: string;
  internal_links_used: string;
  relatedLinks: Array<{
    title: string;
    url: string;
    description: string;
  }>;
}

export const STORE_BLOG_CONFIG = {
  storeCode: "GDC01",
  storeName: "Green Deal Cannabis",
  city: "York",
  domain: "www.greendealcannabis.com",
  storePath: "/weed-dispensary-york",
};

export const STATIC_POSTS: StaticBlogPost[] = [
  {
    slug: "green-deal-cannabis-york-store-guide",
    title: "Green Deal Cannabis Local Store Guide for Adults 19+",
    seoTitle: "Green Deal Cannabis Guide | York Adult 19+",
    seo_title: "Green Deal Cannabis Guide | York Adult 19+",
    metaDescription: "Adult 19+ guide to Green Deal Cannabis around York / Weston, with local store-page checks, menu-category context, and safe visit planning.",
    meta_description: "Adult 19+ guide to Green Deal Cannabis around York / Weston, with local store-page checks, menu-category context, and safe visit planning.",
    h1: "Green Deal Cannabis Local Store Guide for Adults 19+",
    excerpt: "Green Deal Cannabis guide for adults 19+ reviewing store information around York / Weston.",
    author: "The Green Deal Cannabis Team",
    date: "2026-07-02",
    category: "Store Guide",
    readTime: "4 min",
    content: `## Green Deal Cannabis Local Store Guide for Adults 19+

Green Deal Cannabis serves adults 19+ looking for store information around York / Weston. Use this guide to get oriented, compare the store page with menu categories, and choose the most useful next step before visiting.

The focus is practical and store-specific: confirm the right storefront, browse helpful category links, and use the store page for directions, contact options, and visit planning.

## Why Local Context Helps

Green Deal Cannabis is tied to York and Eglinton West context in York. Useful local content should make the page easier for shoppers to understand by connecting the store to nearby streets, neighbourhood language, and visit-planning details already supported by the site.

Searchers often want to confirm that they are looking at the right storefront before they visit. A concise guide can support that decision by explaining the local context and the most helpful next steps.

## Plan A Better Visit

Start with the official Green Deal Cannabis store page, then use the menu/category links to browse what the site makes easy to compare. Shoppers can confirm the right storefront, directions, contact options, and local visit details in one place.

If you need a quick answer before heading out, check the store page first and contact the store directly for help from staff.

## Browse Menu Categories With Confidence

Menu category labels help adults 19+ move quickly from general store research to the product areas they care about. Use them to compare the sections already shown on the site, such as flower, pre-rolls, vapes, edibles, concentrates, accessories, or other store categories.

That makes the page easier to scan and gives shoppers a cleaner path from local research to the right store page.

## Adult 19+ Visit Basics

Adults 19+ should bring valid government identification, confirm the store page before leaving, and use the menu/category links to narrow down what they want to ask about in-store.

The goal is simple: help real shoppers feel confident they are on the right store site and know where to find the next useful page.

## FAQ

### Is this guide for Green Deal Cannabis only?

Yes. This guide is written for Green Deal Cannabis and the local York context connected to this website.

### How can shoppers check current menu details?

Use the store page and menu/category links before visiting, then ask staff if you need help comparing options.

### Who can use this guide?

This guide is for adults 19+ who want to understand the store page before visiting.

### What is the best next step after reading?

Open the store page, browse the available menu/category sections, and use the contact or directions options when you are ready to plan your visit.`,
    faq: "",
    internal_links_used: "[Green Deal Cannabis York store page](/weed-dispensary-york)\\n[Green Deal Cannabis homepage](/)\\n[More Green Deal Cannabis guides](/blog)",
    relatedLinks: [
      {
            "title": "Green Deal Cannabis York store page",
            "url": "https://greendealcannabis.com/weed-dispensary-york",
            "description": "Primary store-specific destination for current store details after reading the guide."
      },
      {
            "title": "Green Deal Cannabis homepage",
            "url": "https://greendealcannabis.com/",
            "description": "Store-scoped general navigation for adults 19+."
      },
      {
            "title": "More Green Deal Cannabis guides",
            "url": "https://greendealcannabis.com/blog",
            "description": "Store-scoped blog index for future approved posts."
      }
],
  },
];

export function getStaticPost(slug: string) {
  return STATIC_POSTS.find((post) => post.slug === slug);
}
