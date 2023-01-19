// all urls for fetching data from tmdb api

import { MAP_URL } from "./global-constants";

export const apiKey = process.env.REACT_APP_API_KEY;

export const allUrls = [
  {
    url: `${MAP_URL.configuration.base_url}${apiKey}`,
    id: "configs",
  },
  {
    url: `${MAP_URL.genres.base_url}${MAP_URL.genres.media_type.movie}${apiKey}`,
    id: "genres_movie",
  },
  {
    url: `${MAP_URL.genres.base_url}${MAP_URL.genres.media_type.tv}${apiKey}`,
    id: "genres_tv",
  },
  {
    url: `${MAP_URL.trendingMovies.base_url}${MAP_URL.trendingMovies.media_type.movie}${MAP_URL.trendingMovies.time_window.week}${apiKey}`,
    id: "trending_movies",
  },
  {
    url: `${MAP_URL.movies.base_url}${MAP_URL.movies.rating_category.popular}${apiKey}${MAP_URL.movies.lang_and_page}`,
    id: "popular_movies",
  },
  {
    url: `${MAP_URL.movies.base_url}${MAP_URL.movies.rating_category.top_rated}${apiKey}${MAP_URL.movies.lang_and_page}`,
    id: "top_rated_movies",
  },
  {
    url: `${MAP_URL.movies.base_url}${MAP_URL.movies.rating_category.upcoming}${apiKey}${MAP_URL.movies.lang_and_page}`,
    id: "upcoming_movies",
  },
  {
    url: `${MAP_URL.movies.base_url}${MAP_URL.movies.rating_category.now_playing}${apiKey}${MAP_URL.movies.lang_and_page}`,
    id: "now_playing_movies",
  },
  {
    url: `${MAP_URL.tv.base_url}${MAP_URL.tv.rating_category.popular}${apiKey}${MAP_URL.tv.lang_and_page}`,
    id: "popular_tv",
  },
  {
    url: `${MAP_URL.tv.base_url}${MAP_URL.tv.rating_category.top_rated}${apiKey}${MAP_URL.tv.lang_and_page}`,
    id: "top_rated_tv",
  },
  {
    url: `${MAP_URL.tv.base_url}${MAP_URL.tv.rating_category.airing_today}${apiKey}${MAP_URL.tv.lang_and_page}`,
    id: "airing_today_tv",
  },
  {
    url: `${MAP_URL.tv.base_url}${MAP_URL.tv.rating_category.on_the_air}${apiKey}${MAP_URL.tv.lang_and_page}`,
    id: "on_the_air_tv",
  },
];
