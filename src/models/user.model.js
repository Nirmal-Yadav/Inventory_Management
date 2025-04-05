import { model, Schema } from "mongoose";

const userschema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
    },
    refershToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userschema);
