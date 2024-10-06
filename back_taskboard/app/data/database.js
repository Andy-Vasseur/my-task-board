// Imports
const { Client } = require("pg");

// Determine SSL settings based on environment
const sslOptions =
  process.env.DB_USE_SSL === "true" ? { rejectUnauthorized: false } : false;

// Database client
const client = new Client({
  connectionString: process.env.DB_EXTERNAL_URL,
  ssl: sslOptions, // Apply SSL settings
});

// Connection
client.connect().catch((err) => console.error("Connection error", err.stack));

// Exports
module.exports = client;
