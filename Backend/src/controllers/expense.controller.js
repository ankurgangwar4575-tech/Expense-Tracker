const expenseModel = require("../models/expense.model.js");
const asyncHandler = require("../utils/AsyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const userModel = require("../models/user.model.js");
const { default: mongoose } = require("mongoose");
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
    .json(new ApiResponse(201, expense, `New ${type} added successfully!!`));
});

const updateExpense = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  if (!id) {
    throw new ApiError(400, "Reminder!!: Error occurred while updating!!");
  }
  const expense = await expenseModel.findById(id);
  if (!expense) {
    throw new ApiError(
      400,
      "Reminder!! Error occurred while updating expense!!"
    );
  }
  if (expense.user.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "Reminder!!: Unauthorized to update this field!!");
  }
  const { title, amount, type, category, date, description } = req.body;

  if (amount !== undefined && amount <= 0) {
    throw new ApiError(400, "Reminder!!: Amount must be greater than 0!!");
  }
  if (type !== undefined && type !== "income" && type !== "expense") {
    throw new ApiError(400, "Reminder!!: Invalid type field");
  }
  const updateFields = {};
  if (title) updateFields.title = title;
  if (amount) updateFields.amount = amount;
  if (type) updateFields.type = type;
  if (category) updateFields.category = category;
  if (date) updateFields.date = date;
  if (description) updateFields.description = description;

  if (Object.keys(updateFields).length == 0) {
    throw new ApiError(
      400,
      "Reminder!!: Atleast one field must be non-empty!!"
    );
  }
  const newExpense = await expenseModel.findByIdAndUpdate(
    id,
    {
      $set: updateFields,
    },
    { returnDocument: "after" }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, newExpense, "Expense updated successfully!!"));
});

const deleteExpense = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  if (!id) {
    throw new ApiError(400, "Reminder!!: Error occurred while deleting!!");
  }
  const expense = await expenseModel.findById(id);
  if (!expense) {
    throw new ApiError(
      400,
      "Reminder!! Error occurred while deleting expense!!"
    );
  }
  if (expense.user.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "Reminder!!: Unauthorized to delete this field!!");
  }
  await expenseModel.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Expense Deleted successfully!!"));
});

const getExpense = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Reminder!!: Invalid id!!");
  }
  const expense = await expenseModel.findById(id);
  if (!expense) {
    throw new ApiError(400, "Reminder!! Unable to access the expense!!");
  }
  if (expense.user.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "Reminder!!: Unauthorized to access this field!!");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        expense,
        "Expense information fetched successfully!!"
      )
    );
});

const getAllExpenses = asyncHandler(async (req, res) => {
  const id = req.user?._id;
  const allExpenses = await expenseModel.find({ user: id });
  return res
    .status(200)
    .json(
      new ApiResponse(200, allExpenses, "All expenses fetched successfully!!")
    );
});

const getExpensesSummary = asyncHandler(async (req, res) => {
  const user = await userModel
    .findById(req.user?._id)
    .select("-password -refreshToken");

  if (!user) {
    throw new ApiError(400, "Reminder!!: User does not exists");
  }
  const monthlyLimit = user.monthlyLimit;

  if (monthlyLimit < 0) {
    throw new ApiError(
      400,
      "Reminder!!: Month limit must be greater than zero"
    );
  }
  const summary = await expenseModel.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
          },
        },
        totalExpense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
          },
        },
      },
    },
    {
      $addFields: {
        balance: {
          $subtract: ["$totalIncome", "$totalExpense"],
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalIncome: 1,
        totalExpense: 1,
        balance: 1,
      },
    },
  ]);

  const data = summary[0] || {
    totalExpense: 0,
    totalIncome: 0,
    balance: 0,
  };
  const isLimitExceeded = monthlyLimit > 0 && monthlyLimit < data.totalExpense;

  const limitMessage =
    monthlyLimit == 0
      ? null
      : isLimitExceeded
        ? `Overspent by Rs. ${data.totalExpense - monthlyLimit}!!`
        : `Rs.${monthlyLimit - data.totalExpense} remaining!!`;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,

        totalIncome: data.totalIncome,
        totalExpense: data.totalExpense,
        balance: data.balance,

        monthlyLimit,
        isLimitExceeded,
        limitMessage,
      },
      "Summary fetched successfully!!"
    )
  );
});

module.exports = {
  addExpense,
  updateExpense,
  deleteExpense,
  getExpense,
  getAllExpenses,
  getExpensesSummary,
};
