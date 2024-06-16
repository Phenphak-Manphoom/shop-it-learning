import express from "express";
import {
  deleteProduct,
  getProductDetails,
  getProducts,
  newProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const productRoutes = express.Router();
productRoutes.route("/products").get(isAuthenticatedUser, getProducts);
productRoutes.route("/admin/products").post(newProduct);
productRoutes.route("/products/:id").get(getProductDetails);
productRoutes.route("/products/:id").put(updateProduct);
productRoutes.route("/products/:id").delete(deleteProduct);

export default productRoutes;
