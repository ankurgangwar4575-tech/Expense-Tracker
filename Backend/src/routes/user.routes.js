const express = require("express");
const passport = require("../utils/passport.js");
const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware.js");
const userModel = require("../models/user.model.js");
const ApiRespone = require("../utils/ApiResponse.js");

userRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const user = await userModel.findById(req.user?._id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const options = {
      httpOnly: true,
      secure: true,
    };
    res.cookie("refreshToken", refreshToken, options);

    // res.redirect(
    //   `${process.env.FRONTEND_URL}/login/success?token=${accessToken}`
    // );
    res
      .status(200)
      .json(new ApiRespone(200, user, "Google login is successfull!!"));
  }
);

userRouter.route("/sign-up").post(
  upload.fields([
    {
      name: "profilePhoto",
      maxCount: 1,
    },
  ]),
  registerUser
);
userRouter.route("/sign-in").post(loginUser);
userRouter.route("/sign-out").get(logoutUser);

module.exports = userRouter;
