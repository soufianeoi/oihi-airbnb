/**
 * @fileoverview Server entry point for the Oihi AirBNB backend.
 * Creates the Express app and starts listening on the configured port.
 * This file is the application bootstrap — it should be run directly.
 *
 * @module server
 * @version 1.0.0
 */

const createApp = require('./app');
const config = require('./config');

const app = createApp();

app.listen(config.port, () => {
  console.log(`Oihi AirBNB server running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
