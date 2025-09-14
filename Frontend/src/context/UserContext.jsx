import { createContext, useState, useEffect } from "react";
import { api } from "../axios/api";
export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchSession = async () => {
    try {
      const res = await api.get("/get-session", { withCredentials: true });
      if (res.data.isLoggedIn) {
        setIsLoggedIn(true);
        setUser(res.data.user);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, setIsLoggedIn, isLoggedIn }}>
      {" "}
      {children}{" "}
    </UserContext.Provider>
  );
}
