import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);
const ExpenseChart = ({ expenses }) => {
  const categoryTotals = {};
  expenses?.forEach((expense) => {
    if (expense.type === "expense") {
      categoryTotals[expense.category] =
        (categoryTotals[expense.category] || 0) + expense.amount;
    }
  });

  const pieChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#4ade80",
          "#60a5fa",
          "#f87171",
          "#fbbf24",
          "#a78bfa",
          "#34d399",
          "#fb923c",
          "#e879f9",
          "#38bdf8",
          "#94a3b8",
        ],
        borderWidth: 0,
      },
    ],
  };

  const barChartData = {
    labels: ["This Month"],
    datasets: [
      {
        label: "Income",
        data: [
          expenses
            ?.filter((e) => e.type == "income")
            .reduce((sum, e) => sum + e.amount, 0),
        ],
        backgroundColor: "#4ade80",
        borderRadius: 8,
      },
      {
        label: "Expense",
        data: [
          expenses
            ?.filter((e) => e.type == "expense")
            .reduce((sum, e) => sum + e.amount, 0),
        ],
        backgroundColor: "#f87171",
        borderRadius: 8,
      },
    ],
  };

  const barGraphOptions = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true, grid: { color: "#f3f4f6" } } },
  };
  if (!expenses || expenses.length == 0) {
    return (
      <div
        className="bg-white rounded-xl
        shadow-sm p-6 text-center"
      >
        <p className="text-4xl mb-2">📊</p>
        <p className="text-gray-400 text-sm">
          No data to show charts! Add some expenses first.
        </p>
      </div>
    );
  }
  return (
    <div
      className="grid grid-cols-1
      md:grid-cols-2 gap-4"
    >
      <div
        className="bg-white rounded-xl
        shadow-sm p-4 md:p-6"
      >
        <h3
          className="text-sm font-semibold
          text-gray-700 mb-4"
        >
          Spending By Category
        </h3>
        <div className="max-w-xs mx-auto">
          <Pie data={pieChartData}></Pie>
        </div>
      </div>
      <div
        className="bg-white rounded-xl
        shadow-sm p-4 md:p-6"
      >
        <h3
          className="text-sm font-semibold
          text-gray-700 mb-4"
        >
          Income vs Expense
        </h3>
        <Bar data={barChartData} options={barGraphOptions}></Bar>
      </div>
    </div>
  );
};

export default ExpenseChart;
