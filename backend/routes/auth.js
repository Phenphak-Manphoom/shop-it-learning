import express from "express";
import { loginUser, registerUser } from "../controllers/authControllers.js";

const authRoutes = express.Router();
authRoutes.route("/register").post(registerUser);
authRoutes.route("/login").post(loginUser);

export default authRoutes;
