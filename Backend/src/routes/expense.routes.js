const express = require("express");
const expenseRouter = express.Router();
const verifyJWT = require("../middlewares/auth.middleware.js");
const {
    addExpense,
  updateExpense,
  deleteExpense,
  getExpense,
  getAllExpense,
  getExpensesSummary,
  setMonthlyLimit,
}=require("../controllers/expense.controller.js");

expenseRouter.use(verifyJWT);

expenseRouter.route("/add-expense").post(addExpense);

expenseRouter.route("/update-expense/:id").patch(updateExpense);

expenseRouter.route("/delete-expense/:id").delete(deleteExpense);

expenseRouter.route("/get-expense/:id").get(getExpense);

expenseRouter.route("/get-all-expense").get(getAllExpense);

expenseRouter.route("/get-summary").get(getExpensesSummary);

expenseRouter.route("/set-monthly-limit").patch(setMonthlyLimit);

module.exports = expenseRouter;
