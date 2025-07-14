import axios from 'axios';

export const API_KEY = "ba6b9f57897cfd73db9757a48968f882";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export const fetchPopularMovies = async () => {
  const response = await axios.get(
    `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
  );
  return response.data;
};

export const fetchMoviesByGenre = async (genreId) => {
  const response = await axios.get(
    `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.data.results;
};

export const fetchGenres = async () => {
  const response = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  return response.data.genres;
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    `${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  return response.data.results;
};