import express from "express";
import {
  loginUser,
  logout,
  registerUser,
} from "../controllers/authControllers.js";

const authRoutes = express.Router();
authRoutes.route("/register").post(registerUser);
authRoutes.route("/login").post(loginUser);
authRoutes.route("/logout").get(logout);

export default authRoutes;
