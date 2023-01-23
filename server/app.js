import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import xss from "xss-clean";
import cors from "cors";
import fileUpload from "express-fileupload";

/* IMPORTs FROM MIDDLEWARE */
import errorMiddleware from "./midlleware/error.js";

/* CREATING THE EXPRESS APP */
const app = express();

/* CONFIGURATING THE APP */
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(fileUpload());

/* IMPORTING ROUTES */
import productRouter from "./routes/product.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import orderRouter from "./routes/order.js";
import reviewRouter from "./routes/review.js";
import paymentRouter from "./routes/payment.js";

/* MOUNTING ROUTES */
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/payment", paymentRouter);

//using error middleware in the app
app.use(errorMiddleware);

export default app;
