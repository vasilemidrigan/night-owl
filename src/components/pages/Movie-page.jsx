// ----------
// Movie page
// ----------

// react
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
// context
import { MoviesDataContext } from "../../context/Context-Config";
import { ConfigsDataContext } from "../../context/Context-Config";
// components
import ShowsRow from "../ui/ShowsRow";
import SearchResults from "../ui/SearchResults";
import Footer from "../sections/Footer";

export default function MoviePage() {
  const configs = useContext(ConfigsDataContext);
  const movies = useContext(MoviesDataContext);
  const popularMovies = movies.popularMovies;
  const topRatedMovies = movies.topRatedMovies;
  const upcomingMovies = movies.upcomingMovies;
  const nowPlayingMovies = movies.nowPlayingMovies;
  const [filterSearch, isSearchActive, setClickOutside] = useOutletContext();

  return (
    <div className="MoviePage">
      <SearchResults
        filterSearch={filterSearch}
        isSearchActive={isSearchActive}
        setClickOutside={setClickOutside}
      />
      <h1 className="MoviePage__header">Movies</h1>
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
      <Footer />
    </div>
  );
}
