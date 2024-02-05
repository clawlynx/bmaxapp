import { Router } from "express";
import { getUnassignedStudents } from "../controllers/teacherController.js";

const router = Router();

router.get("/unassigned", getUnassignedStudents);
export default router;
