// ------------
// Auth Context
// ------------

// react
import { createContext, useState } from "react";
// firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthDataContext = createContext(null);

export default function AuthContext({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      return setUser(user);
    } else {
      return setUser(null);
    }
  });

  return (
    <AuthDataContext.Provider value={{ user, setUser }}>
      {children}
    </AuthDataContext.Provider>
  );
}
