const express = require("express");
const passport = require("../utils/passport.js");
const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  googleAuthCallback,
  refreshAccesToken,
} = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware.js");
const userModel = require("../models/user.model.js");
const ApiResponse = require("../utils/ApiResponse.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

userRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
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

userRouter.route("/sign-out").get(verifyJWT, logoutUser);

userRouter.route("/refresh-token").post(refreshAccesToken);

module.exports = userRouter;
