// Bookmark Icon

import { collection, setDoc, getCountFromServer } from "firebase/firestore";

import { useContext } from "react";
import { BookmarkShowsContext } from "../../context-config";
// icons
import emptyBookmarkIcon from "../../assets/img/icon-bookmark-empty.svg";
import fullBookmarkIcon from "../../assets/img/icon-bookmark-full.svg";
import { db } from "../../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function BookmarkIcon(props) {
  const { bookmarkShows, setBookmarkShows } = useContext(BookmarkShowsContext);

  // ------------------------
  // update bookmark function
  // ------------------------

  const updateBookmark = async function (docID, collectionID) {
    const docRef = doc(db, collectionID, docID);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    // update show obj into db
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
    // create if there is no bookmarks collection, and update it

    await setDoc(doc(db, "bookmarks", `${props.el.id}_doc`), {
      ...props.el,
    });

    // update bookmarkedShows state
    setBookmarkShows((bookmarkShows) => {
      return [...bookmarkShows, props.el];
    });
  };

  return (
    <div
      className="BookmarkIcon"
      onClick={() => updateBookmark(`show_${props.el.id}`, props.collectionID)}
    >
      <img
        className="BookmarkIcon__img"
        src={props.el.bookmark ? fullBookmarkIcon : emptyBookmarkIcon}
        alt="bookmarks icon"
      />
    </div>
  );
}
