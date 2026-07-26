/**
 * @fileoverview Bookings controller for the Oihi AirBNB backend.
 * Contains the business logic for creating, retrieving, and listing bookings.
 * Delegates data operations to the Booking model.
 *
 * @module controllers/bookingsController
 * @version 1.0.0
 */

const Booking = require('../models/Booking');
const { successResponse, errorResponse } = require('../utils/helpers');

/**
 * Handles POST /api/bookings
 * Creates a new booking record with the provided details.
 *
 * @param {import('express').Request} req - Express request body
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Next middleware
 */
function create(req, res, next) {
  try {
    const { propertyId, checkin, checkout, guestName, guestEmail, guests, specialRequests, totalPrice } = req.body;

    const booking = Booking.create({
      propertyId, checkin, checkout, guestName, guestEmail,
      guests, specialRequests, totalPrice,
    });

    res.status(201).json(successResponse(booking, 'Booking confirmed successfully'));
  } catch (error) {
    if (error.message === 'Missing required fields') {
      return res.status(400).json(errorResponse(error.message));
    }
    next(error);
  }
}

/**
 * Handles GET /api/bookings/:id
 * Retrieves a single booking by its numeric ID.
 *
 * @param {import('express').Request} req - Express request (params: id)
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Next middleware
 */
function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const booking = Booking.findById(id);

    if (!booking) {
      return res.status(404).json(errorResponse('Booking not found'));
    }

    res.json(successResponse(booking));
  } catch (error) {
    next(error);
  }
}

/**
 * Handles GET /api/bookings
 * Returns all bookings with a count.
 *
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Next middleware
 */
function list(req, res, next) {
  try {
    const all = Booking.findAll();
    res.json(successResponse(all, null, { count: all.length }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getById,
  list,
};
