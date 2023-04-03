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
// utils
import { getGenres } from "../../utils/functionalities";

export default function ShowPage() {
  const configs = useContext(ConfigsDataContext);
  const genres = useContext(GenresDataContext);
  const location = useLocation();
  const show = location?.state?.el;
  const genresMovie = genres?.genresMovie[0]?.genres;
  const elemGenres = show?.genre_ids;

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
      <div className="ShowPage__grid">
        <div className="ShowPage__grid__title">{show.original_title}</div>
        <div className="ShowPage__grid__release-date">
          Release Date: {show.release_date}
        </div>
        <div className="ShowPage__grid__popularity">
          Popularity: {show.popularity}
        </div>
        <div className="ShowPage__grid__vote-average">
          Vote average: {show.vote_average}
        </div>
        <div className="ShowPage__grid__vote-count">
          Vote count: {show.vote_count}
        </div>
        <div className="ShowPage__grid__genres">
          Genres: {getGenres(elemGenres, genresMovie)}
        </div>
        <div className="ShowPage__grid__overview">
          Overview: <br />
          {show.overview}
        </div>
      </div>
    </div>
  );
}
