import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  startDate: Date,
  endDate: Date,
  description: String,
  status: String,
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

const Task = model("Task", taskSchema);

export { Task };
