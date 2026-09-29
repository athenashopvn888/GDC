import Link from "next/link";
import { HOME_DELIVERY_CARDS, HOME_DELIVERY_FAQS, HOME_DELIVERY_H2, HOME_DELIVERY_PARAGRAPHS } from "../lib/homeDelivery";
import styles from "./HomeDeliverySection.module.css";
export default function HomeDeliverySection() {
  const schema={ "@context":"https://schema.org","@type":"FAQPage",mainEntity:HOME_DELIVERY_FAQS.map((faq)=>({"@type":"Question",name:faq.q,acceptedAnswer:{"@type":"Answer",text:faq.a}}))};
  return <section className={styles.section} aria-labelledby="home-delivery-heading"><div className={styles.inner}><h2 id="home-delivery-heading">{HOME_DELIVERY_H2}</h2>{HOME_DELIVERY_PARAGRAPHS.map((p)=><p key={p}>{p}</p>)}<div className={styles.cards}>{HOME_DELIVERY_CARDS.map((c)=><Link key={c.href} href={c.href} className={styles.card}><strong>{c.title}</strong><span>{c.text}</span></Link>)}</div><h3>York delivery questions</h3>{HOME_DELIVERY_FAQS.map((f)=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}} /></section>;
}
