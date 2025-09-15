import express from "express";

import { postAddTask } from "../controller/task.js";

export const taskRouter = express.Router();

taskRouter.post("/add-task", postAddTask);
