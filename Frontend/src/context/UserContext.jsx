import { createContext, useState, useEffect } from "react";
import { api } from "../axios/api";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchSession = async () => {
    try {
      const res = await api.get("/get-session", { withCredentials: true });
      console.log(res.data);
      if (res.data.isLoggedIn) {
        setIsLoggedIn(res.data.isLoggedIn);
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
