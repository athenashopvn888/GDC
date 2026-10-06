import type { CSSProperties } from "react";

export type TvTheme = {
  headerImage: string;
  backgroundImage: string;
  cornerLeft?: string;
  cornerRight?: string;
  primary: string;
  accent: string;
  glow: string;
  cardBorder: string;
  headerText: string;
  sloganLeft: string;
  sloganRight: string;
  footerLeft: string;
  footerRight: string;
};

export const TV_THEMES: Readonly<Record<string, TvTheme>> = {
  GDC01: {
    headerImage: "/tv-theme/gdc01/header.webp",
    backgroundImage: "/tv-theme/gdc01/background.webp",
    cornerLeft: "/tv-theme/gdc01/corner-left.png",
    cornerRight: "/tv-theme/gdc01/corner-right.png",
    primary: "#052B14",
    accent: "#D6B84C",
    glow: "rgba(118, 255, 3, 0.42)",
    cardBorder: "rgba(214, 184, 76, 0.92)",
    headerText: "#FFF8D8",
    sloganLeft: "EXPLORE EVERY TIER",
    sloganRight: "GREEN DEALS · GOOD TIMES",
    footerLeft: "GREEN DEAL CANNABIS",
    footerRight: "TOP QUALITY · EVERY TIER",
  },
};

export function getTvTheme(storeCode?: string | null): TvTheme | undefined {
  return storeCode ? TV_THEMES[storeCode] : undefined;
}

type TvThemeVariables = CSSProperties & {
  "--tv-theme-header-image": string;
  "--tv-theme-background-image": string;
  "--tv-theme-primary": string;
  "--tv-theme-accent": string;
  "--tv-theme-glow": string;
  "--tv-theme-card-border": string;
  "--tv-theme-header-text": string;
};

export function getTvThemeVariables(theme: TvTheme): TvThemeVariables {
  return {
    "--tv-theme-header-image": `url("${theme.headerImage}")`,
    "--tv-theme-background-image": `url("${theme.backgroundImage}")`,
    "--tv-theme-primary": theme.primary,
    "--tv-theme-accent": theme.accent,
    "--tv-theme-glow": theme.glow,
    "--tv-theme-card-border": theme.cardBorder,
    "--tv-theme-header-text": theme.headerText,
  };
}

