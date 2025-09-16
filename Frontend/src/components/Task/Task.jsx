import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from "../ui/Loading";
import { api } from "../../axios/api";
export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const { user, isLoggedIn } = useContext(UserContext);
  console.log(user, isLoggedIn);

  if (loading) return <Loading />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white shadow-md rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition"
        >
          <p className="text-lg font-semibold text-gray-800">
            Task: <span className="font-normal text-gray-600">{task.task}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Date:{" "}
            <span className="text-gray-700">
              {new Date(task.dueDate).toLocaleString()}
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Owner:{" "}
            <span className="text-indigo-600 font-medium">{task.userId}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
