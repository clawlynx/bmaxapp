import { Router } from "express";
import {
  completeStudent,
  evaluateStudent,
  getCompletedStudents,
  getCurrentStudents,
} from "../controllers/teacherController.js";
import { validateEvaluateInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.patch("/complete/:id", completeStudent);
router.get("/current", getCurrentStudents);
router.get("/finished", getCompletedStudents);
router.patch("/evaluate/:id", validateEvaluateInput, evaluateStudent);
export default router;
