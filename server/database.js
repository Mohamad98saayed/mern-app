import mongoose from "mongoose";

/* CONFIGURING MONGOOSE */
mongoose.set("strictQuery", true);

/* CONNECTING TO DB */
const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.LOCAL_DB)
      .then(() => console.log("DB connected"));
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
