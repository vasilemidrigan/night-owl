// Shows Row

import BookmarkIcon from "./BookmarkIcon";
import MediaInfoWrapper from "./MediaInfoWrapper";

export default function ShowsRow(props) {
  return (
    <div className="ShowsTemplate">
      <h2 className="ShowsTemplate__hdr shw-rw-hdr fnt-hdr-s">
        {props.showsCategory}
      </h2>
      <div className="ShowsTemplate__row">
        {props.shows.map((show) => {
          return (
            <div className="ShowsTemplate__row__card" key={show.id}>
              <img
                className="ShowsTemplate__row__card__img"
                src={`${props.configs[0]?.images.secure_base_url}${props.configs[0]?.images.profile_sizes[1]}${show.poster_path}`}
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
