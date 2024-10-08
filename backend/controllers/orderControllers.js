import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import order from "../models/order.js";
import Oder from "../models/order.js";
import Product from "../models/products.js";
import ErrorHandler from "../utils/errorHandler.js";

//create new order => /api/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Oder.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    order,
  });
});

//get current user order => /api/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Oder.find({ user: req.user._id });

  res.status(200).json({
    orders,
  });
});

//get order details => /api/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Oder.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("No order found with is ID", 404));
  }

  res.status(200).json({
    order,
  });
});

//get all orders - ADMIN => /api/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Oder.find();

  res.status(200).json({
    orders,
  });
});

//Update orders - ADMIN => /api/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Oder.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("No order found with is ID", 404));
  }
  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  //update product stock
  order?.orderItems?.forEach(async (item) => {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("No product found with is ID", 404));
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

//delete order  => /api/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Oder.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("No order found with is ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
