/**
 * @fileoverview Barrel export for the utils module.
 * Re-exports all utility functions and constants for convenient single-import access.
 *
 * @module utils/index
 * @version 1.0.0
 */

const constants = require('./constants');
const helpers = require('./helpers');
const googlePlaces = require('./googlePlaces');

module.exports = {
  ...constants,
  ...helpers,
  ...googlePlaces,
};
