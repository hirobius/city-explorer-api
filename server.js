const express = require('express');
// actually use the .env file created
require('dotenv').config();
// import the json data file
const weatherData = require('./data/weather.json');
const cors = require('cors');

const app = express();

let forecastData = [];

function Forecast(date, description) {
  this.date = date;
  this.description = description;
  forecastData.push(this);
}

new Forecast(weatherData.data[0].datetime, weatherData.data[0].weather.description,);

// make sure your data is accessible from the React frontend
app.use(cors());

const PORT = process.env.PORT || 3002;
// response has some methods that are very helpful. i.e. send
app.get('/', (request, response) => {
  response.send('Hiya!');
});

app.get('/weather', (request, response) => {
  response.json(forecastData);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

