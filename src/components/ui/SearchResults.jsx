// Search Results

// imports
// react
import { useContext } from "react";
import { useLocation } from "react-router-dom";
// context
import { ConfigsDataContext } from "../../context/Context-Config";

export default function SearchResults(props) {
  const configs = useContext(ConfigsDataContext);
  const location = useLocation();

  console.log(props);

  return (
    <div className={`SearchResults ${props.isSearchActive ? "" : "hidden"}`}>
      {props.isSearchActive
        ? props.filter.length >= 1
          ? props.filter.map((show) => {
              return (
                <div className="SearchResults__filter-show" key={Math.random()}>
                  {configs[0]?.images && (
                    <img
                      src={`${configs[0]?.images.secure_base_url}${configs[0]?.images.logo_sizes[0]}${show.poster_path}`}
                    />
                  )}
                  <span>
                    {location.pathname === "/night-owl/tv"
                      ? show.original_name
                      : show.original_title}
                  </span>
                </div>
              );
            })
          : false
        : false}
    </div>
  );
}
