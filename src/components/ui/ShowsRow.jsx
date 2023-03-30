// ------------
// Shows Row UI
// ------------

// components
import BookmarkIcon from "./BookmarkIcon";
import MediaInfoWrapper from "./MediaInfoWrapper";
import { ScrollBtn } from "./ScrollBtn";
// react
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function ShowsRow(props) {
  const ref = useRef();
  const width = useWindowSize();
  const [scrollStep, setScrollStep] = useState(0);

  // resize listener
  function useWindowSize() {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  // change scroll step depending on the screen size
  useEffect(() => {
    setScrollStep(() => {
      return width < 768 ? 400 : width < 1280 ? 600 : 900;
    });
  }, [width]);

  return (
    <div className="ShowsTemplate">
      <h2>{props.showsCategory}</h2>

      <div className="ShowsTemplate__row" ref={ref}>
        <ScrollBtn ref={ref} type="left" scrollStep={scrollStep} />
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
        <ScrollBtn ref={ref} type="right" scrollStep={scrollStep} />
      </div>
    </div>
  );
}
