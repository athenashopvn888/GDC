import { cache } from "react";
import { readFleetContent } from "./fleet/read";

export const getFleetContent = cache(readFleetContent);

export {
  CONTENT_MODE_ENV,
  currentManifestHealth,
  DEFAULT_FLEET_MANIFEST_URL,
  EDGE_CONFIG_ENV,
  FLEET_FETCH_REVALIDATE_SECONDS,
  FLEET_MANIFEST_ENV,
  FLEET_REVALIDATE_ENV,
  manifestEtag,
  resetFleetContentCache,
  TV_MANIFEST_CACHE_CONTROL,
  tvManifestBody,
  tvManifestDecision,
} from "./fleet/read";
export { FLEET_AFFECTED_PATHS } from "./fleet/routes";
export { FLEET_CONTENT_TAG, FLEET_STORE_CODE } from "./fleet/types";
