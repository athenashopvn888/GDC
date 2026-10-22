import type { Metadata } from "next";
import { FULL_NAME_NAP } from "../lib/fullNameNap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FleetSheetImage from "../components/FleetSheetImage";
import { getFleetContent } from "../lib/fleetContent";
import { napMatchesCoded, sheetBanner } from "../lib/fleet/resolve";
import { resolveStorefrontTitle } from "../lib/metadataTitle";
import styles from "./contact.module.css";

export const dynamic = "force-dynamic";

const CONTACT_METADATA: Metadata = {
  title: resolveStorefrontTitle("Contact Us — Green Deal Cannabis | 1664 Jane St, York"),
  description:
    "Visit Green Deal Cannabis at 1664 Jane St, York, ON M9N 2S1. Open 24 hours daily. Walk-ins welcome.",
  alternates: {
    canonical: "https://www.greendealcannabis.com/contact",
  },
  openGraph: {
    title: "Contact Green Deal Cannabis — York Dispensary",
    description:
      "1664 Jane St, York. Open 24 hours daily. Premium cannabis, always fire.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  if (!fleet.active) return CONTACT_METADATA;
  const page = fleet.pages.Contact;
  const description = page?.metaDescription || "";
  const title = page?.metaTitle || "";
  if ((!description || description === CONTACT_METADATA.description) && !title) return CONTACT_METADATA;
  return {
    ...CONTACT_METADATA,
    ...(title ? { title: resolveStorefrontTitle(title) } : {}),
    ...(description && description !== CONTACT_METADATA.description ? { description } : {}),
  };
}

export default async function ContactPage() {
  const fleet = await getFleetContent();
  const contactBanner = sheetBanner(fleet, "contact");
  const customNap = fleet.active && !napMatchesCoded(fleet.nap) ? fleet.nap : null;
  return (
    <main className={styles.main}>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero} style={{ paddingTop: "92px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          {contactBanner?.hidden ? null : contactBanner ? (
            <FleetSheetImage banner={contactBanner} style={{ width: "100%", height: "auto", display: "block", borderRadius: "var(--radius-lg)" }} />
          ) : (
          <img src="/banners/GreenDeal_ContactUs.webp" alt="Contact Us" style={{ width: "100%", height: "auto", display: "block", borderRadius: "var(--radius-lg)" }} />
          )}
          <h1 className={styles.heroTitle} data-fullname-contact-h1="" style={{ marginTop: "16px", textAlign: "center", fontSize: "clamp(22px, 4vw, 34px)", lineHeight: 1.2, overflowWrap: "anywhere" }}>Contact {FULL_NAME_NAP.fullName}</h1>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            {/* Location */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <h2 className={styles.infoTitle}>Location</h2>
              <p className={styles.infoText}>
                {customNap ? customNap.street : "1820 Jane St"}
                <br />
                {customNap ? `${customNap.city}, ${customNap.province} ${customNap.postalCode}` : "York, ON M9N 2T3"}
                <br />
                <span className={styles.infoMuted}>{customNap?.intersection || "Jane St & Weston Rd"}</span>
              </p>
            </div>

            {/* Hours */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🕒</div>
              <h2 className={styles.infoTitle}>Hours</h2>
              <div className={styles.hoursTable}>
                <div className={styles.hoursRow}>
                  <span>Monday</span>
                  <span className={styles.hoursTime}>Open 24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Tuesday</span>
                  <span className={styles.hoursTime}>Open 24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Wednesday</span>
                  <span className={styles.hoursTime}>Open 24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Thursday</span>
                  <span className={styles.hoursTime}>Open 24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Friday</span>
                  <span className={styles.hoursTime}>Open 24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Saturday</span>
                  <span className={styles.hoursTime}>Open 24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Sunday</span>
                  <span className={styles.hoursTime}>Open 24 Hours</span>
                </div>
              </div>
              <div className={styles.openBadge}>
                <span className={styles.openDot}></span>
                Open 24 Hours Daily
              </div>
            </div>

            {/* Walk-in */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🔥</div>
              <h2 className={styles.infoTitle}>Walk In</h2>
              <p className={styles.infoText}>
                No appointment needed.
                <br />
                Just walk in and our staff will
                <br />
                help you browse the menu categories.
              </p>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Flower tiers and cannabis categories
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Adult 19+ store information
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Knowledgeable budtenders
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Debit &amp; cash accepted
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className={styles.mapSection}>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
