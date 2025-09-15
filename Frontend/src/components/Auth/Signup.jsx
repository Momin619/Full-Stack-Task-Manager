import React, { useState } from "react";
import { api } from "../../axios/api";
import { useNavigate } from "react-router-dom";
import Loading from "../ui/Loading";
export default function Signup() {
  const redirect = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault(); // 🚀 prevent default GET form submission
    setLoading(true);
    try {
      await api.post("/signup", form);
      redirect("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSignUp} // ✅ fixed
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
      >
        <h2 className="text-4xl font-extrabold text-gray-800 text-center">
          Sign Up
        </h2>
        <p className="text-gray-500 text-center text-sm -mt-4 mb-2">
          Create your account to get started
        </p>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-gray-700 font-medium">
            Name
          </label>
          <input
            onChange={handleInput}
            value={form.name}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>

        {/* Age */}
        <div className="flex flex-col gap-1">
          <label htmlFor="age" className="text-gray-700 font-medium">
            Age
          </label>
          <input
            onChange={handleInput}
            value={form.age}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="number"
            id="age"
            name="age"
            placeholder="Enter your age"
          />
        </div>

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
          Sign Up
        </button>

        <p className="text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
