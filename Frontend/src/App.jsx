import "./style/output.css";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import TaskPage from "./pages/Task";
import { Routes, Route } from "react-router-dom";
import AddTaskPage from "./pages/AddTask";
import { UserContext } from "./context/UserContext";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./axios/api";
import Loading from "./components/ui/Loading";
export default function App() {
  const redirect = useNavigate();
  const { user, isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    if (!isLoggedIn || user === null) {
      redirect("/signup");
    }
  }, []);
  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/add-task" element={<AddTaskPage />} />
      </Routes>{" "}
    </>
  );
}
