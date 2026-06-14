const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    description: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    montlyLimit:{
        type:Number,
        default:0
    }
  },
  { timestamps: true }
);





const expenseModel = mongoose.model("Expense", expenseSchema);

module.exports = expenseModel;
