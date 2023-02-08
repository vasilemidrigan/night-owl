// Bookmark Icon

// imports
// - context
import { useContext } from "react";
import { BookmarkShowsContext } from "../../context/Context-Config";
// - db
import { db } from "../../firebase-config";
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
// - icons
import emptyBookmarkIcon from "../../assets/img/icon-bookmark-empty.svg";
import fullBookmarkIcon from "../../assets/img/icon-bookmark-full.svg";

export default function BookmarkIcon(props) {
  const { bookmarkShows, setBookmarkShows, bookmarksTrace, setBookmarksTrace } =
    useContext(BookmarkShowsContext);

  // ------------------------
  // update bookmark function
  // ------------------------
  const updateBookmark = async function (docID, collectionID) {
    // docs data
    const docRef = doc(db, collectionID, docID);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    // update data into db
    // if there's no bookmark property at all in the selected show,
    // or it is false, then create one and set it to true, and then
    // set a new doc into collection 'bookmarks', at the same time
    // create a trace to our movies that are bookmarked (their coll-
    // ection and doc reference)
    if (data.bookmark === undefined || data.bookmark === false) {
      await updateDoc(docRef, {
        bookmark: true,
      });
      await setDoc(doc(db, "bookmarks", `show_${props.el.id}`), {
        ...props.el,
        bookmark: true,
      });
      await setDoc(doc(db, "bookmarksTrace", `show_${props.el.id}`), {
        ...props.el,
        bookmark: true,
        collection_id: collectionID,
      });
      // else if there is bookmark property and it is setted to true,
      // then delete the doc from 'bookmarks' collection, and as well
      // we'll set the bookmark property of the show, back to false by
      // using the trace reference that we already setted above.
    } else if (data.bookmark === true) {
      if (props.collectionID !== "bookmarks") {
        await updateDoc(docRef, {
          bookmark: false,
        });
        await deleteDoc(doc(db, "bookmarks", `show_${props.el.id}`));
      } else if (props.collectionID === "bookmarks") {
        const target = bookmarksTrace.filter((show) => {
          return show.id === props.el.id;
        });
        const targetDocRef = doc(
          db,
          target[0]?.collection_id,
          `show_${props.el.id}`
        );
        await updateDoc(targetDocRef, {
          bookmark: false,
        });
        await deleteDoc(doc(db, "bookmarks", `show_${props.el.id}`));
        await deleteDoc(doc(db, "bookmarksTrace", `show_${props.el.id}`));
      }
    }
  };

  return (
    <div
      className="BookmarkIcon"
      onClick={
        props.type == "account"
          ? props.handleClick
          : () => updateBookmark(`show_${props.el.id}`, props.collectionID)
      }
    >
      <img
        className="BookmarkIcon__img"
        src={props.el.bookmark ? fullBookmarkIcon : emptyBookmarkIcon}
        alt="bookmarks icon"
      />
    </div>
  );
}
