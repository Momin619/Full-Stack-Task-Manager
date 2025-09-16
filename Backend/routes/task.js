import express from "express";

import { postAddTask, getTasks } from "../controller/task.js";

export const taskRouter = express.Router();

taskRouter.post("/add-task", postAddTask);

taskRouter.get("/tasks", getTasks);
