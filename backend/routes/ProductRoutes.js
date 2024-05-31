import express from "express";
import { getProducts } from "../controllers/productControllers.js";

const productRoutes = express.Router();
productRoutes.route("/products").get(getProducts);

export default productRoutes;
