import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import order from "../models/order.js";
import Oder from "../models/order.js";
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
