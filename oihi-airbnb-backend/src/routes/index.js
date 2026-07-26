/**
 * @fileoverview Route aggregator for the Oihi AirBNB backend.
 * Mounts all resource-specific routers onto a single Express Router instance.
 * This simplifies app.js by providing a single import for all routes.
 *
 * @module routes/index
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();

const propertiesRouter = require('./properties');
const bookingsRouter = require('./bookings');
const usersRouter = require('./users');

/**
 * Health-check endpoint at the root API path.
 * Returns server status and timestamp.
 *
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Oihi AirBNB API is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount resource routers
router.use('/properties', propertiesRouter);
router.use('/bookings', bookingsRouter);
router.use('/users', usersRouter);

module.exports = router;
