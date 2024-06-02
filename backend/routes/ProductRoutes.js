import express from "express";
import { getProducts, newProduct } from "../controllers/productControllers.js";

const productRoutes = express.Router();
productRoutes.route("/products").get(getProducts);
productRoutes.route("/admin/products").post(newProduct);

export default productRoutes;
