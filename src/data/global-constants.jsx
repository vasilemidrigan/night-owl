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
  movies: {
    // url: ' base_url rating_category api_key language_and_page'
    base_url: "https://api.themoviedb.org/3/movie",
    rating_category: {
      popular: "/popular?api_key=",
      top_rated: "/top_rated?api_key=",
      now_playing: "/now_playing?api_key=",
      upcoming: "/upcoming?api_key=",
    },
    lang_and_page: "&language=en-US&page=1",
  },
  tv: {
    // url: ' base_url rating_category api_key language_and_page'
    base_url: "https://api.themoviedb.org/3/tv",
    rating_category: {
      popular: "/popular?api_key=",
      top_rated: "/top_rated?api_key=",
      airing_today: "/airing_today?api_key=",
      on_the_air: "/on_the_air?api_key=",
    },
    lang_and_page: "&language=en-US&page=1",
  },
};
