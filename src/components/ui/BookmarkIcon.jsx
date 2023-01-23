// Bookmark Icon

// icons
import emptyBookmarkIcon from "../../assets/img/icon-bookmark-empty.svg";
import fullBookmarkIcon from "../../assets/img/icon-bookmark-full.svg";
import { db } from "../../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function BookmarkIcon(props) {
  // ------------------------
  // update bookmark function
  // ------------------------

  const updateBookmark = async function (docID, collectionID) {
    const docRef = doc(db, collectionID, docID);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

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
