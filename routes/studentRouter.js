import { Router } from "express";
import {
  getGraphStats,
  getScoreStats,
} from "../controllers/studentController.js";

const router = Router();

router.get("/scorestats", getScoreStats);
router.get("/graphstats", getGraphStats);

export default router;
