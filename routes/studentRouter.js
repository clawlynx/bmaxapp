import { Router } from "express";
import { getScoreStats } from "../controllers/studentController.js";

const router = Router();

router.get("/scorestats", getScoreStats);

export default router;
