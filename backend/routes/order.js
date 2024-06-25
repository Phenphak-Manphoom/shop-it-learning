import express from "express";
import {} from "../controllers/authControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import { newOrder } from "../controllers/orderControllers.js";

const orderRoutes = express.Router();

orderRoutes.route("/orders/new").post(isAuthenticatedUser, newOrder);

export default orderRoutes;
