import { Router } from "express";
import {
  RegisterUser,
  getUser,
  loginUser,
  logout,
  updateProfile,
} from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
  validateUpdateProfileInput,
} from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", validateRegisterInput, RegisterUser);
router.post("/login", validateLoginInput, loginUser);
router.post("/logout", logout);
router.get("/user", authenticateUser, getUser);
router.patch(
  "/updateprofile",
  authenticateUser,
  validateUpdateProfileInput,
  updateProfile
);

export default router;
