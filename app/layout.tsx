import CigaretteStateProvider from "./components/CigaretteStateProvider";
import FleetContentProvider from "./components/FleetContentProvider";
import { getCigaretteSnapshot, toPublicCigaretteState } from "./lib/cigaretteFeed";
import { getFleetContent } from "./lib/fleetContent";
import { napMatchesCoded } from "./lib/fleet/resolve";
import { cigaretteSafeContent } from "./lib/siteConfig";
import FullNameNap from "./components/FullNameNap";
import PinnedNavClearance from "./components/PinnedNavClearance";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { HOME_DOC_TITLE } from "./lib/homeDelivery";

export const revalidate = 300;

const ROOT_METADATA: Metadata = cigaretteSafeContent({
  metadataBase: new URL("https://www.greendealcannabis.com"),
  title: {
    default: HOME_DOC_TITLE,
    template: "%s | Green Deal Cannabis",
  },
  description:
    "Green Deal Cannabis is a cannabis dispensary on Jane St with adult 19+ store info and category browsing for flower, pre-rolls, vapes, edibles, concentrates, and accessories. Open 24 hours.",
  keywords: [
    "cannabis dispensary York",
    "weed store York",
    "exotic flower York",
    "premium cannabis",
    "Green Deal Cannabis",
    "cheap weed York",
    "dispensary near me",
    "THC flower",
    "indica sativa hybrid",
    "edibles York",
    "vapes",
    "pre-rolls",
    "native cigarettes York",
    "weed store Toronto",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.greendealcannabis.com",
    siteName: "Green Deal Cannabis",
    title: HOME_DOC_TITLE,
    description:
      "Browse flower tiers and cannabis categories at Green Deal Cannabis on Jane St in York. Open 24 hours.",
    images: [
      {
        url: "/banners/Green Deal Cannabis_Homepage_Hero.webp",
        width: 1200,
        height: 630,
        alt: "Green Deal Cannabis — Premium Cannabis Dispensary York",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_DOC_TITLE,
    description: "Browse Green Deal Cannabis categories. Open 24 hours at 1820 Jane St, York.",
    images: ["/banners/Green Deal Cannabis_Homepage_Hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.greendealcannabis.com",
  },
  verification: {
    // google: "your-google-verification-code",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  if (!fleet.active) return ROOT_METADATA;
  const description = fleet.pages.Home?.metaDescription || "";
  if (!description || description === ROOT_METADATA.description) return ROOT_METADATA;
  return {
    ...ROOT_METADATA,
    description,
    openGraph: { ...ROOT_METADATA.openGraph, description },
    twitter: { ...ROOT_METADATA.twitter, description },
  };
}

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  additionalType: "https://schema.org/Store",
  "@id": "https://www.greendealcannabis.com",
  name: "Green Deal Cannabis Dispensary Weed Delivery",
  hasMap: "https://www.google.com/maps/place/?q=place_id:ChIJt3tL4iExK4gRHaQRHYamT_g",
  sameAs: ["https://www.google.com/maps/place/?q=place_id:ChIJt3tL4iExK4gRHaQRHYamT_g"],
  description: "Cannabis dispensary at 1820 Jane St in York, ON. Shop exotic, premium, AAA+, AA, and budget flower tiers plus edibles, prerolls, and vapes. Open 24 hours.",
  url: "https://www.greendealcannabis.com",
  telephone: "+14372920413",
  image: "https://www.greendealcannabis.com/logo.png",
  priceRange: "$3 - $12/g",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1820 Jane St",
    addressLocality: "Etobicoke",
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
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  areaServed: {
    "@type": "City",
    name: "York",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [fleet, cigaretteSnapshot] = await Promise.all([getFleetContent(), getCigaretteSnapshot()]);
  const cigarettes = toPublicCigaretteState(cigaretteSnapshot);
  const linkedNap = fleet.active && !napMatchesCoded(fleet.nap);
  const renderedJsonLd = linkedNap
    ? {
        ...jsonLd,
        name: fleet.nap.schemaName,
        url: fleet.nap.website,
        telephone: fleet.nap.phoneTel,
        hasMap: fleet.nap.mapsSearchUrl,
        address: {
          ...jsonLd.address,
          streetAddress: fleet.nap.street,
          addressLocality: fleet.nap.city,
          addressRegion: fleet.nap.province,
          postalCode: fleet.nap.postalCode,
        },
        geo: {
          ...jsonLd.geo,
          latitude: Number(fleet.nap.lat),
          longitude: Number(fleet.nap.lng),
        },
      }
    : jsonLd;
  return (
    <html lang="en">
      <head>
        <meta name="fleet-content-version" content={fleet.version} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cigaretteSafeContent(renderedJsonLd)) }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VM2VG5WYSG"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VM2VG5WYSG');
            `
          }}
        />
      </head>
      <body>
        <div className="hermesHomepageAnnouncement" data-hermes-change="homepage-banner" role="status" aria-label="Store announcement">
          OPEN 24 HOURS
        </div>
        <Link className="deliveryAnnouncement" href="/delivery">
          NEW DELIVERY MENU IS HERE — CLICK TO EXPLORE
        </Link>
        <FleetContentProvider value={{ active: fleet.active, version: fleet.version, nap: fleet.nap }}>
          <CigaretteStateProvider value={cigarettes}>
            {children}
            <FullNameNap />
            <PinnedNavClearance />
          </CigaretteStateProvider>
        </FleetContentProvider>
      </body>
    </html>
  );
}
