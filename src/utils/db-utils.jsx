// Database utils functions

import { db } from "../firebase-config";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  getCountFromServer,
} from "firebase/firestore";

// -----------------
// save data into db
// -----------------

export async function onStartIntoDB(fetchFunc, urls) {
  // fetch data
  const allData = await fetchFunc(urls);

  // remove useless data and assign read_only property
  const data = allData.map((obj) => {
    if (obj.page) {
      const arr = { shows: [obj.results], id: obj.id, read_only: false };
      return arr;
    } else {
      return { ...obj, read_only: true };
    }
  });
  // save data into db
  await Promise.all(
    data.map(async (obj) => {
      const colRef = collection(db, `${obj.id}`);
      const snapshot = await getCountFromServer(colRef);
      const docNr = snapshot.data().count;
      if (!docNr) {
        // read only data
        // configs and genres
        if (obj.read_only) {
          await setDoc(doc(db, `${obj.id}`, `${obj.id}_doc`), {
            ...obj,
          });
          // update, delete, read data
          // movies, tvs, and trending movies
        } else {
          const asyncResponse = await Promise.all(
            obj.shows[0].map(async (show) => {
              console.log(show);
              await setDoc(doc(db, `${obj.id}`, `show_${show.id}`), {
                ...show,
              });
            })
          );
          return asyncResponse;
        }
      }
    })
  );
}

// ----------------------------------------------
// get data from database and save it into states
// ----------------------------------------------
export async function getDataFromDB(collection_name, set_state) {
  await getDocs(collection(db, collection_name)).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    set_state(newData);
  });
}
