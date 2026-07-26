/**
 * @fileoverview Properties controller for the Oihi AirBNB backend.
 * Contains the business logic for property search, nearby search, and detail
 * retrieval. Delegates Google Places API calls to the googlePlaces utility.
 *
 * @module controllers/propertiesController
 * @version 1.0.0
 */

const googlePlaces = require('../utils/googlePlaces');
const { VALID_LODGING_TYPES } = require('../utils/constants');
const { successResponse, errorResponse } = require('../utils/helpers');

/**
 * Handles GET /api/properties/search
 * Searches for lodging properties using the Google Places text search API.
 * Supports optional query parameters for filtering by type, price, and guest count.
 *
 * @param {import('express').Request} req - Express request (query: query, type, minPrice, maxPrice, guests)
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Next middleware
 */
async function search(req, res, next) {
  try {
    const { query, type, minPrice, maxPrice, guests } = req.query;

    // Fetch raw results from Google Places
    let results = await googlePlaces.searchText(query);

    // Filter to only lodging-related types
    results = results.filter((p) => {
      const t = p.type.toLowerCase();
      return VALID_LODGING_TYPES.some((vt) => t.includes(vt));
    });

    // Apply optional filters
    if (type && type !== 'all') {
      results = results.filter((p) => p.type.toLowerCase().includes(type.toLowerCase()));
    }
    if (minPrice) {
      results = results.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      results = results.filter((p) => p.price <= parseFloat(maxPrice));
    }
    if (guests) {
      results = results.filter((p) => p.guests >= parseInt(guests, 10));
    }

    // Re-index IDs after filtering
    results.forEach((p, i) => {
      p.id = i + 1;
    });

    res.json(successResponse(results, null, {
      count: results.length,
      source: 'Google Maps',
    }));
  } catch (error) {
    console.error('[Places] Error:', error.response?.data || error.message);
    next(error);
  }
}

/**
 * Handles GET /api/properties/nearby
 * Searches for lodging properties near a given geographic coordinate.
 *
 * @param {import('express').Request} req - Express request (query: lat, lng, radius)
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Next middleware
 */
async function nearby(req, res, next) {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng) {
      return res.status(400).json(errorResponse('lat and lng are required'));
    }

    const results = await googlePlaces.searchNearby(lat, lng, radius);

    res.json(successResponse(results, null, {
      count: results.length,
      source: 'Google Maps',
    }));
  } catch (error) {
    console.error('[Places] Nearby error:', error.response?.data || error.message);

    if (error.message === 'lat and lng are required' || error.message === 'API key not configured') {
      const status = error.message === 'API key not configured' ? 500 : 400;
      return res.status(status).json(errorResponse(error.message));
    }

    next(error);
  }
}

/**
 * Handles GET /api/properties/:id
 * Retrieves detailed information for a single property by its Google Place ID.
 *
 * @param {import('express').Request} req - Express request (params: id)
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Next middleware
 */
async function getById(req, res, next) {
  try {
    const { id } = req.params;

    const result = await googlePlaces.getPlaceDetails(id);

    if (!result) {
      return res.status(404).json(errorResponse('Not found'));
    }

    res.json(successResponse(result));
  } catch (error) {
    console.error('[Places] Detail error:', error.message);
    next(error);
  }
}

module.exports = {
  search,
  nearby,
  getById,
};
