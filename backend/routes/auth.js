import express from "express";
import {
  forgotPassword,
  getUserProfile,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  updatePassword,
} from "../controllers/authControllers.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const authRoutes = express.Router();
authRoutes.route("/register").post(registerUser);
authRoutes.route("/login").post(loginUser);
authRoutes.route("/logout").get(logout);

authRoutes.route("/password/forgot").post(forgotPassword);
authRoutes.route("/password/reset/:token").put(resetPassword);

authRoutes.route("/me").get(isAuthenticatedUser, getUserProfile);
authRoutes.route("/password/update").put(isAuthenticatedUser, updatePassword);

export default authRoutes;
