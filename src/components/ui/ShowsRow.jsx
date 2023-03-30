// ------------
// Shows Row UI
// ------------

// components
import BookmarkIcon from "./BookmarkIcon";
import MediaInfoWrapper from "./MediaInfoWrapper";
// react
import { useRef } from "react";
// assets
import arrowRight from "../../assets/img/arrow-right.svg";
import arrowLeft from "../../assets/img/arrow-left.svg";

export default function ShowsRow(props) {
  useRef.current = "some value";

  const scroll = () => {};

  return (
    <div className="ShowsTemplate">
      <h2>{props.showsCategory}</h2>

      <div className="ShowsTemplate__row">
        <div className="ShowsTemplate__row__scroll-btn">
          <img src={arrowLeft} alt="left arrow" />
        </div>
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
        <div className="ShowsTemplate__row__scroll-btn">
          <img src={arrowRight} alt="right arrow" />
        </div>
      </div>
    </div>
  );
}
