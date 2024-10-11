require('dotenv').config(); // Load environment variables from .env file
const mysql = require('mysql2');

// Set default values for local connection
const defaultConfig = {
   host: 'localhost',
   port: '3306',
   user: 'root', // or your local MySQL username
   password: '', // or your local MySQL password (if set)
   database: 'react_node_app', // your local database name
};

// Create a connection to the database, using defaults if environment variables are not provided
const db = mysql.createConnection({
   host: process.env.DB_HOST || defaultConfig.host,
   port: process.env.DB_PORT || defaultConfig.port,
   user: process.env.DB_USER || defaultConfig.user,
   password: process.env.DB_PASSWORD || defaultConfig.password,
   database: process.env.DB_NAME || defaultConfig.database
});

// Connect to the database and handle errors
db.connect((err) => {
   if (err) {
      console.error('--- MySQL Connection Error Details ---');
      console.error(`Error Code: ${err.code}`);
      console.error(`Error Message: ${err.message}`);
      console.error(`Stack Trace: ${err.stack}`);
      console.error('--------------------------------------');
      if (err.code === 'ETIMEDOUT') {
         console.error('Connection timed out');
      } else {
         console.error('An unexpected error occurred during the MySQL connection.');
      }
      return; // Exit the connection attempt
   }
   console.log('Connected to MySQL Database successfully!');
});

module.exports = db; // Export the database connection
