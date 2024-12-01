const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const path = require("path");
require("dotenv").config();
const pool = require("./config/db");
//const nodemailer = require('nodemailer');


const app = express();

const bodyParser = require("body-parser");
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Debugging middleware for request body
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);
  if (req.method === "POST") {
    console.log("Request body:", req.body); // Log request body
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// Set up session store with MySQL
app.use(
  session({
    secret: "user_sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({}, pool),
    cookie: { secure: false, maxAge: 3600000 }, // cookie lasts for 1 hour
  })
);

// Use routes
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
// Serve HTML for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});