// Shows Grid (for Recommended section in the homepage and
//             Bookmarks page)

import BookmarkIcon from "./BookmarkIcon";
import MediaInfoWrapper from "./MediaInfoWrapper";

export default function ShowsGrid(props) {
  console.log(props);
  return (
    <div className="ShowsGrid wrppr-mrgn-mob">
      <h2 className="ShowsGrid__hdr shw-rw-hdr fnt-hdr-s">
        {props.showsCategory}
      </h2>
      <div className="ShowsGrid__grid">
        {props.shows.map((show) => {
          return (
            <div className="ShowsGrid__grid__card" key={show.id}>
              <img
                className="ShowsGrid__grid__card__img"
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
