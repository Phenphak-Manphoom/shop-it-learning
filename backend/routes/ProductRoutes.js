import express from "express";
import {
  deleteProduct,
  getProductDetails,
  getProducts,
  newProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const productRoutes = express.Router();
productRoutes.route("/products").get(getProducts);
productRoutes
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
productRoutes.route("/products/:id").get(getProductDetails);
productRoutes
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
productRoutes
  .route("/admin/products/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

export default productRoutes;
