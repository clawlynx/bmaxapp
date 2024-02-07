import { Router } from "express";
import {
  addStudent,
  evaluateStudent,
  getCurrentStudents,
  getUnassignedStudents,
} from "../controllers/teacherController.js";
import { validateEvaluateInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/unassigned", getUnassignedStudents);
router.patch("/assign/:id", addStudent);
router.get("/current", getCurrentStudents);
router.patch("/evaluate/:id", validateEvaluateInput, evaluateStudent);
export default router;
