/**
 * @fileoverview Users controller for the Oihi AirBNB backend.
 * Contains the business logic for user registration, login, and listing.
 * Delegates data operations to the User model.
 *
 * @module controllers/usersController
 * @version 1.0.0
 */

const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/helpers');

/**
 * Handles POST /api/users/register
 * Registers a new user with the provided name, email, and password.
 *
 * @param {import('express').Request} req - Express request body
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Next middleware
 */
function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const user = User.create({ name, email, password });

    res.status(201).json(successResponse(user));
  } catch (error) {
    if (error.message === 'All fields are required') {
      return res.status(400).json(errorResponse(error.message));
    }
    if (error.message === 'Email already registered') {
      return res.status(400).json(errorResponse(error.message));
    }
    next(error);
  }
}

/**
 * Handles POST /api/users/login
 * Authenticates a user by email and password.
 *
 * @param {import('express').Request} req - Express request body
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Next middleware
 */
function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(errorResponse('Email and password required'));
    }

    const user = User.authenticate(email, password);

    if (!user) {
      return res.status(404).json(errorResponse('User not found'));
    }

    res.json(successResponse(user));
  } catch (error) {
    next(error);
  }
}

/**
 * Handles GET /api/users
 * Returns all registered users (without sensitive data).
 *
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Next middleware
 */
function list(req, res, next) {
  try {
    const all = User.findAll();
    res.json(successResponse(all, null, { count: all.length }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  list,
};
