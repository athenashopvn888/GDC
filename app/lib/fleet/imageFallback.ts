/**
 * After a sheet banner image errors, the only allowed replacement is that
 * slot's coded image. Anything else (no coded image, or the coded image is
 * the one that just failed) becomes the category-name banner. Never a third graphic.
 */
export function nextFleetImageSrc(failedSrc: string, codedImage: string | undefined): string | null {
  const coded = codedImage?.trim() ?? "";
  if (!coded || coded === failedSrc) return null;
  return coded;
}

export type FleetImageFailure = { src: string; category: boolean };

/** One step of the onError chain. category true means stop and paint the name. */
export function fleetImageAfterError(failedSrc: string, codedImage: string | undefined): FleetImageFailure {
  const next = nextFleetImageSrc(failedSrc, codedImage);
  if (!next) return { src: "", category: true };
  return { src: next, category: false };
}

/** Green Deal green with the lime brand type. No background image. */
export const FLEET_CATEGORY_BANNER_STYLE = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: 180,
  boxSizing: "border-box" as const,
  padding: "24px",
  background: "#020b03",
  color: "#84cc16",
  fontWeight: 800,
  fontSize: "clamp(28px, 4vw, 48px)",
  lineHeight: 1.15,
  textAlign: "center" as const,
};
