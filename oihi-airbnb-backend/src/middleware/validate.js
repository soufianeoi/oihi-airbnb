/**
 * @fileoverview Input validation middleware and helpers for the Oihi AirBNB backend.
 * Provides reusable validation functions that can be used in route handlers
 * to check required fields before processing requests.
 *
 * @module middleware/validate
 * @version 1.0.0
 */

/**
 * Middleware factory that validates the presence of required fields in the request body.
 * Returns an Express middleware function that checks for all specified fields
 * and responds with 400 if any are missing.
 *
 * @param {string[]} fields - Array of field names that must be present in req.body
 * @returns {Function} Express middleware function
 *
 * @example
 * router.post('/', validateBody(['name', 'email']), controller.create);
 */
function validateBody(fields) {
  /**
   * Express middleware that checks req.body for the required fields.
   *
   * @param {import('express').Request} req - The Express request object
   * @param {import('express').Response} res - The Express response object
   * @param {import('express').NextFunction} next - The next middleware function
   */
  return (req, res, next) => {
    const missing = fields.filter((field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === '');

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missing.join(', ')}`,
      });
    }

    next();
  };
}

/**
 * Middleware factory that validates the presence of required query parameters.
 * Returns an Express middleware function that checks for all specified query params
 * and responds with 400 if any are missing.
 *
 * @param {string[]} params - Array of query parameter names that must be present
 * @returns {Function} Express middleware function
 *
 * @example
 * router.get('/search', validateQuery(['query']), controller.search);
 */
function validateQuery(params) {
  /**
   * Express middleware that checks req.query for the required parameters.
   *
   * @param {import('express').Request} req - The Express request object
   * @param {import('express').Response} res - The Express response object
   * @param {import('express').NextFunction} next - The next middleware function
   */
  return (req, res, next) => {
    const missing = params.filter((p) => !req.query[p]);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required query parameters: ${missing.join(', ')}`,
      });
    }

    next();
  };
}

/**
 * Middleware factory that validates the presence of required route parameters.
 * Returns an Express middleware function that checks for all specified params
 * and responds with 400 if any are missing.
 *
 * @param {string[]} paramNames - Array of route parameter names that must be present
 * @returns {Function} Express middleware function
 */
function validateParams(paramNames) {
  /**
   * Express middleware that checks req.params for the required parameters.
   *
   * @param {import('express').Request} req - The Express request object
   * @param {import('express').Response} res - The Express response object
   * @param {import('express').NextFunction} next - The next middleware function
   */
  return (req, res, next) => {
    const missing = paramNames.filter((p) => !req.params[p]);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required route parameters: ${missing.join(', ')}`,
      });
    }

    next();
  };
}

module.exports = { validateBody, validateQuery, validateParams };
