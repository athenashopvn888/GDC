import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ArticleBody from "./ArticleBody";
import { ARTICLE_BODY, ARTICLE_CANONICAL, ARTICLE_DESCRIPTION, ARTICLE_H1, ARTICLE_JSON_LD } from "./article";
import styles from "./article.module.css";

export const metadata: Metadata = {
  title: ARTICLE_H1,
  description: ARTICLE_DESCRIPTION,
  alternates: { canonical: ARTICLE_CANONICAL },
  robots: "index,follow",
  openGraph: {
    title: ARTICLE_H1,
    description: ARTICLE_DESCRIPTION,
    url: ARTICLE_CANONICAL,
    type: "article",
    locale: "en_CA",
    siteName: "Green Deal Cannabis",
  },
};

export default function CannabisInTheCarOntarioPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <article className={styles.article}>
        <h1>{ARTICLE_H1}</h1>
        <ArticleBody markdown={ARTICLE_BODY} />
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSON_LD).replace(/</g, "\\u003c") }}
      />
      <Footer />
    </main>
  );
}
