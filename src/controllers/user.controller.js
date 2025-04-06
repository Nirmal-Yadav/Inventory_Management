import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateAccessAndRefreshTokens } from "../utils/generateRefreshAndAccessToken.js";

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body, "body");
  const { fullname, username, email, password, image } = req.body;

  if (
    [fullname, username, email, password].some((field) => field?.trim() == "")
  ) {
    new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    new ApiError(404, "User Already exists");
  }

  console.log(req?.files?.image, "req?.files?.image[0]?.path");
  const userImageLocalPath = req?.files?.image[0]?.path; // multer gives us files access
  // in first prop give obj which gives access to path

  if (!userImageLocalPath) {
    throw new ApiError(400, "image file is required");
  }
  const userImage = await uploadOnCloudinary(userImageLocalPath);

  if (!userImage) {
    throw new ApiError(400, "image file is required");
  }

  const user = await User.create({
    fullname,
    username,
    email,
    password,
    image: userImage?.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" //  string  , what is not required is mentioned remove password and refershtoken
  );

  if (!createdUser) {
    throw new ApiError(500, "registering user error");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "user register succesfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if ([username, password].some((field) => field == "")) {
    new ApiError(404, "All fields are required");
  }

  // const user = User.findById(username?._id);
  const user = await User.findOne({ username });

  if (!user) {
    new ApiError(404, "user doesnot exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    new ApiError(404, "password not matched");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true, // modified by only server not browser using this option
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "user logged in sucessfully"
      )
    );
});
export { registerUser, loginUser };
