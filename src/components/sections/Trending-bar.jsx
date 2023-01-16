// Trending Bar

// imports
import { onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

import { useState, useEffect } from "react";
// - react hooks
import { useContext } from "react";
// - context
import { ConfigsDataContext, TrendingDataContext } from "../../context-config";
// - ui
import BookmarkIcon from "../ui/BookmarkIcon";
import MediaInfoWrapper from "../ui/MediaInfoWrapper";

export default function TrendingBar() {
  const { trendingData, setTrendingData } = useContext(TrendingDataContext);
  const configs = useContext(ConfigsDataContext);

  const updateBookmark = async function (docID) {
    const docRef = doc(db, "trending_movies", docID);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    console.log(data);

    // set bookmark

    if (data.bookmark === undefined) {
      await updateDoc(docRef, {
        bookmark: true,
      });
    } else if (data.bookmark === true) {
      await updateDoc(docRef, {
        bookmark: false,
      });
    } else if (data.bookmark === false) {
      await updateDoc(docRef, {
        bookmark: true,
      });
    }
  };

  return (
    <div className="TrendingBar">
      {trendingData.map((el) => {
        return (
          <div className="TrendingBar__element" key={el.id}>
            {configs[0]?.images && (
              <img
                src={`${configs[0]?.images.secure_base_url}${configs[0]?.images.profile_sizes[1]}${el.poster_path}`}
                className="TrendingBar__element__img"
                alt="Trending element image"
              />
            )}
            <BookmarkIcon
              updateBookmark={updateBookmark}
              el={el}
              trendingData={trendingData}
              setTrendingData={setTrendingData}
            />
            <MediaInfoWrapper
              title={el.title ? el.title : el.original_name}
              mediaType={el.media_type}
              popularity={el.popularity}
              releaseDate={
                el.release_date ? el.release_date : el.first_air_date
              }
            />
          </div>
        );
      })}
    </div>
  );
}
