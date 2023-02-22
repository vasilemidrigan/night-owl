// ------------
// Account page
// ------------

// react
import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
// firebase
import { getAuth, updateProfile } from "firebase/auth";
// context
import { AuthDataContext } from "../../context/Auth-Context";
import {
  BookmarkShowsContext,
  ConfigsDataContext,
} from "../../context/Context-Config";
// assets
import BookmarkIcon from "../ui/BookmarkIcon";
import userAvatarDefault from "../../assets/img/user_avatar_default.png";

export default function AccountPage() {
  const configs = useContext(ConfigsDataContext);
  const { user } = useContext(AuthDataContext);
  const auth = getAuth();

  const { state } = useLocation();
  const [username, setUsername] = useState("");
  const [list, setList] = useState();

  const { bookmarkShows } = useContext(BookmarkShowsContext);

  useEffect(() => {
    // update username into firebase, and then into account as well
    async function updateUsername() {
      if (user) {
        await updateProfile(auth.currentUser, {
          displayName: state?.username,
        })
          .then(() => {
            setUsername(user?.displayName);
          })
          .catch((err) => console.error(err));
      }
    }
    updateUsername();
  }, [user]);

  console.log(state);
  console.log(user);

  return (
    <div className="AccountPage wrppr-mrgn-mob">
      <div className="AccountPage__avatar h-100px w-100px border-radius-50">
        <img src={userAvatarDefault} alt="user avatar" />
      </div>
      <div className="AccountPage__username txt-align-c f-23">
        {user ? username : "night_owl_user"}
      </div>
      <div className="AccountPage__bookmarks">
        <h3>Bookmarks</h3>
        <div className="AccountPage__bookmarks__shows h-200px">
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
                  collectionID={`${user?.email}_data/bookmarked_movies/bookmarks`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="AccountPage__lists">
        <h3>My lists</h3>
        <label htmlFor="add_list">
          <input
            type="text"
            id="add_list"
            className="w-150px"
            name="list"
            placeholder="add list"
            value={list}
          />
          <button className="f-32 border-none">
            <span className="transf-transl-50-all">+</span>
          </button>
        </label>
      </div>
    </div>
  );
}
