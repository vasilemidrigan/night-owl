// Context

// imports
import { createContext } from "react";

export const ConfigsDataContext = createContext(null);
export const TrendingDataContext = createContext(null);

export default function ContextProviders({ children, configs, trendingData }) {
  return (
    <ConfigsDataContext.Provider value={configs}>
      <TrendingDataContext.Provider value={trendingData}>
        {children}
      </TrendingDataContext.Provider>
    </ConfigsDataContext.Provider>
  );
}
