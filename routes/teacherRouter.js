import { Router } from "express";
import {
  addStudent,
  completeStudent,
  evaluateStudent,
  getCompletedStudents,
  getCurrentStudents,
  getUnassignedStudents,
} from "../controllers/teacherController.js";
import { validateEvaluateInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/unassigned", getUnassignedStudents);
router.patch("/assign/:id", addStudent);
router.patch("/complete/:id", completeStudent);
router.get("/current", getCurrentStudents);
router.get("/finished", getCompletedStudents);
router.patch("/evaluate/:id", validateEvaluateInput, evaluateStudent);
export default router;
