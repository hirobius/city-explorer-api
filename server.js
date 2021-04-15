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

app.get('/weather', (request, response) => {
  try {
    const allForecasts = weatherData.data.map(day => new Forecast(day));
    response.json(allForecasts);
  } catch (error) {
    handleErrors(errors, response);
  }
});

// // get images fom upsplash api
// app.get('./images', getImages);

// // upsplash callback function 
// function getImages(request, response) {
//   // console.log(request.query.imageSearch);
//   const imageQuery = 'bees'; // replace bees with request.query.imageSearch
//   const url = 'https://api.unsplash.com/search/photos';
//   const query = {
//     client_id: process.env.UNSPLASH_API_KEY,
//     query: imageQuery,
//   }
//   superAgent
//     .get(url)
//     .query(query)
//     .then(imageResults => {
//       response.status(200).send(imageResults.body.results.map(img => new ImageObject(img)));
//     })
// }

// things I need from
// description
// urls.regular
// user.name

// function ImageObject(img){
//   this.alt = img.alt.description;
//   this.url = img.urls.regular;
//   this.photographer = img.user.name;
// }

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
