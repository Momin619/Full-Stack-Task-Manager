import React from "react";
import Task from "../components/Task/Task";
import Layout from "../components/ui/Layout";
export default function TaskPage() {
  return (
    <div>
      <Layout children={<Task />} />
    </div>
  );
}
