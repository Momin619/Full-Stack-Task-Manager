import React from "react";
import Layout from "../components/ui/Layout";
import Login from "../components/Auth/Login";
export default function LoginPage() {
  return (
    <div>
      <Layout children={<Login />} />
    </div>
  );
}
