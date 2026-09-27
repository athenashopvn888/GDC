import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Green Deal Cannabis In-Store Flower Display",
  description: "Operational in-store flower menu display for Green Deal Cannabis.",
  robots: { index: false, follow: false },
};

export default function TvLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
