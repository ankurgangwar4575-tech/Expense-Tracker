import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axios.js";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Salary",
  "Freelance",
  "Other",
];
const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = {
        title: title,
        amount: Number(amount),
        type: type,
        category: category,
        date: date,
        description: description,
      };
      const response = await axiosInstance.post("/expenses/add-expense", data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSuccess(response.data.message);
      setTitle("");
      setAmount("");
      setCategory("");
      setType("expense");
      setDate("");
      setDescription("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Error occurred while adding Expense!!",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div
        className="px-4 md:px-8 lg:px-16
        py-6 max-w-2xl mx-auto"
      >
        <div
          className="flex items-center
          gap-3 mb-6 text-center"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-500
              hover:text-green-600 text-sm cursor-pointer"
          >
            Back
          </button>
          <h1
            className="text-xl font-bold
            text-gray-800"
          >
            Add A New Transaction
          </h1>
        </div>

        <div
          className="bg-white rounded-xl
          shadow-sm p-6"
        >
          {error && (
            <div
              className="bg-red-50
              text-red-500 text-sm
              px-4 py-2 rounded-lg mb-4"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="bg-green-50
              text-green-600 text-sm
              px-4 py-2 rounded-lg mb-4
              border border-green-200"
            >
              {success}
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg cursor-pointer
                  text-sm font-medium transition-colors
                  ${
                    type === "expense"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                onClick={() => setType("expense")}
              >
                Expense
              </button>
              <button
                type="button"
                className={`flex-1 py-2 cursor-pointer rounded-lg
                  text-sm font-medium  transition-colors
                  ${
                    type === "income"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                onClick={() => setType("income")}
              >
                Income
              </button>
            </div>
            <input
              type="text"
              placeholder="Title (e.g. Grocery Shopping)"
              className="w-full px-4 py-2.5 
                border border-gray-200 rounded-lg
                text-sm focus:outline-none
                focus:border-green-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Amount (₹)"
              className="w-full px-4 py-2.5
                border border-gray-200 rounded-lg
                text-sm focus:outline-none
                focus:border-green-400"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              className="w-full px-4 py-2.5
                border border-gray-200 rounded-lg
                text-sm focus:outline-none
                focus:border-green-400
                text-gray-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="w-full px-4 py-2.5
                border border-gray-200 rounded-lg
                text-sm focus:outline-none
                focus:border-green-400
                text-gray-600"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <textarea
              className="w-full px-4 py-2.5
                border border-gray-200 rounded-lg
                text-sm focus:outline-none
                focus:border-green-400
                resize-none"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              className="w-full cursor-pointer py-2.5
                bg-green-600 text-white
                rounded-lg font-medium
                hover:bg-green-700
                disabled:opacity-50
                disabled:cursor-not-allowed"
              disabled={loading}
              type="submit"
            >
              {loading ? "Adding..." : "Add Transaction"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
