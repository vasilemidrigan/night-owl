// imports
// - react hooks
import { useState, useEffect, useMemo } from "react";
// - sections
import Navbar from "./components/sections/Navbar";
import SearchBar from "./components/sections/Search-bar";
import TrendingBar from "./components/sections/Trending-bar";
// - pages
import HomePage from "./components/pages/Home-page";
// - context
import ContextProviders from "./context-config";
// - utils
import { getConfigs, getGenres, getTrendingData } from "./utils/fetchData";
// - global constants
import { MAP_URL } from "./data/global-constants";

export default function App() {
  const [genres, setGenres] = useState([]);
  const [configs, setConfigs] = useState([]);
  const [trendingData, setTrendingData] = useState([]);

  console.log(genres);

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

  return (
    <ContextProviders configs={configs} trendingData={trendingData}>
      <div className="App">
        <Navbar />
        <SearchBar />
        <TrendingBar />
        <HomePage />
      </div>
    </ContextProviders>
  );
}
