import jwt from "jsonwebtoken";

/* CREATE TOKEN (helper Function) */
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

/* CREATE AND SEND TOKEN */
const createSendToken = (user, statusCode, res) => {
  const token = createToken(user.id);

  //cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //securing cookie on production mode
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  //removing password from user to prevent its existence in output
  user.password = undefined;

  res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    token,
    user,
  });
};

export default createSendToken;
