// Movie page

import { useContext } from "react";
import { MoviesDataContext } from "../../context-config";
import { ConfigsDataContext } from "../../context-config";

import ShowsRow from "../ui/ShowsRow";

export default function MoviePage() {
  const configs = useContext(ConfigsDataContext);
  const movies = useContext(MoviesDataContext);
  const popularMovies = movies.popularMovies;

  return (
    <div className="MoviePage">
      <h1>Movies</h1>
      <ShowsRow configs={configs} popularMovies={popularMovies} />
    </div>
  );
}
