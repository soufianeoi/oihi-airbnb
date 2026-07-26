/**
 * @fileoverview Google Maps Places API helper functions.
 * Encapsulates all direct communication with the Google Places API,
 * including text search, nearby search, and place detail requests.
 * This module is consumed by the properties controller.
 *
 * @module utils/googlePlaces
 * @version 1.0.0
 */

const axios = require('axios');
const config = require('../config');
const { PLACES_FIELD_MASKS } = require('./constants');
const { buildPropertyFromPlace } = require('./helpers');

/**
 * Base URL for the Google Maps Places API v1.
 * @type {string}
 */
const PLACES_API_BASE = 'https://places.googleapis.com/v1/places';

/**
 * Validates that the Google Maps API key is configured and not a placeholder.
 * Throws an error if the key is missing or still contains the placeholder text.
 *
 * @throws {Error} If the API key is not configured
 */
function validateApiKey() {
  if (!config.googleMapsApiKey || config.googleMapsApiKey.includes('PASTE')) {
    throw new Error('API key not configured');
  }
}

/**
 * Constructs the common request headers for Google Places API calls,
 * including the API key and the requested field mask.
 *
 * @param {string} fieldMask - Comma-separated field mask string
 * @returns {Object} Headers object for axios requests
 */
function buildHeaders(fieldMask) {
  return {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': config.googleMapsApiKey,
    'X-Goog-FieldMask': fieldMask,
  };
}

/**
 * Performs a text-based search using the Google Places API.
 * Automatically enhances the query with lodging keywords if not already present.
 *
 * @param {string} query - The raw search query (e.g., "Tokyo", "beach hotels")
 * @param {number} [maxResults=20] - Maximum number of results to return
 * @returns {Promise<Object[]>} Array of formatted property objects
 * @throws {Error} If the API request fails
 */
async function searchText(query, maxResults = config.maxSearchResults) {
  validateApiKey();

  const { LODGING_KEYWORDS } = require('./constants');
  const rawQuery = (query || 'hotels in Tokyo').trim();
  const hasLodgingKeyword = LODGING_KEYWORDS.some((kw) =>
    rawQuery.toLowerCase().includes(kw)
  );
  const searchQuery = hasLodgingKeyword
    ? rawQuery
    : `hotels and places to stay in ${rawQuery}`;

  console.log(`[Places] Searching: ${searchQuery}`);

  const response = await axios.post(
    `${PLACES_API_BASE}:searchText`,
    {
      textQuery: searchQuery,
      maxResultCount: maxResults,
      languageCode: config.defaultLanguage,
    },
    { headers: buildHeaders(PLACES_FIELD_MASKS.search) }
  );

  const places = response.data.places || [];
  console.log(`[Places] Found ${places.length}`);

  return places.map((place, i) => buildPropertyFromPlace(place, i));
}

/**
 * Performs a nearby search using the Google Places API.
 * Finds lodging and accommodation places within a specified radius of a coordinate.
 *
 * @param {number} lat - Latitude coordinate
 * @param {number} lng - Longitude coordinate
 * @param {number} [radius] - Search radius in meters (defaults to config.defaultSearchRadius)
 * @param {number} [maxResults=20] - Maximum number of results
 * @returns {Promise<Object[]>} Array of formatted property objects
 * @throws {Error} If the API request fails or coordinates are invalid
 */
async function searchNearby(lat, lng, radius, maxResults = config.maxSearchResults) {
  validateApiKey();

  if (!lat || !lng) {
    throw new Error('lat and lng are required');
  }

  const response = await axios.post(
    `${PLACES_API_BASE}:searchNearby`,
    {
      maxResultCount: maxResults,
      locationRestriction: {
        circle: {
          center: {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
          },
          radius: parseInt(radius, 10) || config.defaultSearchRadius,
        },
      },
      languageCode: config.defaultLanguage,
    },
    { headers: buildHeaders(PLACES_FIELD_MASKS.search) }
  );

  const places = response.data.places || [];
  console.log(`[Places] Nearby: ${places.length}`);

  return places.map((place, i) => buildPropertyFromPlace(place, i));
}

/**
 * Retrieves detailed information for a single place by its Place ID.
 *
 * @param {string} placeId - The Google Place ID
 * @returns {Promise<Object|null>} Formatted property object, or null if not found
 * @throws {Error} If the API request fails
 */
async function getPlaceDetails(placeId) {
  validateApiKey();

  const response = await axios.get(`${PLACES_API_BASE}/${placeId}`, {
    headers: buildHeaders(PLACES_FIELD_MASKS.detail),
  });

  const place = response.data;
  if (!place || !place.id) {
    return null;
  }

  const result = buildPropertyFromPlace(place, 0);
  result.id = 0;
  return result;
}

module.exports = {
  validateApiKey,
  buildHeaders,
  searchText,
  searchNearby,
  getPlaceDetails,
};
