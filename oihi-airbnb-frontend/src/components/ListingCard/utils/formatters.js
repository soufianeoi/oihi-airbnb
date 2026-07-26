/**
 * @file formatters.js
 * @description Formatting utility functions used by the ListingCard component.
 *              Provides helpers for price labels, image error handling, and
 *              other display formatting.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import { PRICE_LABELS, FALLBACK_IMAGE_URL } from '../../../utils/constants';

/**
 * Returns the price level label string for a given price level index.
 *
 * @param {number} level - The price level (1-4). Values outside this range return empty string.
 * @returns {string} The price label ('$' through '$$$$'), or empty string for invalid levels.
 */
export function getPriceLabel(level) {
  return PRICE_LABELS[level] || '';
}

/**
 * Handles an image load error by replacing the src with the fallback URL.
 * Intended to be used as an onError handler on img elements.
 *
 * @param {React.SyntheticEvent<HTMLImageElement>} e - The error event from the img element.
 */
export function handleImageError(e) {
  e.target.src = FALLBACK_IMAGE_URL;
}

/**
 * Formats a nightly price as a display string.
 *
 * @param {number} price - The nightly price in dollars.
 * @returns {string} The formatted price string (e.g., "~$120").
 */
export function formatPrice(price) {
  return `~$${price}`;
}

/**
 * Formats a review count with a star rating display.
 *
 * @param {number|string} rating - The property rating value.
 * @param {number} reviews - The number of reviews.
 * @returns {string} A formatted string like "★ 4.5 (120)".
 */
export function formatRating(rating, reviews) {
  return `★ ${rating || 'N/A'} (${reviews})`;
}
