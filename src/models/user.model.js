import { model, Schema } from "mongoose";

const userSchema = new Schema(
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

userSchema.pre("save", async function () {
  if (!this.isModified(this.password)) {
    return next();
  }
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  if (!this.password) {
    throw new Error("Password is missing in the database");
  }
  return await bcrypt.compare(password, this.password);
};

export const User = model("User", userSchema);
