import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="my-10">{children}</div>
      <Footer />
    </div>
  );
}
