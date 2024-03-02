import { Router } from "express";
import {
  addStudent,
  allStudents,
  allTeachers,
  createAnnouncement,
  deleteAnnouncement,
  deleteStudent,
  deleteTeacher,
  editStudent,
  editTeacher,
  getAdmins,
  getAvailableTeachers,
  getIndividualStats,
  getPendingVerifications,
  getSingleStudent,
  getSingleTeacher,
  getUnassignedStudents,
  newAdmin,
  removeAdmin,
  totalCount,
  updateAnnouncement,
  verifyTeacher,
} from "../controllers/adminController.js";
import {
  validateAnnouncementInput,
  validateUpdateTeacherInput,
} from "../middleware/validationMiddleware.js";
import { checkForMainAdmin } from "../middleware/authMiddleware.js";

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
router.get("/admins", checkForMainAdmin, getAdmins);
router.patch("/newadmin/:id", checkForMainAdmin, newAdmin);
router.patch("/removeadmin/:id", checkForMainAdmin, removeAdmin);
router.get("/unassigned", getUnassignedStudents);
router.get("/available/:id", getAvailableTeachers);
router.patch("/assign", addStudent);

export default router;
