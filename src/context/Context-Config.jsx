// ----------------
// TMDB API Context
// ----------------

// react
import { createContext } from "react";

export const ConfigsDataContext = createContext(null);
export const GenresDataContext = createContext(null);
export const BookmarkShowsContext = createContext(null);
export const MoviesDataContext = createContext(null);
export const TvDataContext = createContext(null);
export const AvatarDataContext = createContext(null);

export default function ContextProviders({
  children,
  configs,
  genres,
  bookmarkShows,
  movies,
  tv,
  avatar,
}) {
  return (
    <ConfigsDataContext.Provider value={configs}>
      <GenresDataContext.Provider value={genres}>
        <BookmarkShowsContext.Provider value={bookmarkShows}>
          <MoviesDataContext.Provider value={movies}>
            <TvDataContext.Provider value={tv}>
              <AvatarDataContext.Provider value={avatar}>
                {children}
              </AvatarDataContext.Provider>
            </TvDataContext.Provider>
          </MoviesDataContext.Provider>
        </BookmarkShowsContext.Provider>
      </GenresDataContext.Provider>
    </ConfigsDataContext.Provider>
  );
}
