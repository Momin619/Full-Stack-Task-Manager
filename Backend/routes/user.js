import express from "express";

import { postSignup, postLogin, getSession } from "../controller/user.js";

export const userRouter = express.Router();

userRouter.post("/signup", postSignup);

userRouter.post("/login", postLogin);

userRouter.get("/get-session", getSession);
