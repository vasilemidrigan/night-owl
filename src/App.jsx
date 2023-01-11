// App

// imports
import { db } from "./firebase-config";
import {
  query,
  doc,
  collection,
  onSnapshot,
  getDocs,
  getDoc,
  Firestore,
} from "firebase/firestore";
// from packages
import { useState, useEffect, useRef, useCallback } from "react";
import { Outlet } from "react-router-dom";
// sections
import Navbar from "./components/sections/Navbar";
import SearchBar from "./components/sections/Search-bar";
import TrendingBar from "./components/sections/Trending-bar";
// context
import ContextProviders from "./context-config";
// utils
import {
  getGenres,
  getTrendingData,
  getMovies,
  getTv,
  onStartIntoDB,
  getDataFromDB,
} from "./utils/fetchData";
// global constants
import { MAP_URL } from "./data/global-constants";

export default function App() {
  // States
  // genres and configs
  const [genres, setGenres] = useState([]);
  const [configs, setConfigs] = useState([]);

  // all media
  const [media, setMedia] = useState([]);
  // movies data
  const [trendingData, setTrendingData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [popularMoviesData, setPopularMoviesData] = useState([]);
  const [topRatedMoviesData, setTopRatedMoviesData] = useState([]);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState([]);
  // tv data
  const [tvData, setTvData] = useState([]);
  const [airingTodayTvData, setAiringTodayTvData] = useState([]);
  const [onTheAirTvData, setOnTheAirTvData] = useState([]);
  const [popularTvData, setPopularTvData] = useState([]);
  const [topRatedTvData, setTopRatedTvData] = useState([]);

  // Refs
  const preventEffect = useRef(true);

  // ---------------------------------------------
  // Fetch data from api and push it into database
  // -------------------------------------------------------------
  // configs, genres_movie, genres_tv, trending_movies, movies, tv
  // -------------------------------------------------------------

  useEffect(() => {
    // configs
    onStartIntoDB(
      preventEffect,
      "getConfigs",
      MAP_URL.configuration.base_url,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      null,
      "configuration",
      "configs"
    );
    // genres for movies
    onStartIntoDB(
      preventEffect,
      "getGenres",
      MAP_URL.genres.base_url,
      MAP_URL.genres.media_type.movie,
      null,
      process.env.REACT_APP_API_KEY,
      null,
      "genres",
      "genres-movie"
    );
    // genres for tv
    onStartIntoDB(
      preventEffect,
      "getGenres",
      MAP_URL.genres.base_url,
      MAP_URL.genres.media_type.tv,
      null,
      process.env.REACT_APP_API_KEY,
      null,
      "genres",
      "genres-tv"
    );

    // trending movies
    onStartIntoDB(
      preventEffect,
      "getTrendingData",
      MAP_URL.trendingMovies.base_url,
      MAP_URL.trendingMovies.media_type.all,
      MAP_URL.trendingMovies.time_window.week,
      process.env.REACT_APP_API_KEY,
      null,
      "media",
      "trending-movies"
    );

    // movies
    onStartIntoDB(
      preventEffect,
      "getMovies",
      MAP_URL.movies.base_url,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      MAP_URL.movies.lang_and_page,
      "media",
      "movies"
    );

    // tv
    onStartIntoDB(
      preventEffect,
      "getTv",
      MAP_URL.tv.base_url,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      MAP_URL.tv.lang_and_page,
      "media",
      "tv"
    );
  }, []);

  // ----------------------
  // Get data from database
  // ----------------------

  useEffect(() => {
    getDataFromDB(setConfigs, "configuration");
    getDataFromDB(setMedia, "media");
    getDataFromDB(setGenres, "genres");
  }, []);

  return (
    <ContextProviders configs={configs} trendingData={trendingData}>
      <div className="App">
        <Navbar />
        <SearchBar />
        <TrendingBar />
        <Outlet />
      </div>
    </ContextProviders>
  );
}
