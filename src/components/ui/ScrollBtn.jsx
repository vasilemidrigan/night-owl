// Scroll Button

// imports
// asstes
import arrowRight from "../../assets/img/arrow-right.svg";
import arrowLeft from "../../assets/img/arrow-left.svg";
import { forwardRef } from "react";

export const ScrollBtn = forwardRef(function (props, ref) {
  // horizontall scroll buttons
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div
      className="ScrollWrapper__btn"
      onClick={() =>
        scroll(props.type == "left" ? -props.scrollStep : props.scrollStep)
      }
    >
      <img
        src={props.type == "left" ? arrowLeft : arrowRight}
        alt="left arrow"
      />
    </div>
  );
});
