const express = require('express');
// actually use the .env file created
require('dotenv').config();
// import the json data file
const weatherData = require('./data/weather.json');
const cors = require('cors');

const app = express();

let forecastData = [];

function Forecast(description, date) {
  this.description = description;
  this.date = date;
  forecastData.push(this);
}
// "description": "Low of 17.1, high of 23.6 with broken clouds",
// "date": "2021-03-31"
//       "low_temp": 18.1,
//       "max_temp": 19.9,
new Forecast(`Low of ${weatherData.data[0].low_temp}, high of ${weatherData.data[0].max_temp} with ${weatherData.data[0].weather.description}`, weatherData.data[0].datetime);

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

