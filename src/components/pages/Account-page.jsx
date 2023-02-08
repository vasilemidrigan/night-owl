// Account page

import { db } from "../../firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthDataContext } from "../../context/Auth-Context";
import {
  BookmarkShowsContext,
  ConfigsDataContext,
} from "../../context/Context-Config";
import BookmarkIcon from "../ui/BookmarkIcon";

import avatar from "../../assets/img/hellboy.jpeg";
import { getAuth, updateProfile } from "firebase/auth";

export default function AccountPage() {
  const configs = useContext(ConfigsDataContext);
  const user = useContext(AuthDataContext);
  const auth = getAuth();
  const { state } = useLocation();
  const username = state?.username;

  const { bookmarkShows, bookmarksTrace, setBookmarkShows, setBookmarkTrace } =
    useContext(BookmarkShowsContext);

  async function handleBookmark(showId) {
    const target = bookmarksTrace.filter((el) => {
      return el.id === showId;
    });
    const targetDocRef = doc(db, target[0]?.collection_id, `show_${showId}`);
    await updateDoc(targetDocRef, {
      bookmark: false,
    });
    await deleteDoc(doc(db, "bookmarks", `show_${showId}`));
    await deleteDoc(doc(db, "bookmarksTrace", `show_${showId}`));
  }

  console.log(auth.currentUser);

  useEffect(() => {
    async function updateUsername() {
      updateProfile(auth.currentUser, {
        displayName: username,
      }).catch((err) => console.error(err));
    }
    updateUsername();
  }, []);

  return (
    <div className="AccountPage wrppr-mrgn-mob">
      <div className="AccountPage__avatar">
        <img src={avatar} alt="user avatar" />
      </div>
      <div className="AccountPage__username">
        {user ? user.displayName : "night_owl_user"}
      </div>
      <div className="AccountPage__bookmarks">
        <h3>Bookmarks</h3>
        <div className="AccountPage__bookmarks__shows">
          {bookmarkShows.map((show) => {
            return (
              <div
                className="AccountPage__bookmarks__shows__show"
                key={show.id}
              >
                <img
                  src={`${configs[0]?.images?.base_url}${configs[0]?.images?.logo_sizes[2]}${show.poster_path}`}
                  alt="show poster"
                />
                <BookmarkIcon
                  type={"account"}
                  el={show}
                  handleClick={() => handleBookmark(show.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="AccountPage__lists">
        <h3>My lists</h3>
        <button type="button">+</button>
      </div>
    </div>
  );
}
