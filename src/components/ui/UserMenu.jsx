// ------------
// User Menu UI
// ------------

// react
import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
// firebase
import { getAuth, signOut } from "firebase/auth";
// context
import { AuthDataContext } from "../../context/Auth-Context";

export default function UserMenu(props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthDataContext);

  const logOut = function () {
    const auth = getAuth();
    signOut(auth).catch((err) => console.error(err));
    navigate("../../night-owl");
  };

  return (
    <div className={`UserMenu ${props.activeMenu === false ? "hidden" : ""}`}>
      <div className="UserMenu__options">
        <NavLink
          to="/night-owl/auth/account"
          className={`UserMenu__options__link ${!user ? "hidden" : ""}`}
        >
          profile
        </NavLink>

        <NavLink
          className={`UserMenu__options__link  ${user ? "hidden" : ""}`}
          to="/night-owl/auth/log-in"
        >
          log in
        </NavLink>
        <span
          onClick={logOut}
          className={`UserMenu__options__link  ${!user ? "hidden" : ""}`}
        >
          log out
        </span>
        {!user && (
          <NavLink to="auth/sign-up" className={`UserMenu__options__link`}>
            register
          </NavLink>
        )}
      </div>
    </div>
  );
}
