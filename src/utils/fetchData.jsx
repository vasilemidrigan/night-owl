// Fetch data utils

// fetch data from api
export const fetchData = function (url) {
  const data = fetch(url)
    .then((response) => response.json())
    .then((dt) => dt)
    .catch((err) => console.error(err));

  return data;
};

// get configs
export const getConfigs = function (base_url, api_key) {
  const url = `${base_url}${api_key}`;
  const data = fetchData(url);
  return data;
};

// get genres
export const getGenres = function (base_url, media_type, api_key) {
  const url = `${base_url}${media_type}/list?api_key=${api_key}`;
  const data = fetchData(url);
  return data;
};

// get trending data
export const getTrendingData = function (
  base_url,
  media_type,
  time_window,
  api_key
) {
  const url = `${base_url}/${media_type}/${time_window}?api_key=${api_key}`;
  const data = fetchData(url);
  return data;
};
