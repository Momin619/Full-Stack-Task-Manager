import React, { useState } from "react";
import { api } from "../../axios/api";
import { useNavigate } from "react-router-dom";
import Loading from "../ui/Loading";
export default function AddTask() {
  const redirect = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    task: "",
    date: "",
  });

  const handleAddTask = async (e) => {
    setLoading(true);
    e.preventDefault(); // 🚀 prevent default GET form submission
    try {
      await api.post("/add-task", form);
      redirect("/tasks");
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
        onSubmit={handleAddTask} // ✅ fixed
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
      >
        <h2 className="text-4xl font-extrabold text-gray-800 text-center">
          Add Task
        </h2>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="task" className="text-gray-700 font-medium">
            Task Name
          </label>
          <input
            onChange={handleInput}
            value={form.task}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            id="task"
            name="task"
            placeholder="Enter task"
          />
        </div>

        {/* Age */}
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-gray-700 font-medium">
            Task Date
          </label>
          <input
            onChange={handleInput}
            value={form.date}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="date"
            id="date"
            name="date"
            placeholder="Enter  date"
          />
        </div>

        {/* Email */}

        {/* Button */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 transition-all duration-200 p-3 rounded-lg text-white font-semibold shadow-md"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
