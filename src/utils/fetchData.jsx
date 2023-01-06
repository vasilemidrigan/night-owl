// Fetch data utils

import { MAP_URL } from "../data/global-constants";

// fetch data from api
export async function fetchData(url) {
  const data = await fetch(url)
    .then((response) => response.json())
    .then((dt) => dt)
    .catch((err) => console.error(err));
  return data;
}

// get configs
export async function getConfigs(base_url, api_key) {
  const url = `${base_url}${api_key}`;
  const data = await fetchData(url);
  return data;
}

// get genres
export async function getGenres(base_url, media_type, api_key) {
  const url = `${base_url}${media_type}/list?api_key=${api_key}`;
  const data = await fetchData(url);
  return data;
}

// get trending data
export async function getTrendingData(
  base_url,
  media_type,
  time_window,
  api_key
) {
  const url = `${base_url}/${media_type}/${time_window}?api_key=${api_key}`;
  const data = await fetchData(url);
  return data;
}

// get movies data (popular, top-rated, upcoming and now-playing categories)
export async function getMovies(base_url, api_key, lang_and_page) {
  const dataArr = [];
  for (let [key, value] of Object.entries(MAP_URL.movies.rating_category)) {
    const url = `${base_url}${value}${api_key}${lang_and_page}`;
    const data = await fetchData(url);
    dataArr.push({ data: data.results, category: key });
  }
  return dataArr;
}

// get tv data (airing-today, on-the-air, popular, top-rated)
export async function getTv(base_url, api_key, lang_and_page) {
  const dataArr = [];
  for (let [key, value] of Object.entries(MAP_URL.tv.rating_category)) {
    const url = `${base_url}${value}${api_key}${lang_and_page}`;
    const data = await fetchData(url);
    dataArr.push({ data: data.results, category: key });
  }
  return dataArr;
}
