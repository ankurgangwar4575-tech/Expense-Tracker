const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    monthlyLimit:{
        type:Number,
        default:0
    }
  },
  { timestamps: true }
);

// for saving hashed password in DB
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (this.isGoogleUser) return;
  this.password = await bcrypt.hash(this.password, 10);
  return;
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  //command for generating secrets
  // node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
