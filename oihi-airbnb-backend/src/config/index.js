/**
 * @fileoverview Centralized configuration module for the Oihi AirBNB backend.
 * Loads environment variables and exports all configuration values in a single
 * object so they can be imported from anywhere in the application.
 *
 * @module config
 * @version 1.0.0
 */

require('dotenv').config();

/**
 * Application configuration object.
 * @type {Object}
 * @property {number} port - Server port number (default 5000)
 * @property {string} nodeEnv - Current Node environment (development/production)
 * @property {string} googleMapsApiKey - Google Maps Places API key
 * @property {string} jwtSecret - Secret for JWT token signing (placeholder for future use)
 */
const config = {
  /** @type {number} Server port number */
  port: parseInt(process.env.PORT, 10) || 5000,

  /** @type {string} Node environment mode */
  nodeEnv: process.env.NODE_ENV || 'development',

  /** @type {string} Google Maps API key for Places API integration */
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',

  /** @type {string} JWT secret for authentication (reserved for future use) */
  jwtSecret: process.env.JWT_SECRET || 'oihi-airbnb-dev-secret',

  /** @type {number} Default maximum search results from Google Places */
  maxSearchResults: 20,

  /** @type {string} Default language code for Google Places responses */
  defaultLanguage: 'en',

  /** @type {number} Default nearby search radius in meters */
  defaultSearchRadius: 10000,
};

module.exports = config;
