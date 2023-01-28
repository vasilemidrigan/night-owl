// Authentication Context

import { createContext } from "react";

const AuthDataContext = createContext(null);

export default function AuthContext({ children }) {
  return (
    <AuthDataContext.Provider value={""}>{children}</AuthDataContext.Provider>
  );
}
