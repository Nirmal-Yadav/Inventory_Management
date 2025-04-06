import { User } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";
import { asyncHandler } from "./asyncHandler.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    console.log(user, "user");

    const accessToken = user.generateAccessToken();
    console.log(accessToken, "user");

    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false }); // disables Mongoose's automatic validation before saving the document.

    console.log(refreshToken, "refreshToken");

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access token"
    );
  }
};

export { generateAccessAndRefreshTokens };
