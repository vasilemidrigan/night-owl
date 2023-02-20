// ---
// App
// ---

// react
import { useState, useEffect, useRef, useContext } from "react";
import { Outlet } from "react-router-dom";
// components
import Navbar from "./components/sections/Navbar";
import SearchBar from "./components/sections/Search-bar";
// context
import ContextProviders from "./context/Context-Config";
import { AuthDataContext } from "./context/Auth-Context";
// utils
import { fetchData } from "./utils/fetchData";
import { onStartIntoDB, getDataFromDB } from "./utils/db-utils";
import { getRTUpdates } from "./utils/functionalities";

import { allUrls } from "./data/allUrls";

export default function App() {
  // States
  // genres and configs
  const [configs, setConfigs] = useState([]);
  const [genresTv, setGenresTv] = useState([]);
  const [genresMovie, setGenresMovie] = useState([]);
  const [bookmarkShows, setBookmarkShows] = useState([]);
  const [bookmarksTrace, setBookmarksTrace] = useState([]);
  // movies data
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  // tv data
  const [airingTodayTv, setAiringTodayTv] = useState([]);
  const [onTheAirTv, setOnTheAirTv] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);

  // Refs
  const effectRan = useRef(false);

  // user
  const { user } = useContext(AuthDataContext);

  // Fetch data from API and save it into db
  useEffect(() => {
    if (effectRan.current === false) {
      onStartIntoDB(fetchData, allUrls);
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  // Get data from database and save it into our states
  useEffect(() => {
    if (effectRan.current === false) {
      async function getData() {
        const data = Promise.all([
          getDataFromDB("configs", setConfigs),
          getDataFromDB("genres_tv", setGenresTv),
          getDataFromDB("genres_movie", setGenresMovie),
          getDataFromDB("trending_movies", setTrendingMovies),
          getDataFromDB("popular_movies", setPopularMovies),
          getDataFromDB("top_rated_movies", setTopRatedMovies),
          getDataFromDB("now_playing_movies", setNowPlayingMovies),
          getDataFromDB("upcoming_movies", setUpcomingMovies),
          getDataFromDB("popular_tv", setPopularTv),
          getDataFromDB("top_rated_tv", setTopRatedTv),
          getDataFromDB("on_the_air_tv", setOnTheAirTv),
          getDataFromDB("airing_today_tv", setAiringTodayTv),
        ]);
        return data;
      }
      getData();
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  // Get Real Time Updates from db and save them into our app
  useEffect(() => {
    getRTUpdates(
      setBookmarkShows,
      `${user?.email}_data/bookmarked_movies/bookmarks`
    );
    getRTUpdates(
      setBookmarksTrace,
      `${user?.email}_data/bookmarked_movies/bookmarks_trace`
    );
    getRTUpdates(setTrendingMovies, "trending_movies");
    getRTUpdates(setPopularMovies, "popular_movies");
    getRTUpdates(setTopRatedMovies, "top_rated_movies");
    getRTUpdates(setUpcomingMovies, "upcoming_movies");
    getRTUpdates(setNowPlayingMovies, "upcoming_movies");
    getRTUpdates(setPopularTv, "popular_tv");
    getRTUpdates(setTopRatedTv, "top_rated_tv");
    getRTUpdates(setAiringTodayTv, "airing_today_tv");
    getRTUpdates(setOnTheAirTv, "on_the_air_tv");
  }, [user]);

  return (
    <ContextProviders
      configs={configs}
      genres={{
        genresMovie,
        genresTv,
      }}
      bookmarkShows={{
        bookmarkShows,
        setBookmarkShows,
        bookmarksTrace,
        setBookmarksTrace,
      }}
      movies={{
        trendingMovies,
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        nowPlayingMovies,
      }}
      tv={{
        popularTv,
        topRatedTv,
        airingTodayTv,
        onTheAirTv,
      }}
    >
      <div className="App">
        <Navbar />
        <SearchBar />
        <Outlet />
      </div>
    </ContextProviders>
  );
}
