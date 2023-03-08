// ------------------
// Search bar section
// ------------------

// react
import { useContext, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
// assets
import searchIcon from "../../assets/img/icon-search.svg";
// context
import { MoviesDataContext } from "../../context/Context-Config";
import { TvDataContext } from "../../context/Context-Config";
import { BookmarkShowsContext } from "../../context/Context-Config";

export default function SearchBar(props) {
  const location = useLocation();
  const movies = useContext(MoviesDataContext);
  const tv = useContext(TvDataContext);
  const trendMovies = movies?.trendingMovies;
  const bookmarks = useContext(BookmarkShowsContext);
  const bookmarkShows = bookmarks.bookmarkShows;

  // hide search when click outside event is triggered
  const handleClick = () => {
    props.setClickOutside(false);
  };

  const handleClickOutside = () => {
    props.setClickOutside(true);
  };

  const useOutsideClick = (callback) => {
    const ref = useRef();
    useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
      document.addEventListener("click", handleClick, true);
      return () => {
        document.removeEventListener("click", handleClick, true);
      };
    }, [ref]);
    return ref;
  };

  const ref = useOutsideClick(handleClickOutside);

  const applyFilter = () => {
    props.searching.setFilterSearch(() => {
      if (
        location.pathname === "/night-owl" ||
        location.pathname === "/night-owl/"
      ) {
        const results = [];
        results.push(
          ...trendMovies.filter((show) => {
            return show.original_title
              .toLowerCase()
              .includes(props.searching.search)
              .toLowerCase();
          })
        );
        return results;
      } else if (location.pathname === "/night-owl/movies") {
        const results = [];
        for (const property in movies) {
          results.push(
            ...movies[property].filter((show) => {
              return show.original_title
                .toLowerCase()
                .includes(props.searching.search.toLowerCase());
            })
          );
        }
        return results;
      } else if (location.pathname === "/night-owl/tv") {
        const results = [];
        for (const property in tv) {
          results.push(
            ...tv[property].filter((show) => {
              return show.original_name
                .toLowerCase()
                .includes(props.searching.search.toLowerCase());
            })
          );
        }
        return results;
      } else if (location.pathname === "/night-owl/bookmarks") {
        const results = [];

        results.push(
          ...bookmarkShows.filter((show) => {
            return show.original_name
              ? show.original_name
              : show.original_title
                  .toLowerCase()
                  .includes(props.searching.search.toLowerCase());
          })
        );
        return results;
      }
    });
  };

  return (
    <>
      <div className="SearchBar wrppr-mrgn-mob">
        <img src={searchIcon} className="SearchBar__icon" alt="search icon" />
        <input
          type="search"
          value={props.searching.search}
          onChange={(e) => {
            return applyFilter(e), props.searching.handleSearch(e);
          }}
          className="SearchBar__input f-18 h-100"
          placeholder={
            location.pathname === "/night-owl"
              ? "Search for trending shows"
              : location.pathname === "/night-owl/movies"
              ? "Search for movies"
              : location.pathname === "/night-owl/tv"
              ? "Search for tv"
              : location.pathname === "/night-owl/bookmarks"
              ? "Search for bookmarked movies"
              : ""
          }
          onClick={handleClick}
          ref={ref}
        />
      </div>
    </>
  );
}
