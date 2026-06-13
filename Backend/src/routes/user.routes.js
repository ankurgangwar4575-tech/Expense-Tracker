const express = require("express");
const userRouter = express.Router();
const {registerUser,loginUser,logoutUser}=require("../controllers/user.controller")
userRouter.route("/sign-up").post(registerUser);
userRouter.route("/sign-in").post(loginUser);
userRouter.route("/sign-out").get(logoutUser);

module.exports = userRouter;
