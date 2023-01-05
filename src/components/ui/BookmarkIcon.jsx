// Bookmark Icon

import emptyBookmarkIcon from "../../assets/img/icon-bookmark-empty.svg";
import fullBookmarkIcon from "../../assets/img/icon-bookmark-full.svg";

export default function BookmarkIcon() {
  return (
    <div className="BookmarkIcon">
      <img
        className="BookmarkIcon__img"
        src={fullBookmarkIcon}
        alt="bookmarks icon"
      />
    </div>
  );
}
