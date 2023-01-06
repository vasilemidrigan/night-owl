// imports
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/sections/Navbar";
import SearchBar from "./components/sections/Search-bar";
import TrendingBar from "./components/sections/Trending-bar";

import ContextProviders from "./context-config";

import {
  getConfigs,
  getGenres,
  getTrendingData,
  getMovies,
  getTv,
} from "./utils/fetchData";

import { MAP_URL } from "./data/global-constants";

export default function App() {
  // States
  // genres and configs
  const [genres, setGenres] = useState([]);
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

  // ----------------------------------

  // Fetching data from api
  // configs
  useEffect(() => {
    return async function () {
      const data = await getConfigs(
        MAP_URL.configuration.base_url,
        process.env.REACT_APP_API_KEY
      );
      setConfigs(data);
    };
  }, []);
  // genres
  useEffect(() => {
    return async function () {
      const data = await getGenres(
        MAP_URL.genres.base_url,
        MAP_URL.genres.media_type.movie,
        process.env.REACT_APP_API_KEY
      );
      setGenres(data);
    };
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

  console.log(tvData);

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
