/**
 * @file pricing.js
 * @description Pricing calculation utilities for the BookingModal component.
 *              Provides functions to compute the total price including cleaning
 *              and service fees, and to generate a price breakdown object.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import { CLEANING_FEE_MULTIPLIER, SERVICE_FEE_RATE } from '../../../utils/constants';

/**
 * Calculates the total booking price including cleaning and service fees.
 *
 * Formula: nightlyPrice + (nightlyPrice * CLEANING_FEE_MULTIPLIER) + (nightlyPrice * SERVICE_FEE_RATE)
 *
 * @param {number} nightlyPrice - The nightly rate in dollars.
 * @returns {number} The total price rounded to the nearest dollar.
 */
export function calculateTotalPrice(nightlyPrice) {
  return Math.round(
    nightlyPrice +
    nightlyPrice * CLEANING_FEE_MULTIPLIER +
    nightlyPrice * SERVICE_FEE_RATE
  );
}

/**
 * Calculates the cleaning fee for a given nightly price.
 *
 * @param {number} nightlyPrice - The nightly rate in dollars.
 * @returns {number} The cleaning fee rounded to the nearest dollar.
 */
export function calculateCleaningFee(nightlyPrice) {
  return Math.round(nightlyPrice * CLEANING_FEE_MULTIPLIER);
}

/**
 * Calculates the service fee (14% of nightly price).
 *
 * @param {number} nightlyPrice - The nightly rate in dollars.
 * @returns {number} The service fee rounded to the nearest dollar.
 */
export function calculateServiceFee(nightlyPrice) {
  return Math.round(nightlyPrice * SERVICE_FEE_RATE);
}

/**
 * Generates a complete price breakdown for display in the booking form.
 *
 * @param {number} nightlyPrice - The nightly rate in dollars.
 * @returns {Object} A breakdown object with per-line amounts.
 * @returns {number} return.nightlyPrice - The base nightly rate.
 * @returns {number} return.cleaningFee - The cleaning fee amount.
 * @returns {number} return.serviceFee - The service fee amount.
 * @returns {number} return.totalPrice - The total price (all fees included).
 */
export function priceBreakdown(nightlyPrice) {
  return {
    nightlyPrice,
    cleaningFee: calculateCleaningFee(nightlyPrice),
    serviceFee: calculateServiceFee(nightlyPrice),
    totalPrice: calculateTotalPrice(nightlyPrice),
  };
}
