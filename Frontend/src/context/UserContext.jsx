import { createContext, useState, useEffect } from "react";
import { api } from "../axios/api";
import Loading from "../components/ui/Loading";
export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // default true (waiting for backend)

  const fetchSession = async () => {
    try {
      const res = await api.get("/get-session", { withCredentials: true });
      console.log("Session check:", res.data);
      if (res.data.isLoggedIn) {
        setUser(res.data.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  if (loading) return <Loading />;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        fetchSession,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
