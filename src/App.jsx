// App

// imports
// from packages
import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
// firestore
import {
  onSnapshot,
  doc,
  collection,
  query,
  refEqual,
} from "firebase/firestore";
import { db } from "./firebase-config";
// sections
import Navbar from "./components/sections/Navbar";
import SearchBar from "./components/sections/Search-bar";
import TrendingBar from "./components/sections/Trending-bar";
// context
import ContextProviders from "./context-config";
// utils
import {
  onStartIntoDB,
  getDataFromDB,
  onStartIntoDBTemp,
} from "./utils/fetchData";
// global constants
import { allUrls } from "./data/allUrls";
import { fetchData } from "./utils/fetchData";

export default function App() {
  // States
  // genres and configs
  const [genres, setGenres] = useState([]);
  const [configs, setConfigs] = useState([]);

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
  const preventReRun = useRef(false);

  // ---------------------------------------------
  // Fetch data from api and push it into database
  // -------------------------------------------------------------
  // configs, genres_movie, genres_tv, trending_movies, movies, tv
  // -------------------------------------------------------------

  // Run and prevent re-run if there is already data in db saved
  useEffect(() => {
    if (preventReRun.current === false) {
      onStartIntoDB(preventReRun);
    }
  }, []);
  // prevent re-run
  preventReRun.current = true;

  // ----------------------
  // Get data from database
  // ----------------------

  useEffect(() => {
    // getDataFromDB(setGenres, "genres");
  }, []);

  // ----------------------------
  // Set default values of states
  // ----------------------------

  // useEffect(() => {
  //   function getRTUpdates() {
  //     const q = query(collection(db, "trending_movies"));
  //     const updates = onSnapshot(q, (querySnapshot) => {
  //       const updArr = [];
  //       querySnapshot.forEach((doc) => {
  //         updArr.push(doc.data());
  //       });
  //       setTrendingData(updArr);
  //     });
  //   }
  //   getRTUpdates();
  // }, []);

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
