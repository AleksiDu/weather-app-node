// Setup dependencies
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
require("dotenv").config();
const app = express();

// Setup connection
const port = process.env.port || process.env.PORT || 5000; // Variable is set to the value of the environment variable

// Setup OpenWeatherMap API_KEY
const apiKey = `${process.env.API_KEY}`;

// Setup express app
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// Setup display on launch
app.get("/", (req, res) => {
  // It will not fetch and display any data in the index page
  res.render("index", { weather: null, error: null });
});

app.listen(port, () => {
  console.log("YOU ARE LESSENING PORT [:${port}]");
});
