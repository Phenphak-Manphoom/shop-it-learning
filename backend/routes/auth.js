import express from "express";
import { registerUser } from "../controllers/authControllers.js";

const authRoutes = express.Router();
authRoutes.route("/register").post(registerUser);


export default authRoutes;