// --------------------
// Trending Bar section
// --------------------

// react
import { useContext, useRef } from "react";
import { useOutletContext, NavLink, useNavigate } from "react-router-dom";
// context
import {
  ConfigsDataContext,
  MoviesDataContext,
} from "../../context/Context-Config";
// components
import SearchResults from "../ui/SearchResults";
import BookmarkIcon from "../ui/BookmarkIcon";
import MediaInfoWrapper from "../ui/MediaInfoWrapper";
// ui
import { ScrollBtn } from "../ui/ScrollBtn";
// context
import { ScrollContext } from "../../context/Context-Config";

export default function TrendingBar() {
  const ref = useRef();

  const scrollStep = useContext(ScrollContext);

  const configs = useContext(ConfigsDataContext);
  const movies = useContext(MoviesDataContext);
  const trendingMovies = movies.trendingMovies;

  const navigate = useNavigate();

  const [filterSearch, isSearchActive] = useOutletContext();

  function goToReceiver(show) {
    return navigate(show, { state: { status: "RECEIVED" } });
  }

  return (
    <div className="Trend">
      <SearchResults
        filterSearch={filterSearch}
        isSearchActive={isSearchActive}
      />
      <h1>Trending</h1>
      <div className="Trend__TrendingBar" ref={ref}>
        <ScrollBtn ref={ref} type="left" scrollStep={scrollStep} />
        {trendingMovies.map((el) => {
          return (
            <NavLink to={`show/${el.id}`} key={el.id} state={{ el }}>
              <div className="Trend__TrendingBar__element">
                {configs[0]?.images && (
                  <img
                    src={`${configs[0]?.images.secure_base_url}${configs[0]?.images.profile_sizes[1]}${el.poster_path}`}
                    alt="Trending element image"
                  />
                )}
                <BookmarkIcon el={el} collectionID={"trending_movies"} />
                <MediaInfoWrapper el={el} />
              </div>
            </NavLink>
          );
        })}
        <ScrollBtn ref={ref} type="right" scrollStep={scrollStep} />
      </div>
    </div>
  );
}
