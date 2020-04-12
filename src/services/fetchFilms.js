import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'api_key=cd63754c163362d286a1beca715e81c7';

// https://api.themoviedb.org/3/movie/181812?api_key=cd63754c163362d286a1beca715e81c7&language=en-US
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
// https://api.themoviedb.org/3/movie/76341/reviews?api_key=cd63754c163362d286a1beca715e81c7&language=en-US&page=1

// https://api.themoviedb.org/3/search/movie?api_key=cd63754c163362d286a1beca715e81c7&language=en-US&query=iron&page=1&include_adult=false

export const getPopularFilms = () =>
  axios
    .get(`${BASE_URL}trending/movie/week?${API_KEY}`)
    .then(responce => responce.data.results);

export const getFilmByQuery = query =>
  axios
    .get(
      `${BASE_URL}search/movie?${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
    )
    .then(responce => responce.data.results);

export const getFilmById = id =>
  axios
    .get(`${BASE_URL}movie/${id}?${API_KEY}`)
    .then(responce => responce.data);

export const getCastOfFilmById = id =>
  axios
    .get(`${BASE_URL}movie/${id}/credits?${API_KEY}`)
    .then(responce => responce.data);

export const getReviewsOfFilmById = id =>
  axios
    .get(`${BASE_URL}movie/${id}/reviews?${API_KEY}&language=en-US&page=1`)
    .then(responce => responce.data);
