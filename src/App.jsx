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
import TrendingBar from "./components/sections/Trending-bar";
// context
import ContextProviders from "./context-config";
// utils
import { onStartIntoDB, getDataFromDB } from "./utils/db-utils";
// global constants
import { allUrls } from "./data/allUrls";
// fetch
import { fetchData } from "./utils/fetchData";
import HomePage from "./components/pages/Home-page";

export default function App() {
  // States
  // genres and configs
  const [genresTv, setGenresTv] = useState([]);
  const [genresMovie, setGenresMovie] = useState([]);
  const [configs, setConfigs] = useState([]);

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
  // Run and prevent re-run if there is already data in db saved
  useEffect(() => {
    if (effectRan.current === false) {
      onStartIntoDB(fetchData, allUrls);
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  // ----------------------
  // Get data from database
  // ----------------------

  useEffect(() => {
    if (effectRan.current === false) {
      async function getData() {
        const data = Promise.all([
          getDataFromDB("configs", setConfigs),
          getDataFromDB("genres_tv", setGenresTv),
          getDataFromDB("genres_movies", setGenresMovie),
          getDataFromDB("trending_movies", setTrendingMovies),
          getDataFromDB("popular_movies", setPopularMovies),
          getDataFromDB("top_rated_movies", setTopRatedMovies),
          getDataFromDB("now_playing_movies", setNowPlayingMovies),
          getDataFromDB("upcoming_movies", setUpcomingMovies),
          getDataFromDB("popular_tv", setPopularTv),
          getDataFromDB("top_rated_tv", setTopRatedTv),
          getDataFromDB("on_the_air_tv", setOnTheAirTv),
          getDataFromDB("airing_today_tv", setOnTheAirTv),
        ]);
        return data;
      }
      getData();
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  // ----------------------------
  // Set default values of states
  // ----------------------------

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
      movies={{
        trendingMovies,
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        nowPlayingMovies,
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
