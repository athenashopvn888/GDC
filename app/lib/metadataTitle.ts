import type { Metadata } from "next";

export const STOREFRONT_NAME = "Green Deal Cannabis";

/**
 * Preserve the root title template for unbranded child titles, but prevent the
 * template from appending the storefront name when the child already owns it.
 */
export function resolveStorefrontTitle(title: string): Metadata["title"] {
  return title.toLocaleLowerCase("en-CA").includes(STOREFRONT_NAME.toLocaleLowerCase("en-CA"))
    ? { absolute: title }
    : title;
}
