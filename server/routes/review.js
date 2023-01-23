import express from "express";

/* IMPORTS FROM CONTROLLERS */
import { createReview, deleteReview } from "../controllers/review.js";

/* IMPORTS FROM MIDDLEWARES */
import { isAuthenticated } from "../midlleware/auth.js";

/* CREATING THE ROUTE */
const router = express.Router();

/* OPERATIONS */
router.post("/:product", isAuthenticated, createReview);
router.delete("/:id", isAuthenticated, deleteReview);

export default router;
