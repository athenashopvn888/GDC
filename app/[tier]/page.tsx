import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { isReplacementCategory, resolveTierBanner } from "../lib/corePromotionBanners";
import Footer from "../components/Footer";
import FlowerCard from "../components/FlowerCard";
import {
  fetchLiveProducts,
  getTierFromSlug,
  TIER_CONFIG,
} from "../lib/products";
import { TIER_SEO } from "../lib/tierSeoContent";
import { resolveStorefrontTitle } from "../lib/metadataTitle";
import {
  formatAsLowAsAfterPromos,
  formatPerGram,
  isBogoDeal,
  type BoardDeal,
} from "../lib/flowerDeals";
import styles from "./tier.module.css";

// Read the live menu feed on every request (never a build-time snapshot).
export const dynamic = "force-dynamic";

/* -- Generate all tier pages at build -- */
export function generateStaticParams() {
  return Object.values(TIER_CONFIG).map((t) => ({ tier: t.slug }));
}

/* -- Dynamic SEO metadata -- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>;
}): Promise<Metadata> {
  const { tier: tierSlug } = await params;
  const tierInfo = getTierFromSlug(tierSlug);
  if (!tierInfo) return {};
  const { flowers: liveFlowers } = await fetchLiveProducts();
  const flowers = liveFlowers.filter((flower) => flower.tier.toUpperCase() === tierInfo.key.toUpperCase());
  const seo = TIER_SEO[tierInfo.key];

  const title = seo?.seoTitle || `${tierInfo.config.name} Cannabis Flower — ${flowers.length} Strains`;

  return {
    title: resolveStorefrontTitle(title),
    description: seo?.seoIntro || `Shop ${flowers.length} ${tierInfo.config.name.toLowerCase()} cannabis strains at Green Deal Cannabis.`,
    alternates: {
      canonical: `https://www.greendealcannabis.com/${tierInfo.config.slug}`,
    },
    openGraph: {
      title: `${tierInfo.config.name} Flower | Green Deal Cannabis`,
      description: `Browse the ${tierInfo.config.name.toLowerCase()} flower tier and review current menu details.`,
    },
  };
}

/* -- Page component -- */
export default async function TierPage({
  params,
}: {
  params: Promise<{ tier: string }>;
}) {
  const { tier: tierSlug } = await params;
  const tierInfo = getTierFromSlug(tierSlug);
  if (!tierInfo) notFound();

  const { flowers: liveFlowers } = await fetchLiveProducts();
  const flowers = liveFlowers.filter((flower) => flower.tier.toUpperCase() === tierInfo.key.toUpperCase());
  const { config } = tierInfo;
  const categoryBanner = resolveTierBanner(tierSlug, config.banner);
  const seo = TIER_SEO[tierInfo.key];
  const siteUrl = "https://www.greendealcannabis.com";
  const pageUrl = `${siteUrl}/${tierSlug}`;
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo?.seoTitle || `${config.name} flower at Green Deal Cannabis`,
        description:
          seo?.seoIntro ||
          `${config.name} flower listings at Green Deal Cannabis for Jane Street in York. Adults 19+.`,
        isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#store` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: flowers.length,
          itemListElement: flowers.map((flower, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: flower.name,
            url: `${siteUrl}/flower/${flower.slug}`,
          })),
        },
      },
      ...(seo?.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              mainEntity: seo.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ]
        : []),
    ],
  };

  const saleFlowers = flowers.filter((f) => f.isSale);
  const regularFlowers = flowers.filter((f) => !f.isSale);
  const hotFlowers = flowers.filter((f) => f.isHot);

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <Navbar />

      {/* ── Banner Image (standalone, no overlay text) ── */}
        <section className={styles.bannerSection} data-category-banner-replacement={isReplacementCategory(tierSlug) ? "true" : undefined}>
        <img
          src={categoryBanner}
          alt={`${config.name} Cannabis Flower — ${config.tagline}`}
          className={styles.bannerImg}
        />
      </section>

      {/* ── Hero Content BELOW banner ── */}
      <section
        className={styles.heroInfo}
        style={{ "--tier-color": config.color } as React.CSSProperties}
      >
        <div className={styles.heroInfoInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroTitleRow}>
              <span className={styles.heroIcon}>{config.icon}</span>
              <h1 className={styles.heroTitle}>
                <span style={{ color: config.color }}>{config.name}</span>
              </h1>
            </div>
            <p className={styles.heroTagline}>{config.tagline}</p>
            <div className={styles.heroStats}>
              <span className={styles.stat}>
                <strong>{flowers.length}</strong> strains
              </span>
              {saleFlowers.length > 0 && (
                <span className={styles.statSale}>
                  🔥 {saleFlowers.length} on sale
                </span>
              )}
              {hotFlowers.length > 0 && (
                <span className={styles.statHot}>
                  ⚡ {hotFlowers.length} hot picks
                </span>
              )}
            </div>
          </div>

          <div className={styles.heroRight}>
            {isBogoDeal(config.deal6g) ? (
              <>
                <p className={styles.asLowAsBanner}>
                  {formatAsLowAsAfterPromos(config.deal6g.price, config.deal6g.grams)}
                </p>
                <p className={styles.listAnchor}>List ${config.unitPrice}/g</p>
              </>
            ) : (
              <div className={styles.unitPriceBox}>
                <span className={styles.unitPriceLabel}>In-store price · Starting at</span>
                <span className={styles.unitPriceValue}>${config.unitPrice}/g</span>
              </div>
            )}

            {(config.deal3g || config.deal6g) && (
            <div className={styles.dealRow}>
              {[config.deal3g, config.deal6g].filter((deal): deal is BoardDeal => deal !== null).map((deal) => (
                <div className={styles.dealBox} key={deal.total}>
                  <div className={styles.dealLabel}>In-store price ·{" "}
                    {isBogoDeal(deal) ? deal.label : `🎁 ${deal.label}`}
                  </div>
                  <div className={styles.dealPrice}>
                    {isBogoDeal(deal) ? (
                      <>Pay <strong>${deal.price}</strong> = {deal.grams}g</>
                    ) : (
                      <>= <strong>${deal.price}</strong> / {deal.total}</>
                    )}
                  </div>
                  {isBogoDeal(deal) && (
                    <div className={styles.dealMeta}>
                      {formatPerGram(deal.price, deal.grams)} · {deal.equals}
                    </div>
                  )}
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Product grid ── */}
      <section className={styles.products}>
        <div className={styles.container}>
          {saleFlowers.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                🔥 <span style={{ color: "#f43f5e" }}>On Sale</span>
              </h2>
              <div className={styles.grid}>
                {saleFlowers.map((f) => (
                  <FlowerCard
                    key={`${f.sku}-${f.slug}`}
                    flower={f}
                    tierKey={tierInfo.key}
                  />
                ))}
              </div>
            </>
          )}

          <h2 className={styles.sectionTitle}>
            All{" "}
            <span style={{ color: config.color }}>{config.name}</span>{" "}
            Strains
          </h2>
          <div className={styles.grid}>
            {regularFlowers.map((f) => (
              <FlowerCard
                key={`${f.sku}-${f.slug}`}
                flower={f}
                tierKey={tierInfo.key}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO Content ── */}
      {seo && (
        <section className={styles.seoSection}>
          <div className={styles.container}>
            <h2 className={styles.seoMainTitle}>{seo.seoTitle}</h2>
            <p className={styles.seoIntro}>{seo.seoIntro}</p>

            {seo.sections.map((s, i) => (
              <div key={i} className={styles.seoBlock}>
                <h3 className={styles.seoHeading}>{s.heading}</h3>
                <p className={styles.seoBody}>{s.body}</p>
              </div>
            ))}

            {/* FAQ Accordion */}
            {seo.faqs.length > 0 && (
              <div className={styles.faqSection}>
                <h3 className={styles.seoHeading}>Frequently Asked Questions</h3>
                {seo.faqs.map((faq, i) => (
                  <details key={i} className={styles.faqItem}>
                    <summary className={styles.faqQuestion}>{faq.q}</summary>
                    <p className={styles.faqAnswer}>{faq.a}</p>
                  </details>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
