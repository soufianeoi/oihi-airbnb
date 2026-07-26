/**
 * @fileoverview Users routes for the Oihi AirBNB backend.
 * Defines the HTTP endpoints for user registration, login, and listing.
 * Delegates all business logic to the usersController.
 *
 * @module routes/users
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

/**
 * POST /api/users/register
 * Register a new user.
 * Body: name, email, password
 */
router.post('/register', controller.register);

/**
 * POST /api/users/login
 * Authenticate a user by email and password.
 * Body: email, password
 */
router.post('/login', controller.login);

/**
 * GET /api/users
 * List all registered users.
 */
router.get('/', controller.list);

module.exports = router;
