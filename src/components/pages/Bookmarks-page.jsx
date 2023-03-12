// --------------
// Bookmarks page
// --------------

// react
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
// context
import { ConfigsDataContext } from "../../context/Context-Config";
import { BookmarkShowsContext } from "../../context/Context-Config";
import { AuthDataContext } from "../../context/Auth-Context";
// components
import ShowsGrid from "../ui/ShowsGrid";
import SearchResults from "../ui/SearchResults";
import Footer from "../sections/Footer";

export default function BookmarksPage() {
  const configs = useContext(ConfigsDataContext);
  const { bookmarkShows } = useContext(BookmarkShowsContext);

  const { user } = useContext(AuthDataContext);
  const [filterSearch, isSearchActive] = useOutletContext();

  return (
    <div className="BookmarksPage">
      <SearchResults
        filterSearch={filterSearch}
        isSearchActive={isSearchActive}
      />
      <ShowsGrid
        configs={configs}
        shows={bookmarkShows}
        showsCategory="Bookmarks"
        collectionID={`${user?.email}_data/bookmarked_movies/bookmarks`}
      />
      {bookmarkShows.length == 0 && (
        <span className="BookmarksPage__message">No bookmarked shows yet.</span>
      )}
      <Footer />
    </div>
  );
}
