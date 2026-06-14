const expenseModel = require("../models/expense.model.js");
const asyncHandler = require("../utils/AsyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");

const addExpense = asyncHandler(async (req, res) => {
  const { title, amount, type, category, date, description } = req.body;

  if (!amount || amount <= 0) {
    throw new ApiError(400, "Reminder!!: Amount must be greater than 0!!");
  }
  if ([title, type, category, date].some((field) => field.trim() === "")) {
    throw new ApiError(400, "Reminder!!: All field must be non-empty!!");
  }
  if (type !== "income" && type !== "expense") {
    throw new ApiError(400, "Reminder!!: Invalid type field");
  }
  const expense = await expenseModel.create({
    title: title,
    amount: amount,
    type: type,
    category: category,
    date: date,
    description: description || "",
    user: req.user?._id,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, expense, "New Expense added successfully!!"));
});

const updateExpense = asyncHandler(async (req, res) => {});
const deleteExpense = asyncHandler(async (req, res) => {});
const getExpense = asyncHandler(async (req, res) => {});
const getAllExpense = asyncHandler(async (req, res) => {});
const getExpensesSummary = asyncHandler(async (req, res) => {});
const setMonthlyLimit = asyncHandler(async (req, res) => {});

module.exports = {
  addExpense,
  updateExpense,
  deleteExpense,
  getExpense,
  getAllExpense,
  getExpensesSummary,
  setMonthlyLimit,
};
