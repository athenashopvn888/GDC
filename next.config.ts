const SHOW_CIGARETTES = process.env.NEXT_PUBLIC_SHOW_CIGARETTES?.trim().toLowerCase() === "true";
const cigaretteRedirects = SHOW_CIGARETTES ? [] : [
  { source: "/items/cigarettes/:path*", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/cigarettes/:path*", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/cigarette/:path*", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/items/tobacco/:path*", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/tobacco/:path*", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/native-cigarettes-:slug", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/native-cigarette-:slug", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/info/native-cigarettes-:slug", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/info/native-cigarette-:slug", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/resources/native-smokes/native-cigarettes-guide", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/resources/native-smokes/backwoods-grabba-guide", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/grabba-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/bb-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/bb-full-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/bb-light-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/belmont-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-classics-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-classics-original-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-classics-silver-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-full-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-goose-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-goose-full-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-goose-light-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-light-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/nexus-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/nexus-full-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/nexus-light-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/playfare-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/playfare-ultra-light-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/putters-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/rolled-gold-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/rolled-gold-full-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/rolled-gold-light-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/time-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/time-full-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/time-light-delivery-york", destination: "/items/vapes", statusCode: 302 as const },
];

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "afterdarkcannabis.com" },
      { protocol: "https", hostname: "kennedyloudcannabis.com" },
      { protocol: "https", hostname: "stclaircannabis.com" },
      { protocol: "https", hostname: "athena-cannabis-images.vercel.app", pathname: "/products/delivery/v1/**" },
    ],
  },
  async redirects() {
    return [
      ...cigaretteRedirects,
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
      { source: "/edibles", destination: "/items/edibles", permanent: true },
      { source: "/vapes", destination: "/items/vapes", permanent: true },
      { source: "/vape-disposables", destination: "/items/vape-disposables", permanent: true },
      { source: "/concentrates", destination: "/items/concentrates", permanent: true },
      { source: "/prerolls", destination: "/items/prerolls", permanent: true },
      { source: "/add-ons", destination: "/items/add-ons", permanent: true },
      { source: "/cigarettes", destination: "/items/cigarettes", permanent: true },
      { source: "/magic", destination: "/items/magic", permanent: true },
    ];
  },
};

export default nextConfig;
