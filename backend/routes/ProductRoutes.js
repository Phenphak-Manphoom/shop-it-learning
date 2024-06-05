import express from "express";
import {
  deleteProduct,
  getProductDetails,
  getProducts,
  newProduct,
  updateProduct,
} from "../controllers/productControllers.js";

const productRoutes = express.Router();
productRoutes.route("/products").get(getProducts);
productRoutes.route("/admin/products").post(newProduct);
productRoutes.route("/products/:id").get(getProductDetails);
productRoutes.route("/products/:id").put(updateProduct);
productRoutes.route("/products/:id").delete(deleteProduct);

export default productRoutes;
