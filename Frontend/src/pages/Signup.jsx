import React from "react";
import Signup from "../components/Auth/Signup";
import Layout from "../components/ui/Layout";
export default function SignupPage() {
  return (
    <div>
      <Layout children={<Signup />} />
    </div>
  );
}
