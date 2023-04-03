// -------------
// Shows Grid UI
// -------------

// react
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
// components
import MediaInfoWrapper from "./MediaInfoWrapper";
import BookmarkIcon from "./BookmarkIcon";
// context
import { ConfigsDataContext } from "../../context/Context-Config";

export default function ShowsGrid(props) {
  const configs = useContext(ConfigsDataContext);
  const location = useLocation();

  console.log(location);

  return (
    <div className="ShowsGrid">
      <h2 className="ShowsGrid__hdr">{props.showsCategory}</h2>
      <div className="ShowsGrid__grid">
        {props.shows?.map((show) => {
          return (
            <NavLink
              to={
                location.pathname == "/night-owl"
                  ? `show/${show.id}`
                  : `../show/${show.id}`
              }
              state={show}
              key={show.id}
            >
              <div className="ShowsGrid__grid__card">
                <img
                  className="ShowsGrid__grid__card__img"
                  src={`${configs[0]?.images.secure_base_url}${configs[0]?.images.profile_sizes[1]}${show.poster_path}`}
                  alt="show img"
                />
                <BookmarkIcon el={show} collectionID={props.collectionID} />
                <MediaInfoWrapper el={show} />
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
