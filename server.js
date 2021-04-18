'use strict';

// const weatherData = require('./data/weather.json');

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

// function Forecast(day, description) {
//   this.date = day.datetime;
//   this.description = day.weather.description;
// }

// app.get('/weather', (request, response) => {
//   try {
//     const allForecasts = weatherData.data.map(day => new Forecast(day));
//     response.json(allForecasts);
//   } catch (error) {
//     handleErrors(errors, response);
//   }
// });

app.get('/weather', (request, response) => {
  superagent.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${request.query.lat}&lon=${request.query.lon}`)
    .query({
      cityName: request.query.cityName,
      key: process.env.WEATHER_API_KEY,
      lat: request.query.lat,
      lon: request.query.lon
    })
    .then(weatherData => {
      // console.log(weatherData.body.city_name);
      response.json(weatherData.body.data.map(x => (
        {
          date: x.valid_date,
          description: x.weather.description
        })))
    });
});

// app.get('/movies', (request, response) => {
//   superagent.get(`https://api.themoviedb.org/3/movie/550?api_key=${MOVIES_API_KEY}`)
  
// })

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
