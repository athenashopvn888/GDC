import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "FAQ — Green Deal Cannabis | York Dispensary Questions",
  description:
    "Frequently asked questions about Green Deal Cannabis in York. Hours, location, products, pricing, bundle offers, and everything you need to know before visiting.",
  alternates: {
    canonical: "https://www.greendealcannabis.com/faq",
  },
};

const FAQ_CATEGORIES = [
  {
    title: "📍 Location & Hours",
    faqs: [
      { q: "Where is Green Deal Cannabis located?", a: "We are located at 1820 Jane St, York, ON M9N 2T3 — in the heart of York, near the intersection of Jane St and Weston Rd." },
      { q: "What are your hours?", a: "We are open daily from 10am to 2am, 7 days a week, 365 days a year. Walk in anytime — no appointment needed." },
      { q: "Is there parking nearby?", a: "Yes. Free street parking is available nearby on Jane St and surrounding residential streets. We're also easily accessible via TTC transit." },
      { q: "How far are you from North York or Etobicoke?", a: "We are centrally located in York, making us just a 5-10 minute drive from Etobicoke, North York, and other major areas in the Greater Toronto Area (GTA)." },
      { q: "What's the best way to get to Green Deal Cannabis?", a: "We're easily accessible by car, transit, or foot. We're centrally located at 1820 Jane St, near Weston Rd, just minutes from the Weston GO / UP Express Station. TTC bus routes 35 Jane and 89 Weston stop right near our doors." },
    ],
  },
  {
    title: "🌿 Products & Menu",
    faqs: [
      { q: "What menu categories are listed?", a: "The site includes five flower tiers plus edibles, vape pens, disposable vapes, concentrates, pre-rolls, native cigarettes, and accessories." },
      { q: "Where can I check menu details?", a: "Use the current menu to review product names, formats, weights, and posted prices before visiting." },
      { q: "What are your flower tiers?", a: "The flower navigation is organized into Exotic, Premium, AAA+, AA, and Budget tiers. Open each tier page for its current listings." },
      { q: "Does the site include edibles?", a: "Yes. Use the edibles category to review the current listings and package details." },
      { q: "Does the site include vape categories?", a: "Yes. Use the vape categories to review the formats and package details currently listed." },
      { q: "Does the site include native cigarettes?", a: "Yes. Use the cigarette category for the brands and formats currently listed." },
    ],
  },
  {
    title: "💰 Pricing & Bundle Offers",
    faqs: [
      { q: "Where should value shoppers start?", a: "Start with the Budget and AA tier pages, then confirm the current weights and posted prices." },
      { q: "What bundle pricing do you offer?", a: "Flower bundle pricing includes a 3g total option — the 3g total is shown clearly before purchase. Our Exotic, Premium, and AAA+ tiers also offer 6g bundle pricing, with 6g total pricing." },
      { q: "Are larger flower weights listed?", a: "Some flower listings may show larger weights and posted prices. Confirm the current details through the menu or staff." },
      { q: "How does bundle pricing work?", a: "The 3g bundle pricing applies to every tier automatically. The 6g bundle pricing applies to Exotic, Premium, and AAA+ tiers. These are our standard everyday bundle offers." },
      { q: "How is the flower menu organized?", a: "Flower is organized into Exotic, Premium, AAA+, AA, and Budget tiers. Review each current listing for its weight and posted price." },
    ],
  },
  {
    title: "🛒 Shopping & Experience",
    faqs: [
      { q: "Do I need an appointment?", a: "No! Green Deal Cannabis is walk-in only. Just show up anytime — we're open daily from 10am to 2am." },
      { q: "Can I review the menu before visiting?", a: "Yes. Use the current menu for the product names and posted details shown before your visit." },
      { q: "Do you offer delivery?", a: "Delivery is coming soon! Visit our delivery page to sign up for email notifications when we launch our delivery service." },
      { q: "What payment methods do you accept?", a: "We accept cash and debit. No credit cards at this time." },
      { q: "Can staff answer menu questions?", a: "Yes. Ask staff when a product name, format, weight, or package detail matters before choosing." },
      { q: "Is there a minimum purchase?", a: "No minimum purchase required. You can buy as little as 1 gram." },
    ],
  },
];

export default function FAQPage() {
  // JSON-LD for FAQ page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.main}>
        <Navbar />

        {/* FAQ Banner */}
        <section style={{ width: "100%", overflow: "hidden", marginTop: "92px" }}>
          <img
            src="/banners/Green Deal Cannabis_FAQ_Info.webp"
            alt="Green Deal Cannabis FAQ — Your Questions Answered"
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
          />
        </section>

        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
          <p className={styles.pageSubtitle}>
            Everything you need to know about Green Deal Cannabis — York&apos;s premium dispensary at 1820 Jane St in York.
          </p>

          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.title} className={styles.category}>
              <h2 className={styles.categoryTitle}>{cat.title}</h2>
              {cat.faqs.map((faq) => (
                <details key={faq.q} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{faq.q}</summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              ))}
            </div>
          ))}

          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Still have questions?</h2>
            <p className={styles.ctaText}>
              Call us at <strong>(942) 288-4633</strong> or visit us at 1820 Jane St, York.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
