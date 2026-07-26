/**
 * @fileoverview Bookings routes for the Oihi AirBNB backend.
 * Defines the HTTP endpoints for booking CRUD operations.
 * Delegates all business logic to the bookingsController.
 *
 * @module routes/bookings
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingsController');

/**
 * POST /api/bookings
 * Create a new booking.
 * Body: propertyId, checkin, checkout, guestName, guestEmail, guests, specialRequests, totalPrice
 */
router.post('/', controller.create);

/**
 * GET /api/bookings/:id
 * Retrieve a single booking by ID.
 */
router.get('/:id', controller.getById);

/**
 * GET /api/bookings
 * List all bookings.
 */
router.get('/', controller.list);

module.exports = router;
