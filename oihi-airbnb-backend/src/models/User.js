/**
 * @fileoverview User model class for the Oihi AirBNB backend.
 * Provides data access and business logic for user entities.
 * Uses an in-memory array store (replaceable with a database in the future).
 *
 * @module models/User
 * @version 1.0.0
 */

/**
 * In-memory store for user records.
 * @type {Array<Object>}
 * @private
 */
const users = [];

/**
 * Auto-incrementing ID counter for new users.
 * @type {number}
 * @private
 */
let nextId = 1;

/**
 * User model class providing CRUD operations for user entities.
 * All methods are static for simplicity; an in-memory array acts as the data store.
 *
 * @class User
 */
class User {
  /**
   * Creates a new user record.
   *
   * @param {Object} userData - The user data
   * @param {string} userData.name - The user's display name
   * @param {string} userData.email - The user's email address (must be unique)
   * @param {string} userData.password - The user's password (plaintext placeholder)
   * @returns {Object} The created user object (without password)
   * @throws {Error} If the email is already registered
   */
  static create({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    if (users.find((u) => u.email === email)) {
      throw new Error('Email already registered');
    }

    const user = {
      id: nextId++,
      name,
      email,
      password, // In production, hash this with bcrypt
      createdAt: new Date().toISOString(),
    };

    users.push(user);

    // Return user without password
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Authenticates a user by email and password.
   *
   * @param {string} email - The user's email address
   * @param {string} password - The user's password
   * @returns {Object|null} The authenticated user object (without password), or null if not found
   */
  static authenticate(email, password) {
    if (!email || !password) {
      throw new Error('Email and password required');
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      return null;
    }

    // In production, compare hashed passwords
    return { id: user.id, name: user.name, email: user.email };
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param {number} id - The user's ID
   * @returns {Object|null} The user object (without password), or null if not found
   */
  static findById(id) {
    const user = users.find((u) => u.id === id);
    if (!user) return null;
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Retrieves all users (without password fields).
   *
   * @returns {Object[]} Array of user objects
   */
  static findAll() {
    return users.map(({ password: _, ...safeUser }) => safeUser);
  }

  /**
   * Returns the total number of registered users.
   *
   * @returns {number} User count
   */
  static count() {
    return users.length;
  }
}

module.exports = User;
