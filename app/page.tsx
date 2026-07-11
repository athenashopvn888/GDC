import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { allFlowers } from "./lib/products";

/* â”€â”€ Tier data (will come from Supabase later) â”€â”€ */
const TIERS = [
  {
    name: "EXOTIC",
    slug: "exotic",
    tagline: "Ultra-rare, top-shelf genetics",
    thc: "35-39%",
    unitPrice: 20,
    deal3g: "3g bundle for $40",
    deal6g: "6g bundle for $60",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.2)",
    icon: "ðŸ”¥",
    count: 42,
    banner: "/banners/Green Deal Cannabis_Exotic.webp",
  },
  {
    name: "PREMIUM",
    slug: "premium",
    tagline: "Hand-picked connoisseur grade",
    thc: "32-34%",
    unitPrice: 15,
    deal3g: "3g bundle for $30",
    deal6g: "6g bundle for $45",
    color: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.2)",
    icon: "ðŸ’Ž",
    count: 38,
    banner: "/banners/Green Deal Cannabis_Premium.webp",
  },
  {
    name: "AAA+",
    slug: "aaa",
    tagline: "Heavy hitters, proven strains",
    thc: "30-32%",
    unitPrice: 10,
    deal3g: "3g bundle for $20",
    deal6g: "6g bundle for $30",
    color: "#22d3ee",
    glow: "rgba(34, 211, 238, 0.2)",
    icon: "âš¡",
    count: 55,
    banner: "/banners/Green Deal Cannabis_AAAplus.webp",
  },
  {
    name: "AA",
    slug: "aa",
    tagline: "Quality daily drivers",
    thc: "27-29%",
    unitPrice: 4,
    deal3g: null,
    deal6g: null,
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.2)",
    icon: "âœ¦",
    count: 35,
    banner: "/banners/Green Deal Cannabis_AA.webp",
  },
  {
    name: "BUDGET",
    slug: "budget",
    tagline: "Shreds & value OZs",
    thc: "24-27%",
    unitPrice: 3,
    deal3g: "3g bundle for $10",
    deal6g: null,
    color: "#94a3b8",
    glow: "rgba(148, 163, 184, 0.15)",
    icon: "ðŸ’°",
    count: 18,
    banner: "/banners/Green Deal Cannabis_Budget.webp",
  },
  {
    name: "EDIBLES & MORE",
    slug: "items/edibles",
    tagline: "Gummies, vapes, pre-rolls, hash",
    thc: "Up to 98%",
    unitPrice: null,
    deal3g: null,
    deal6g: null,
    color: "#fb923c",
    glow: "rgba(251, 146, 60, 0.2)",
    icon: "ðŸ¬",
    count: 80,
    banner: "/banners/Green Deal Cannabis_Edibles.webp",
  },
];

/* â”€â”€ Build featured strains dynamically from real inventory â”€â”€ */
function buildFeatured() {
  const pool = [...allFlowers].filter(f => f.image);
  
  // Shuffle pool securely
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  
  const picked: typeof pool = [];
  const tierCounts: Record<string, number> = {};
  
  for (const f of pool) {
    if (picked.length >= 8) break;
    const tc = tierCounts[f.tier] || 0;
    if (tc >= 2) continue; // max 2 per tier
    // Prevent duplicate strains with the same name
    if (picked.some(p => p.name === f.name)) continue;
    picked.push(f);
    tierCounts[f.tier] = tc + 1;
  }
  
  return picked.map((f) => ({
    name: f.name,
    sku: f.sku,
    tier: f.tier.toUpperCase(),
    thc: f.thc,
    type: f.type === "indica" ? "IH" : f.type === "sativa" ? "SH" : "H",
    price3g: f.price3g ? `$${f.price3g.sale ?? f.price3g.regular}` : "â€”",
    image: f.image,
  }));
}

const FEATURED_STRAINS = buildFeatured();

function getTypeLabel(type: string) {
  if (type.startsWith("IH")) return "Indica";
  if (type.startsWith("SH")) return "Sativa";
  return "Hybrid";
}

function getTypeClass(type: string) {
  if (type.startsWith("IH")) return styles.badgeIndica;
  if (type.startsWith("SH")) return styles.badgeSativa;
  return styles.badgeHybrid;
}

function getTierColor(tier: string) {
  const t = TIERS.find((t) => t.name === tier);
  return t?.color || "#94a3b8";
}

