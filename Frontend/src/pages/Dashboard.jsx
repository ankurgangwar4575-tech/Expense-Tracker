import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axios.js";
import Navbar from "../components/Navbar";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseList from "../components/ExpenseList";
import SummaryCard from "../components/SummaryCard";

const Dashboard = () => {
  const { user, accessToken, login } = useAuth();
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    try {
      const response = await axiosInstance.get("/expenses/get-summary", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSummary(response.data.data);
      login(response.data.data.user, accessToken);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Error occured while fetching Summary!!",
      );
    }
  };

  const fetchAllExpenses = async () => {
    try {
      const response = await axiosInstance.get("/expenses/get-all-expense", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
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
      await axiosInstance.post(`/expenses/delete-expense/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      fetchAllExpenses();
      fetchSummary();
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Error occured while deleting expense!!",
      );
    }
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/sign-in");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      await fetchSummary();
      await fetchAllExpenses();
      setLoading(false);
    };
    fetchData();
  }, [accessToken]);

  if (loading) {
    return (
      <div
        className="min-h-screen
        flex items-center justify-center
        bg-gray-50"
      >
        <div className="text-center">
          <p className="text-gray-400">Loading Your Data!!</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div
        className="px-4 md:px-8 lg:px-16
        py-6 flex flex-col gap-6"
      >
        {error && (
          <div
            className="bg-red-50 text-red-500
            text-sm px-4 py-2 rounded-lg"
          >
            {error}
          </div>
        )}

        {summary?.isLimitExceeded && (
          <div
            className="bg-red-50 border
            border-red-200 rounded-xl
            px-4 py-3 flex items-center gap-3"
          >
            <div>
              <p
                className="text-red-600
                font-medium text-sm"
              >
                Budget Alert!
              </p>
              <p className="text-red-400 text-xs">{summary?.limitMessage}</p>
            </div>
          </div>
        )}

        <div
          className="grid grid-cols-1
          md:grid-cols-3 gap-4"
        >
          <SummaryCard
            title="Balance"
            amount={summary?.balance}
            color="green"
          />
          <SummaryCard
            title="Total Income"
            amount={summary?.totalIncome}
            color="blue"
          />
          <SummaryCard
            title="Total Expense"
            amount={summary?.totalExpense}
            color="red"
          />
        </div>

        <ExpenseChart expenses={expenses} />

        <div
          className="flex justify-between
          items-center"
        >
          <h2
            className="text-lg font-semibold
            text-gray-800"
          >
            All Transactions
          </h2>
          <button
            className="px-4 py-2 bg-green-600
              text-white text-sm rounded-lg
              hover:bg-green-700"
            onClick={() => navigate("/add-expense")}
          >
            + Add New
          </button>
        </div>

        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Dashboard;
