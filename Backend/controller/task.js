import { Task } from "../model/task.js";
export const postAddTask = async (req, res, next) => {
  console.log(req.session.user);

  if (!req.session.user) {
    res.status(404).json({ message: "user not found" });
  }

  const userId = req.session.user.id;
  const { task, dueDate, status, priority } = req.body;
  if (!task || !dueDate) {
    return res.status(400).json({ error: "Task and Due Date are required" });
  }

  // ✅ validate due date (not in past)
  const now = new Date();
  if (new Date(dueDate) < now.setHours(0, 0, 0, 0)) {
    return res.status(400).json({ error: "Due date cannot be in the past" });
  }

  const newTask = await Task.create({
    task,
    dueDate,
    status,
    priority,
    userId, // take userId from session
  });

  res.status(201).json(newTask);
};

export const getTasks = async (req, res, next) => {
  try {
    console.log("user session at task page is ", req.session.user);
    const tasks = await Task.find({ userId: req.session.user.id });
    console.log("tasks", tasks);

    return res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
  }
};
