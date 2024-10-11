// app.js
require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); // Assuming you have a routes module
const db = require('./configs/db.js'); // Import the db connection

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Debug: Log environment variables for database connection (excluding sensitive info)
console.log('--- Environment Variables Debug Info ---');
console.log(`DB Host: ${process.env.DB_HOST || 'Not set'}`);
console.log(`DB Port: ${process.env.DB_PORT || 'Not set'}`);
console.log(`DB User: ${process.env.DB_USER || 'Not set'}`);
console.log(`DB Database: ${process.env.DB_NAME || 'Not set'}`);
console.log('-------------------------------------');

// Health check endpoint
app.get('/health', (req, res) => {
   res.json("Health check endpoint");
});

// Use API routes
app.use('/api', routes);

module.exports = app;
