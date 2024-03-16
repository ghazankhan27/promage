import { Router } from "express";
import { createTask, deleteTask, editTask, getAllTasks } from "../controllers/TaskController";

const router = Router();

router.get("/all", getAllTasks);
router.post("/add", createTask);
router.put("/edit", editTask);
router.delete("/delete", deleteTask);

export { router as TaskRouter };
