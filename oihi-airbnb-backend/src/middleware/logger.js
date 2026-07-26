/**
 * @fileoverview Request logging middleware for the Oihi AirBNB backend.
 * Logs incoming requests with method, URL, and timestamp for debugging and auditing.
 *
 * @module middleware/logger
 * @version 1.0.0
 */

/**
 * Express middleware that logs every incoming request.
 * Outputs a formatted log line with the HTTP method, URL, and timestamp.
 *
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @param {import('express').NextFunction} next - The next middleware function
 */
function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
}

module.exports = logger;
