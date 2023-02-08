// Bookmarks page

// imports
// - context
import { useContext } from "react";
import { ConfigsDataContext } from "../../context/Context-Config";
import { BookmarkShowsContext } from "../../context/Context-Config";
// - ui
import ShowsGrid from "../ui/ShowsGrid";

export default function BookmarksPage() {
  const configs = useContext(ConfigsDataContext);
  const { bookmarkShows } = useContext(BookmarkShowsContext);

  return (
    <div className="BookmarksPage">
      <ShowsGrid
        configs={configs}
        shows={bookmarkShows}
        showsCategory="Bookmarks"
        collectionID="bookmarks"
      />
    </div>
  );
}
