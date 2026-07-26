/**
 * @file BookingModal.js
 * @description Booking modal component for completing property reservations.
 *              Displays a form with date selection, guest info, special requests,
 *              and a price breakdown. Uses the useBookingForm hook for state
 *              management and the pricing utils for price calculations.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import React from 'react';
import { useBookingForm } from './hooks';
import { calculateCleaningFee, calculateServiceFee } from './utils';
import { handleImageError } from '../ListingCard/utils';

/**
 * BookingModal - Renders the booking form modal or the success confirmation.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.property - The property being booked.
 * @param {function} props.onClose - Callback to close the modal.
 * @returns {JSX.Element} The booking modal markup.
 */
function BookingModal({ property, onClose }) {
  const {
    formData,
    errors,
    submitting,
    success,
    totalPrice,
    handleChange,
    handleSubmit,
  } = useBookingForm(property, onClose);

  // Success confirmation view
  if (success) {
    return (
      <div className="modal-overlay active">
        <div className="modal">
          <div className="modal-header">
            <h2>Booking Confirmed</h2>
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body" style={{ textAlign: 'center', padding: '40px 28px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ marginBottom: '8px' }}>Your booking is confirmed!</h3>
            <p style={{ color: '#717171', marginBottom: '20px' }}>
              A confirmation has been sent to <strong>{formData.guestEmail}</strong>
            </p>
            <div className="price-breakdown">
              <div className="price-row">
                <span>{property.title}</span>
                <span>${property.price}/night</span>
              </div>
              <div className="price-row">
                <span>Cleaning fee</span>
                <span>${calculateCleaningFee(property.price)}</span>
              </div>
              <div className="price-row">
                <span>Service fee (14%)</span>
                <span>${calculateServiceFee(property.price)}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Booking form view
  return (
    <div className="modal-overlay active">
      <div className="modal">
        <div className="modal-header">
          <h2>Complete Your Booking</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {/* Property summary */}
          <div className="booking-property">
            <img
              src={property.image}
              alt={property.title}
              onError={handleImageError}
            />
            <div className="booking-property-info">
              <h3>{property.title}</h3>
              <p>{property.location}</p>
              <div className="booking-price-per-night">
                ~${property.price}{' '}
                <span style={{ fontWeight: '400', fontSize: '12px', color: '#717171' }}>
                  / night (estimated)
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Check-in date */}
            <div className="form-group">
              <label>Check-in</label>
              <input
                type="date"
                className={`form-input ${errors.checkin ? 'error' : ''}`}
                name="checkin"
                value={formData.checkin}
                onChange={handleChange}
              />
              {errors.checkin && <div className="form-error visible">{errors.checkin}</div>}
            </div>

            {/* Check-out date */}
            <div className="form-group">
              <label>Check-out</label>
              <input
                type="date"
                className={`form-input ${errors.checkout ? 'error' : ''}`}
                name="checkout"
                value={formData.checkout}
                onChange={handleChange}
              />
              {errors.checkout && <div className="form-error visible">{errors.checkout}</div>}
            </div>

            {/* Guest name and email */}
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className={`form-input ${errors.guestName ? 'error' : ''}`}
                  name="guestName"
                  placeholder="John Doe"
                  value={formData.guestName}
                  onChange={handleChange}
                />
                {errors.guestName && <div className="form-error visible">{errors.guestName}</div>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className={`form-input ${errors.guestEmail ? 'error' : ''}`}
                  name="guestEmail"
                  placeholder="you@email.com"
                  value={formData.guestEmail}
                  onChange={handleChange}
                />
                {errors.guestEmail && (
                  <div className="form-error visible">{errors.guestEmail}</div>
                )}
              </div>
            </div>

            {/* Guest count */}
            <div className="form-group">
              <label>Guests (max {property.guests})</label>
              <input
                type="number"
                className={`form-input ${errors.guests ? 'error' : ''}`}
                name="guests"
                min="1"
                max={property.guests}
                value={formData.guests}
                onChange={handleChange}
              />
              {errors.guests && <div className="form-error visible">{errors.guests}</div>}
            </div>

            {/* Special requests */}
            <div className="form-group">
              <label>Special Requests (optional)</label>
              <textarea
                className="form-input"
                name="specialRequests"
                rows="3"
                placeholder="Any special needs or requests..."
                value={formData.specialRequests}
                onChange={handleChange}
              />
            </div>

            {/* Price breakdown */}
            <div className="price-breakdown">
              <div className="price-row">
                <span>${property.price} x 1 night</span>
                <span>${property.price}</span>
              </div>
              <div className="price-row">
                <span>Cleaning fee</span>
                <span>${calculateCleaningFee(property.price)}</span>
              </div>
              <div className="price-row">
                <span>Service fee (14%)</span>
                <span>${calculateServiceFee(property.price)}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            {errors.submit && (
              <div className="form-error visible" style={{ marginTop: '12px' }}>
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ marginTop: '20px' }}
            >
              {submitting ? 'Confirming...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
