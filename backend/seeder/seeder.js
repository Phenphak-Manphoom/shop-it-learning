import mongoose from "mongoose";
import Product from "../models/products.js";
import products from "./data.js";
const seedProduct = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shop-it-learning");
    await Product.deleteMany();
    console.log("Products are deleted");
    await Product.insertMany(products);
    console.log("Products are added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProduct();
