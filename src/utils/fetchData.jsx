// Fetch data utility functions

// firestore database
import { db } from "../firebase-config";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  getCountFromServer,
} from "firebase/firestore";

import { MAP_URL } from "../data/global-constants";

// -------------------------------------------------
// put our saveIntoDB() function under the condition
// to run only once on start and only if there is no
// the collection already in the database.
// -------------------------------------------------
export async function onStartIntoDB(
  ref,
  base_url,
  rating_category,
  media_type,
  time_window,
  api_key,
  lang_and_page,
  collectionRef,
  documentRef
) {
  const docRef = doc(db, collectionRef, documentRef);
  const docSnap = await getDoc(docRef);

  const colRef = collection(db, collectionRef);
  const snapshot = await getCountFromServer(colRef);
  const docNr = snapshot.data().count;

  if (docNr == 0) {
    if (!docSnap.exists()) {
      if (ref.current === true) {
        saveIntoDB(
          base_url,
          rating_category,
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
}
// -------------------------------------
// Get data from api and save it into db
// -------------------------------------
export async function saveIntoDB(
  base_url,
  rating_category,
  media_type,
  time_window,
  api_key,
  lang_and_page,
  collectionRef,
  documentRef
) {
  let data;
  // awaiting for getting data from api
  data = await getData(
    base_url,
    media_type,
    rating_category,
    time_window,
    api_key,
    lang_and_page
  );
  // set data into db for configs and genres
  if (
    base_url === MAP_URL.configuration.base_url ||
    base_url === MAP_URL.genres.base_url
  ) {
    await setDoc(doc(db, collectionRef, documentRef), {
      ...data,
    });
  }
  // set data into db for movies and tv
  if (
    base_url === MAP_URL.movies.base_url ||
    base_url === MAP_URL.tv.base_url
  ) {
    const asyncResponse = await Promise.all(
      data.map(async (el) => {
        await setDoc(doc(db, collectionRef, `${documentRef}_${el.id}`), {
          ...el,
        });
      })
    );
    return asyncResponse;
  }
}

// ----------------------------------------------
// get data from database and save it into states
// ----------------------------------------------
export async function getDataFromDB(setState, collection_name) {
  await getDocs(collection(db, collection_name)).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setState(newData);
  });
}

// -----------------
// get data requests
// -----------------
export async function getData(
  base_url,
  media_type,
  rating_category,
  time_window,
  api_key,
  lang_and_page
) {
  let url;
  let data;
  // in dependence of the base_url - provide a specific url for
  // fetching data
  switch (base_url) {
    case MAP_URL.configuration.base_url:
      url = `${base_url}${api_key}`;
      break;
    case MAP_URL.genres.base_url:
      url = `${base_url}${media_type}${api_key}`;
      break;
    case MAP_URL.trendingMovies.base_url:
      url = `${base_url}${media_type}${time_window}${api_key}`;
      break;
    case MAP_URL.movies.base_url:
    case MAP_URL.tv.base_url:
      url = `${base_url}${rating_category}${api_key}${lang_and_page}`;
      break;
  }
  // fetch data with the url received above
  data = await fetchData(url);
  // return the data for saveIntoDB() function
  return base_url === MAP_URL.movies.base_url ||
    base_url === MAP_URL.tv.base_url ||
    base_url === MAP_URL.trendingMovies.base_url
    ? data.results
    : data;
}

// -------------------
// fetch data from api
// -------------------
export async function fetchData(url) {
  const data = await fetch(url)
    .then((response) => response.json())
    .then((dt) => dt)
    .catch((err) => console.error(err));
  return data;
}
