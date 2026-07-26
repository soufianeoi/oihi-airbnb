/**
 * @fileoverview Booking model class for the Oihi AirBNB backend.
 * Provides data access and business logic for booking entities.
 * Uses an in-memory array store (replaceable with a database in the future).
 *
 * @module models/Booking
 * @version 1.0.0
 */

/**
 * In-memory store for booking records.
 * @type {Array<Object>}
 * @private
 */
const bookings = [];

/**
 * Auto-incrementing ID counter for new bookings.
 * @type {number}
 * @private
 */
let nextId = 1;

/**
 * Booking model class providing CRUD operations for booking entities.
 * All methods are static for simplicity; an in-memory array acts as the data store.
 *
 * @class Booking
 */
class Booking {
  /**
   * Creates a new booking record.
   *
   * @param {Object} bookingData - The booking data
   * @param {number|string} bookingData.propertyId - The ID of the property being booked
   * @param {string} bookingData.checkin - Check-in date string
   * @param {string} bookingData.checkout - Check-out date string
   * @param {string} bookingData.guestName - Name of the guest
   * @param {string} bookingData.guestEmail - Email of the guest
   * @param {number} [bookingData.guests=1] - Number of guests
   * @param {string} [bookingData.specialRequests=''] - Special requests from the guest
   * @param {number} bookingData.totalPrice - Total price for the stay
   * @returns {Object} The created booking object
   * @throws {Error} If required fields are missing
   */
  static create({ propertyId, checkin, checkout, guestName, guestEmail, guests, specialRequests, totalPrice }) {
    if (!propertyId || !checkin || !checkout || !guestName || !guestEmail) {
      throw new Error('Missing required fields');
    }

    const booking = {
      id: nextId++,
      propertyId,
      checkin,
      checkout,
      guestName,
      guestEmail,
      guests: guests || 1,
      specialRequests: specialRequests || '',
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);
    console.log(`[BOOKING] New booking #${booking.id} for ${guestName} at property ${propertyId}`);

    return booking;
  }

  /**
   * Retrieves a booking by its ID.
   *
   * @param {number} id - The booking ID
   * @returns {Object|null} The booking object, or null if not found
   */
  static findById(id) {
    return bookings.find((b) => b.id === id) || null;
  }

  /**
   * Retrieves all bookings.
   *
   * @returns {Object[]} Array of booking objects
   */
  static findAll() {
    return [...bookings];
  }

  /**
   * Returns the total number of bookings.
   *
   * @returns {number} Booking count
   */
  static count() {
    return bookings.length;
  }
}

module.exports = Booking;
