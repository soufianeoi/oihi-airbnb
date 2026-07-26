/**
 * @fileoverview Express application setup for the Oihi AirBNB backend.
 * Configures middleware, mounts routes, and handles static file serving
 * for the production frontend build.
 *
 * @module app
 * @version 1.0.0
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const config = require('./config');
const routes = require('./routes');
const logger = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

/**
 * Creates and configures the Express application instance.
 * Applies global middleware, mounts API routes, and sets up
 * production static file serving and error handlers.
 *
 * @returns {import('express').Application} The configured Express app
 */
function createApp() {
  const app = express();

  // ─── Global Middleware ────────────────────────────────────────────
  app.use(cors());
  app.use(express.json());
  app.use(logger);

  // ─── API Routes ──────────────────────────────────────────────────
  app.use('/api', routes);

  // ─── Production Static Files ──────────────────────────────────────
  if (config.nodeEnv === 'production') {
    const frontendBuild = path.join(__dirname, '../../oihi-airbnb-frontend/build');
    app.use(express.static(frontendBuild));

    // Serve index.html for any non-API route (SPA fallback)
    app.get('*', (req, res) => {
      res.sendFile(path.join(frontendBuild, 'index.html'));
    });
  }

  // ─── Error Handling ──────────────────────────────────────────────
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
