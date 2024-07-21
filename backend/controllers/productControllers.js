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

//Get single product => /api/products/:id
export const getProductDetails = async (req, res) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }
  res.status(200).json({
    product,
  });
};

//Update product details=> /api/products/:id
export const updateProduct = async (req, res) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
};

//Delete product => /api/products/:id
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  await product.deleteOne();
  res.status(200).json({
    message: "Product Deleted",
  });
};
