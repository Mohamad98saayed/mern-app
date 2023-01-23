import crypto from "crypto";
import cloudinary from "cloudinary";

/* IMPORTS FROM MODELS */
import User from "../models/user.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import createSendToken from "../utils/jwt.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendEmail from "../utils/email.js";

//USER: register a new user => /api/v1/auth/register
export const registerUser = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  sendEmail({
    email: user.email,
    subject: "Welcome To E-commerce",
    message:
      "E-commerce team welcomes you! we are happy to have you here! We will be ready for all your questions",
  });

  createSendToken(user, 201, res);
});

//USER: login user => /api/v1/auth/login
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user entered an email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  //checking user existence by email
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 404));
  }

  //Check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  createSendToken(user, 200, res);
});

//USER: update user password => /api/v1/auth/password/update
export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  //check old password
  const isOldMatch = await user.comparePassword(
    req.body.oldPassword,
    user.password
  );

  if (!isOldMatch) {
    return next(new ErrorHandler("Current password is incorrect", 401));
  }

  //check newPassword === newPasswordConfirm
  const isNewPasswordsMatch = req.body.newPassword === req.body.passwordConfirm;

  if (!isNewPasswordsMatch) {
    return next(new ErrorHandler("Passwords are not the same", 400));
  }

  //updating the password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  createSendToken(user, 200, res);
});

//USER: logout user => /api/v1/auth/logout
export const logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

//USER: forgot user password => /api/v1/auth/password/forgot
export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("No user found with this email", 404));
  }

  //get reset token
  const resetToken = user.getPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  //reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/password/reset/${resetToken}`;

  try {
    sendEmail({
      email: user.email,
      subject: "E-commerce password reset token",
      message: `<h1>Click teh following link: ${resetUrl}</h1>`,
    });

    res.status(200).json({
      success: true,
      message: `${resetToken}`,
    });
  } catch (err) {
    //if error with sending email, we remove the following data for more security
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(err.message, 500));
  }
});

//USER: reset password => /api/v1/auth/password/reset/:token
export const resetPassword = catchAsync(async (req, res, next) => {
  //hash the url token
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gte: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Password reset token is invalid or expired", 401)
    );
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new ErrorHandler("Password are not the same", 400));
  }

  //update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  //removing password reset token data for safety
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  createSendToken(user, 200, res);
});

//USER: deactivate user => /api/v1/auth/active
export const deactivateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(
      new ErrorHandler("You are not logged in! Please login first", 401)
    );
  }

  //deactivate user
  user.active = false;
  await user.save({ validateBeforeSave: false });

  //logout user
  logout(req, res);
});

//USER: get user profile => /api/v1/auth/profile
export const userProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(
      new ErrorHandler("You are not logged in! Please login first", 401)
    );
  }

  createSendToken(user, 200, res);
});

//USER: update user profile => /api/v1/auth/profile/update
export const userProfileUpdate = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  if (!user) {
    return next(
      new ErrorHandler("You are not logged in! Please login first", 401)
    );
  }

  //prevent user from updating role field
  if (req.body.role || req.body.password) {
    return next(
      new ErrorHandler("You are forbiden to perform this action", 403)
    );
  }

  //updating the user
  user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  createSendToken(user, 201, res);
});

//USER: update profile photo => /api/v1/auth/profile/avatar
export const updateAvatar = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  if (!user) {
    return next(
      new ErrorHandler("You are not logged in! Please login first", 401)
    );
  }

  //delete old pic
  if (user.avatar.public_id) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  }

  //cloudinary config
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
    quality: "auto",
    width: 200,
  });

  const avatar = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  user.avatar = avatar;

  await user.save({ validateBeforeSave: false });

  createSendToken(user, 201, res);
});
