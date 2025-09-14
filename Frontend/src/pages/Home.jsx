import React from "react";
import Home from "../components/Home/Home";
import Layout from "../components/ui/Layout";
export default function HomePage() {
  return (
    <div>
      <Layout children={<Home />} />
    </div>
  );
}
