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
    [fullName, userName, email, password].some((field) => field?.trim() === "")
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
    .status(201)
    .json(
      new ApiResponse(201, foundUser, "User registered successfully in DB!!")
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

  res.redirect(
    `${process.env.FRONTEND_URL}/login/success?token=${accessToken}`
  );
});

const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Reminder!!: Email is required for logging in!!");
  }

  const findUser = await userModel.findOne({
    $or: [{ email }],
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
      returnDocument: "after",
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
  const profilePhotoLocalPath = req.file?.path;
  if (!profilePhotoLocalPath) {
    throw new ApiError(400, "Reminder!!: Profile Photo path is missing");
  }
  const user = await userModel
    .findById(req.user?._id)
    .select("-password -refreshToken");
  if (!user) {
    throw new ApiError(400, "Reminder!! User not found, please login");
  }
  const oldUrl = user.profilePhoto;
  const newProfilePhotoUrl = await uploadOnCloudinary(profilePhotoLocalPath);
  if (!newProfilePhotoUrl) {
    throw new ApiError(
      500,
      "Reminder!!: Error occurred while updating profile photo!!"
    );
  }
  user.profilePhoto = newProfilePhotoUrl;
  await user.save({ validateBeforeSave: false });
  await deleteFromCloudinary(oldUrl);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile photo updated successfully"));
});

const getUserInfo = AsyncHandler(async (req, res) => {
  const getUser = req.user;
  return res
    .status(200)
    .json(
      new ApiResponse(200, getUser, "User information fetched successfully")
    );
});

const updatePassword = AsyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new ApiError(400, "Reminder!!: Password required!!");
  }
  if (newPassword !== confirmPassword) {
    throw new ApiError(
      400,
      "Reminder!!: New passsword and confirm password mismatch"
    );
  }
  const user = await userModel.findById(req.user?._id);

  const checkOldPassword = await user.isPasswordCorrect(oldPassword);
  if (!checkOldPassword) {
    throw new ApiError(400, "Reminder!!: Invalid old password!!");
  }
  user.password = newPassword;
  user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiError(200, {}, "Password updated successfully!!"));
});
const updateUserInfo = AsyncHandler(async (req, res) => {
  const { fullName, userName, email } = req.body;
  if (!fullName && !userName && !email) {
    throw new ApiError(400, "Reminder!!: Credentials required for update");
  }
  const user = await userModel
    .findByIdAndUpdate(
      req?.user._id,
      {
        $set: {
          fullName: fullName,
          userName: userName,
          email: email,
        },
      },
      {
        returnDocument: "after",
      }
    )
    .select("-password -refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details updated successfully!!"));
});

const setMonthlyLimit = AsyncHandler(async (req, res) => {
  const { monthlyLimit } = req.body;
  if (monthlyLimit <= 0) {
    throw new ApiError(
      400,
      "Reminder!!: MontlyLimit must be greater than zero"
    );
  }
  const user = await userModel
    .findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          monthlyLimit: monthlyLimit,
        },
      },
      {
        returnDocument: "after",
      }
    )
    .select("-password -refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Month limit set successfully!"));
});
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  googleAuthCallback,
  refreshAccesToken,
  updateProfilePhoto,
  getUserInfo,
  updateUserInfo,
  updatePassword,
  setMonthlyLimit,
};
