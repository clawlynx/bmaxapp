import { Router } from "express";
import {
  allStudents,
  allTeachers,
  createAnnouncement,
  deleteAnnouncement,
  deleteStudent,
  deleteTeacher,
  editStudent,
  editTeacher,
  getIndividualStats,
  getPendingVerifications,
  getSingleStudent,
  getSingleTeacher,
  totalCount,
  updateAnnouncement,
  verifyTeacher,
} from "../controllers/adminController.js";
import {
  validateAnnouncementInput,
  validateUpdateTeacherInput,
} from "../middleware/validationMiddleware.js";

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
router.get("/student/:id", getSingleStudent);
router.patch("/verify/:id", verifyTeacher);
router.patch("/updateteacher/:id", validateUpdateTeacherInput, editTeacher);
router.patch("/updatestudent/:id", validateUpdateTeacherInput, editStudent);
router.get("/studentstats/:id", getIndividualStats);

export default router;
