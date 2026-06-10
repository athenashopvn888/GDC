import type { Metadata } from "next";
import GamesContent from "./GamesContent";

export const metadata: Metadata = {
  title: "Cannabis Arcade Games — Green Deal Cannabis | York",
  description: "Play free online cannabis-themed games like Flappy Bud and Snake Munchies while you wait at Green Deal Cannabis.",
  alternates: {
    canonical: "https://greendealcannabis.com/games",
  },
};

export default function GamesPage() {
  return <GamesContent />;
}
