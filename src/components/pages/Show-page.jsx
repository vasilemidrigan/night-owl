// ---------
// Show Page
// ---------

//  imports
// react
import { useContext } from "react";
import { useLocation } from "react-router-dom";
// context
import { ConfigsDataContext } from "../../context/Context-Config";
import { GenresDataContext } from "../../context/Context-Config";

export default function ShowPage() {
  const configs = useContext(ConfigsDataContext);
  const genres = useContext(GenresDataContext);
  const location = useLocation();
  const show = location?.state?.el;

  console.log(genres);

  console.log(show);

  return (
    <div className="ShowPage">
      <div className="ShowPage__poster">
        <img
          className="ShowPage__poster__img"
          src={`${configs[0]?.images.secure_base_url}${configs[0]?.images.profile_sizes[3]}${show.poster_path}`}
          alt="movie poster"
        />
      </div>
      <div className="ShowPage__title">{show.original_title}</div>
      <div className="ShowPage__release date">{show.release_date}</div>
      <div className="ShowPage__popularity">{show.popularity}</div>
      <div className="ShowPage__vote-average">{show.vote_average}</div>
      <div className="ShowPage__vote-count">{show.vote_count}</div>
      <div className="ShowPage__genres">{show.genres}</div>
      <div className="ShowPage__overview">{show.overview}</div>
    </div>
  );
}
