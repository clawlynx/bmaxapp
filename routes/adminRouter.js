import { Router } from "express";
import {
  allStudents,
  allTeachers,
  createAnnouncement,
  deleteAnnouncement,
  deleteStudent,
  deleteTeacher,
  getPendingVerifications,
  getSingleTeacher,
  totalCount,
  updateAnnouncement,
  verifyTeacher,
} from "../controllers/adminController.js";
import { validateAnnouncementInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/summary", totalCount);
router.get("/allteachers", allTeachers);
router.get("/allstudents", allStudents);
router.get("/verification", getPendingVerifications);
router.post(
  "/createannouncement",
  validateAnnouncementInput,
  createAnnouncement
);
router.delete("/deleteannouncement/:id", deleteAnnouncement);
router.patch(
  "/updateannouncement/:id",
  validateAnnouncementInput,
  updateAnnouncement
);
router.delete("/deleteteacher/:id", deleteTeacher);
router.delete("/deletestudent/:id", deleteStudent);
router.get("/teacher/:id", getSingleTeacher);
router.patch("/verify/:id", verifyTeacher);
export default router;
