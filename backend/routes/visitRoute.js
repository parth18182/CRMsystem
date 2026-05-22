import express from "express";
import { createVisit, getAllVisits } from "../controllers/visitController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, createVisit);
router.get("/all", isAuthenticated, getAllVisits);

export default router;
