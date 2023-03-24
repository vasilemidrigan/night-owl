// --------------
// Navbar section
// --------------

// react
import { useState } from "react";
import { NavLink } from "react-router-dom";
// context
import { AuthDataContext } from "../../context/Auth-Context";
// components
import UserMenu from "../ui/UserMenu";
// assets
import logo from "../../assets/img/logo.svg";
import homeIcon from "../../assets/img/icon-nav-home.svg";
import moviesIcon from "../../assets/img/icon-nav-movies.svg";
import tvIcon from "../../assets/img/icon-nav-tv-series.svg";
import bookmarksIcon from "../../assets/img/icon-nav-bookmark.svg";
import userAvatarDefault from "../../assets/img/user_avatar_default.png";

export default function Navbar(props) {
  const [activeMenu, setActiveMenu] = useState(false);

  const showMenu = function () {
    return setActiveMenu(activeMenu === false ? true : false);
  };

  console.log(props);

  return (
    <div className="Navbar">
      <div className="Navbar__logo h-24">
        <NavLink to="/night-owl">
          <img src={logo} alt="Night Owl Logo" />
        </NavLink>
      </div>
      <div className="Navbar__pages">
        <NavLink to="/night-owl">
          <img src={homeIcon} alt="home icon" />
        </NavLink>
        <NavLink to="/night-owl/movies">
          <img src={moviesIcon} alt="movies icon" />
        </NavLink>
        <NavLink to="/night-owl/tv">
          <img src={tvIcon} alt="tv icon" />
        </NavLink>
        <NavLink to="/night-owl/bookmarks">
          <img src={bookmarksIcon} alt="bookmarks icon" />
        </NavLink>
      </div>
      <div className="Navbar__account h-24 border-radius-50" onClick={showMenu}>
        <img
          className="border-radius-50"
          src={props.avatar ? props.avatar : userAvatarDefault}
          alt="user profile image"
        />
        <UserMenu activeMenu={activeMenu} />
      </div>
    </div>
  );
}
