const superagent = require('superagent');

function getMovies(request, response) {
  console.log(request);
  const moviesQuery = request.query.movieSearch;
  const url = 'https://api.themoviedb.org/3/search/movie/';
  const query = {
    api_key: process.env.MOVIES_API_KEY,
    query: request.query.cityName
  }
  superagent
    .get(url)
    .query(query)
    .then(movieData => {
      console.log(movieData.body); // king console log
      response.json(movieData.body.results.map(movie => (
        new Movie(movie))));
    });
};

function Movie(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  this.popularity = movie.popularity;
  this.released_on = movie.release_date
}

module.exports = getMovies;
