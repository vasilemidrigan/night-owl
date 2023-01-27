// Movie page

import { useContext } from "react";
import { MoviesDataContext } from "../../context/Context-Config";
import { ConfigsDataContext } from "../../context/Context-Config";

import ShowsRow from "../ui/ShowsRow";

export default function MoviePage() {
  const configs = useContext(ConfigsDataContext);
  const movies = useContext(MoviesDataContext);
  const popularMovies = movies.popularMovies;
  const topRatedMovies = movies.topRatedMovies;
  const upcomingMovies = movies.upcomingMovies;
  const nowPlayingMovies = movies.nowPlayingMovies;

  return (
    <div className="MoviePage wrppr-mrgn-mob">
      <h1 className="pg-hdr fnt-hdr-l">Movies</h1>
      <ShowsRow
        configs={configs}
        shows={popularMovies}
        showsCategory={"Popular Movies"}
        collectionID={"popular_movies"}
      />
      <ShowsRow
        configs={configs}
        shows={topRatedMovies}
        showsCategory={"Top Rated Movies"}
        collectionID={"top_rated_movies"}
      />
      <ShowsRow
        configs={configs}
        shows={upcomingMovies}
        showsCategory={"Upcoming Movies"}
        collectionID={"upcoming_movies"}
      />
      <ShowsRow
        configs={configs}
        shows={nowPlayingMovies}
        showsCategory={"Now Playing Movies"}
        collectionID={"now_playing_movies"}
      />
    </div>
  );
}
