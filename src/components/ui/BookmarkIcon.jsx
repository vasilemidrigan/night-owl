// ----------------
// Bookmark Icon UI
// ----------------

// react
import { useContext } from "react";
// context
import { AuthDataContext } from "../../context/Auth-Context";
import { BookmarkShowsContext } from "../../context/Context-Config";
// firebase
import { db } from "../../firebase-config";
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
// assets
import emptyBookmarkIcon from "../../assets/img/icon-bookmark-empty.svg";
import fullBookmarkIcon from "../../assets/img/icon-bookmark-full.svg";

export default function BookmarkIcon(props) {
  const { bookmarksTrace } = useContext(BookmarkShowsContext);
  const { user } = useContext(AuthDataContext);

  const updateBookmark = async function (docID, collectionID) {
    // create doc reference
    let docRef;

    if (collectionID !== `${user?.email}_data/bookmarked_movies/bookmarks`) {
      docRef = doc(db, collectionID, `show_${docID}`);
    } else {
      docRef = doc(db, collectionID, docID);
    }

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
      await setDoc(
        doc(
          db,
          `${user?.email}_data`,
          `bookmarked_movies/bookmarks/show_${docID}`
        ),
        {
          ...props.el,
          id: `show_${docID}`,
          bookmark: true,
        }
      );
      await setDoc(
        doc(
          db,
          `${user?.email}_data`,
          `bookmarked_movies/bookmarks_trace/show_${docID}`
        ),
        {
          ...props.el,
          bookmark: true,
          id: `show_${docID}`,
          collection_id: collectionID,
        }
      );
      // else if there is bookmark property and it is setted to true,
      // then delete the doc from 'bookmarks' collection, and as well
      // we'll set the bookmark property of the show, back to false by
      // using the trace reference that we already setted above.
    } else if (data.bookmark === true) {
      if (
        props.collectionID !== `${user?.email}_data/bookmarked_movies/bookmarks`
      ) {
        await updateDoc(docRef, {
          bookmark: false,
        });
        await deleteDoc(
          doc(db, `${user.email}_data/bookmarked_movies/bookmarks/${docID}`)
        );
        await deleteDoc(
          doc(
            db,
            `${user.email}_data/bookmarked_movies/bookmarks_trace/${docID}`
          )
        );
      } else if (
        props.collectionID === `${user?.email}_data/bookmarked_movies/bookmarks`
      ) {
        const target = bookmarksTrace.filter((show) => {
          return show.id === props.el.id;
        });
        const targetDocRef = doc(db, target[0]?.collection_id, `${docID}`);
        await updateDoc(targetDocRef, {
          bookmark: false,
        });
        await deleteDoc(
          doc(db, `${user.email}_data/bookmarked_movies/bookmarks/${docID}`)
        );
        await deleteDoc(
          doc(
            db,
            `${user.email}_data/bookmarked_movies/bookmarks_trace/${docID}`
          )
        );
      }
    }
  };

  return (
    <div
      className="BookmarkIcon"
      onClick={() => updateBookmark(props.el.id, props.collectionID)}
    >
      <img
        className="BookmarkIcon__img"
        src={props.el.bookmark ? fullBookmarkIcon : emptyBookmarkIcon}
        alt="bookmarks icon"
      />
    </div>
  );
}
