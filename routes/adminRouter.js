import { Router } from "express";
import {
  allStudents,
  allTeachers,
  getPendingVerifications,
  totalCount,
} from "../controllers/adminController.js";

const router = Router();

router.get("/summary", totalCount);
router.get("/allteachers", allTeachers);
router.get("/allstudents", allStudents);
router.get("/verification", getPendingVerifications);
export default router;
