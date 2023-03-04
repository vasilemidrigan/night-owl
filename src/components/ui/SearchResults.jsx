// Search Results

// imports
// react
import { useContext } from "react";
// context
import { ConfigsDataContext } from "../../context/Context-Config";

export default function SearchResults(props) {
  const configs = useContext(ConfigsDataContext);

  console.log(configs);

  return (
    <div className="SearchResults">
      {props.filter.length >= 1
        ? props.filter.map((show) => {
            return (
              <div className="SearchResults__filter-show" key={show.id}>
                {configs[0]?.images && (
                  <img
                    src={`${configs[0]?.images.secure_base_url}${configs[0]?.images.logo_sizes[1]}${show.poster_path}`}
                  />
                )}
              </div>
            );
          })
        : false}
    </div>
  );
}
