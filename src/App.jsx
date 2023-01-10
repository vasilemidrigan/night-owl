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
import { FirebaseError } from "firebase/app";

export default function App() {
  // States
  // genres and configs
  const [genres, setGenres] = useState([]);

  const [loading, setLoading] = useState("true");
  const [configs, setConfigs] = useState([]);

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

  // ---------------------------------------
  // Fetch data from api and push it into db
  // ---------------------------------------

  // configs
  useEffect(() => {
    onStartIntoDB(
      preventEffect,
      "getConfigs",
      MAP_URL.configuration.base_url,
      null,
      null,
      process.env.REACT_APP_API_KEY,
      null,
      "relating-data",
      "configs"
    );
  }, []);

  // genres for movies
  useEffect(() => {
    onStartIntoDB(
      preventEffect,
      "getGenres",
      MAP_URL.genres.base_url,
      MAP_URL.genres.media_type.movie,
      null,
      process.env.REACT_APP_API_KEY,
      null,
      "relating-data",
      "genres-movie"
    );
  }, []);

  // genres for tv
  useEffect(() => {
    onStartIntoDB(
      preventEffect,
      "getGenres",
      MAP_URL.genres.base_url,
      MAP_URL.genres.media_type.tv,
      null,
      process.env.REACT_APP_API_KEY,
      null,
      "relating-data",
      "genres-tv"
    );
  }, []);

  // trending movies
  useEffect(() => {
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
  }, []);

  // movies
  useEffect(() => {
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
  }, []);

  // tv
  useEffect(() => {
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

  // -------------------------------
  // Get data from db and set states
  // -------------------------------

  useEffect(() => {
    async function getDataFromDB() {
      const docRef = doc(db, "relating-data", "configs");
      const docSnap = await getDoc(docRef);
      const dataArr = [];

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        dataArr.push(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      if (dataArr.length > 0) {
        console.log("dataArr has data from db", dataArr);
        setConfigs((prevData) => {
          console.log("Running setConfigs!!!!!!!!!!!!!!!!!");
          prevData = {
            ...prevData,
            ...dataArr,
          };
        });
      }
    }
    getDataFromDB();
  }, []);

  // ===========================
  console.log(configs);
  // ===========================

  // genres
  useEffect(() => {
    async function g() {
      const data = await getGenres(
        MAP_URL.genres.base_url,
        MAP_URL.genres.media_type.movie,
        process.env.REACT_APP_API_KEY
      );
      setGenres(data);
    }
    g();
  }, []);

  // trending movies
  useEffect(() => {
    return async function () {
      const data = await getTrendingData(
        MAP_URL.trendingMovies.base_url,
        MAP_URL.trendingMovies.media_type.all,
        MAP_URL.trendingMovies.time_window.week,
        process.env.REACT_APP_API_KEY
      );
      setTrendingData(data.results);
    };
  }, []);
  // movies
  useEffect(() => {
    return async function () {
      const data = await getMovies(
        MAP_URL.movies.base_url,
        process.env.REACT_APP_API_KEY,
        MAP_URL.movies.lang_and_page
      );
      setMoviesData(data);
    };
  }, []);

  // tv
  useEffect(() => {
    return async function () {
      const data = await getTv(
        MAP_URL.tv.base_url,
        process.env.REACT_APP_API_KEY,
        MAP_URL.tv.lang_and_page
      );
      setTvData(data);
    };
  }, []);

  // ----------------------------------
  // set popular movies
  useEffect(() => {
    setPopularMoviesData(moviesData[0]);
  }, [moviesData[0]]);
  // set top-rated movies
  useEffect(() => {
    setTopRatedMoviesData(moviesData[1]);
  }, [moviesData[1]]);
  // set now-playing movies
  useEffect(() => {
    setNowPlayingMoviesData(moviesData[2]);
  }, [moviesData[2]]);
  // set upcoming movies
  useEffect(() => {
    setUpcomingMoviesData(moviesData[3]);
  }, [moviesData[3]]);
  // ----------------------------------
  // set airing-today tv
  useEffect(() => {
    setAiringTodayTvData(tvData[2]);
  }, [tvData[2]]);
  // set on-the-air tv
  useEffect(() => {
    setOnTheAirTvData(tvData[3]);
  }, [tvData[2]]);
  // set popular tv
  useEffect(() => {
    setPopularTvData(tvData[0]);
  }, [tvData[0]]);
  // set top-rated tv
  useEffect(() => {
    setTopRatedTvData(tvData[1]);
  }, [tvData[1]]);
  // ----------------------------------

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
