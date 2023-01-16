// Global Constants

// tmdb urls
export const MAP_URL = {
  configuration: {
    content: "configuration",
    base_url: "https://api.themoviedb.org/3/configuration?api_key=",
    firestore: {
      collection: "configuration",
      document: "configs",
    },
  },
  genres: {
    content: "genres",
    base_url: "https://api.themoviedb.org/3/genre",
    firestore: {
      collection: {
        genres_movie: "genres_movie",
        genres_tv: "genres_tv",
      },
      document: {
        genres_movie: "genres_movie",
        genres_tv: "genres_tv",
      },
    },
    media_type: {
      movie: "/movie/list?api_key=",
      tv: "/tv/list?api_key=",
    },
  },
  trendingMovies: {
    content: "trending_movies",
    base_url: "https://api.themoviedb.org/3/trending",
    media_type: {
      all: "/all",
      movie: "/movie",
      tv: "/tv",
      person: "/person",
    },
    time_window: {
      day: "/day?api_key=",
      week: "/week?api_key=",
    },
    firestore: {
      collection: "trending_movies",
      document: "movie",
    },
  },
  movies: {
    content: "movies",
    base_url: "https://api.themoviedb.org/3/movie",
    rating_category: {
      popular: "/popular?api_key=",
      top_rated: "/top_rated?api_key=",
      now_playing: "/now_playing?api_key=",
      upcoming: "/upcoming?api_key=",
    },
    firestore: {
      collections: {
        popular: "popular_movies",
        top_rated: "top_rated_movies",
        now_playing: "now_playing_movies",
        upcoming: "upcoming_movies",
      },
      document: "movie",
    },
    lang_and_page: "&language=en-US&page=1",
  },
  tv: {
    content: "tv",
    base_url: "https://api.themoviedb.org/3/tv",
    rating_category: {
      popular: "/popular?api_key=",
      top_rated: "/top_rated?api_key=",
      airing_today: "/airing_today?api_key=",
      on_the_air: "/on_the_air?api_key=",
    },
    firestore: {
      collections: {
        popular: "popular_tv",
        top_rated: "top_rated_tv",
        on_the_air: "on_the_air_tv",
        airing_today: "airing_today_tv",
      },
      document: "tv",
    },
    lang_and_page: "&language=en-US&page=1",
  },
};
