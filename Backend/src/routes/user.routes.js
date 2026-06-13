const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware.js");
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
