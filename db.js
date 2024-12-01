
const mysql = require('mysql2');
const session = require('express-session');
const MySQLStore = require('connect-mysql2')(session); // Add the MySQLStore here
require('dotenv').config(); // Ensure .env file is loaded

// Create a connection pool to MySQL database
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'your_database_name',
  port: process.env.DB_PORT || 3306,
});

// Session store configuration
const sessionStore = new MySQLStore({
  pool: pool, // Pass the pool connection
  checkExpirationInterval: 900000, // 15 minutes
  expiration: 86400000, // 24 hours
});

// Export the pool and session store
module.exports = {
  pool,
  sessionStore,
};
