import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./visit.module.css";

const ORIGIN = "https://www.greendealcannabis.com";
const BRAND = "Green Deal Cannabis";
const PHONE_DISPLAY = "+1 (437) 292-0413";
const PHONE_INTL = "+14372920413";
const ADDRESS = "1820 Jane St, York, ON M9N 2T3";
const HOURS_LABEL = "Open 24 Hours Daily";

export const metadata: Metadata = {
  title: { absolute: "How to Visit Green Deal Cannabis on Jane Street" },
  description: "Walk-in directions for Green Deal Cannabis at 1820 Jane St: transit, parking, landmarks, and 19+ ID. Open 24 Hours Daily.",
  alternates: { canonical: `${ORIGIN}/visit` },
  openGraph: {
    title: "How to Visit Green Deal Cannabis on Jane Street",
    description: "Walk-in directions for Green Deal Cannabis at 1820 Jane St: transit, parking, landmarks, and 19+ ID. Open 24 Hours Daily.",
    url: `${ORIGIN}/visit`,
  },
};

const VISIT_FAQS = [
  {
    "q": "Where is Green Deal Cannabis?",
    "a": "1820 Jane St, York, ON M9N 2T3. Call +1 (437) 292-0413. Adults 19+."
  },
  {
    "q": "Is the store open 24 hours?",
    "a": "Yes. Hours match the live Google Business Profile: open 24 hours daily. See /hours for the weekly grid."
  },
  {
    "q": "What should I bring?",
    "a": "Government-issued photo ID proving you are 19 or older. Debit and cash are listed in-store payment methods. No appointment."
  },
  {
    "q": "Where should I park?",
    "a": "Use the storefront parking approach first, then posted Jane Street and side-street options. Read signs; restrictions change by hour."
  }
];

const visitJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Store",
      "@id": `${ORIGIN}/#store`,
      name: BRAND,
      url: ORIGIN,
      telephone: PHONE_INTL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1820 Jane St",
        addressLocality: "York",
        addressRegion: "ON",
        postalCode: "M9N 2T3",
        addressCountry: "CA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.7072275,
        longitude: -79.505337,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${ORIGIN}/visit#faq`,
      mainEntity: VISIT_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq["q"],
        acceptedAnswer: { "@type": "Answer", text: faq["a"] },
      })),
    },
  ],
};

export default function VisitPage() {
  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(visitJsonLd) }} />
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Jane Street / York · Adults 19+ · Walk-in · 24/7</p>
          <h1 className={styles.heroTitle}>How to Get to Green Deal Cannabis on Jane Street</h1>
          <p className={styles.heroLead}>
            Supporting how-to-reach notes for Green Deal Cannabis at 1820 Jane St, York, ON M9N 2T3. NAP, 24/7 hours, and the map hub live on the homepage. Use this page for Jane Street transit, parking, and landmarks. Adults 19+.
          </p>
          <div className={styles.napCard}>
            <strong>Address, phone, hours</strong>
            <p>
              {BRAND}
              <br />
              {ADDRESS}
            </p>
            <p>
              Phone: <a href={`tel:${PHONE_INTL}`}>{PHONE_DISPLAY}</a>
            </p>
            <p>{HOURS_LABEL}</p>
            <p>
              <Link href="/hours">Full weekly hours</Link>
            </p>
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Transit on Jane Street and Weston</h2>
          <p>Jane Street is the spine. Local TTC bus routes along Jane and connecting Eglinton West / Weston services are the usual surface answer. Ask for stops near 1820 Jane rather than riding deep into a different corridor.</p>
          <p>Weston GO and nearby surface transfers can be planning landmarks, but they are not the door. Always check current TTC and GO service before you travel.</p>
        </section>

        <section className={styles.section}>
          <h2>Parking near 1820 Jane St</h2>
          <p>Designated customer parking is noted for this storefront in local copy; still read posted signs on Jane Street and the plaza approaches. Do not block fire lanes or bus stops.</p>
          <p>When Jane is busy, use the on-site approach first, then nearby laterals rather than circling the curb repeatedly.</p>
        </section>

        <section className={styles.section}>
          <h2>Landmarks on the Jane / Weston corridor</h2>
          <p>Treat the pin as a Jane Street storefront serving York, Weston, and the Eglinton West approach — not a downtown core address further south.</p>
          <ul>
            <li>Jane Street at the York / Weston seam</li><li>Eglinton West corridor as a neighbouring planning line</li><li>Weston Road corridor a short hop west</li><li>Keelesdale and Mount Dennis as nearby neighbourhood names</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>What to bring (adults 19+)</h2>
          <p>
            Government-issued photo ID proving you are 19 or older is required.
            Walk-in only — no appointment. Debit and cash are the listed in-store payment methods.
            Hours stay {HOURS_LABEL}.
            If one exact product is the reason for the trip, call {PHONE_DISPLAY} first.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/exotic-weed" className={`${styles.cta} ${styles.ctaPrimary}`}>
              Browse the walk-in menu
            </Link>
            <Link href="/hours" className={`${styles.cta} ${styles.ctaSecondary}`}>
              Store hours
            </Link>
            <a href={`tel:${PHONE_INTL}`} className={`${styles.cta} ${styles.ctaSecondary}`}>
              Call {PHONE_DISPLAY}
            </a>
          </div>
          <p className={styles.ageNote}>Adults 19+. No medical claims. Selection varies.</p>
        </section>

        <section className={styles.section}>
          <h2>Map</h2>
          <p>Search {ADDRESS}. The embed uses that same NAP string.</p>
          <div className={styles.mapWrap}>
            <iframe
              title={`Map of ${BRAND} at ${ADDRESS}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>Visit FAQs</h2>
          {VISIT_FAQS.map((faq) => (
            <details key={faq.q} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{faq.q}</summary>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
      <Footer />
    </main>
  );
}
