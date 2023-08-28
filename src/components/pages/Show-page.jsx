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
        <div className="ShowPage__poster__shadow"></div>
        <img
          className="ShowPage__poster__img"
          src={`${configs[0]?.images.secure_base_url}${configs[0]?.images.profile_sizes[3]}${show?.poster_path}`}
          alt="movie poster"
        />
      </div>
      <div className="ShowPage__grid">
        <div className="ShowPage__grid__title">
          <h2>{show?.original_title}</h2>
        </div>
        <div className="ShowPage__grid__play-btn">
          <button>Play</button>
        </div>
        <div className="ShowPage__grid__release-date">
          <span>Release Date:</span> {show?.release_date}
        </div>
        <div className="ShowPage__grid__popularity">
          <span>Popularity:</span> {show?.popularity}
        </div>
        <div className="ShowPage__grid__vote-average">
          <span>Vote average:</span> {show?.vote_average}
        </div>
        <div className="ShowPage__grid__vote-count">
          <span>Vote count:</span> {show?.vote_count}
        </div>
        <div className="ShowPage__grid__genres">
          <span>Genres:</span> {getGenres(elemGenres, genresMovie)}
        </div>
        <div className="ShowPage__grid__overview">
          <span>Overview:</span> <br />
          {show?.overview}
        </div>
        <div className="ShowPage__grid__trailer">Trailer</div>
      </div>
    </div>
  );
}
