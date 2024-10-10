require('dotenv').config();  // Load environment variables from .env file
const mysql = require('mysql2');

const db = mysql.createConnection({
   host: process.env.DB_HOST,     // Use the DB_HOST from the .env file
   port: process.env.DB_PORT,     // Use the DB_PORT from the .env file
   user: process.env.DB_USER,     // Use the DB_USER from the .env file
   password: process.env.DB_PASSWORD, // Use the DB_PASSWORD from the .env file
   database: process.env.DB_NAME   // Use the DB_NAME from the .env file
});

module.exports = db;
