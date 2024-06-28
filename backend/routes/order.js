import express from "express";
import {} from "../controllers/authControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import {
  deleteOrder,
  getAllOrders,
  getOrderDetails,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderControllers.js";

const orderRoutes = express.Router();

orderRoutes.route("/orders/new").post(isAuthenticatedUser, newOrder);
orderRoutes.route("/me/orders").get(isAuthenticatedUser, myOrders);
orderRoutes.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
orderRoutes.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);

orderRoutes
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
orderRoutes
  .route("/admin/orders/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

export default orderRoutes;
