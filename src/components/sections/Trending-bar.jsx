// Trending Bar

// imports
// - react hooks
import { useContext } from "react";
// - context
import { ConfigsDataContext, TrendingDataContext } from "../../context-config";
// - ui
import BookmarkIcon from "../ui/BookmarkIcon";
import MovieDataWrapper from "../ui/MediaInfoWrapper";

export default function TrendingBar() {
  const trendingData = useContext(TrendingDataContext);
  const configs = useContext(ConfigsDataContext);

  return (
    <div className="TrendingBar">
      {trendingData.map((el) => {
        return (
          <div className="TrendingBar__element" key={el.id}>
            <img
              src={`${configs[0]?.images.secure_base_url}${configs[0]?.images.profile_sizes[1]}${el.poster_path}`}
              className="TrendingBar__element__img"
              alt="Trending element image"
            />
            <MovieDataWrapper
              title={el.title ? el.title : el.original_name}
              mediaType={el.media_type}
              popularity={el.popularity}
              releaseDate={
                el.release_date ? el.release_date : el.first_air_date
              }
            />
          </div>
        );
      })}
    </div>
  );
}
