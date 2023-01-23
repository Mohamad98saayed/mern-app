import cloudinary from "cloudinary";

/* IMPORTS FROM MODELS */
import Product from "../models/product.js";
import User from "../models/user.js";
import Order from "../models/order.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Review from "../models/review.js";

//ADMIN: get all user => /api/v1/admin/users
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: { $ne: "admin" } });

  const usersNumber = await User.countDocuments();

  res.status(200).json({
    success: true,
    usersNumber,
    users,
  });
});

//ADMIN: deactivate user => /api/v1/admin/users/deactivate/:id
export const deactivateUserByAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("No user found!", 404));
  }

  user.active = !user.active;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "User status updated",
  });
});

//ADMIN: create product => /api/v1/admin/products
export const createProduct = catchAsync(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//ADMIN: update product => /api/v1/admin/products/:id
export const updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //updating images
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  //checking if we trying to update images
  if (images !== undefined) {
    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  //updating the product
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//ADMIN: delete product => /api/v1/admin/products/:id
export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted",
  });
});

//ADMIN: get all orders => /api/v1/admin/orders
export const getAllOrdersByAdmin = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  const ordersCount = await Order.countDocuments();

  if (!orders) {
    return next("No orders found", 404);
  }

  res.status(200).json({
    success: true,
    ordersCount,
    orders,
  });
});

//ADMIN: get one order => /api/v1/admin/orders/:order
export const getOrderByAdmin = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.order);

  if (!order) {
    return next("No orders found", 404);
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//ADMIN: update order status => /api/v1/admin/orders/:id
export const updateOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.order);

  if (!order) {
    return next("No order found with that ID", 404);
  }

  order.orderStatus = req.body.orderStatus;
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated",
  });
});

//ADMIN: delete review => /api/v1/admin/reviews/:id
export const deleteReviewByAdmin = catchAsync(async (req, res, next) => {
  //get the review
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    message: "Review deleted",
  });
});
