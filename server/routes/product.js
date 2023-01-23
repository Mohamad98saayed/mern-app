import express from "express";

/* IMPORTS FROM CONTROLLERS */
import { getProducts, getProduct } from "../controllers/product.js";

/* CREATING THE ROUTE */
const router = express.Router();

/* OPERATIONS */
router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
