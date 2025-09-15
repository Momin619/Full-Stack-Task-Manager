import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
// adjust path
import { api } from "../../axios/api";
export default function Navbar() {
  const redirect = useNavigate();
  const { user, isLoggedIn, setUser, setIsLoggedIn } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const res = await api.post("/logout");
      setIsLoggedIn(res.data.isLoggedIn);
      setUser(res.data.user);
      redirect(res.data.redirectTo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-green-500 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        Task Manager
      </Link>

      {/* Links */}
      <div className="hidden md:flex items-center gap-6 font-medium">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:text-gray-200 transition">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-green-600 px-3 py-1 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/tasks" className="hover:text-gray-200 transition">
              Tasks
            </Link>
            <Link to="/add-task" className="hover:text-gray-200 transition">
              Add Task
            </Link>
            <span className="font-semibold">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg shadow transition"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile menu (hamburger) */}
      <div className="md:hidden">
        <button className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
