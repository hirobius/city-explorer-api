'use strict';

const weatherDataTest = require('./data/weather.json');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { response } = require('express');
const app = express();
app.use(cors());
const superagent = require('superagent');
const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Hiya!');
});

function handleErrors() {
  response.status(500).send('Internal error :/');
}

function Forecast(day, description) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

app.get('/weatherTest', (request, response) => {
  try {
    const allForecasts = weatherDataTest.data.map(day => new Forecast(day));
    response.json(allForecasts);
  } catch (error) {
    handleErrors(errors, response);
  }
});

// test link
// https://api.weatherbit.io/v2.0/forecast/daily?key=d11d348306704f6c860157d5a9607221&lat=37.1801529&lon=-89.3502834

app.get('/weather', (request, response) => {
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
    .query({
      //   cityName: request.query.cityName,
      key: process.env.WEATHERBIT_API_KEY,
      lat: request.query.lat, // '37.1801529',
      lon: request.query.lon // '-89.3502834'
    })
    .then(weatherData => {
      response.json(weatherData.body.data.map(x => (
        {
          date: x.datetime,
          description: x.weather.description
        })));
    });
});

// app.get('/movies', (request, response) => {
//   superagent.get(`https://api.themoviedb.org/3/movie/550?api_key=${MOVIES_API_KEY}`)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
