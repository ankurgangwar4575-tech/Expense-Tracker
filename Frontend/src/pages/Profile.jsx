import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios.js";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const { user, accessToken, login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState(0);
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [profilePhotoLoading, setProfilePhotoLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [monthlyLimitLoading, setMonthlyLimitLoading] = useState(false);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(time);
    }
  }, [error]);
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setUserName(user.userName || "");
      setEmail(user.email || "");
      setPreview(user.profilePhoto || "");
      setMonthlyLimit(user.monthlyLimit || 0);
    }
  }, [user]);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdateProfileInfo = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.patch("/users/update-user-info", {
        fullName: fullName,
        userName: userName,
        email: email,
      });
      login(response.data.data, accessToken);
      setSuccess(response.data.message);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Error occured while updating profile!!",
      );
    } finally {
      setProfileLoading(false);
    }
  };
  const handleProfilePhotoUpdate = async () => {
    if (!profilePhoto) return;
    setProfilePhotoLoading(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("profilePhoto", profilePhoto);
      const response = await axiosInstance.patch(
        "/users/update-profile-photo",
        formData,
      );
      login(response.data.data, accessToken);
      setSuccess(response.data.message);
      setProfilePhoto(null);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Error occurred while updating profile photo!!",
      );
    } finally {
      setProfilePhotoLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setSuccess("");
    setError("");
    try {
      const response = await axiosInstance.patch("/users/update-password", {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });
      setSuccess(response.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Error occurred while updating password!!",
      );
    } finally {
      setPasswordLoading(false);
    }
  };
  const handleMonthLimitSet = async (e) => {
    e.preventDefault();
    setMonthlyLimitLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.patch("/users/set-monthly-limit", {
        monthlyLimit: Number(monthlyLimit),
      });
      login(response.data.data, accessToken);
      setSuccess(response.data.message);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Error occurred while setting monthly limit!!",
      );
    } finally {
      setMonthlyLimitLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen bg-linear-to-br from-white
      via-green-50 to-emerald-100"
    >
      <Navbar />
      <div
        className="px-4 md:px-8 lg:px-16
        py-6 max-w-2xl mx-auto
        flex flex-col gap-6"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-500
              hover:text-green-600  text-sm cursor-pointer"
          >
            Back
          </button>
          <h1
            className="text-xl font-bold
            text-gray-800 "
          >
            My Profile
          </h1>
        </div>
        {error && (
          <div
            className="bg-red-50 text-red-500
            text-sm px-4 py-2 rounded-lg text-center"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="bg-green-50 text-green-600
            text-sm px-4 py-2 rounded-lg text-center"
          >
            {success}
          </div>
        )}
        <div
          className="bg-white rounded-xl
          shadow-sm p-6"
        >
          <h2
            className="text-sm font-semibold
            text-gray-700 mb-4"
          >
            Profile Photo
          </h2>
          <div className="flex items-center gap-4">
            <img
              src={preview}
              alt="profile"
              className="w-16 h-16 rounded-full
                object-cover border-2
                border-green-300"
            />
            <div>
              <label
                className="text-sm
                text-green-600 cursor-pointer
                hover:underline"
              >
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="hidden"
                />
              </label>
              {profilePhoto && (
                <button
                  disabled={profilePhotoLoading}
                  onClick={handleProfilePhotoUpdate}
                  className="block mt-2 px-3 py-1
                    bg-green-600 text-white
                    text-xs rounded-lg
                    hover:bg-green-700 cursor-pointer"
                >
                  {profilePhotoLoading ? "Saving..." : "Save Photo"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          className="bg-white rounded-xl
          shadow-sm p-6"
        >
          <h2
            className="text-sm font-semibold
            text-gray-700 mb-4"
          >
            Personal Information
          </h2>
          <form
            onSubmit={handleUpdateProfileInfo}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5
                border border-gray-200 rounded-lg
                text-sm focus:outline-none
                focus:border-green-400"
            />
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2.5
                border border-gray-200 rounded-lg
                text-sm focus:outline-none
                focus:border-green-400"
            />
            <button
              className="w-full py-2.5
                bg-green-600 text-white
                rounded-lg font-medium
                hover:bg-green-700
                disabled:opacity-50 cursor-pointer"
              type="submit"
              disabled={profileLoading}
            >
              {profileLoading ? "Saving..." : "Update Profile"}
            </button>
          </form>
        </div>
        <div
          className="bg-white rounded-xl
          shadow-sm p-6"
        >
          <h2
            className="text-sm font-semibold
            text-gray-700 mb-1"
          >
            Monthly Budget Limit
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Get warned when expenses exceed this limit!
          </p>
          <form onSubmit={handleMonthLimitSet} className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Limit (₹)"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
              className="flex-1 px-4 py-2.5
                border border-gray-200 rounded-lg
                text-sm focus:outline-none
                focus:border-green-400"
            />
            <button
              type="submit"
              disabled={monthlyLimitLoading}
              className="px-4 py-2.5
                bg-green-600 text-white
                rounded-lg text-sm
                hover:bg-green-700
                disabled:opacity-50 cursor-pointer"
            >
              {monthlyLimitLoading ? "Saving..." : "Set Limit"}
            </button>
          </form>
        </div>
        {!user?.isGoogleUser && (
          <div
            className="bg-white rounded-xl
            shadow-sm p-6"
          >
            <h2
              className="text-sm font-semibold
              text-gray-700 mb-4"
            >
              Change Password
            </h2>
            <form
              onSubmit={handleUpdatePassword}
              className="flex flex-col gap-4"
            >
              <input
                type="password"
                placeholder="Current Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2.5
                  border border-gray-200 rounded-lg
                  text-sm focus:outline-none
                  focus:border-green-400"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5
                  border border-gray-200 rounded-lg
                  text-sm focus:outline-none
                  focus:border-green-400"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5
                  border border-gray-200 rounded-lg
                  text-sm focus:outline-none
                  focus:border-green-400"
              />
              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full py-2.5
                  bg-green-600 text-white
                  rounded-lg font-medium
                  hover:bg-green-700
                  disabled:opacity-50 cursor-pointer"
              >
                {passwordLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
