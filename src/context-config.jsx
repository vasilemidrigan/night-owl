// Context

// imports
import { createContext } from "react";

export const ConfigsDataContext = createContext(null);
export const GenresDataContext = createContext(null);
export const MoviesDataContext = createContext(null);
export const TvDataContext = createContext(null);

export default function ContextProviders({
  children,
  configs,
  genres,
  movies,
  tv,
}) {
  return (
    <ConfigsDataContext.Provider value={configs}>
      <GenresDataContext.Provider value={genres}>
        <MoviesDataContext.Provider value={movies}>
          <TvDataContext.Provider value={tv}>{children}</TvDataContext.Provider>
        </MoviesDataContext.Provider>
      </GenresDataContext.Provider>
    </ConfigsDataContext.Provider>
  );
}
