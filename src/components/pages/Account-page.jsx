// ------------
// Account page
// ------------

// react
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
// firebase
import { deleteUser, getAuth, updateProfile } from "firebase/auth";
// context
import { db } from "../../firebase-config";
import { deleteDoc, getDocs, collection } from "firebase/firestore";
import { AuthDataContext } from "../../context/Auth-Context";
import {
  BookmarkShowsContext,
  ConfigsDataContext,
} from "../../context/Context-Config";
// assets
import BookmarkIcon from "../ui/BookmarkIcon";
import userAvatarDefault from "../../assets/img/user_avatar_default.png";

export default function AccountPage() {
  const navigate = useNavigate();
  const configs = useContext(ConfigsDataContext);
  const { user, setUser } = useContext(AuthDataContext);
  const auth = getAuth();
  const { state } = useLocation();
  const [username, setUsername] = useState("");
  const [list, setList] = useState();

  const { bookmarkShows } = useContext(BookmarkShowsContext);

  // update username into db, and then into app as well
  useEffect(() => {
    async function updateUsername() {
      if (user) {
        if (user?.displayName) {
          setUsername(user?.displayName);
        } else {
          await updateProfile(auth.currentUser, {
            displayName: state?.username,
          })
            .then(() => {
              setUsername(user?.displayName);
            })
            .catch((err) => console.error(err));
        }
      }
    }
    updateUsername();
  }, [user]);

  // delete account
  const handleDelete = async function () {
    const auth = getAuth();
    const user = auth.currentUser;
    const promises = [];
    const userCollections = [
      `${user.email}_data`,
      `${user.email}_data/bookmarked_movies/bookmarks`,
      `${user.email}_data/bookmarked_movies/bookmarks_trace`,
    ];
    userCollections.map(async (colRef) => {
      const querySnapshot = await getDocs(collection(db, colRef));
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        promises.push(deleteDoc(doc.ref));
      });
    });
    await Promise.all(promises);

    deleteUser(auth.currentUser)
      .then(() => {
        console.log("Delete user");
      })
      .catch((err) => {
        console.log(err);
        prompt(
          "Too much time left after your last logging into account,\n please log out and log in one more time \n and then proceed the deleting of the account!"
        );
      });

    navigate("../../");
  };

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
      <div className="AccountPage__footer">
        <span onClick={handleDelete}>delete account</span>
      </div>
    </div>
  );
}
