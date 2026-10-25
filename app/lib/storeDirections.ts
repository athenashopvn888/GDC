import { gbpLocation } from "./gbp-location.ts";
import { FULL_NAME_NAP } from "./fullNameNap.ts";

const SHORT_MAPS = /maps\.app\.goo\.gl/i;
const GBP_PIN = /place_id|google\.com\/maps\/place|maps\.google\.com\/maps/i;

/**
 * Directions target for this store.
 * Prefer a maps.app.goo.gl link or the GBP place pin already in config.
 * Otherwise build a Google Maps directions URL to the store address.
 */
export function storeDirectionsUrl(
  mapsUrl: string = FULL_NAME_NAP.mapsUrl,
  directionsUrl: string = gbpLocation.directionsUrl,
  address: string = gbpLocation.address,
): string {
  const candidates = [mapsUrl, directionsUrl].map((value) => value.trim()).filter(Boolean);
  const shortLink = candidates.find((url) => SHORT_MAPS.test(url));
  if (shortLink) return shortLink;
  const pin = candidates.find((url) => GBP_PIN.test(url));
  if (pin) return pin;
  const destination =
    address.trim() ||
    `${FULL_NAME_NAP.street}, ${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}
