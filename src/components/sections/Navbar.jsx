// Navbar

// imports
import logo from "../../assets/logo.svg";
import homeIcon from "../../assets/icon-nav-home.svg";
import moviesIcon from "../../assets/icon-nav-movies.svg";
import tvIcon from "../../assets/icon-nav-tv-series.svg";
import bookmarksIcon from "../../assets/icon-nav-bookmark.svg";
import userProfileImg from "../../assets/image-avatar.png";

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="Navbar__logo">
        <img src={logo} alt="Night Owl Logo" />
      </div>
      <div className="Navbar__pages">
        <img src={homeIcon} alt="home icon" />
        <img src={moviesIcon} alt="movies icon" />
        <img src={tvIcon} alt="tv icon" />
        <img src={bookmarksIcon} alt="bookmarks icon" />
      </div>
      <div className="Navbar__account">
        <img src={userProfileImg} alt="user profile image" />
      </div>
    </div>
  );
}
