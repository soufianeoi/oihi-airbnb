/**
 * @file useSearchForm.js
 * @description Custom hook that encapsulates the search form state and submission
 *              logic for the SearchBar component. Manages location, check-in,
 *              check-out, and guest count fields, and invokes the onSearch callback
 *              with the current filter values on form submission.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import { useState, useCallback } from 'react';

/**
 * useSearchForm - Manages search form state and handles form submission.
 *
 * @param {function} onSearch - Callback invoked with the search filter object
 *                              when the form is submitted.
 * @returns {Object} An object containing form field values, an input change
 *                   handler, and a form submission handler.
 * @returns {string} return.location - Current location search value.
 * @returns {string} return.checkin - Current check-in date value.
 * @returns {string} return.checkout - Current check-out date value.
 * @returns {string} return.guests - Current guest count value.
 * @returns {function} return.handleChange - Input change handler.
 * @returns {function} return.handleSubmit - Form submission handler.
 */
function useSearchForm(onSearch) {
  /** Location search query */
  const [location, setLocation] = useState('');

  /** Check-in date (YYYY-MM-DD) */
  const [checkin, setCheckin] = useState('');

  /** Check-out date (YYYY-MM-DD) */
  const [checkout, setCheckout] = useState('');

  /** Number of guests as a string (parsed on submission) */
  const [guests, setGuests] = useState('');

  /**
   * Generic input change handler. Routes updates to the correct state
   * setter based on the input's name attribute.
   *
   * @param {string} name - The field name (location, checkin, checkout, guests).
   * @param {string} value - The new field value.
   */
  const handleChange = useCallback(
    (name, value) => {
      switch (name) {
        case 'location':
          setLocation(value);
          break;
        case 'checkin':
          setCheckin(value);
          break;
        case 'checkout':
          setCheckout(value);
          break;
        case 'guests':
          setGuests(value);
          break;
        default:
          break;
      }
    },
    []
  );

  /**
   * Handles form submission by preventing the default event and
   * calling the onSearch callback with current filter values.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSearch({ location, checkin, checkout, guests });
    },
    [location, checkin, checkout, guests, onSearch]
  );

  return {
    location,
    checkin,
    checkout,
    guests,
    handleChange,
    handleSubmit,
  };
}

export default useSearchForm;
