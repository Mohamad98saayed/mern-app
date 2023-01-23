/* IMPORTS FROM MODELS */
import User from "../models/user.js";
import Review from "../models/review.js";
import Product from "../models/product.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/ErrorHandler.js";

//USER: create new review => /api/v1/reviews/:product
export const createReview = catchAsync(async (req, res, next) => {
  //check user authentication
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("Sign in to preform this action", 401));
  }

  //check product existence
  const product = await Product.findById(req.params.product);

  if (!product) {
    return next("Product not found", 404);
  }

  //create review
  const review = await Review.create({
    user: user._id,
    product: product._id,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  res.status(201).json({
    success: true,
    review,
  });
});

//USER: delete review by user => /api/v1/reviews/:id
export const deleteReview = catchAsync(async (req, res, next) => {
  //check review existence
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler("No review with that ID", 404));
  }

  //check if review belong to current user
  if (review.user.id !== req.user.id) {
    return next(new ErrorHandler("You cannot delete other's reviews", 403));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    message: "Review deleted",
  });
});
