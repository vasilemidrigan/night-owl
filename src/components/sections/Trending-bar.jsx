// --------------------
// Trending Bar section
// --------------------

// react
import { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
// context
import {
  ConfigsDataContext,
  MoviesDataContext,
} from "../../context/Context-Config";
// components
import SearchResults from "../ui/SearchResults";
import BookmarkIcon from "../ui/BookmarkIcon";
import MediaInfoWrapper from "../ui/MediaInfoWrapper";

export default function TrendingBar() {
  const configs = useContext(ConfigsDataContext);
  const movies = useContext(MoviesDataContext);
  const trendingMovies = movies.trendingMovies;

  const [filterSearch, isSearchActive] = useOutletContext();

  return (
    <div className="Trend">
      <SearchResults
        filterSearch={filterSearch}
        isSearchActive={isSearchActive}
      />
      <h1>Trending</h1>
      <div className="Trend__TrendingBar">
        {trendingMovies.map((el) => {
          return (
            <div className="Trend__TrendingBar__element" key={el.id}>
              {configs[0]?.images && (
                <img
                  className="border-radius-7px-t-r"
                  src={`${configs[0]?.images.secure_base_url}${configs[0]?.images.profile_sizes[1]}${el.poster_path}`}
                  alt="Trending element image"
                />
              )}
              <BookmarkIcon el={el} collectionID={"trending_movies"} />
              <MediaInfoWrapper el={el} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
