// Shows Row

import BookmarkIcon from "./BookmarkIcon";

export default function ShowsRow(props) {
  console.log(props);

  return (
    <div className="ShowsTemplate">
      <h2>{props.showsCategory}</h2>
      <div className="ShowsTemplate_ShowsRow">
        {props.shows.map((show) => {
          return (
            <div className="ShowsTemplate_ShowsRow_show" key={show.id}>
              <img
                src={`${props.configs[0]?.images.secure_base_url}${props.configs[0]?.images.profile_sizes[1]}${show.poster_path}`}
                alt="show img"
              />
              <p>{show.title}</p>
              <BookmarkIcon el={show} collectionID={props.collectionID} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
