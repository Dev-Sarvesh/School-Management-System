const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const Mongo_db_conn = require("./connection/Mongo_db_conn");
require('dotenv').config();
const router = require('./router/allRoutes');
const app = express();


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Database connection
Mongo_db_conn();

// Routes
app.use(router);

// Test route
app.get('/res',  (req, res) => {
  res.send("Dataa")
});

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
