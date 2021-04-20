'use strict';

// const weatherDataTest = require('./data/weather.json');
// const movieDataTest = require('.data/movie.json');

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

function Forecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

function Movie(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  this.popularity = movie.popularity;
  this.released_on = movie.release_date
}

// weather test link
// https://api.weatherbit.io/v2.0/forecast/daily?key=d11d348306704f6c860157d5a9607221&lat=37.1801529&lon=-89.3502834

app.get('/weather', (request, response) => {
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
    .query({
      cityName: request.query.cityName,
      key: process.env.WEATHERBIT_API_KEY,
      lat: request.query.lat,
      lon: request.query.lon,
    })
    .then(weatherData => {
      response.json(weatherData.body.data.map(day => (
        new Forecast(day))));
    });
});

// movie test link
// https://api.themoviedb.org/3/movie/550?api_key=da385cb10f2b51116039cda212b431c5
// 550 is fightclub

app.get('/movies', (request, response) => {
  console.log(request.query.cityName)
  superagent.get('https://api.themoviedb.org/3/search/movie/')
    .query({
      api_key: process.env.MOVIES_API_KEY,
      query: request.query.cityName
    })
    .then(movieData => {
      console.log(movieData.body); // king console log
      response.json(movieData.body.results.map(movie => (
        new Movie(movie))));
    });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
