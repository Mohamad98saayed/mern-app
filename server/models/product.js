import { Schema, model } from "mongoose";
import slugify from "slugify";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    unique: [true, "Cannot have two products with the same name"],
    maxLenght: [50, "Product name cannot exceed 100 characters"],
  },
  slug: String,
  cost: {
    type: Number,
    required: [true, "Please  enter product cost"],
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Please  enter product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please enter product desription"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  brand: {
    type: String,
    required: [true, "Please enter product brand name"],
  },
  gender: {
    type: String,
    required: [true, "Please select category for the product"],
    enum: {
      values: ["women", "men", "kids"],
    },
  },
  category: {
    type: String,
    required: [true, "Please select category for the product"],
    enum: {
      values: ["shoes", "clothes", "accessories"],
    },
  },
  color: {
    type: String,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

/* DOCUMENT MIDDLEWARE (before saving or creating) */
//making sure price is greater than cost on creation
productSchema.pre("save", function (next) {
  if (this.price <= this.cost) {
    next("Price should be greater than cost");
  } else {
    next();
  }
});

//creating the slug
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default model("Product", productSchema);
