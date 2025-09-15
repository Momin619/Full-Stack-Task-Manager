import React from "react";
import AddTask from "../components/Task/AddTask";
import Layout from "../components/ui/Layout";
export default function AddTaskPage() {
  return (
    <div>
      <Layout children={<AddTask />} />
    </div>
  );
}
