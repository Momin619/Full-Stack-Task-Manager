import { Task } from "../model/task.js";
export const postAddTask = async (req, res, next) => {
  try {
    const { task, date } = req.body;
    const task1 = new Task({ task, date });
    await task1.save();
    return res.status(201).json({ message: "Task Added" });
  } catch (error) {
    console.log(error);
  }
};
