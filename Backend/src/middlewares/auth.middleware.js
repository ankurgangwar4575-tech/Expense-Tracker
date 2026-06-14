const userModel = require("../models/user.model.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/AsyncHandler.js");
const jwt = require("jsonwebtoken");

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Reminder!!: Unauthorized Request,Please login");
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      throw new ApiError(401, "Reminder!!:Access Token is invalid");
    }
    const user = await userModel
      .findById(decoded?._id)
      .select("-password -refreshToken");
    if (!user) {
      throw new ApiError(401, "Reminder!!: Token is invalid, could not find user");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Reminder!!: Access Token is invalid"
    );
  }
});

module.exports = verifyJWT;
