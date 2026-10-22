import CigaretteSeasonalNotice from "../../components/CigaretteSeasonalNotice";
import CigaretteUnavailable from "../../components/CigaretteUnavailable";
import FleetSheetImage from "../../components/FleetSheetImage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { resolveItemBanner } from "../../lib/corePromotionBanners";
import { getCigaretteSnapshot } from "../../lib/cigaretteFeed";
import { getFleetContent } from "../../lib/fleetContent";
import { bannerIdForSlug } from "../../lib/fleet/coded";
import { sheetBanner } from "../../lib/fleet/resolve";
import SafeImage from "../../components/SafeImage";
import Footer from "../../components/Footer";
import {
  fetchLiveProducts,
  getCategoryFromSlug,
  CATEGORY_CONFIG,
  type ItemProduct,
} from "../../lib/products";
import styles from "./items.module.css";
import { resolveStorefrontTitle } from "../../lib/metadataTitle";

// Read the live menu feed on every request (never a build-time snapshot).
export const dynamic = "force-dynamic";

/* ── Generate all category pages ── */
export function generateStaticParams() {
  return Object.values(CATEGORY_CONFIG).map((c) => ({ category: c.slug }));
}

/* ── SEO ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: catSlug } = await params;
  const catInfo = getCategoryFromSlug(catSlug);
  if (!catInfo) return {};
  const { items: liveItems } = await fetchLiveProducts();
  const items = liveItems.filter((item) => item.category.toUpperCase() === catInfo.key.toUpperCase());

  const title = catInfo.config.seoTitle || `${catInfo.config.name} — ${items.length} Products`;

  return {
    title: resolveStorefrontTitle(title),
    description: catInfo.config.seoIntro || `Shop ${items.length} ${catInfo.config.name.toLowerCase()} at Green Deal Cannabis.`,
    alternates: {
      canonical: `https://www.greendealcannabis.com/items/${catInfo.config.slug}`,
    },
  };
}

export default async function ItemsCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: catSlug } = await params;
  const catInfo = getCategoryFromSlug(catSlug);
  if (!catInfo) notFound();
  if (catSlug === "cigarettes" && !(await getCigaretteSnapshot()).web.show) {
    return (
      <main className={styles.main}>
        <Navbar />
        <CigaretteUnavailable />
        <Footer />
      </main>
    );
  }

  /* Pre-Rolls also shows accessories (ADD ONS) */
  const { items: liveItems } = await fetchLiveProducts();
  let items = liveItems.filter((item) => item.category.toUpperCase() === catInfo.key.toUpperCase());
  if (catInfo.key === "PREROLLS") {
    const accessories = liveItems.filter((item) => item.category.toUpperCase() === "ADD ONS");
    const existingIds = new Set(items.map(i => i.sku));
    const uniqueAccessories = accessories.filter(a => !existingIds.has(a.sku));
    items = [...items, ...uniqueAccessories];
  }
  const { config } = catInfo;
  const categoryBanner = resolveItemBanner(catSlug, config.banner);
  const fleet = await getFleetContent();
  const bannerId = bannerIdForSlug(catSlug);
  const sheet = bannerId ? sheetBanner(fleet, bannerId) : null;

  return (
    <main className={styles.main}>
      <Navbar />
      {catSlug === "cigarettes" && <CigaretteSeasonalNotice sticky />}

      {/* Hero Banner */}
      <section style={{ width: "100%", overflow: "hidden", marginTop: "92px", marginBottom: "24px" }}>
        {sheet?.hidden ? (
          <div data-fleet-text-banner="" style={{ background: "#020b03", color: "#84cc16", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", padding: "48px 24px", textAlign: "center" }}>{sheet.categoryName}</div>
        ) : sheet ? (
          <FleetSheetImage banner={sheet} style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} />
        ) : config.banner ? (
          <img
              src={categoryBanner}
            alt={config.name}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
          />
        ) : (
          <div className={styles.heroContent} style={{ background: config.color, padding: "60px 24px", textAlign: "center" }}>
            <span className={styles.heroIcon}>{config.icon}</span>
            <h1 className={styles.heroTitle}>
              <span style={{ color: "#fff" }}>{config.name}</span>
            </h1>
            <p className={styles.heroSub} style={{ color: "rgba(255,255,255,0.8)" }}>{items.length} products listed</p>
          </div>
        )}
      </section>

      {/* Product Grid */}
      <section className={styles.products}>
        <div className={styles.container}>
          {items.length > 0 ? (
            <div className={styles.grid}>
              {items.map((item) => (
                <ItemCard key={item.sku} item={item} catColor={config.color} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🌱</span>
              <h3>Coming Soon</h3>
              <p>No items are listed in this category right now. Check the current menu later.</p>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content */}
      <section className={styles.seoSection}>
        <div className={styles.container}>
          <h2 className={styles.seoTitle}>{config.seoTitle}</h2>
          <p className={styles.seoBody}>{config.seoDescription}</p>

          {/* FAQ */}
          {config.faqs.length > 0 && (
            <div className={styles.faqBlock}>
              <h3 className={styles.faqTitle}>Frequently Asked Questions</h3>
              {config.faqs.map((faq, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{faq.q}</summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              ))}
            </div>
          )}

          {/* Visit CTA */}
          <div className={styles.visitCta}>
            <h3 className={styles.visitTitle}>Visit Green Deal Cannabis</h3>
            <p className={styles.visitText}>
              1820 Jane St, York, ON M9N 2T3 · Open 24 Hours Daily
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ItemCard({ item, catColor }: { item: ItemProduct; catColor: string }) {
  return (
    <Link href={`/item/${item.slug}`} className={styles.card} style={{ "--cat-color": catColor } as React.CSSProperties}>
      <div className={styles.cardMedia}>
        {item.image ? (
          <SafeImage 
            src={item.image} 
            alt={item.name} 
            loading="lazy" 
            className={styles.cardImg} 
          />
        ) : (
          <div className={styles.cardPlaceholder}>
            {item.name[0]}
          </div>
        )}
        <div className={styles.cardBadges}>
          {item.thc && <span className={styles.badgeThc}>{item.thc}</span>}
          {item.mg && <span className={styles.badgeMg}>{item.mg}</span>}
        </div>
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>{item.category}</span>
        <h3 className={styles.cardName}>{item.name}</h3>
        {item.price && (
          <div className={styles.cardPrice}>
            <span className={styles.priceVal}>{item.price.startsWith('$') ? item.price : `$${item.price}`}</span>
            <span className={styles.priceUnit}>each</span>
          </div>
        )}
        <span className={styles.skuTag}>SKU {item.sku}</span>
      </div>
    </Link>
  );
}
