import "./style/output.css";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import TaskPage from "./pages/Task";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>{" "}
    </>
  );
}
