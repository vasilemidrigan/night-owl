// App

// imports
// from packages
import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
// firestore
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "./firebase-config";
// sections
import Navbar from "./components/sections/Navbar";
import SearchBar from "./components/sections/Search-bar";
import TrendingBar from "./components/sections/Trending-bar";
// context
import ContextProviders from "./context-config";
// utils
import { onStartIntoDB, getDataFromDB } from "./utils/fetchData";
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
  const [popularMoviesData, setPopularMoviesData] = useState([]);
  const [topRatedMoviesData, setTopRatedMoviesData] = useState([]);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState([]);
  // tv data
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
      MAP_URL.configuration.base_url,
      null,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      null,
      MAP_URL.configuration.firestore.collection,
      MAP_URL.configuration.firestore.document
    );
    // genres for movies
    onStartIntoDB(
      preventEffect,
      MAP_URL.genres.base_url,
      null,
      MAP_URL.genres.media_type.movie,
      null,
      process.env.REACT_APP_API_KEY,
      null,
      MAP_URL.genres.firestore.collection.genres_movie,
      MAP_URL.genres.firestore.document.genres_movie
    );
    // genres for tv
    onStartIntoDB(
      preventEffect,
      MAP_URL.genres.base_url,
      null,
      MAP_URL.genres.media_type.tv,
      null,
      process.env.REACT_APP_API_KEY,
      null,
      MAP_URL.genres.firestore.collection.genres_tv,
      MAP_URL.genres.firestore.document.genres_tv
    );
    // trending movies
    onStartIntoDB(
      preventEffect,
      MAP_URL.trendingMovies.base_url,
      null,
      MAP_URL.trendingMovies.media_type.all,
      MAP_URL.trendingMovies.time_window.week,
      process.env.REACT_APP_API_KEY,
      null,
      MAP_URL.trendingMovies.firestore.collection,
      MAP_URL.trendingMovies.firestore.document
    );
    // popular movies
    onStartIntoDB(
      preventEffect,
      MAP_URL.movies.base_url,
      MAP_URL.movies.rating_category.popular,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      MAP_URL.movies.lang_and_page,
      MAP_URL.movies.firestore.collections.popular,
      MAP_URL.movies.firestore.document
    );
    // top rated movies
    onStartIntoDB(
      preventEffect,
      MAP_URL.movies.base_url,
      MAP_URL.movies.rating_category.top_rated,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      MAP_URL.movies.lang_and_page,
      MAP_URL.movies.firestore.collections.top_rated,
      MAP_URL.movies.firestore.document
    );
    // upcoming movies
    onStartIntoDB(
      preventEffect,
      MAP_URL.movies.base_url,
      MAP_URL.movies.rating_category.upcoming,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      MAP_URL.movies.lang_and_page,
      MAP_URL.movies.firestore.collections.upcoming,
      MAP_URL.movies.firestore.document
    );
    // now playing movies
    onStartIntoDB(
      preventEffect,
      MAP_URL.movies.base_url,
      MAP_URL.movies.rating_category.now_playing,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      MAP_URL.movies.lang_and_page,
      MAP_URL.movies.firestore.collections.now_playing,
      MAP_URL.movies.firestore.document
    );
    // popular tv
    onStartIntoDB(
      preventEffect,
      MAP_URL.tv.base_url,
      MAP_URL.tv.rating_category.popular,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      MAP_URL.tv.lang_and_page,
      MAP_URL.tv.firestore.collections.popular,
      MAP_URL.tv.firestore.document
    );
    // airing today tv
    onStartIntoDB(
      preventEffect,
      MAP_URL.tv.base_url,
      MAP_URL.tv.rating_category.airing_today,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      MAP_URL.tv.lang_and_page,
      MAP_URL.tv.firestore.collections.airing_today,
      MAP_URL.tv.firestore.document
    );
    // top rated tv
    onStartIntoDB(
      preventEffect,
      MAP_URL.tv.base_url,
      MAP_URL.tv.rating_category.top_rated,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      MAP_URL.tv.lang_and_page,
      MAP_URL.tv.firestore.collections.top_rated,
      MAP_URL.tv.firestore.document
    );
    // on the air tv
    onStartIntoDB(
      preventEffect,
      MAP_URL.tv.base_url,
      MAP_URL.tv.rating_category.on_the_air,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      MAP_URL.tv.lang_and_page,
      MAP_URL.tv.firestore.collections.on_the_air,
      MAP_URL.tv.firestore.document
    );
  }, []);

  // ----------------------
  // Get data from database
  // ----------------------

  useEffect(() => {
    getDataFromDB(setConfigs, "configuration");
    getDataFromDB(setMedia, "media");
    getDataFromDB(setTrendingData, "trending_movies");
    getDataFromDB(setGenres, "genres");
  }, []);

  // ----------------------------
  // Set default values of states
  // ----------------------------

  useEffect(() => {
    function getRTUpdates() {
      const q = query(collection(db, "trending_movies"));
      const updates = onSnapshot(q, (querySnapshot) => {
        const updArr = [];
        querySnapshot.forEach((doc) => {
          updArr.push(doc.data());
        });
        setTrendingData(updArr);
      });
    }
    getRTUpdates();
  }, []);

  return (
    <ContextProviders
      configs={configs}
      trendingData={{ trendingData, setTrendingData }}
    >
      <div className="App">
        <Navbar />
        <SearchBar />
        <TrendingBar />
        <Outlet />
      </div>
    </ContextProviders>
  );
}
