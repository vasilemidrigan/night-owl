// Trending Bar

// imports
import { updateBookmark } from "../../utils/functionalities";
// - react hooks
import { useContext } from "react";
// - context
import { ConfigsDataContext, MoviesDataContext } from "../../context-config";
// - ui
import BookmarkIcon from "../ui/BookmarkIcon";
import MediaInfoWrapper from "../ui/MediaInfoWrapper";

export default function TrendingBar() {
  // context
  const movies = useContext(MoviesDataContext);
  const trendingMovies = movies.trendingMovies;
  const configs = useContext(ConfigsDataContext);

  return (
    <div className="TrendingBar wrppr-mrgn-mob">
      {trendingMovies.map((el) => {
        return (
          <div className="TrendingBar__element" key={el.id}>
            {configs[0]?.images && (
              <img
                src={`${configs[0]?.images.secure_base_url}${configs[0]?.images.profile_sizes[1]}${el.poster_path}`}
                className="TrendingBar__element__img"
                alt="Trending element image"
              />
            )}
            <BookmarkIcon el={el} collectionID={"trending_movies"} />
            <MediaInfoWrapper el={el} />
          </div>
        );
      })}
    </div>
  );
}
