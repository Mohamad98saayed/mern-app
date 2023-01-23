import Order from "../models/order.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendEmail from "../utils/email.js";

//USER: create order => /api/v1/orders
export const createOrder = catchAsync(async (req, res, next) => {
  //destructure fields from body
  const {
    paymentInfo,
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    user: req.user.id,
    paymentInfo,
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//USER: get all user orders => /api/v1/orders
export const getAllUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  if (!orders) {
    return next(new ErrorHandler("You have no orders yet", 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

//USER: get order details => /api/v1/orders/:order
export const orderDetails = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.order);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.user.id !== req.user.id) {
    return next(
      new ErrorHandler("You cannot access others orders details", 403)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});
