import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-linear-to-br
  from-white via-green-100 to-emerald-200"
    >
      <nav
        className="flex justify-between items-center
        px-4 md:px-8 lg:px-16
        py-4 bg-white shadow-sm"
      >
        <h1
          className="text-xl md:text-2xl
          font-bold text-green-600"
        >
          SpendSmart
        </h1>
        <div className="flex gap-2 md:gap-4">
          <button
            onClick={() => navigate("/sign-in")}
            className="px-3 py-1.5 md:px-4 md:py-2
              text-sm md:text-base
              text-green-600 border border-green-600
              rounded-lg hover:bg-green-50 cursor-pointer "
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/sign-up")}
            className="px-3 py-1.5 md:px-4 md:py-2
              text-sm md:text-base
              bg-green-600 text-white
              rounded-lg hover:bg-green-700 cursor-pointer "
          >
            Sign Up
          </button>
        </div>
      </nav>

      <div
        className="flex flex-col items-center
        justify-center text-center
        py-16 md:py-24 px-4"
      >
        <h1
          className="text-3xl md:text-4xl lg:text-5xl
          font-bold text-gray-800 mb-4"
        >
          {" "}
          Track Your Money
          <span className="text-green-600"> The Smart Way!</span>
        </h1>
        <p
          className="text-gray-500
          text-base md:text-xl
          mb-8 max-w-xs md:max-w-lg"
        >
          Track income and expenses and stay within your budget
        </p>
        <button
          onClick={() => navigate("/sign-up")}
          className="px-6 py-2.5 md:px-8 md:py-3
            bg-green-600 text-white
            text-base md:text-lg
            rounded-lg hover:bg-green-700 cursor-pointer"
        >
          Get Started
        </button>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3
        gap-4 md:gap-6
        px-4 md:px-16 pb-16"
      >
        <div
          className="bg-white p-6
          rounded-xl shadow-sm text-center"
        >
          <h3
            className="text-lg font-semibold
            text-gray-800 mb-2"
          >
            Track Expenses
          </h3>
          <p className="text-gray-500 text-sm md:text-base">
            {" "}
            Add and categorize your daily expenses easily
          </p>
        </div>

        <div
          className="bg-white p-6
          rounded-xl shadow-sm text-center"
        >
          <h3
            className="text-lg font-semibold
            text-gray-800 mb-2"
          >
            Visual Charts
          </h3>
          <p className="text-gray-500 text-sm md:text-base">
            {" "}
            Visualize your spending patterns with beautiful charts
          </p>
        </div>

        <div
          className="bg-white p-6
          rounded-xl shadow-sm text-center"
        >
          <h3
            className="text-lg font-semibold
            text-gray-800 mb-2"
          >
            Budget Alert
          </h3>
          <p className="text-gray-500 text-sm md:text-base">
            {" "}
            Set up the budget limit for your monthly expense
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
