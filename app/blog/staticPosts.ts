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
    author: "Athena SEO Team",
    date: "2026-07-02",
    category: "Store Guide",
    readTime: "4 min",
    content: `## Green Deal Cannabis Local Store Guide for Adults 19+

Green Deal Cannabis serves adults 19+ looking for store information around York / Weston. This guide helps visitors understand what to check on the official store page before visiting and how to read menu-category language safely.

The article does not change business facts, publish item-level details, or make personal-use claims. It is a store-specific guide that points readers back to the official store page.

## Why Local Context Helps

Green Deal Cannabis is tied to York and Eglinton West context in York. Local content should make the page easier to understand without changing the store name, location facts, hours, map details, or license information.

Searchers often want to confirm that they are looking at the right storefront before they visit. A concise guide can support that decision by explaining the local context and the safest next steps.

## What To Review Before Visiting

Start with the official Green Deal Cannabis store page. Useful checks include the store identity, the local landing page, general menu-category navigation, and any current store notes already shown on the site.

This guide should not be treated as the source for details that may change. If a visitor needs a specific answer before leaving, the official store page or direct store contact is the safer source.

## Menu Categories Are Navigation

Broad category labels help visitors understand how a store page is organized. They are navigation labels, not promises about a specific item at the moment someone reads this article.

That distinction keeps the guide accurate over time. It also keeps the content useful for adults 19+ who need general orientation before reviewing the store page.

## Adult 19+ Visit Basics

Adults 19+ should bring valid government identification and review the official store page before visiting. The article avoids personal-use advice, rating claims, competitor comparisons, and language that sounds like an advertisement.

The goal is simple: help a real visitor confirm the right store page and understand where current details should be checked.

## FAQ

### Is this guide for Green Deal Cannabis only?

Yes. This guide is written for Green Deal Cannabis and the local York context connected to this website.

### Does this guide confirm current item details?

No. It is a store information guide. The official store page remains the source for current details.

### Who can use this guide?

This guide is for adults 19+ who want to understand the store page before visiting.

### Does this article change store facts?

No. It does not change store name, location facts, hours, map details, license information, or other locked business facts.`,
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
