import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Review must belong to  a product"],
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

//populating review's product details
reviewSchema.pre(/^find/, function () {
  this.populate({
    path: "user",
    select: "name email",
  });
});

//populating review's user details
reviewSchema.pre(/^find/, function () {
  this.populate({
    path: "product",
    select: "name",
  });
});

export default model("Review", reviewSchema);
