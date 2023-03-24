// Search Results

// imports
// react
import { useContext } from "react";
import { useLocation, NavLink } from "react-router-dom";

// context
import { ConfigsDataContext } from "../../context/Context-Config";

export default function SearchResults(props) {
  const configs = useContext(ConfigsDataContext);
  const location = useLocation();

  return (
    <div className={`SearchResults ${props.isSearchActive ? "" : "hidden"}`}>
      {props.isSearchActive
        ? props.filterSearch?.length >= 1
          ? props.filterSearch?.map((show) => {
              return (
                <NavLink
                  to={`/night-owl/show/${show.id}`}
                  state={{}}
                  key={Math.random()}
                >
                  <div className="SearchResults__filter-show">
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
                </NavLink>
              );
            })
          : false
        : false}
    </div>
  );
}
