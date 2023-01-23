import express from "express";

/* IMPORTS FROM CONTROLLERS */
import { sendStripeApi, processPayment } from "../controllers/payment.js";

/* IMPORTS FROM MIDDLEWARES */
import { isAuthenticated } from "../midlleware/auth.js";

/* CREATING THE ROUTE */
const router = express.Router();

/* OPERATIONS */
router.post("/process", isAuthenticated, processPayment);
router.get("/api", isAuthenticated, sendStripeApi);

export default router;
