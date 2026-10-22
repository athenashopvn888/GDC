"use client";

import { useState } from "react";
import { FLEET_CATEGORY_BANNER_STYLE, fleetImageAfterError } from "../lib/fleet/imageFallback";
import type { ResolvedBanner } from "../lib/fleet/types";

/** Bundle image with a one-step coded fallback, then a same-size category name. */
export default function FleetSheetImage({
  banner,
  className,
  style,
}: {
  banner: ResolvedBanner;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [src, setSrc] = useState(banner.image);
  const [imageFailed, setImageFailed] = useState(banner.render !== "image" || banner.image.trim() === "");
  const width = banner.imageWidth;
  const height = banner.imageHeight;
  const aspectRatio = width && height ? `${width} / ${height}` : undefined;
  if (imageFailed) {
    return (
      <div
        data-fleet-text-banner=""
        role="img"
        aria-label={banner.alt || banner.categoryName}
        title={banner.title || banner.categoryName}
        style={{
          ...FLEET_CATEGORY_BANNER_STYLE,
          aspectRatio,
          minHeight: aspectRatio ? undefined : FLEET_CATEGORY_BANNER_STYLE.minHeight,
          ...style,
        }}
      >
        {banner.categoryName}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={banner.alt}
      title={banner.title}
      width={width}
      height={height}
      className={className}
      style={{ display: "block", width: "100%", maxWidth: "100%", height: "auto", aspectRatio, ...style }}
      onError={() => {
        const next = fleetImageAfterError(src, banner.codedImage);
        if (!next.category) {
          setSrc(next.src);
          return;
        }
        setImageFailed(true);
      }}
    />
  );
}
