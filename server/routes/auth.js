import express from "express";

/* IMPORTS FROM CONTROLLERS */
import {
  registerUser,
  login,
  updatePassword,
  logout,
  forgotPassword,
  resetPassword,
  deactivateUser,
  userProfile,
  userProfileUpdate,
  updateAvatar,
} from "../controllers/auth.js";

/* IMPORTS FROM MIDDLEWARES */
import { isAuthenticated, isAuthorized } from "../midlleware/auth.js";

/* CREATING THE ROUTE */
const router = express.Router();

/* OPERATIONS */
router.post("/register", registerUser);
router.post("/login", login);
router.patch("/password/update", isAuthenticated, updatePassword);
router.get("/logout", isAuthenticated, logout);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/active", isAuthenticated, deactivateUser);
router.get("/profile", isAuthenticated, userProfile);
router.put("/profile/update", isAuthenticated, userProfileUpdate);
router.patch("/profile/avatar", isAuthenticated, updateAvatar);

export default router;
