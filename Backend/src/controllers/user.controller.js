const AsyncHandler = require("../utils/AsyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const userModel = require("../models/user.model.js");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/Cloudinary.js");
const jwt = require("jsonwebtoken");

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

const googleAuthCallback = AsyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user?._id);
  if (!user) {
    throw new ApiError(400, "Reminder!!: User not found!!");
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  const loggedInUser = await userModel
    .findById(user._id)
    .select("-password -refreshToken");
  const options = {
    httpOnly: true,
    secure: true,
  };

  // res.redirect(
  //   `${process.env.FRONTEND_URL}/login/success?token=${accessToken}`
  // );
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "Google login is successfull!!"
      )
    );
});

const loginUser = AsyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName && !email) {
    throw new ApiError(
      400,
      "Reminder!!: Either username or email is required for logging in!!"
    );
  }

  const findUser = await userModel.findOne({
    $or: [{ userName }, { email }],
  });
  if (!findUser) {
    throw new ApiError(
      400,
      "Reminder!!: User with given credentials does not exists!!"
    );
  }
  const isPasswordCorrect = await findUser.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Reminder!!: Password entered is not valid!!");
  }
  const accessToken = findUser.generateAccessToken();
  const refreshToken = findUser.generateRefreshToken();

  findUser.refreshToken = refreshToken;
  await findUser.save({ validateBeforeSave: false });
  const options = {
    httpOnly: true,
    secure: true,
  };
  const loggedInUser = await userModel
    .findById(findUser._id)
    .select("-password -refreshToken");
  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "Logged In successfully!!"
      )
    );
});

const logoutUser = AsyncHandler(async (req, res) => {
  await userModel.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { refreshToken: null },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logged Out successfully!!"));
});

const refreshAccesToken = AsyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(
      401,
      "Reminder!!: Session expired, please login again to continue!!"
    );
  }
  try {
    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!decodedRefreshToken) {
      throw new ApiError(
        401,
        "Reminder!!: RefreshToken is invalid, Please login again to continue!!"
      );
    }
    const findUser = await userModel.findById(decodedRefreshToken._id);
    if (!findUser) {
      throw new ApiError(
        401,
        "Reminder!!: RefreshToken is invalid, Please login again to continue!!"
      );
    }
    if (findUser.refreshToken !== incomingRefreshToken) {
      throw new ApiError(
        401,
        "Reminder!!: RefreshToken is invalid, Please login again to continue!!"
      );
    }
    const newAccessToken = findUser.generateAccessToken();
    const newRefreshToken = findUser.generateRefreshToken();

    const options = { httpOnly: true, secure: true };
    return res
      .status(200)
      .cookie("accessToken", newAccessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken: newAccessToken, refreshToken: newRefreshToken },
          "Access Token renewed successfully!!"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message ||
        "Reminder!!: Error occurred while refreshing access token!!"
    );
  }
});

const updateProfilePhoto = AsyncHandler(async (req, res) => {
  
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  googleAuthCallback,
  refreshAccesToken,
  updateProfilePhoto,
};
