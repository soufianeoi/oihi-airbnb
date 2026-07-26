/**
 * @file useBookingForm.js
 * @description Custom hook that encapsulates the booking form state, validation
 *              logic, and submission handler for the BookingModal component.
 *              Manages all form fields, validates inputs against business rules,
 *              and submits booking data to the API.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import { useState, useCallback } from 'react';
import api from '../../../services/api';
import { calculateTotalPrice } from '../utils';

/**
 * useBookingForm - Manages booking form lifecycle from input through submission.
 *
 * @param {Object} property - The property being booked. Must have id, price, and guests fields.
 * @param {function} onClose - Callback to close the modal after successful booking.
 * @returns {Object} An object containing form state, handlers, and computed values.
 * @returns {Object} return.formData - Current form field values.
 * @returns {Object} return.errors - Validation error messages keyed by field name.
 * @returns {boolean} return.submitting - Whether a submission request is in flight.
 * @returns {boolean} return.success - Whether the booking was successfully created.
 * @returns {number} return.totalPrice - The computed total price for display.
 * @returns {function} return.handleChange - Input change handler that clears field errors.
 * @returns {function} return.handleSubmit - Form submission handler with validation.
 */
function useBookingForm(property, onClose) {
  /** Form field values */
  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    guestName: '',
    guestEmail: '',
    guests: 1,
    specialRequests: '',
  });

  /** Validation error messages per field */
  const [errors, setErrors] = useState({});

  /** Whether the booking API request is in progress */
  const [submitting, setSubmitting] = useState(false);

  /** Whether the booking was successfully created */
  const [success, setSuccess] = useState(false);

  /** Pre-computed total price for display */
  const totalPrice = calculateTotalPrice(property.price);

  /**
   * Handles input changes. Updates the form field value and clears
   * any validation error for that field.
   *
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e - The change event.
   */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (prev[name]) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return prev;
    });
  }, []);

  /**
   * Validates all form fields against business rules.
   *
   * @returns {Object} An object containing validation error messages.
   *                    Empty object means all fields are valid.
   */
  const validate = useCallback(() => {
    const newErrors = {};

    if (!formData.checkin) {
      newErrors.checkin = 'Please select a check-in date';
    }
    if (!formData.checkout || new Date(formData.checkout) <= new Date(formData.checkin)) {
      newErrors.checkout = 'Please select a valid check-out date';
    }
    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Please enter your name';
    }
    if (!formData.guestEmail.trim() || !formData.guestEmail.includes('@')) {
      newErrors.guestEmail = 'Please enter a valid email';
    }

    const guestCount = parseInt(formData.guests);
    if (!guestCount || guestCount < 1 || guestCount > property.guests) {
      newErrors.guests = `Invalid number of guests (max ${property.guests})`;
    }

    return newErrors;
  }, [formData, property.guests]);

  /**
   * Handles form submission. Runs validation, then sends the booking
   * request to the API. On success, sets the success state to show
   * the confirmation view.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
   */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setSubmitting(true);
      try {
        await api.post('/bookings', {
          propertyId: property.id,
          checkin: formData.checkin,
          checkout: formData.checkout,
          guestName: formData.guestName.trim(),
          guestEmail: formData.guestEmail.trim(),
          guests: parseInt(formData.guests),
          specialRequests: formData.specialRequests,
          totalPrice,
        });

        setSuccess(true);
      } catch (err) {
        console.error('Booking error:', err);
        setErrors({ submit: 'Something went wrong. Please try again.' });
      } finally {
        setSubmitting(false);
      }
    },
    [formData, property.id, totalPrice, validate]
  );

  return {
    formData,
    errors,
    submitting,
    success,
    totalPrice,
    handleChange,
    handleSubmit,
  };
}

export default useBookingForm;
