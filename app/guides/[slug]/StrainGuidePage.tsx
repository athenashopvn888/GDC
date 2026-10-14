import Link from "next/link";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { STRAIN_GUIDE_STORE as STORE, getStrainGuide, type StrainGuide } from "../../lib/strainGuides";
import styles from "./guide.module.css";

const BASE = `https://${STORE.domain}`;

export function strainGuideFaqs(guide: StrainGuide) {
  return [
    { q: `What is ${guide.name}?`, a: `${guide.name} is a ${guide.type} cannabis strain, ${guide.lineage}. It's known for ${guide.aroma}.` },
    guide.faq,
    { q: `Is ${guide.name} on the shelf at ${STORE.name} today?`, a: `The flower board changes through the day, so this guide doesn't promise any strain is in. Check the menu${STORE.phone ? ` or call ${STORE.phone}` : ""} and staff will tell you what's running.` },
  ];
}

export default function StrainGuidePage({ guide }: { guide: StrainGuide }) {
  const canonical = `${BASE}/guides/${guide.slug}`;
  const faqs = strainGuideFaqs(guide);
  const related = guide.compare.map(getStrainGuide).filter((entry): entry is StrainGuide => Boolean(entry));
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE }, { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` }, { "@type": "ListItem", position: 3, name: guide.name, item: canonical }] },
    { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: guide.title, description: guide.description },
    { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) },
  ] };
  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Navbar />
      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span>{guide.name}</span></nav>
        <header className={styles.hero}>
          <p>Strain guide · {guide.type}</p>
          <h1>{guide.h1}</h1>
          <p>{guide.intro}</p>
        </header>
        <section className={styles.section} aria-label={`${guide.name} guide`}>
          <div className={styles.body}>
            <h2>Quick facts</h2>
            <ul><li>Type: {guide.type}</li><li>Aroma: {guide.aroma}</li><li>Family tree: {guide.lineage}</li></ul>
            <p>{guide.note}</p>
            <h2>About {guide.name}</h2>
            <p>{guide.about}</p>
            <h2>What to look for</h2>
            <p>{guide.tip}</p>
            <h2>Cannabis store near {STORE.near}</h2>
            <p>{guide.local}</p>
            <p>{guide.closer}</p>
          </div>
          <div className={styles.actions}>
            <Link className={styles.primary} href={STORE.menuHref}>See the {STORE.name} menu</Link>
            {STORE.delivery ? <Link className={styles.secondary} href="/delivery">Delivery page</Link> : <Link className={styles.secondary} href="/guides">All strain guides</Link>}
          </div>
          {related.length > 0 && (
            <div className={styles.body}>
              <h2>If you like {guide.name}</h2>
              <ul>{related.map((entry) => <li key={entry.slug}><Link href={`/guides/${entry.slug}`}>{entry.name} strain guide</Link></li>)}</ul>
            </div>
          )}
          <div className={styles.faqs}>
            <h2>{guide.name} questions</h2>
            {faqs.map((faq) => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}
          </div>
        </section>
      </article>
      <Footer />
    </main>
  );
}
