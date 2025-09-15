import express from "express";

import {
  postSignup,
  postLogin,
  getSession,
  postLogout,
} from "../controller/user.js";

export const userRouter = express.Router();

userRouter.post("/signup", postSignup);

userRouter.post("/login", postLogin);

userRouter.post("/logout", postLogout);

userRouter.get("/get-session", getSession);
