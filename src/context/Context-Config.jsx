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
export const ScrollContext = createContext(null);

export default function ContextProviders({
  children,
  configs,
  genres,
  bookmarkShows,
  movies,
  tv,
  avatar,
  scroll,
}) {
  return (
    <ConfigsDataContext.Provider value={configs}>
      <GenresDataContext.Provider value={genres}>
        <BookmarkShowsContext.Provider value={bookmarkShows}>
          <MoviesDataContext.Provider value={movies}>
            <TvDataContext.Provider value={tv}>
              <AvatarDataContext.Provider value={avatar}>
                <ScrollContext.Provider value={scroll}>
                  {children}
                </ScrollContext.Provider>
              </AvatarDataContext.Provider>
            </TvDataContext.Provider>
          </MoviesDataContext.Provider>
        </BookmarkShowsContext.Provider>
      </GenresDataContext.Provider>
    </ConfigsDataContext.Provider>
  );
}
