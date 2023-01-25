// Bookmarks page

import { useContext } from "react";
import { ConfigsDataContext } from "../../context-config";
import { BookmarkShowsContext } from "../../context-config";

import ShowsGrid from "../ui/ShowsGrid";

export default function BookmarksPage() {
  const configs = useContext(ConfigsDataContext);
  const { bookmarkShows, setBookmarkShows } = useContext(BookmarkShowsContext);

  console.log(configs);

  return (
    <div className="BookmarksPage">
      <ShowsGrid
        configs={configs}
        shows={bookmarkShows}
        showsCategory="Bookmarks"
      />
    </div>
  );
}
