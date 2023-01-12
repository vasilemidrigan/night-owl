// Media info wrapper

import movieIcon from "../../assets/img/icon-category-movie.svg";
import tvIcon from "../../assets/img/icon-category-tv.svg";

export default function MediaDataWrapper(props) {
  return (
    <div className="MediaInfoWrapper">
      <div className="MediaInfoWrapper__mediaType">
        <img
          src={props.mediaType === "movie" ? movieIcon : tvIcon}
          alt={props.mediaType === "movie" ? "Movie Icon" : "TV Icon"}
        />
      </div>
      <div className="MediaInfoWrapper__title">{props.title}</div>
    </div>
  );
}
