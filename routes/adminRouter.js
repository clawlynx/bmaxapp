import { Router } from "express";
import { totalCount } from "../controllers/adminController.js";

const router = Router();

router.get("/summary", totalCount);
export default router;
