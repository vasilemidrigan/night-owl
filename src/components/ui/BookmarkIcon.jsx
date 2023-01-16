// Bookmark Icon

import { useState, useEffect } from "react";

// firestore
import { db } from "../../firebase-config";
import {
  query,
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
// icons
import emptyBookmarkIcon from "../../assets/img/icon-bookmark-empty.svg";
import fullBookmarkIcon from "../../assets/img/icon-bookmark-full.svg";

export default function BookmarkIcon(props) {
  return (
    <div
      className="BookmarkIcon"
      onClick={() => props.updateBookmark(`movie_${props.el.id}`)}
    >
      <img
        className="BookmarkIcon__img"
        src={props.el.bookmark ? fullBookmarkIcon : emptyBookmarkIcon}
        alt="bookmarks icon"
      />
    </div>
  );
}
