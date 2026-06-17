import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios.js";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profilePhoto", profilePhoto);

      const response = await axiosInstance.post("/users/sign-up", formData);
      setSuccess(response.data.message);
      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/users/auth/google";
  };
  return (
    <div
      className="min-h-screen
      bg-linear-to-br from-white
      via-green-50 to-emerald-100
      flex items-center justify-center
      px-4 py-8"
    >
      <div
        className="bg-white rounded-2xl
        shadow-lg w-full max-w-md p-6 md:p-8"
      >
        <h1
          className="text-2xl text-center md:text-3xl
          font-bold text-gray-800 mb-1 "
        >
          Create Account
        </h1>
        <p className="text-gray-500 text-center text-sm mb-6">
          Join SpendSmart And Track Your Money
        </p>

        {error && (
          <div
            className="bg-red-50  text-center text-red-500
            text-sm px-4 py-2 rounded-lg mb-4"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="bg-green-50 text-center text-green-600
    text-sm px-4 py-2 rounded-lg mb-4
    border border-green-200"
          >
            {success}
          </div>
        )}
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-20 h-20 rounded-full
            bg-green-100 overflow-hidden
            border-2 border-green-300 mb-2"
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full
                flex items-center justify-center
                text-3xl"
              >
                👤
              </div>
            )}
          </div>

          <label
            className="text-sm text-green-600
            cursor-pointer hover:underline"
          >
            Upload Profile Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            className="w-full px-4 py-2.5
              border border-gray-200 rounded-lg
              text-sm focus:outline-none
              focus:border-green-400"
          />
          <input
            type="text"
            placeholder="UserName"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="w-full px-4 py-2.5
              border border-gray-200 rounded-lg
              text-sm focus:outline-none
              focus:border-green-400"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full px-4 py-2.5
              border border-gray-200 rounded-lg
              text-sm focus:outline-none
              focus:border-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full px-4 py-2.5
              border border-gray-200 rounded-lg
              text-sm focus:outline-none
              focus:border-green-400"
          />

          <button
            className="w-full py-2.5
            border border-transparent
              bg-green-600 text-white
              rounded-lg font-medium
              hover:bg-green-700

              disabled:opacity-50
              disabled:cursor-not-allowed cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-4">
          <hr className="flex-1 border-gray-200" />
          <span className="text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-200" />
        </div>

        <button
          className="w-full py-2.5
            border border-gray-200
            rounded-lg text-gray-700
            font-medium text-sm
            hover:bg-gray-50
             hover:border-black
            flex items-center
            justify-center gap-2 cursor-pointer"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        <p
          className="text-center text-sm
          text-gray-500 mt-4"
        >
          Already have an account?{" "}
          <span
            className="text-green-600
              cursor-pointer hover:underline"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
