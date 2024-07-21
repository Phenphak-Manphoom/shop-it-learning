import Product from "../models/products.js";

//Get product => /api/products
export const getProducts = async (req, res) => {
  const product = await Product.find();
  res.status(200).json({
    product,
  });
};

//Create new product => /api/admin/products
export const newProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    product,
  });
};
