/**
 * @fileoverview Shared utility functions for the Oihi AirBNB backend.
 * Contains pure helper functions used across controllers and other modules.
 *
 * @module utils/helpers
 * @version 1.0.0
 */

const crypto = require('crypto');
const { HOTEL_IMAGES } = require('./constants');

/**
 * Selects a deterministic image URL for a given place based on its ID.
 * Uses an MD5 hash of the place ID to produce a consistent, reproducible
 * index into the HOTEL_IMAGES array so the same place always gets the same image.
 *
 * @param {string|null} placeId - The Google Places ID
 * @param {number} index - Fallback index if placeId is not provided
 * @returns {string} The selected image URL
 */
function getImageForPlace(placeId, index) {
  const hash = crypto
    .createHash('md5')
    .update(String(placeId || index))
    .digest('hex');
  const idx = parseInt(hash.substring(0, 8), 16) % HOTEL_IMAGES.length;
  return HOTEL_IMAGES[idx];
}

/**
 * Estimates a nightly price for a property based on its Google rating.
 * Higher-rated properties receive higher base prices, with a small random
 * jitter applied to avoid identical pricing across similar properties.
 *
 * @param {number} rating - The Google rating (0-5)
 * @param {string} placeId - The place ID used to compute a deterministic jitter
 * @returns {number} Estimated nightly price in USD (minimum $40)
 */
function estimatePrice(rating, placeId) {
  const { PRICE_TIERS, PRICE_BOUNDS } = require('./constants');

  let basePrice = 80;
  for (const [minRating, price] of PRICE_TIERS) {
    if (rating >= minRating) {
      basePrice = price;
      break;
    }
  }

  // Deterministic jitter based on first character of placeId
  const jitter = parseInt(placeId.charCodeAt(0).toString(), 16) % 30 - 15;
  return Math.max(PRICE_BOUNDS.min, basePrice + jitter);
}

/**
 * Determines the property type string from Google Places type descriptors.
 *
 * @param {string[]} types - Array of Google Places type strings
 * @returns {string} The user-friendly property type (default: 'Lodging')
 */
function getPropertyType(types = []) {
  const { PROPERTY_TYPE_MAP } = require('./constants');

  for (const [key, label] of Object.entries(PROPERTY_TYPE_MAP)) {
    if (types.includes(key)) return label;
  }
  return 'Lodging';
}

/**
 * Builds the amenities list for a property based on its nightly price.
 * Higher-priced properties receive more amenities.
 *
 * @param {number} price - The nightly price
 * @returns {string[]} Array of amenity strings
 */
function getAmenities(price) {
  const { BASE_AMENITIES, AMENITY_TIERS } = require('./constants');
  const amenities = [...BASE_AMENITIES];

  for (const { threshold, amenities: extra } of AMENITY_TIERS) {
    if (price >= threshold) {
      amenities.push(...extra);
    }
  }

  return amenities;
}

/**
 * Transforms a raw Google Places API response object into the application's
 * standard property format used by the frontend.
 *
 * @param {Object} place - Raw place object from Google Places API
 * @param {number} index - Index position used for ID assignment
 * @returns {Object} Formatted property object
 */
function buildPropertyFromPlace(place, index) {
  const placeId = place.id || place.place_id || `unknown_${index}`;
  const name = place.displayName?.text || place.name || 'Unknown Place';
  const photoUrl = getImageForPlace(placeId, index);

  const propertyType = getPropertyType(place.types || []);

  const rating = place.rating || 0;
  const estimatedPrice = estimatePrice(rating, placeId);

  const lat = place.location?.latitude || 0;
  const lng = place.location?.longitude || 0;

  return {
    id: index + 1,
    placeId,
    title: name,
    host: 'Google Maps Verified',
    hostAvatar: 'https://i.pravatar.cc/150?img=0',
    price: estimatedPrice,
    rating,
    reviews: place.userRatingCount || 0,
    location: place.formattedAddress || 'Unknown location',
    lat,
    lng,
    type: propertyType,
    guests: Math.max(1, Math.floor(estimatedPrice / 40)),
    bedrooms: Math.max(1, Math.floor(estimatedPrice / 80)),
    bathrooms: 1,
    amenities: getAmenities(estimatedPrice),
    image: photoUrl,
    description: `${name} is located at ${place.formattedAddress || 'this location'}. Rating: ${rating || 'N/A'}/5 based on ${place.userRatingCount || 0} reviews.`,
    openingHours: place.currentOpeningHours || place.regularOpeningHours || null,
    googleMapsUrl: place.googleMapsUri || `https://maps.google.com/?q=${lat},${lng}`,
    website: place.websiteUri || null,
    phone: place.nationalPhoneNumber || null,
    businessStatus: place.businessStatus || null,
  };
}

/**
 * Generates a standardized API success response object.
 *
 * @param {*} data - The response data payload
 * @param {string} [message] - Optional success message
 * @param {Object} [meta] - Optional metadata (e.g., count, source)
 * @returns {Object} Success response object
 */
function successResponse(data, message, meta = {}) {
  return {
    success: true,
    ...(message && { message }),
    ...meta,
    data,
  };
}

/**
 * Generates a standardized API error response object.
 *
 * @param {string} error - The error message
 * @param {string} [details] - Optional additional detail about the error
 * @returns {Object} Error response object
 */
function errorResponse(error, details) {
  return {
    success: false,
    error,
    ...(details && { details }),
  };
}

module.exports = {
  getImageForPlace,
  estimatePrice,
  getPropertyType,
  getAmenities,
  buildPropertyFromPlace,
  successResponse,
  errorResponse,
};
