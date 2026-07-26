/**
 * @fileoverview Global error handling middleware for the Oihi AirBNB backend.
 * Catches unhandled errors and returns a consistent JSON error response.
 * This middleware should be registered last in the Express middleware chain.
 *
 * @module middleware/errorHandler
 * @version 1.0.0
 */

/**
 * Express error-handling middleware.
 * Express recognizes error middleware by its four-parameter signature (err, req, res, next).
 *
 * @param {Error} err - The error that was thrown or passed via next(err)
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @param {import('express').NextFunction} next - The next middleware function (unused, required by Express)
 */
function errorHandler(err, req, res, next) {
  // Log the error for debugging purposes
  console.error(`[ERROR] ${err.message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  // Determine the HTTP status code (default to 500 if not set)
  const statusCode = err.statusCode || 500;

  // Send a consistent error response
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}

/**
 * Creates an Express-compatible 404 not-found handler for undefined routes.
 * This should be registered after all route definitions.
 *
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

module.exports = { errorHandler, notFoundHandler };
