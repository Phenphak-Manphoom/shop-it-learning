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
productRoutes
  .route("/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getProducts);
productRoutes.route("/admin/products").post(newProduct);
productRoutes.route("/products/:id").get(getProductDetails);
productRoutes.route("/admin/products/:id").put(updateProduct);
productRoutes.route("/admin/products/:id").delete(deleteProduct);

export default productRoutes;
