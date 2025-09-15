import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../axios/api";

export default function Navbar() {
  const redirect = useNavigate();
  const { isLoggedIn, setUser, setIsLoggedIn } = useContext(UserContext);

  // state to track active link
  const [active, setActive] = useState(null);
  const location = useLocation();

  // make active persist on refresh (set based on URL path)
  useEffect(() => {
    if (location.pathname.includes("login")) setActive("login");
    else if (location.pathname.includes("signup")) setActive("signup");
    else if (location.pathname.includes("tasks")) setActive("tasks");
    else if (location.pathname.includes("add-task")) setActive("add-task");
    else setActive(null);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const res = await api.post("/logout");
      setIsLoggedIn(res.data.isLoggedIn);
      setUser(res.data.user);
      redirect(res.data.redirectTo);
      setActive(null); // clear active on logout
    } catch (error) {
      console.log(error);
    }
  };

  // central style helper
  const getLinkClasses = (name) =>
    active === name
      ? "bg-yellow-300 text-green-800 px-3 py-1 rounded-lg shadow transition"
      : "bg-white text-green-600 px-3 py-1 rounded-lg shadow hover:bg-gray-100 transition";

  const renderAuthLinks = () => (
    <>
      <Link
        to="/login"
        onClick={() => setActive("login")}
        className={getLinkClasses("login")}
      >
        Login
      </Link>
      <Link
        to="/signup"
        onClick={() => setActive("signup")}
        className={getLinkClasses("signup")}
      >
        Sign Up
      </Link>
    </>
  );

  const renderLinks = () => (
    <>
      <Link
        to="/tasks"
        onClick={() => setActive("tasks")}
        className={getLinkClasses("tasks")}
      >
        Tasks
      </Link>
      <Link
        to="/add-task"
        onClick={() => setActive("add-task")}
        className={getLinkClasses("add-task")}
      >
        Add Task
      </Link>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-700 transition"
      >
        Logout
      </button>
    </>
  );

  return (
    <nav className="bg-green-500 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <h1 className="font-bold text-lg">My App</h1>
      <div className="flex gap-4">
        {isLoggedIn ? renderLinks() : renderAuthLinks()}
      </div>
    </nav>
  );
}
