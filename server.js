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

// Setup post request display
app.post("/", (req, res) => {
  // Gest city name
  const city = req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  // Request data
  request(url, (err, response, body) => {
    // On return, check the json data fetched
    if (err) {
      res.render("index", { weather: null, error: "Error, please try again" });
    } else {
      const weather = JSON.parse(body);
      console.log(weather);
      // Check if weather data is undefined
      if (weather.main === undefined) {
        res.render("index", {
          weather: null,
          error: "Error, please try again",
        });
      } else {
        // Setup output
        const place = `${weather.name}, ${weather.sys.country}`;
        // Calculate timezone
        const weatherTimezone = new Date(
          weather.dt * 1000 - weather.timezone * 1000
        );
        const weatherCelsius = `${weather.main.temp}`;
        const weatherPressure = `${weather.main.pressure}`;
        // fetch weather icon using icon data
        const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        const weatherDescription = `${weather.weather[0].description}`;
        const humidity = `${weather.main.humidity}`;
        const clouds = `${weather.clouds.all}`;
        const visibility = `${weather.visibility}`;
        const main = `${weather.weather[0].main}`;

        // Render the data on the page(index.ejs)
        res.render("index", {
          weather: weather,
          place: place,
          pressure: weatherPressure,
          icon: weatherIcon,
          description: weatherDescription,
          timezone: weatherTimezone,
          humidity: humidity,
          celsius: weatherCelsius,
          clouds: clouds,
          visibility: visibility,
          main: main,
          error: null,
        });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`YOU ARE LESSENING PORT [:${port}]`);
});
