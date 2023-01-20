// Context

// imports
import { createContext } from "react";

export const ConfigsDataContext = createContext(null);
export const MoviesDataContext = createContext(null);

export default function ContextProviders({ children, configs, movies }) {
  return (
    <ConfigsDataContext.Provider value={configs}>
      <MoviesDataContext.Provider value={movies}>
        {children}
      </MoviesDataContext.Provider>
    </ConfigsDataContext.Provider>
  );
}
