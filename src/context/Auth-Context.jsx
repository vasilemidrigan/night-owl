// Authentication Context

import { createContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthDataContext = createContext(null);

export default function AuthContext({ children }) {
  const [user, setUser] = useState(null);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      return setUser(user);
    } else {
      return null;
    }
  });

  return (
    <AuthDataContext.Provider value={user ? user : false}>
      {children}
    </AuthDataContext.Provider>
  );
}
