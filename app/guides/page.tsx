import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { DELIVERY_GUIDE_REGISTRY } from "../lib/deliveryGuideRegistry";
import { STRAIN_GUIDES, STRAIN_GUIDE_STORE as STORE } from "../lib/strainGuides";
import styles from "./[slug]/guide.module.css";

const BASE = `https://${STORE.domain}`;
const TITLE = `Cannabis Strain Guides | ${STORE.name}`;
const DESC = `${STRAIN_GUIDES.length} strain guides from ${STORE.name} at ${STORE.street}: family trees, aroma and what to look for. Indica, sativa and hybrid.`;

export const metadata: Metadata = { title: { absolute: TITLE }, description: DESC, alternates: { canonical: `${BASE}/guides` }, robots: { index: true, follow: true }, openGraph: { title: TITLE, description: DESC, url: `${BASE}/guides`, type: "website" } };

const GROUPS = [
  { key: "indica", label: "Indica and indica-leaning strains" },
  { key: "sativa", label: "Sativa and sativa-leaning strains" },
  { key: "hybrid", label: "Hybrid strains" },
] as const;

export default function GuidesIndexPage() {
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE }, { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` }] },
    { "@type": "CollectionPage", "@id": `${BASE}/guides#webpage`, url: `${BASE}/guides`, name: TITLE, description: DESC, mainEntity: { "@type": "ItemList", numberOfItems: STRAIN_GUIDES.length, itemListElement: STRAIN_GUIDES.map((guide, index) => ({ "@type": "ListItem", position: index + 1, name: `${guide.name} strain guide`, url: `${BASE}/guides/${guide.slug}` })) } },
  ] };
  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Navbar />
      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Guides</span></nav>
        <header className={styles.hero}>
          <h1>Cannabis Strain Guides</h1>
          <p>Short guides to well-known strains from {STORE.name}, near {STORE.near}: where each one comes from, what it smells like and what to look for. The board changes daily, so check the <Link href={STORE.menuHref}>menu</Link> for what&apos;s in.</p>
        </header>
        {GROUPS.map((group) => (
          <section key={group.key} className={styles.section} aria-label={group.label}>
            <div className={styles.body}>
              <h2>{group.label}</h2>
              <ul>{STRAIN_GUIDES.filter((guide) => guide.group === group.key).map((guide) => <li key={guide.slug}><Link href={`/guides/${guide.slug}`}>{guide.name}</Link></li>)}</ul>
            </div>
          </section>
        ))}
        {DELIVERY_GUIDE_REGISTRY.length > 0 && (
          <section className={styles.section} aria-label="Cigarette and vape guides">
            <div className={styles.body}>
              <h2>Cigarette and vape guides</h2>
              <ul>{DELIVERY_GUIDE_REGISTRY.map((guide) => <li key={guide.slug}><Link href={`/guides/${guide.slug}`}>{guide.h1}</Link></li>)}</ul>
            </div>
          </section>
        )}
      </article>
      <Footer />
    </main>
  );
}
