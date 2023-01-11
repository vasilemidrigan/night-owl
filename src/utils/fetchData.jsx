// Fetch data utility functions

// firestore database
import { db } from "../firebase-config";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  getDb,
  QuerySnapshot,
} from "firebase/firestore";

import { MAP_URL } from "../data/global-constants";

// fetch data from api
export async function fetchData(url) {
  const data = await fetch(url)
    .then((response) => response.json())
    .then((dt) => dt)
    .catch((err) => console.error(err));
  return data;
}

// get data from api and save it into db
export async function saveIntoDB(
  getDataFunc,
  base_url,
  media_type,
  time_window,
  api_key,
  lang_and_page,
  collectionRef,
  documentRef
) {
  let data;
  // fetch data
  if (getDataFunc == "getConfigs") {
    data = await getConfigs(base_url, api_key);
  } else if (getDataFunc == "getGenres") {
    data = await getGenres(base_url, media_type, api_key);
  } else if (getDataFunc == "getTrendingData") {
    data = await getTrendingData(base_url, media_type, time_window, api_key);
  } else if (getDataFunc == "getMovies") {
    data = await getMovies(base_url, api_key, lang_and_page);
  } else if (getDataFunc == "getTv") {
    data = await getTv(base_url, api_key, lang_and_page);
  }
  // push it into db
  await setDoc(doc(db, collectionRef, documentRef), {
    ...data,
  });
}

// put our saveIntoDB() function under the condition
// to run only once on start.
export async function onStartIntoDB(
  ref,
  getDataFunc,
  base_url,
  media_type,
  time_window,
  api_key,
  lang_and_page,
  collectionRef,
  documentRef
) {
  const docRef = doc(db, collectionRef, documentRef);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    if (ref.current === true) {
      saveIntoDB(
        getDataFunc,
        base_url,
        media_type,
        time_window,
        api_key,
        lang_and_page,
        collectionRef,
        documentRef
      );
      return () => {
        ref.current = false;
      };
    }
  }
}

// get data from database and save it into states

export async function getDataFromDB(setState, collection_name) {
  await getDocs(collection(db, collection_name)).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setState(newData);
  });
}

// get data requests

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
    dataArr.push({ data: data.results, category: `${key}_movies` });
  }
  return dataArr;
}

// get tv data (airing-today, on-the-air, popular, top-rated)
export async function getTv(base_url, api_key, lang_and_page) {
  const dataArr = [];
  for (let [key, value] of Object.entries(MAP_URL.tv.rating_category)) {
    const url = `${base_url}${value}${api_key}${lang_and_page}`;
    const data = await fetchData(url);
    dataArr.push({ data: data.results, category: `${key}_tv` });
  }
  return dataArr;
}
