import stripe from "stripe";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";

//require stripe
const stripeConfig = stripe(process.env.STRIPE_SECRET_KEY);

//Process stripe payment => /api/v1/payment/process
export const processPayment = catchAsync(async (req, res, next) => {
  const paymentIntent = await stripeConfig.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

//send stripe api key => /api/v1/payment/stripeapi
export const sendStripeApi = catchAsync(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
