import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";

// get all products   =>  /api/products
export const getProducts = catchAsyncError(async (req, res) => {
  const apiFilters = new APIFilters(Product, req.query).search();
  let products = await apiFilters.query;
  let filteredProductCount = products.length;
  res.status(200).json({
    filteredProductCount,
    products,
  });
});

//create new product => /api/admin/products
export const newProduct = catchAsyncError(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
});

//Get single product details   =>  /api /products/:id
export const getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 400));
  }

  res.status(200).json({
    product,
  });
});

// Update product details   =>  /api/products/:id
export const updateProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 400));
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
});

// delete product details   =>  /api/products/:id
export const deleteProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 400));
  }

  await Product.deleteOne();

  res.status(200).json({
    message: "Product Deleted",
  });
});
