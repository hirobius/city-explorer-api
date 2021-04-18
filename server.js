'use strict';

// import the json data file
const weatherData = require('./data/weather.json');
// actually use the .env file created
require('dotenv').config();
// include express for the express server (require is pretty much the backend import)
const express = require('express');
const cors = require('cors');
const { response } = require('express');
// instantiate the express server
const app = express();
// make sure your data is accessible from the React frontend
app.use(cors());
const superagent = require('superagent');
// process.env is how you pull the PORT variable from the .env file
const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Hiya!');
});

function Forecast(day, description) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

function handleErrors() {
  response.status(500).send('Internal error :/');
}

// app.get('/weather', (request, response) => {
//   try {
//     const allForecasts = weatherData.data.map(day => new Forecast(day));
//     response.json(allForecasts);
//   } catch (error) {
//     handleErrors(errors, response);
//   }
// });

app.get('/weather', (request, response) => {
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
  .query({
    key: process.env.WEATHER_API_KEY,
    units: 'I',
    lat: request.query.lat,
    lon: request.query.lon
  })
  .then(weatherData => {
    console.log(weatherData.body.city_name);
    response.send(weatherData.body.data.map(x => (
      {date: x.valid_date,
      description: x.weather.description})))
  });
  // try {
  //   const allForecasts = weatherData.data.map(day => new Forecast(day));
  //   response.json(allForecasts);
  // } catch (error) {
  //   handleErrors(errors, response);
  // }
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
