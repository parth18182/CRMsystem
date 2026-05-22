import express from "express";

import { getAllEntries, getAllVisits, updateVisitStatus } from "../controllers/adminController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/entries", isAuthenticated, isAdmin, getAllEntries);
router.get("/visits", isAuthenticated, isAdmin, getAllVisits);
router.put("/visit/:id", isAuthenticated, isAdmin, updateVisitStatus);


export default router;
