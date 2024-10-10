require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const db = require('./configs/db'); // Import the db connection

const app = express();

app.use(cors());
app.use(bodyParser.json());

db.connect((err) => {
   if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
   }
   console.log('Connected to MySQL Database');
});

// Health check endpoint
app.get('/health', (req, res) => {
   res.json("Health check endpoint");
});

app.use('/api', routes);

module.exports = app;
