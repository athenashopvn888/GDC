import { SHOW_CIGARETTES } from "../lib/siteConfig";
import CigaretteSeasonalNotice from "./CigaretteSeasonalNotice";
import FleetSheetImage from "./FleetSheetImage";
import { Fragment } from "react";
import Link from "next/link";
import HalloweenNotice from "./HalloweenNotice";
import { getCigaretteSnapshot } from "../lib/cigaretteFeed";
import { getFleetContent } from "../lib/fleetContent";
import { bannerMatchesCoded } from "../lib/fleet/resolve";

const STORE_NAME = "Green Deal Cannabis";
const THEME = { accent: "#84cc16", background: "#020b03" };
const promosRaw = [
  { key: "weed", href: "/exotic", image: "/banners/core-top-weed.webp", alt: `${STORE_NAME} Exotic, Premium and AAA+ flower tiers`, caption: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)" },
  { key: "vapes", href: "/items/vapes", image: "/banners/core-vapes-nicotine-thc.webp", alt: `${STORE_NAME} nicotine and THC vape categories`, caption: "Nicotine + THC vapes" },
  { key: "cigarettes", href: "/items/cigarettes", image: "/banners/core-cigarette-mix-match.webp", alt: `${STORE_NAME} 2 packs for $5 mix and match and $25 carton cigarette offer`, caption: "2 PACKS $5 / $25 CARTON" },
  { key: "premium-cigarettes", href: "/items/cigarettes", image: "/banners/core-premium-cigarettes.webp", alt: `${STORE_NAME} BB Full Flavor and Lights, Marlboro and Belmont cigarettes`, caption: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack" },
] as const;
const promos = SHOW_CIGARETTES
  ? promosRaw
  : promosRaw.filter((promo) => !/cigarette|marlboro|belmont/i.test(`${promo.key} ${promo.href} ${promo.alt} ${promo.caption}`));

const STORE_ORIGIN = "https://www.greendealcannabis.com";

const figureStyle = { margin: 0, width: "100%" } as const;
const imageStyle = { display: "block", width: "100%", maxWidth: "100%", height: "auto" } as const;
const captionStyle = { margin: 0, padding: "10px 14px", background: "#111827", color: "#ffffff", textAlign: "center" as const, fontWeight: 800, lineHeight: 1.35 };

function codedFigure(promo: (typeof promosRaw)[number]) {
  return (
    <figure data-core-banner={promo.key} style={{ ...figureStyle, boxShadow: `inset 0 0 0 2px ${THEME.accent}` }}>
      <Link href={promo.href} aria-label={promo.alt} style={{ display: "block", width: "100%", background: THEME.background }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={promo.image}
          alt={promo.alt}
          title={promo.caption}
          width={promo.key === "cigarettes" ? 2048 : 1672}
          height={promo.key === "cigarettes" ? 768 : 941}
          style={imageStyle}
          loading="eager"
        />
      </Link>
      <figcaption style={{ ...captionStyle, borderBottom: `3px solid ${THEME.accent}` }}>{promo.caption}</figcaption>
    </figure>
  );
}

export default async function FleetAnnouncementBanner() {
  const [fleet, cigarettes] = await Promise.all([getFleetContent(), getCigaretteSnapshot()]);
  const banners = fleet.active ? fleet.banners : undefined;
  const showCigarettes = SHOW_CIGARETTES && cigarettes.web.show;
  const visiblePromos = showCigarettes ? promos : promos.filter((promo) => promo.key !== "cigarettes" && promo.key !== "premium-cigarettes");
  const bannerImageObjects = visiblePromos.map((promo) => ({ "@type": "ImageObject", name: promo.alt, contentUrl: `${STORE_ORIGIN}${promo.image}`, description: `${promo.alt} at ${STORE_NAME}.`, caption: promo.caption }));
  return (
    <aside data-fleet-homepage-announcement="" aria-label="Store promotions" style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "100%", height: "auto", minHeight: 0, overflow: "visible", position: "relative", zIndex: 50 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": bannerImageObjects }).replace(/</g, "\\u003c") }} />
      {visiblePromos.map((promo) => {
        const banner = banners?.find((entry) => entry.id === promo.key);
        const override = Boolean(banner && !bannerMatchesCoded(banner));
        if (override && banner?.hidden) return null;
        return (
          <Fragment key={promo.key}>
            {promo.key === "cigarettes" && <CigaretteSeasonalNotice />}
            {override && banner ? (
              <figure data-core-banner={promo.key} style={{ ...figureStyle, boxShadow: `inset 0 0 0 2px ${THEME.accent}` }}>
                <Link href={banner.href || promo.href} aria-label={banner.alt} style={{ display: "block", width: "100%", background: THEME.background }}>
                  <FleetSheetImage banner={banner} style={imageStyle} />
                </Link>
                {banner.textBar ? <figcaption data-fleet-text-bar="" style={{ ...captionStyle, borderBottom: `3px solid ${THEME.accent}` }}>{banner.textBar}</figcaption> : null}
                {banner.caption && banner.caption !== banner.textBar ? <figcaption data-fleet-caption="" style={{ ...captionStyle, borderBottom: `3px solid ${THEME.accent}` }}>{banner.caption}</figcaption> : null}
              </figure>
            ) : codedFigure(promo)}
          </Fragment>
        );
      })}
      <HalloweenNotice storeName={STORE_NAME} />
    </aside>
  );
}
