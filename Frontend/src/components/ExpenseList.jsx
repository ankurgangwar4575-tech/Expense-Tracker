import React from "react";
const categoryIcons = {
  Food: "🍕",
  Transport: "🚗",
  Shopping: "🛍️",
  Bills: "💡",
  Entertainment: "🎬",
  Health: "🏥",
  Education: "📚",
  Salary: "💰",
  Freelance: "💻",
  Other: "📦",
};
const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <div
      className="bg-white  rounded-xl
      shadow-sm p-4 md:p-6"
    >
      <h2
        className="text-lg text-center font-semibold
        text-gray-800 "
      >
        Recent Transactions
      </h2>
      {expenses?.length == 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">
            No transactions yet! Add your first expense.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {expenses?.map((expense) => (
          <div
            key={expense._id}
            className="flex items-center
              justify-between p-3
              bg-gray-50 rounded-lg
              hover:bg-gray-100
              transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10
                bg-white rounded-full
                flex items-center justify-center
                text-xl shadow-sm"
              >
                {categoryIcons[expense.category] || "📦"}
              </div>

              <div
                className="flex items-center
    justify-between p-3
    bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <p
                  className="text-sm font-medium
                  text-gray-800 "
                >
                  {expense.title}
                </p>
                <p className="text-xs text-gray-400 ">
                  {expense.category} •{" "}
                  {new Date(expense.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <p
                className={`text-sm font-semibold ${
                  expense.type === "income" ? "text-green-600" : "text-red-500"
                }`}
              >
                {expense.type === "income" ? "+" : "-"}₹
                {expense.amount?.toLocaleString()}
              </p>

              <button
                onClick={() => onDelete(expense._id)}
                className="text-gray-300
                  hover:text-red-500
                  transition-colors text-lg cursor-pointer"
              >
                Del
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
