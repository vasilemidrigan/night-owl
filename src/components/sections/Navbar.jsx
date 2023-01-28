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
      <div className="Navbar__account">
        <NavLink to="/sign-up">
          <img src={userProfileImg} alt="user profile image" />
        </NavLink>
      </div>
    </div>
  );
}
