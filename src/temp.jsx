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
        console.log(el);
        await setDoc(doc(db, collectionRef, `${documentRef}_${el.id}`), {
          ...el,
        });
      })
    );
    return asyncResponse;
  }
}
