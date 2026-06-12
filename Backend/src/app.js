require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter=require("../src/routes/user.routes.js");

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    limit: "16kb",
    extended: true,
  })
);
app.use(express.static("public"));
app.use(cookieParser());


// routes
app.use("/api/users",userRouter);

module.exports = app;
