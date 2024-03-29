// ---------------------
// Media info wrapper UI
// ---------------------

// react
import { useContext } from "react";
// context
import { GenresDataContext } from "../../context/Context-Config";
// assets
import movieIcon from "../../assets/img/icon-category-movie.svg";
import tvIcon from "../../assets/img/icon-category-tv.svg";
// utils
import { getGenres } from "../../utils/functionalities";

export default function MediaInfoWrapper(props) {
  const genres = useContext(GenresDataContext);
  const genresMovie = genres?.genresMovie[0]?.genres;
  const elemGenres = props?.el?.genre_ids;

  function formatTitle() {
    if (props.el.title) {
      if (props.el.title.length > 25) {
        return `${props.el.title.slice(0, 25)} ...`;
      } else {
        return props.el.title;
      }
    } else if (props.el.original_name) {
      if (props.el.original_name.length > 25) {
        return `${props.el.original_name.slice(0, 25)} ...`;
      } else {
        return props.el.original_name;
      }
    } else {
      return "error: no title";
    }
  }

  return (
    <div className="MediaInfoWrapper">
      <div className="MediaInfoWrapper__media-type">
        <img src={props.el.media_type === "movie" ? movieIcon : tvIcon} />
      </div>
      <div className="MediaInfoWrapper__title ">{formatTitle()}</div>
      <div className="MediaInfoWrapper__genres">
        {getGenres(elemGenres, genresMovie)}
      </div>
      <div className="MediaInfoWrapper__release-date">
        {props.el.release_date
          ? props.el.release_date
          : props.el.first_air_date}
      </div>
      <div className="MediaInfoWrapper__vote-average">
        <div className="MediaInfoWrapper__vote-average__icon"></div>
        {props.el.vote_average}
      </div>
    </div>
  );
}
