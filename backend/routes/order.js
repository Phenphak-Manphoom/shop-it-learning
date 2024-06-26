import express from "express";
import {} from "../controllers/authControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import {
  getOrderDetails,
  myOrders,
  newOrder,
} from "../controllers/orderControllers.js";

const orderRoutes = express.Router();

orderRoutes.route("/orders/new").post(isAuthenticatedUser, newOrder);
orderRoutes.route("/me/orders").get(isAuthenticatedUser, myOrders);
orderRoutes.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);

export default orderRoutes;
