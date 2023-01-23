import { Schema, model } from "mongoose";

const orderModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  //we get paymentInfo info from stripe
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },

  // shipping info
  shippingInfo: {
    adress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },

  //order items
  orderItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],

  // order calculations
  itemsPrice: {
    type: Number,
    required: true,
    defaul: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },

  //order status
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
    enum: ["Processing", "Delivering", "Delivered"],
  },

  //order date info
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//populating order user details
orderModel.pre(/^find/, function () {
  this.populate({
    path: "user",
    select: "name email",
  });
});

//populating order products details
orderModel.pre(/^find/, function () {
  this.populate({
    path: "orderItems",
    populate: {
      path: "product",
      select: "name price",
    },
  });
});

export default new model("Order", orderModel);
