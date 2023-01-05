// Global Constants

// tmdb urls
export const MAP_URL = {
  configuration: {
    base_url: "https://api.themoviedb.org/3/configuration?api_key=",
  },
  genres: {
    base_url: "https://api.themoviedb.org/3/genre",
    media_type: {
      movie: "/movie",
      tv: "/tv",
    },
  },
  trendingMovies: {
    base_url: "https://api.themoviedb.org/3/trending/",
    media_type: {
      all: "all",
      movie: "movie",
      tv: "tv",
      person: "person",
    },
    time_window: {
      day: "day",
      week: "week",
    },
  },
};
