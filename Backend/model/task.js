import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  task: {
    requried: true,
    type: String,
  },
  date: {
    requried: true,
    type: Date,
  },
});

export const Task = mongoose.model("Task", taskSchema);
