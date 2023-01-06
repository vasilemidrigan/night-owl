// Media data wrapper

import movieIcon from "../../assets/img/icon-category-movie.svg";
import tvIcon from "../../assets/img/icon-category-tv.svg";

export default function MediaDataWrapper(props) {
  return (
    <div className="MediaDataWrapper">
      <div className="MediaDataWrapper__mediaType">
        <img
          src={props.mediaType === "movie" ? movieIcon : tvIcon}
          alt={props.mediaType === "movie" ? "Movie Icon" : "TV Icon"}
        />
      </div>
      <div className="MediaDataWrapper__title">{props.title}</div>
    </div>
  );
}
