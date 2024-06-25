import catchAsyncError from "../middlewares/catchAsyncError.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import Order from "../models/order.js";
//create new order => /api/orders/new
export const newOrder = catchAsyncError(async (req, res, next) => {
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

  const order = await Order.create({
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
