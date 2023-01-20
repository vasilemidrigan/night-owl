// Context

// imports
import { createContext } from "react";

export const ConfigsDataContext = createContext(null);
export const TrendingDataContext = createContext(null);

export default function ContextProviders({
  children,
  configs,
  trendingMovies,
}) {
  return (
    <ConfigsDataContext.Provider value={configs}>
      <TrendingDataContext.Provider value={trendingMovies}>
        {children}
      </TrendingDataContext.Provider>
    </ConfigsDataContext.Provider>
  );
}
