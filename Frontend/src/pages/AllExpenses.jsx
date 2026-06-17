import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axios.js";
import Navbar from "../components/Navbar";
import ExpenseList from "../components/ExpenseList";

const AllExpenses = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fetchAllExpenses = async () => {
    try {
      const response = await axiosInstance.get("/expenses/get-all-expense");
      setExpenses(response.data.data);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Error occured while fetching all expenses!!",
      );
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/expenses/delete-expense/${id}`);
      fetchAllExpenses();
      setSuccess(response.data.message);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Error occured while deleting expense!!",
      );
    }
  };

  const handleUpdate = (expense) => {
    navigate(`/update-expense/${expense._id}`);
  };
  useEffect(() => {
    setLoading(true);
    fetchAllExpenses();
    setLoading(false);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-4 md:px-8 lg:px-16 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">All Transactions</h1>
          {error && (
            <div
              className="bg-red-50 text-center text-red-500
            text-sm px-4 py-2 rounded-lg"
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="bg-green-50 text-center text-green-500
            text-sm px-4 py-2 rounded-lg"
            >
              {success}
            </div>
          )}
          <button
            className="px-4 py-2 bg-green-600 text-white
              text-sm rounded-lg hover:bg-green-700 cursor-pointer"
            onClick={() => navigate("/add-expense")}
          >
            Add New
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <ExpenseList
            expenses={expenses}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          ></ExpenseList>
        )}
      </div>
    </div>
  );
};

export default AllExpenses;
