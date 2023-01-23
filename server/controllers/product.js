/* IMPORTS FROM MODELS */
import Product from "../models/product.js";
import Review from "../models/review.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import APIFeatures from "../utils/apiFeatures.js";

//USER: get all products => /api/v1/products
export const getProducts = catchAsync(async (req, res, next) => {
  const resPerPage = 10;

  const productsCount = await Product.countDocuments();

  const searchAndFilter = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await searchAndFilter.query;
  let queryResults = products.length;

  const paginate = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(resPerPage);

  products = await paginate.query;

  res.status(200).json({
    success: true,
    resPerPage,
    productsCount,
    queryResults,
    products,
  });
});

//USER: get one product => /api/v1/products/:id
export const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //get product reviews
  const reviews = await Review.find({ product: req.params.id });

  res.status(200).json({
    success: true,
    product,
    reviews,
  });
});
