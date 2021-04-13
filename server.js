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

app.get('/weather', (request, response) => {
  try {
    const allForecasts = weatherData.data.map(day => new Forecast(day));
    response.json(allForecasts);
  } catch (error) {
    handleErrors(errors, response);
  }
});

// new Forecast(`Low of ${weatherData.data[0].low_temp}, high of ${weatherData.data[0].max_temp} with ${weatherData.data[0].weather.description}`, weatherData.data[0].datetime);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
