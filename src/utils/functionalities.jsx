// -----------------------
// Other utility functions
// -----------------------

// firebase
import { db } from "../firebase-config";
import { query, collection, onSnapshot } from "firebase/firestore";

// get real time updates from db any time there's a change
export function getRTUpdates(setState, collectionId) {
  const q = query(collection(db, collectionId));
  onSnapshot(q, (querySnapshot) => {
    const updArr = [];
    querySnapshot.forEach((doc) => {
      updArr.push(doc.data());
    });
    setState(updArr);
  });
}
