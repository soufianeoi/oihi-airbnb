/**
 * @file utils/index.js
 * @description Barrel export for global utility modules.
 *              Re-exports all constants and utility functions so consumers
 *              can import from a single path.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

export {
  APP_NAME,
  API_BASE_URL,
  GOOGLE_MAPS_API_KEY,
  PRICE_LABELS,
  DEFAULT_MAP_CENTER,
  FALLBACK_IMAGE_URL,
  STORAGE_KEYS,
  CLEANING_FEE_MULTIPLIER,
  SERVICE_FEE_RATE,
  NAV_LINKS,
  FOOTER_COLUMNS,
} from './constants';
