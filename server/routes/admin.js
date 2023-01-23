import express from "express";

/* IMPORTS FROM CONTROLLERS */
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  deactivateUserByAdmin,
  getAllOrdersByAdmin,
  getOrderByAdmin,
  updateOrderStatus,
  deleteReviewByAdmin,
} from "../controllers/admin.js";

/* IMPORTS FROM MIDDLEWARES */
import { isAuthenticated, isAuthorized } from "../midlleware/auth.js";

/* CREATING THE ROUTE */
const router = express.Router();

router.post("/products", isAuthenticated, isAuthorized("admin"), createProduct);

router.put(
  "/products/:id",
  isAuthenticated,
  isAuthorized("admin"),
  updateProduct
);

router.delete(
  "/products/:id",
  isAuthenticated,
  isAuthorized("admin"),
  deleteProduct
);

router.get("/users", isAuthenticated, isAuthorized("admin"), getAllUsers);

router.put(
  "/users/deactivate/:id",
  isAuthenticated,
  isAuthorized("admin"),
  deactivateUserByAdmin
);

router.get(
  "/orders",
  isAuthenticated,
  isAuthorized("admin"),
  getAllOrdersByAdmin
);

router.get(
  "/orders/:order",
  isAuthenticated,
  isAuthorized("admin"),
  getOrderByAdmin
);

router.put(
  "/orders/:order",
  isAuthenticated,
  isAuthorized("admin"),
  updateOrderStatus
);

router.delete(
  "/reviews/:id",
  isAuthenticated,
  isAuthorized("admin"),
  deleteReviewByAdmin
);

export default router;
