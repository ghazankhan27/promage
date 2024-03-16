import { Schema, model } from "mongoose";

const managerSchema = new Schema({
  title: String,
});

const Manager = model("Manager", managerSchema);

export { Manager };
