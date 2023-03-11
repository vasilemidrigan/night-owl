// Homepage

// react
import { useContext } from "react";
// components
import TrendingBar from "../sections/Trending-bar";
import ShowsGrid from "../ui/ShowsGrid";
import Footer from "../sections/Footer";
// context
import { MoviesDataContext } from "../../context/Context-Config";

export default function HomePage() {
  const movies = useContext(MoviesDataContext);

  return (
    <div className="HomePage">
      <TrendingBar />
      <h1 className="pg-hdr fnt-hdr-l wrppr-mrgn-mob">Recomended:</h1>
      <ShowsGrid shows={movies.popularMovies} collectionID={"popular_movies"} />
      <Footer />
    </div>
  );
}
