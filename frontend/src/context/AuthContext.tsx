import { createContext, ReactNode, useState } from "react";
import { AuthUser } from "../types/types";

// Define the shape of the context
interface AuthContextType {
  authUser: AuthUser | null; // Replace `any` with a more specific type if possible
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user") as string) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
