import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from "../ui/Loading";
export default function Task() {
  const { user, isLoggedIn } = useContext(UserContext);
  console.log(user, isLoggedIn);

  return <div></div>;
}
