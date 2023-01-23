import express from "express";

/* IMPORTS FROM CONTROLLERS */
import {
  createOrder,
  getAllUserOrders,
  orderDetails,
} from "../controllers/order.js";

/* IMPORTS FROM MIDDLEWARES */
import { isAuthenticated } from "../midlleware/auth.js";

/* CREATING THE ROUTE */
const router = express.Router();

/* OPERATIONS */
router.post("/", isAuthenticated, createOrder);
router.get("/", isAuthenticated, getAllUserOrders);
router.get("/:order", isAuthenticated, orderDetails);

export default router;
