// Global Constants

// api key
export const API_KEY = process.env.REACT_APP_API_KEY;

// tmdb urls
export const MAP_URL = {
  trendingMovies: {
    url: "https://api.themoviedb.org/3/trending/all/day?api_key=",
    media_type: ["all", "movie", "tv", "person"],
    time_window: ["day", "week"],
  },
};
