const express = require("express");
const userRouter = express.Router();

userRouter.route("/sign-up").post();
userRouter.route("/sign-in").post();
userRouter.route("/sign-out").get();

module.exports = userRouter;
