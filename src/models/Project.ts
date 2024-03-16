import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  title: String,
  manager: { type: Schema.Types.ObjectId, ref: "Manager" },
  startDate: Date,
  endDate: Date,
  isRunning: Boolean,
  details: String,
});

const Project = model("Project", projectSchema);

export { Project };
