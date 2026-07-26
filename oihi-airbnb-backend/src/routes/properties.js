/**
 * @fileoverview Properties routes for the Oihi AirBNB backend.
 * Defines the HTTP endpoints for property search, nearby search, and detail
 * retrieval. Delegates all business logic to the propertiesController.
 *
 * @module routes/properties
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/propertiesController');
const { validateQuery } = require('../middleware/validate');

/**
 * GET /api/properties/search
 * Search for lodging properties via Google Places text search.
 * Query params: query, type, minPrice, maxPrice, guests
 */
router.get('/search', controller.search);

/**
 * GET /api/properties/nearby
 * Find lodging properties near a geographic coordinate.
 * Query params: lat, lng, radius
 */
router.get('/nearby', controller.nearby);

/**
 * GET /api/properties/:id
 * Get detailed information for a single property by Google Place ID.
 */
router.get('/:id', controller.getById);

module.exports = router;
