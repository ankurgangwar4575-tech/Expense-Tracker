import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios.js";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/users/auth/google";
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post("/users/sign-in", {
        email,
        password,
      });
      login(response.data.data.user, response.data.data.accessToken);
      setSuccess(response.data.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error occured while logging in",
      );
    } finally {
      setLoading(false);
    }
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
          font-bold text-gray-800 mb-5 "
        >
          Sign In To Your Account
        </h1>

        {error && (
          <div
            className="bg-red-50 text-center text-red-500
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
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <input
            className="w-full px-4 py-2.5
              border border-gray-200 rounded-lg
              text-sm focus:outline-none
              focus:border-green-400"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-2.5
              border border-gray-200 rounded-lg
              text-sm focus:outline-none
              focus:border-green-400"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5
            border border-transparent
              bg-green-600 text-white
              rounded-lg font-medium
              hover:bg-green-700
              disabled:opacity-50
              disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Signing In..." : "Sign In"}
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
          Continue With Google
        </button>

        <p
          className="text-center text-sm
          text-gray-500 mt-4"
        >
          Don't Have An Account?{" "}
          <span
            className="text-green-600
              cursor-pointer hover:underline"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
