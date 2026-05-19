import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://greendealcannabis.com"),
  title: {
    default: "Green Deal Cannabis — Premium Cannabis Dispensary, York",
    template: "%s | Green Deal Cannabis",
  },
  description:
    "Shop 200+ premium cannabis strains at Green Deal Cannabis. Exotic, Premium, AAA+, AA & Budget flower from $3/g. York's uplifting dispensary at 1820 Jane St. Open 24 Hours.",
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
    url: "https://greendealcannabis.com",
    siteName: "Green Deal Cannabis",
    title: "Green Deal Cannabis — Premium York Cannabis Dispensary",
    description:
      "200+ strains from $3/g. Exotic to Budget. York's uplifting dispensary at 1820 Jane St. Open 24 Hours.",
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
    title: "Green Deal Cannabis — York's Uplifting Dispensary",
    description: "200+ strains from $3/g. Open 24 Hours at 1820 Jane St, York.",
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
    canonical: "https://greendealcannabis.com",
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  additionalType: "https://schema.org/Store",
  "@id": "https://greendealcannabis.com",
  name: "Green Deal Cannabis",
  description: "Cannabis dispensary at 1820 Jane St in York, ON. Shop exotic, premium, AAA+, AA, and budget flower tiers plus edibles, prerolls, and vapes. Open 24 Hours.",
  url: "https://greendealcannabis.com",
  telephone: "+19422884633",
  image: "https://greendealcannabis.com/logo.png",
  priceRange: "$3 - $12/g",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1820 Jane St",
    addressLocality: "York",
    addressRegion: "ON",
    postalCode: "M9N 2T3",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.7003889,
    longitude: -79.5042654,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  sameAs: [
    "https://maps.google.com/?q=1820+Jane+St,+York,+ON+M9N+2T3",
  ],
  hasMap: "https://maps.google.com/?q=1820+Jane+St,+York,+ON+M9N+2T3",
  areaServed: {
    "@type": "City",
    name: "York",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "15",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
