const AsyncHandler = require("../utils/AsyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const userModel = require("../models/user.model.js");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/Cloudinary.js");
// login user(sign-in)
// logoutuser(sign-out)

const registerUser = AsyncHandler(async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  if (
    [fullName, userName, email, password].some((field) => {
      field?.trim() === "";
      return;
    })
  ) {
    throw new ApiError(400, "Reminder!!: All credentials are required!!");
  }
  const ifUserExists = await userModel.findOne({
    $or: [{ userName }, { email }],
  });
  if (ifUserExists) {
    throw new ApiError(
      409,
      "Reminder!!: User with provided credentials already exists!!"
    );
  }
  const profilePhotoLocalPath = req.files?.profilePhoto?.[0]?.path;

  if (!profilePhotoLocalPath) {
    throw new ApiError(400, "Reminder!!: Profile Photo is required!!");
  }

  const profilePhotoUrl = await uploadOnCloudinary(profilePhotoLocalPath);
  if (!profilePhotoUrl) {
    throw new ApiError(
      500,
      "Reminder!!: Error occurred while uploading Profile Photo!!"
    );
  }
  const user = await userModel.create({
    fullName: fullName,
    userName: userName,
    email: email,
    password: password,
    profilePhoto: profilePhotoUrl,
  });

  const foundUser = await userModel
    .findById(user._id)
    .select("-password -refreshToken");
  if (!foundUser) {
    throw new ApiError(
      500,
      "Reminder!!: Error occurred while registering user!!"
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, foundUser, "User registered successfully in DB!!")
    );
});

const loginUser = AsyncHandler(async (req, res) => {
  //  take data
  // check for data
  // check for password
  // find user in DB
  // refreshtoken ,accesstoken
  // send in cookies
  const { userName, email, password } = req.body;
});

const logoutUser = AsyncHandler(async (req, res) => {});

module.exports = { registerUser, loginUser, logoutUser };
