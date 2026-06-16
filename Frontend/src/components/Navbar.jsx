import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axios.js";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, accessToken, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/users/sign-out", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSuccess(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      logout();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <nav
      className="bg-white shadow-sm
      px-4 md:px-8 lg:px-16 py-3"
    >
    
      {success && (
        <div
          className="fixed top-4 right-4
    bg-green-50 text-green-600
    text-sm px-4 py-2 rounded-lg
    border border-green-200 z-50"
        >
          {success}
        </div>
      )}
      <div
        className="flex justify-between
        items-center"
      >
        <h1
          className="text-xl font-bold
            text-green-600 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          SpendSmart
        </h1>

        <div
          className="hidden md:flex
          items-center gap-6"
        >
          <span
            className="text-gray-600 text-sm 
              cursor-pointer hover:text-green-600"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </span>
          <span
            className="text-gray-600 text-sm
              cursor-pointer hover:text-green-600"
            onClick={() => navigate("/add-expense")}
          >
            Add An Expense
          </span>
          <span
            className="text-gray-600 text-sm
              cursor-pointer hover:text-green-600"
            onClick={() => navigate("/profile")}
          >
            Profile
          </span>
        </div>

        <div
          className="hidden md:flex
          items-center gap-3"
        >
          <img
            className="w-8 h-8 rounded-full
              object-cover border-2
              border-green-300"
            src={user?.profilePhoto}
            alt="profile"
          />
          <span
            className="text-sm
            text-gray-700 font-medium"
          >
            {user?.fullName}
          </span>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm
              text-red-500 border cursor-pointer border-red-200
              rounded-lg hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
        <button
          className="md:hidden text-gray-600
            text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div
          className="md:hidden flex flex-col
          gap-3 pt-4 pb-2 border-t
          border-gray-100 mt-3"
        >
          <span
            className="text-gray-600 text-sm
              cursor-pointer hover:text-green-600"
            onClick={() => {
              navigate("/dashboard");
              setMenuOpen(false);
            }}
          >
            Dashboard
          </span>
          <span
            className="text-gray-600 text-sm
              cursor-pointer hover:text-green-600"
            onClick={() => {
              navigate("/add-expense");
              setMenuOpen(false);
            }}
          >
            Add An Expense
          </span>
          <span
            className="text-gray-600 text-sm
              cursor-pointer hover:text-green-600"
            onClick={() => {
              navigate("/profile");
              setMenuOpen(false);
            }}
          >
            Profile
          </span>
          <div
            className="flex items-center
            justify-between pt-2
            border-t border-gray-100"
          >
            <div className="flex items-center gap-2">
              <img
                className="w-7 h-7 rounded-full
                  object-cover"
                src={user?.profilePhoto}
                alt="profile"
              />
              <span
                className="text-sm
                text-gray-700"
              >
                {user?.fullName}
              </span>
            </div>
            <button
              className="text-sm text-red-500
                border border-red-200 px-3 py-1
                rounded-lg hover:bg-red-50"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
