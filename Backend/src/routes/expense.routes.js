const express = require("express");
const expenseRouter = express.Router();
const verifyJWT = require("../middlewares/auth.middleware.js");
const {
  addExpense,
  updateExpense,
  deleteExpense,
  getExpense,
  getAllExpenses,
  getExpensesSummary,
} = require("../controllers/expense.controller.js");

expenseRouter.use(verifyJWT);

expenseRouter.route("/add-expense").post(addExpense);

expenseRouter.route("/update-expense/:id").patch(updateExpense);

expenseRouter.route("/delete-expense/:id").delete(deleteExpense);

expenseRouter.route("/get-expense/:id").get(getExpense);

expenseRouter.route("/get-all-expense").get(getAllExpenses);

expenseRouter.route("/get-summary").get(getExpensesSummary);

module.exports = expenseRouter;
