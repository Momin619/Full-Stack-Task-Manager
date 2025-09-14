import React, { useState, useContext } from "react";
import { api } from "../../axios/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const redirect = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault(); // 🚀 prevent default GET form submission
    try {
      await api.post("/login", form);

      console.log("user session is ", user);

      redirect("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleLogin} // ✅ fixed
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
      >
        <h2 className="text-4xl font-extrabold text-gray-800 text-center">
          Login
        </h2>
        <p className="text-gray-500 text-center text-sm -mt-4 mb-2">
          Login with your account
        </p>

        {/* Name */}

        {/* Age */}

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email
          </label>
          <input
            onChange={handleInput}
            value={form.email}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-gray-700 font-medium">
            Password
          </label>
          <input
            onChange={handleInput}
            value={form.password}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 transition-all duration-200 p-3 rounded-lg text-white font-semibold shadow-md"
        >
          Login
        </button>

        <p className="text-sm text-gray-500 text-center">
          Create a account?{" "}
          <a
            href="/signup"
            className="text-green-600 font-semibold hover:underline"
          >
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}
