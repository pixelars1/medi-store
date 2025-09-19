import express from "express";
import { logVisit, logProductView, logSearch, getVisitors } from "../controllers/visitorsController.js";

const router = express.Router();

// create a new visit when user opens site
router.post("/visit", logVisit);

// add a product view to an existing session
router.post("/product-view", logProductView);

// log a search term
router.post("/search", logSearch);

// get all visitor analytics (for admin)
router.get("/", getVisitors);

export default router;
