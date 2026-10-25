/** Routes that exist in this app. /exotic is the store menu tier, not /exotic-weed. */
export const MOBILE_BAR_HOURS_HREF = "/hours";
export const MOBILE_BAR_MENU_HREF = "/exotic";
export const MOBILE_BAR_DELIVERY_HREF = "/delivery";

/** In-store displays. The bar element is not rendered on these paths. */
export function omitMobileBottomBar(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const path = pathname.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  return path === "/tv" || path === "/tv2";
}
