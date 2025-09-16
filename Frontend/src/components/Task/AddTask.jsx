import React, { useState } from "react";
import { api } from "../../axios/api";
import { useNavigate } from "react-router-dom";
import Loading from "../ui/Loading";

export default function AddTask() {
  const redirect = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    task: "",
    dueDate: "",
    priority: "medium", // ✅ added
  });
  const [error, setError] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/add-task", form);
      redirect("/tasks");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "Something went wrong");
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
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleAddTask}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Add Task
        </h2>

        {/* Show error if any */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Task Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="task" className="text-gray-700 font-medium">
            Task Name <span className="text-red-500">*</span>
          </label>
          <input
            onChange={handleInput}
            value={form.task}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            id="task"
            name="task"
            placeholder="Enter task"
            required
          />
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate" className="text-gray-700 font-medium">
            Due Date <span className="text-red-500">*</span>
          </label>
          <input
            onChange={handleInput}
            value={form.dueDate}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            required
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="text-gray-700 font-medium">
            Priority
          </label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleInput}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Submit Button */}
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
