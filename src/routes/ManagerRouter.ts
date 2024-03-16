import { Router } from "express";
import { createManager, deleteManager, editManager, getAllManagerss } from "../controllers/ManagerController";

const router = Router();

router.get("/all", getAllManagerss);
router.post("/add", createManager);
router.put("/edit", editManager);
router.delete("/delete", deleteManager);

export { router as ManagerRouter };
