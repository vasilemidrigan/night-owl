// Navbar

// imports
// - react-router-dom
import { NavLink } from "react-router-dom";

// - icons
import logo from "../../assets/img/logo.svg";
import homeIcon from "../../assets/img/icon-nav-home.svg";
import moviesIcon from "../../assets/img/icon-nav-movies.svg";
import tvIcon from "../../assets/img/icon-nav-tv-series.svg";
import bookmarksIcon from "../../assets/img/icon-nav-bookmark.svg";
import userProfileImg from "../../assets/img/image-avatar.png";

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="Navbar__logo">
        <NavLink to="/">
          <img src={logo} alt="Night Owl Logo" />
        </NavLink>
      </div>
      <div className="Navbar__pages">
        <NavLink to="/">
          <img src={homeIcon} alt="home icon" />
        </NavLink>
        <NavLink to="/movies">
          <img src={moviesIcon} alt="movies icon" />
        </NavLink>
        <NavLink to="/tv">
          <img src={tvIcon} alt="tv icon" />
        </NavLink>
        <NavLink to="/bookmarks">
          <img src={bookmarksIcon} alt="bookmarks icon" />
        </NavLink>
      </div>
      <div className="Navbar__account">
        <img src={userProfileImg} alt="user profile image" />
      </div>
    </div>
  );
}