export default function HomePage() {
  return (
    <main className={styles.main}>
      {/* â”€â”€ NAVBAR â”€â”€ */}
      <Navbar />
      <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", border: 0 }}>
        Green Deal Cannabis â€” Premium Etobicoke Cannabis Dispensary
      </h1>

      {/* â”€â”€ HERO BANNER â”€â”€ */}
      <section className={styles.hero} id="hero" style={{ paddingTop: "92px", paddingBottom: "24px", minHeight: "auto", display: "block" }}>
        <a href="#menu" className={styles.heroBanner} style={{ display: "block", position: "relative", width: "100%", cursor: "pointer" }}>
          <img
            src="/banners/Green Deal Cannabis_Homepage_Hero.webp"
            alt="Green Deal Cannabis â€” Premium York Cannabis Dispensary"
            className={styles.heroBannerImg}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </a>
      </section>

      {/* â”€â”€ SHOP BY TIER BANNER â”€â”€ */}
      <section className={styles.tierSection} id="menu">
        <div className={styles.container}>
          <div className={styles.sectionBanner}>
            <img
              src="/banners/Green Deal Cannabis_Welcome_Banner.webp"
              alt="Shop by Tier â€” From exotic craft flower to value budget OZs"
              className={styles.sectionBannerImg}
            />
          </div>

          <div className={styles.tierGrid}>
            {TIERS.map((tier, i) => (
              <a
                key={tier.slug}
                href={`/${tier.slug}`}
                className={styles.tierCard}
                style={
                  {
                    "--tier-color": tier.color,
                    "--tier-glow": tier.glow,
                    animationDelay: `${i * 0.1}s`,
                  } as React.CSSProperties
                }
              >
                <div className={styles.tierCardBanner}>
                  <img
                    src={tier.banner}
                    alt={`${tier.name} cannabis flower`}
                    className={styles.tierCardBannerImg}
                  />
                </div>
                <div className={styles.tierCardBody}>
                  <h3
                    className={styles.tierCardName}
                    style={{ color: tier.color }}
                  >
                    {tier.icon} {tier.name}
                  </h3>
                  <div className={styles.tierCardMeta}>
                    <span className={styles.tierCardThc}>
                      THC {tier.thc}
                    </span>
                    <span className={styles.tierCardCount}>
                      {tier.count} strains
                    </span>
                  </div>
                  <div className={styles.tierCardPrice}>
                    {tier.unitPrice !== null && (
                      <span className={styles.tierCardUnitPrice}>
                        ${tier.unitPrice}/g
                      </span>
                    )}
                  </div>
                  {tier.deal3g && (
                    <div className={styles.tierCardDeals}>
                      <span className={styles.tierCardDeal}>ðŸŽ {tier.deal3g}</span>
                      {tier.deal6g && <span className={styles.tierCardDeal}>ðŸŽ {tier.deal6g}</span>}
                    </div>
                  )}
                </div>
                <div className={styles.tierCardArrow}>â†’</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ FEATURE PRODUCTS â”€â”€ */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.sectionBanner}>
            <img
              src="/banners/Green Deal Cannabis_Feature_Products.webp"
              alt="Feature Products â€” Staff picks and top sellers"
              className={styles.sectionBannerImg}
            />
          </div>

          <div className={styles.featuredGrid}>
            {FEATURED_STRAINS.map((strain, i) => (
              <a
                key={`${strain.sku}-${i}`}
                href={`/flower/${strain.name.toLowerCase().replace(/\s+/g, "-")}`}
                className={styles.productCard}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={styles.productMedia}>
                  <img
                    src={strain.image}
                    alt={strain.name}
                    loading="lazy"
                    className={styles.productImg}
                  />
                  <div className={styles.productBadges}>
                    <span className={styles.productBadgeThc}>
                      THC {strain.thc}
                    </span>
                    <span
                      className={`${styles.productBadgeTier}`}
                      style={{
                        background: `linear-gradient(135deg, ${getTierColor(strain.tier)}, ${getTierColor(strain.tier)}dd)`,
                        color: strain.tier === "BUDGET" ? "#1e293b" : "white",
                      }}
                    >
                      {strain.tier}
                    </span>
                  </div>
                </div>
                <div className={styles.productBody}>
                  <span
                    className={`${styles.productType} ${getTypeClass(strain.type)}`}
                  >
                    {getTypeLabel(strain.type)}
                  </span>
                  <h3 className={styles.productName}>{strain.name}</h3>
                  <div className={styles.productPricing}>
                    <span className={styles.productPrice}>
                      {strain.price3g}
                    </span>
                    <span className={styles.productPriceUnit}>/ 3g</span>
                  </div>
                  <div className={styles.productCta}>View Strain â†’</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ DEALS & PROMOS BANNER â”€â”€ */}
      <section className={styles.promoSection}>
        <a href="/items/edibles" className={styles.promoBannerLink}>
          <img
            src="/banners/Green Deal Cannabis_Edibles.webp"
            alt="High THC Gummies & Edibles â€” Green Deal Cannabis"
            className={styles.promoBannerImg}
          />
        </a>
      </section>

      {/* â”€â”€ VAPES & PREROLL DEALS BANNER â”€â”€ */}
      <section className={styles.promoSection}>
        <a href="/items/vapes" className={styles.promoBannerLink}>
          <img
            src="/banners/Green Deal Cannabis_Daily_Deals.webp"
            alt="24 Hour Cannabis Deals â€” Vapes, Pre-Rolls & More"
            className={styles.promoBannerImg}
          />
        </a>
      </section>

      {/* â”€â”€ STORE INFO â”€â”€ */}
      <section className={styles.storeSection} id="contact">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Visit <span className="text-gradient-neon">Green Deal Cannabis</span>
            </h2>
          </div>
          <div className={styles.storeGrid}>
            <div className={styles.storeCard}>
              <div className={styles.storeIcon}>ðŸ“</div>
              <h3 className={styles.storeCardTitle}>Location</h3>
              <p className={styles.storeCardText}>
                1820 Jane St
                <br />
                York, ON M9N 2T3
                <br />
              </p>
            </div>
            <div className={styles.storeCard}>
              <div className={styles.storeIcon}>ðŸ•’</div>
              <h3 className={styles.storeCardTitle}>Hours</h3>
              <p className={styles.storeCardText}>
                Open 7 Days a Week
                <br />
                <span className={styles.storeHighlight}>10am - 2am Daily</span>
              </p>
            </div>
            <div className={styles.storeCard}>
              <div className={styles.storeIcon}>ðŸ”¥</div>
              <h3 className={styles.storeCardTitle}>Walk In</h3>
              <p className={styles.storeCardText}>
                No appointment needed
                <br />
                <span className={styles.storeHighlight}>
                  Jane St &amp; Weston Rd
                </span>
              </p>
            </div>
          </div>

          {/* Embedded map */}
          <div className={styles.mapWrap}>
          </div>
        </div>
      </section>

      {/* â”€â”€ FOOTER â”€â”€ */}
      <Footer />
    </main>
  );
}

