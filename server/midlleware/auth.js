import jwt from "jsonwebtoken";

/* FILES IMPORTS */
import User from "../models/user.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/ErrorHandler.js";

/* CHECKING IF USER IS AUTHENTICATED */
export const isAuthenticated = catchAsync(async (req, res, next) => {
  //getting the token from the cookie
  const { token } = req.cookies;

  //if no token return
  if (!token) {
    return next(
      new ErrorHandler("Not authenticated! Please login first.", 401)
    );
  }

  //decoding the token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  //passing the user id into req
  req.user = await User.findById(decodedToken.id);

  next();
});

/* AUTHORIZATION */
export const isAuthorized = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return next(
      new ErrorHandler("You are not authorized to perform this action", 403)
    );
  }
  next();
};
