import express from "express";
import {
  getProductDetails,
  getProducts,
  newProduct,
} from "../controllers/productControllers.js";

const productRoutes = express.Router();
productRoutes.route("/products").get(getProducts);
productRoutes.route("/admin/products").post(newProduct);
productRoutes.route("/products/:id").get(getProductDetails);

export default productRoutes;
