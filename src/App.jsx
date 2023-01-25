// App

// imports
// from packages
import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
// firestore
import { db } from "./firebase-config";
import { query, collection, onSnapshot } from "firebase/firestore";
// sections
import Navbar from "./components/sections/Navbar";
import SearchBar from "./components/sections/Search-bar";
// context
import ContextProviders from "./context-config";
// utils
import { onStartIntoDB, getDataFromDB } from "./utils/db-utils";
// global constants
import { allUrls } from "./data/allUrls";
// fetch
import { fetchData } from "./utils/fetchData";

export default function App() {
  // States
  // genres and configs
  const [configs, setConfigs] = useState([]);
  const [genresTv, setGenresTv] = useState([]);
  const [genresMovie, setGenresMovie] = useState([]);
  const [bookmarkShows, setBookmarkShows] = useState([]);

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
  const preventEffect = useRef(true);
  const preventReRun = useRef(false);

  const effectRan = useRef(false);

  // ---------------------------------------
  // Fetch data from API and save it into db
  // ---------------------------------------
  useEffect(() => {
    if (effectRan.current === false) {
      onStartIntoDB(fetchData, allUrls);
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  // --------------------------------------------------
  // Get data from database and save it into our states
  // --------------------------------------------------

  useEffect(() => {
    if (effectRan.current === false) {
      async function getData() {
        const data = Promise.all([
          getDataFromDB("configs", setConfigs),
          getDataFromDB("genres_tv", setGenresTv),
          getDataFromDB("genres_movie", setGenresMovie),
          getDataFromDB("bookmarks", setBookmarkShows),
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

  // --------------------------------------------------------
  // Get Real Time Updates from db and save them into our app
  // --------------------------------------------------------

  useEffect(() => {
    function getRTUpdates() {
      const q = query(collection(db, "popular_movies"));
      onSnapshot(q, (querySnapshot) => {
        const updArr = [];
        querySnapshot.forEach((doc) => {
          updArr.push(doc.data());
        });
        setPopularMovies(updArr);
      });
    }
    getRTUpdates();
  }, []);

  useEffect(() => {
    function getRTUpdates() {
      const q = query(collection(db, "trending_movies"));
      onSnapshot(q, (querySnapshot) => {
        const updArr = [];
        querySnapshot.forEach((doc) => {
          updArr.push(doc.data());
        });
        setTrendingMovies(updArr);
      });
    }
    getRTUpdates();
  }, []);

  return (
    <ContextProviders
      configs={configs}
      genres={{
        genresMovie,
        genresTv,
      }}
      bookmarkShows={{ bookmarkShows, setBookmarkShows }}
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
