import { Router } from "express";
import { createProject, getAllProjects, editProject, deleteProject, getAllProjectsByEndDate } from "../controllers/ProjectController";

const router = Router();

router.get("/all", getAllProjects);
router.get("/all/endDate/:endDate", getAllProjectsByEndDate);
router.post("/add", createProject);
router.put("/edit", editProject);
router.delete("/delete", deleteProject);

export { router as ProjectRouter };
