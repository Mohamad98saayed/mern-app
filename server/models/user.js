import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: [true, "This email is already registred"],
    lowerCase: true,
    validate: {
      validator: function (el) {
        return validator.isEmail(el);
      },
      message: "Please enter a valid email",
    },
  },
  avatar: {
    public_id: {
      type: String,
      default: "avatars/msky5gunck1fkcqu1ti6",
    },
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dfmgyv4r8/image/upload/v1672910947/avatars/msky5gunck1fkcqu1ti6.png",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },

  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
  },
});

/* DOCUMENT MIDDLEWARE */
userSchema.pre("save", async function (next) {
  //if password is not modified, we return from the function
  if (!this.isModified("password")) return next();
  //hashing the passowrd
  this.password = await bcrypt.hash(this.password, 12);
  //setting the confirm field to undefined
  this.passwordConfirm = undefined;

  next();
});

//checking if user is active or not
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

/* ADDING METHODS */
//comparing passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate password reset token
userSchema.methods.getPasswordResetToken = function () {
  //Generate the token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hash token
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //set token expire time
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

export default model("User", userSchema);
