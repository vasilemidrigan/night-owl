// -------------
// Shows Grid UI
// -------------

// react
import { useContext } from "react";
// components
import MediaInfoWrapper from "./MediaInfoWrapper";
import BookmarkIcon from "./BookmarkIcon";
// context
import { ConfigsDataContext } from "../../context/Context-Config";

export default function ShowsGrid(props) {
  const configs = useContext(ConfigsDataContext);

  console.log(props);

  return (
    <div className="ShowsGrid wrppr-mrgn-mob">
      <h2 className="ShowsGrid__hdr shw-rw-hdr fnt-hdr-s">
        {props.showsCategory}
      </h2>
      <div className="ShowsGrid__grid">
        {props.shows?.map((show) => {
          return (
            <div className="ShowsGrid__grid__card" key={show.id}>
              <img
                className="ShowsGrid__grid__card__img"
                src={`${configs[0]?.images.secure_base_url}${configs[0]?.images.profile_sizes[1]}${show.poster_path}`}
                alt="show img"
              />
              <BookmarkIcon el={show} collectionID={props.collectionID} />
              <MediaInfoWrapper el={show} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
