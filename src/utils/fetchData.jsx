// Fetch data utils

// fetch data from api
const fetchData = async function (url) {
  const data = await fetch(url)
    .then((response) => response.json())
    .then((dt) => dt);
  return data;
};

// get data
const getData = async function (url) {
  const data = await fetchData(url);
  return data;
};
