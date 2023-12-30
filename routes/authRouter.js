import { Router } from "express";
import {
  RegisterUser,
  getUser,
  loginUser,
  logout,
} from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", validateRegisterInput, RegisterUser);
router.post("/login", validateLoginInput, loginUser);
router.post("/logout", logout);
router.get("/user", authenticateUser, getUser);

export default router;
